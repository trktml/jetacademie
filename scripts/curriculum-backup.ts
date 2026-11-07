import { mkdir, writeFile, readdir } from "node:fs/promises";
import { join, resolve } from "node:path";
import { createHash } from "node:crypto";
import { format, resolveConfig } from "prettier";
import { execute, query, readOnlyTransaction, transaction } from "../src/lib/db";
import {
  ensureCurriculumEntriesTable,
  resolveCurriculumCatalog,
  type CurriculumEntryRow,
} from "../src/lib/curriculum-db";
import { readEditorRecord, type ContentRow } from "../src/lib/editor/content";
import {
  CURRICULUM_LOCK_NAMESPACE,
  lockCurriculumCategories,
  saveSeedExclusions,
  upsertCurriculumEntryRows,
  withSeedExclusionsSuspended,
  type SeedExclusionRow,
} from "../src/lib/curriculum/repository";
import {
  weekNumberToSlot,
  slotToWeekNumber,
  WEEKLY_CONTENT_CATEGORIES,
} from "../src/lib/validations/curriculum-entry";

interface EditorContentRow extends ContentRow {
  slot: string;
  grade: number;
  entryId: string;
}

function isWeeklyCategory(category: string): boolean {
  return WEEKLY_CONTENT_CATEGORIES.some((id) => id === category);
}

function standardEditorWeek(slot: string): string | undefined {
  const [, category, , period] = slot.split(":");
  return category && isWeeklyCategory(category) && /^\d{1,2}-[1-4]$/.test(period ?? "")
    ? period
    : undefined;
}

export interface BackupManifest {
  version: 1;
  timestamp: string;
  outDir: string;
  weeks: number[];
  counts: {
    curriculumEntriesWeekly: number;
    curriculumEntriesAll: number;
    curriculumEditorContent: number;
    curriculumSeedExclusions: number;
  };
  files: Array<{
    relativePath: string;
    sha256: string;
    bytes: number;
  }>;
}

function computeSha256(content: string | Buffer): string {
  return createHash("sha256").update(content).digest("hex");
}

function escapeSqlString(val: unknown): string {
  if (val === null || val === undefined) return "NULL";
  if (val instanceof Date) {
    return `'${val.toISOString()}'`;
  }
  const str = String(val);
  return `'${str.replace(/'/g, "''")}'`;
}

function escapeSqlNumber(val: unknown): string {
  if (val === null || val === undefined) return "NULL";
  if (typeof val === "boolean") return val ? "1" : "0";
  const num = Number(val);
  return Number.isFinite(num) ? String(num) : "NULL";
}

export async function createCurriculumBackup(options?: {
  outDir?: string;
}): Promise<{ backupDir: string; manifest: BackupManifest }> {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const backupDirName = `curriculum-backup-${timestamp}`;
  const baseBackupsDir = resolve(process.cwd(), "backups");
  const targetDir = options?.outDir ? resolve(options.outDir) : join(baseBackupsDir, backupDirName);

  const weeksDir = join(targetDir, "weeks");
  const dbDir = join(targetDir, "database");
  const mdDir = join(targetDir, "markdown");

  await mkdir(weeksDir, { recursive: true, mode: 0o700 });
  await mkdir(dbDir, { recursive: true, mode: 0o700 });
  await mkdir(mdDir, { recursive: true, mode: 0o700 });

  console.log(`📦 Müfredat yedeği başlatılıyor...`);
  console.log(`📁 Hedef dizin: ${targetDir}`);

  await ensureCurriculumEntriesTable();

  console.log(`🔍 Veritabanı tabloları sorgulanıyor...`);
  const { allEntries, editorContent, seedExclusions } = await readOnlyTransaction(async () => ({
    allEntries: await query<CurriculumEntryRow>(
      'SELECT * FROM "curriculum_entries" ORDER BY "categoryId", "grade", "month", "week", "id"'
    ),
    editorContent: await query<EditorContentRow>(
      'SELECT * FROM "curriculum_editor_content" ORDER BY "slot"'
    ),
    seedExclusions: await query<SeedExclusionRow>(
      'SELECT * FROM "curriculum_seed_exclusions" ORDER BY "categoryId"'
    ),
  }));
  const weeklyEntries = allEntries.filter(
    (entry) => isWeeklyCategory(entry.categoryId) && !entry.isExtra
  );
  const weeklyEditor = editorContent.filter(({ slot }) => standardEditorWeek(slot) !== undefined);
  const effective = resolveCurriculumCatalog(
    weeklyEntries,
    weeklyEditor.map(readEditorRecord),
    true
  );

  const manifestFiles: BackupManifest["files"] = [];

  async function writeTrackedFile(relativePath: string, content: string) {
    const fullPath = join(targetDir, relativePath);
    await writeFile(fullPath, content, { encoding: "utf-8", mode: 0o600 });
    const sha256 = computeSha256(content);
    manifestFiles.push({
      relativePath,
      sha256,
      bytes: Buffer.byteLength(content, "utf-8"),
    });
  }

  // 2. Save Database JSON snapshots
  console.log(`💾 Tablo snapshot dosyaları yazılıyor...`);
  await writeTrackedFile(
    "database/curriculum_entries_weekly.json",
    JSON.stringify(weeklyEntries, null, 2)
  );
  await writeTrackedFile(
    "database/curriculum_entries_all.json",
    JSON.stringify(allEntries, null, 2)
  );
  await writeTrackedFile(
    "database/curriculum_editor_content.json",
    JSON.stringify(editorContent, null, 2)
  );
  await writeTrackedFile(
    "database/curriculum_seed_exclusions.json",
    JSON.stringify(seedExclusions, null, 2)
  );

  // 3. Identify weeks with entries
  const weekSet = new Set<number>();
  function addWeek(month: number, week: number) {
    const number = slotToWeekNumber(month, week);
    if (number <= 36) weekSet.add(number);
  }
  for (const entry of weeklyEntries) {
    if (entry.month && entry.week) addWeek(entry.month, entry.week);
  }
  for (const { slot } of weeklyEditor) {
    const [month, week] = standardEditorWeek(slot)!.split("-").map(Number);
    addWeek(month, week);
  }

  const detectedWeeks = Array.from(weekSet).sort((a, b) => a - b);
  console.log(
    `📌 İçeriği bulunan haftalar: ${detectedWeeks.length > 0 ? detectedWeeks.join(", ") : "Yok"}`
  );

  // 4. Per-week packages and Markdown exports
  const prettierConfig = await resolveConfig(join(process.cwd(), "package.json"));

  for (const weekNumber of detectedWeeks) {
    const slot = weekNumberToSlot(weekNumber);
    const weekPad = String(weekNumber).padStart(2, "0");

    const rawWeekEntries = weeklyEntries.filter(
      (e) => e.month === slot.month && e.week === slot.week
    );
    const weekEditorEntries = weeklyEditor.filter(
      ({ slot: editorSlot }) => standardEditorWeek(editorSlot) === `${slot.month}-${slot.week}`
    );
    const effectiveEntries = effective
      .map(({ entry }) => entry)
      .filter((entry) => !entry.isExtra && entry.month === slot.month && entry.week === slot.week);

    const weekPackagePayload = {
      weekNumber,
      slot,
      totalEntries: rawWeekEntries.length,
      rawDbEntries: rawWeekEntries,
      editorOverrides: weekEditorEntries,
      effectiveEntries,
    };

    await writeTrackedFile(
      `weeks/hafta-${weekPad}.json`,
      JSON.stringify(weekPackagePayload, null, 2)
    );

    // Export Markdown files
    const weekMdDir = join(mdDir, `hafta-${weekPad}`);
    await mkdir(weekMdDir, { recursive: true, mode: 0o700 });

    for (let grade = 1; grade <= 6; grade++) {
      const gradeMatches = effectiveEntries.filter((e) => e.grade === grade);
      if (gradeMatches.length === 0) continue;

      const mdContent =
        gradeMatches.map((entry) => entry.body ?? `# ${entry.title}`).join("\n\n---\n\n") + "\n";

      let formatted = mdContent;
      try {
        formatted = await format(mdContent, { ...prettierConfig, parser: "markdown" });
      } catch {
        // format fallback
      }

      await writeTrackedFile(`markdown/hafta-${weekPad}/M${grade}-${weekPad}.md`, formatted);
    }
  }

  // 5. Generate raw SQL restore script
  console.log(`📝 Doğrudan SQL geri yükleme betiği oluşturuluyor (database/restore.sql)...`);
  const sqlLines: string[] = [
    `-- ==============================================================================`,
    `-- JetAcademie Curriculum Snapshot SQL Restore Script`,
    `-- Backup Timestamp: ${new Date().toISOString()}`,
    `-- Total Weekly Entries: ${weeklyEntries.length}`,
    `-- Total Weekly Editor Overrides: ${weeklyEditor.length}`,
    `-- ==============================================================================`,
    `BEGIN;`,
    ``,
    `SET LOCAL standard_conforming_strings = on;`,
    ...[...WEEKLY_CONTENT_CATEGORIES]
      .sort()
      .map(
        (category) =>
          `SELECT pg_advisory_xact_lock(hashtext('${CURRICULUM_LOCK_NAMESPACE}'), hashtext('${category}'));`
      ),
    `CREATE TEMP TABLE restore_seed_exclusions ON COMMIT DROP AS
       SELECT * FROM "curriculum_seed_exclusions" WHERE "categoryId" IN ('konu', 'hocaefendi-dinleme');`,
    `DELETE FROM "curriculum_seed_exclusions" WHERE "categoryId" IN ('konu', 'hocaefendi-dinleme');`,
    ``,
    `-- 1. Restore curriculum_entries`,
  ];

  for (const entry of weeklyEntries) {
    sqlLines.push(
      `INSERT INTO "curriculum_entries" (`,
      `  "id", "grade", "categoryId", "gender", "month", "week", "year",`,
      `  "isExtra", "extraOrder", "isDraft", "title", "body", "resourceUrl",`,
      `  "pdfUrl", "pageCount", "createdAt", "updatedAt"`,
      `) VALUES (`,
      `  ${escapeSqlString(entry.id)},`,
      `  ${escapeSqlNumber(entry.grade)},`,
      `  ${escapeSqlString(entry.categoryId)},`,
      `  ${escapeSqlString(entry.gender)},`,
      `  ${escapeSqlNumber(entry.month)},`,
      `  ${escapeSqlNumber(entry.week)},`,
      `  ${escapeSqlNumber(entry.year)},`,
      `  ${escapeSqlNumber(entry.isExtra)},`,
      `  ${escapeSqlNumber(entry.extraOrder)},`,
      `  ${escapeSqlNumber(entry.isDraft)},`,
      `  ${escapeSqlString(entry.title)},`,
      `  ${escapeSqlString(entry.body)},`,
      `  ${escapeSqlString(entry.resourceUrl)},`,
      `  ${escapeSqlString(entry.pdfUrl)},`,
      `  ${escapeSqlNumber(entry.pageCount)},`,
      `  ${escapeSqlString(entry.createdAt)},`,
      `  ${escapeSqlString(entry.updatedAt)}`,
      `) ON CONFLICT ("id") DO UPDATE SET`,
      `  "title" = EXCLUDED."title",`,
      `  "body" = EXCLUDED."body",`,
      `  "resourceUrl" = EXCLUDED."resourceUrl",`,
      `  "isDraft" = EXCLUDED."isDraft",`,
      `  "updatedAt" = EXCLUDED."updatedAt";`,
      ``
    );
  }

  sqlLines.push(`-- 2. Restore curriculum_editor_content`);
  for (const ed of weeklyEditor) {
    sqlLines.push(
      `INSERT INTO "curriculum_editor_content" (`,
      `  "slot", "grade", "entryId", "entry", "revision", "updatedAt"`,
      `) VALUES (`,
      `  ${escapeSqlString(ed.slot)},`,
      `  ${escapeSqlNumber(ed.grade)},`,
      `  ${escapeSqlString(ed.entryId)},`,
      `  ${escapeSqlString(ed.entry)},`,
      `  ${escapeSqlNumber(ed.revision)},`,
      `  ${escapeSqlString(ed.updatedAt)}`,
      `) ON CONFLICT ("slot") DO UPDATE SET`,
      `  "entryId" = EXCLUDED."entryId",`,
      `  "entry" = EXCLUDED."entry",`,
      `  "revision" = GREATEST("curriculum_editor_content"."revision", EXCLUDED."revision") + 1,`,
      `  "updatedAt" = EXCLUDED."updatedAt";`,
      ``
    );
  }

  sqlLines.push(`-- 3. Restore seed exclusions`);
  sqlLines.push(`INSERT INTO "curriculum_seed_exclusions" SELECT * FROM restore_seed_exclusions
    ON CONFLICT ("categoryId") DO NOTHING;`);
  for (const ex of seedExclusions.filter(({ categoryId }) => isWeeklyCategory(categoryId))) {
    sqlLines.push(
      `INSERT INTO "curriculum_seed_exclusions" ("categoryId", "createdAt")`,
      `VALUES (${escapeSqlString(ex.categoryId)}, ${escapeSqlString(ex.createdAt)})`,
      `ON CONFLICT ("categoryId") DO NOTHING;`
    );
  }

  sqlLines.push(``, `COMMIT;`, ``);
  await writeTrackedFile("database/restore.sql", sqlLines.join("\n"));

  // 6. Generate README.md
  const readmeContent = `# JetAcademie Müfredat İçerik Yedeği

**Yedek Alma Zamanı:** ${new Date().toISOString()}  
**Dizin:** \`${targetDir}\`

---

## 📊 Yedek İstatistikleri
- **İçerik Bulunan Haftalar:** ${detectedWeeks.map((w) => `Hafta ${w}`).join(", ") || "Yok"}
- **Haftalık Müfredat Kayıt Sayısı (curriculum_entries):** ${weeklyEntries.length} kayıt (konu ve hocaefendi-dinleme)
- **Editör Değişiklik/Revizyon Kaydı (curriculum_editor_content):** ${editorContent.length} kayıt
- **Tüm Müfredat Tablosu Satır Sayısı:** ${allEntries.length} kayıt (adab, ilmihal ve esma dahil)

---

## 📁 Dizin Yapısı
- \`weeks/\`: Her hafta için bağımsız JSON paketi (\`hafta-01.json\`, \`hafta-02.json\`, \`hafta-03.json\`). Hem ham DB kayıtlarını hem de editör override'larını içerir.
- \`database/\`:
  - \`curriculum_entries_weekly.json\`: Haftalık içeriklerin tam veritabanı satırları.
  - \`curriculum_editor_content.json\`: Web editöründe kaydedilmiş tüm aktif revizyonlar.
  - \`curriculum_entries_all.json\`: Tüm müfredat kayıtlarının tam güvenlik kopyası.
  - \`curriculum_seed_exclusions.json\`: Kategori tohumlama muafiyetleri.
  - \`restore.sql\`: PostgreSQL için haftalık kayıtları birleştiren SQL betiği. Bir haftayı yedekteki hâliyle değiştirmek için CLI kullanın.
- \`markdown/\`: Her hafta ve her sınıf için üretilmiş Markdown çıktıları (\`M1-01.md\` ... \`M6-03.md\`).
- \`manifest.json\`: Tüm yedeklenen dosyaların SHA-256 sağlama (checksum) kayıtları.

---

## 🔄 Geri Yükleme (Restore) Seçenekleri

### 1. Tüm Haftaları CLI ile Geri Yükleme
\`\`\`bash
bun run curriculum restore --dir "${targetDir}"
\`\`\`

### 2. Sadece Belirli Bir Haftayı Geri Yükleme (Örn: Hafta 1 veya Hafta 2)
\`\`\`bash
bun run curriculum restore --dir "${targetDir}" --week 1
bun run curriculum restore --dir "${targetDir}" --week 2
bun run curriculum restore --dir "${targetDir}" --week 3
\`\`\`

### 3. Değişiklikleri Uygulamadan Önce Simüle Etme (--dry-run)
\`\`\`bash
bun run curriculum restore --dir "${targetDir}" --dry-run
bun run curriculum restore --dir "${targetDir}" --week 1 --dry-run
\`\`\`

### 4. SQL Betiği ile Doğrudan PostgreSQL'e Geri Yükleme
\`\`\`bash
# Bun ile:
bun -e 'import { execute } from "./src/lib/db"; const sql = await Bun.file("${join(targetDir, "database/restore.sql")}").text(); await execute(sql);'

# Veya psql ile:
psql "$DATABASE_URL" -f "${join(targetDir, "database/restore.sql")}"
\`\`\`
`;
  await writeTrackedFile("README.md", readmeContent);

  // 7. Write manifest.json
  const manifest: BackupManifest = {
    version: 1,
    timestamp,
    outDir: targetDir,
    weeks: detectedWeeks,
    counts: {
      curriculumEntriesWeekly: weeklyEntries.length,
      curriculumEntriesAll: allEntries.length,
      curriculumEditorContent: editorContent.length,
      curriculumSeedExclusions: seedExclusions.length,
    },
    files: manifestFiles,
  };

  await writeFile(join(targetDir, "manifest.json"), JSON.stringify(manifest, null, 2), {
    encoding: "utf-8",
    mode: 0o600,
  });

  // 8. Update symlink / canonical pointer: backups/curriculum-backup-latest
  try {
    await mkdir(baseBackupsDir, { recursive: true, mode: 0o700 });
    if (!options?.outDir || targetDir.startsWith(baseBackupsDir)) {
      await writeFile(
        join(baseBackupsDir, "curriculum-backup-latest.json"),
        JSON.stringify({ latestDir: targetDir, timestamp }, null, 2),
        { encoding: "utf-8", mode: 0o600 }
      );
    }
  } catch {
    // Ignore symlink/pointer errors if file system does not support
  }

  console.log(`\n✅ YEDEKLEME BAŞARIYLA TAMAMLANDI!`);
  console.log(`📍 Dizin: ${targetDir}`);
  console.log(`📄 Toplam yedeklenen dosya: ${manifestFiles.length + 1}`);
  console.log(`📋 Manifest: ${join(targetDir, "manifest.json")}`);

  return { backupDir: targetDir, manifest };
}

export async function restoreCurriculumBackup(options: {
  backupDir?: string;
  weekNumber?: number;
  dryRun?: boolean;
}): Promise<{ restoredWeeks: number[]; entriesCount: number; editorCount: number }> {
  const baseBackupsDir = resolve(process.cwd(), "backups");
  let targetDir = options.backupDir ? resolve(options.backupDir) : "";

  if (!targetDir) {
    const pointerFile = Bun.file(join(baseBackupsDir, "curriculum-backup-latest.json"));
    if (await pointerFile.exists()) {
      try {
        const ptr = await pointerFile.json();
        if (ptr?.latestDir) {
          const testManifest = Bun.file(join(ptr.latestDir, "manifest.json"));
          if (await testManifest.exists()) {
            targetDir = ptr.latestDir;
          }
        }
      } catch {
        // ignore
      }
    }
  }

  if (!targetDir) {
    // Find latest backup folder by timestamp that has a valid manifest
    const entries = await readdir(baseBackupsDir).catch(() => [] as string[]);
    const backupDirs = entries
      .filter((name) => name.startsWith("curriculum-backup-20"))
      .sort()
      .reverse();
    for (const dirName of backupDirs) {
      const candidateDir = join(baseBackupsDir, dirName);
      const manifestFile = Bun.file(join(candidateDir, "manifest.json"));
      if (await manifestFile.exists()) {
        targetDir = candidateDir;
        break;
      }
    }
  }

  if (!targetDir) {
    throw new Error(
      `Geri yüklenecek yedek dizini bulunamadı. Lütfen --dir <dizin> parametresini belirtin.`
    );
  }

  const manifestPath = join(targetDir, "manifest.json");
  const manifestFile = Bun.file(manifestPath);
  if (!(await manifestFile.exists())) {
    throw new Error(`Yedek dizininde manifest.json bulunamadı: ${manifestPath}`);
  }

  const manifest: BackupManifest = await manifestFile.json();
  if (
    manifest.version !== 1 ||
    !Array.isArray(manifest.files) ||
    !Array.isArray(manifest.weeks) ||
    manifest.weeks.some((week) => !Number.isInteger(week) || week < 1 || week > 36)
  ) {
    throw new Error("Geçersiz müfredat yedek manifesti.");
  }
  const weekNum = options.weekNumber;
  const isDryRun = Boolean(options.dryRun);

  console.log(`\n🔄 Müfredat Geri Yükleme (Restore)`);
  console.log(`📁 Kaynak dizin: ${targetDir}`);
  console.log(`🕒 Yedek zamanı: ${manifest.timestamp}`);
  if (isDryRun) {
    console.log(`⚠️ MOD: DRY RUN (Veritabanında değişiklik yapılmayacak)\n`);
  } else {
    console.log(`⚡ MOD: CANLI GERİ YÜKLEME\n`);
  }

  const targetWeeks = weekNum ? [weekNum] : manifest.weeks;
  if (weekNum && !manifest.weeks.includes(weekNum)) {
    throw new Error(
      `Hafta ${weekNum} bu yedekte mevcut değil. Yedekteki haftalar: ${manifest.weeks.join(", ")}`
    );
  }

  async function readSnapshotFile<T>(relativePath: string): Promise<T[]> {
    const tracked = manifest.files.find((file) => file.relativePath === relativePath);
    const file = Bun.file(join(targetDir, relativePath));
    if (!tracked || !(await file.exists())) throw new Error(`Yedek dosyası eksik: ${relativePath}`);
    const bytes = Buffer.from(await file.arrayBuffer());
    if (bytes.length !== tracked.bytes || computeSha256(bytes) !== tracked.sha256)
      throw new Error(`Yedek dosyası bütünlük kontrolünü geçemedi: ${relativePath}`);
    const rows: unknown = JSON.parse(bytes.toString("utf-8"));
    if (!Array.isArray(rows)) throw new Error(`Geçersiz yedek dosyası: ${relativePath}`);
    return rows as T[];
  }

  const [allWeeklyEntries, allEditorContent, allExclusions] = await Promise.all([
    readSnapshotFile<CurriculumEntryRow>("database/curriculum_entries_weekly.json"),
    readSnapshotFile<EditorContentRow>("database/curriculum_editor_content.json"),
    readSnapshotFile<SeedExclusionRow>("database/curriculum_seed_exclusions.json"),
  ]);

  const slots = [...new Set(targetWeeks)].map(weekNumberToSlot);
  const periods = new Set(slots.map(({ month, week }) => `${month}-${week}`));
  const entriesToRestore = allWeeklyEntries.filter(
    (entry) =>
      isWeeklyCategory(entry.categoryId) &&
      !entry.isExtra &&
      periods.has(`${entry.month}-${entry.week}`)
  );
  const editorToRestore = allEditorContent.filter(({ slot }) =>
    periods.has(standardEditorWeek(slot) ?? "")
  );
  const totalEntriesToRestore = entriesToRestore.length;
  const totalEditorToRestore = editorToRestore.length;

  console.log(`📋 Planlanan geri yükleme özeti:`);
  console.log(` - Hedef haftalar: ${targetWeeks.map((w) => `Hafta ${w}`).join(", ") || "Yok"}`);
  console.log(` - curriculum_entries: ${totalEntriesToRestore} kayıt`);
  console.log(` - curriculum_editor_content: ${totalEditorToRestore} kayıt`);

  if (isDryRun) {
    console.log(`\n✅ Dry run simülasyonu tamamlandı. Veritabanına hiçbir işlem yazılmadı.`);
    return {
      restoredWeeks: targetWeeks,
      entriesCount: totalEntriesToRestore,
      editorCount: totalEditorToRestore,
    };
  }

  if (slots.length > 0) {
    await ensureCurriculumEntriesTable();
    await transaction(async () => {
      await lockCurriculumCategories(WEEKLY_CONTENT_CATEGORIES);
      await withSeedExclusionsSuspended(WEEKLY_CONTENT_CATEGORIES, async () => {
        for (const { month, week } of slots) {
          await execute(
            `DELETE FROM "curriculum_entries" WHERE "month" = $1 AND "week" = $2 AND "isExtra" = 0
             AND "categoryId" IN ($3, $4)`,
            [month, week, ...WEEKLY_CONTENT_CATEGORIES]
          );
        }
        const written = await upsertCurriculumEntryRows(entriesToRestore, "ignore");
        if (written !== entriesToRestore.length)
          throw new Error("Yedek kayıtlarının tamamı yazılamadı.");

        const restoredSlots = new Set(editorToRestore.map((row) => row.slot));
        const currentEditor = await query<Pick<EditorContentRow, "slot">>(
          'SELECT "slot" FROM "curriculum_editor_content"'
        );
        for (const { slot } of currentEditor) {
          if (periods.has(standardEditorWeek(slot) ?? "") && !restoredSlots.has(slot)) {
            await execute('DELETE FROM "curriculum_editor_content" WHERE "slot" = $1', [slot]);
          }
        }
        const restoredAt = new Date().toISOString();
        for (const row of editorToRestore) {
          await execute(
            `INSERT INTO "curriculum_editor_content" ("slot", "grade", "entryId", "entry", "revision", "updatedAt")
             VALUES ($1, $2, $3, $4, $5, $6)
             ON CONFLICT ("slot") DO UPDATE SET "entryId" = EXCLUDED."entryId", "entry" = EXCLUDED."entry",
               "revision" = CASE WHEN "curriculum_editor_content"."revision" >= EXCLUDED."revision"
                 THEN "curriculum_editor_content"."revision" + 1 ELSE EXCLUDED."revision" END,
               "updatedAt" = EXCLUDED."updatedAt"`,
            [row.slot, row.grade, row.entryId, row.entry, row.revision + 1, restoredAt]
          );
        }
      });
      if (weekNum === undefined) {
        await saveSeedExclusions(
          allExclusions.filter(({ categoryId }) => isWeeklyCategory(categoryId))
        );
      }
    });
  }

  console.log(`\n🎉 Geri yükleme başarıyla TAMAMLANDI!`);
  console.log(` - Geri yüklenen haftalar: ${targetWeeks.join(", ")}`);
  console.log(` - curriculum_entries satır sayısı: ${totalEntriesToRestore}`);
  console.log(` - curriculum_editor_content satır sayısı: ${totalEditorToRestore}\n`);

  return {
    restoredWeeks: targetWeeks,
    entriesCount: totalEntriesToRestore,
    editorCount: totalEditorToRestore,
  };
}
