import { mkdir, writeFile, readdir, rm } from "node:fs/promises";
import { join, resolve } from "node:path";
import { createHash } from "node:crypto";
import { format, resolveConfig } from "prettier";
import { getPool, isPostgres, query } from "../src/lib/db";
import {
  ensureCurriculumEntriesTable,
  getCurriculumEntriesFromDb,
  type CurriculumEntryRow,
} from "../src/lib/curriculum-db";
import { ensureEditorSchema } from "../src/lib/editor/schema";
import {
  weekNumberToSlot,
  WEEKLY_CONTENT_CATEGORIES,
} from "../src/lib/validations/curriculum-entry";

export interface EditorContentRow {
  slot: string;
  grade: number;
  entryId: string;
  entry: string;
  revision: number;
  updatedAt: string;
}

export interface SeedExclusionRow {
  categoryId: string;
  createdAt: string;
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

  await mkdir(weeksDir, { recursive: true });
  await mkdir(dbDir, { recursive: true });
  await mkdir(mdDir, { recursive: true });

  console.log(`📦 Müfredat yedeği başlatılıyor...`);
  console.log(`📁 Hedef dizin: ${targetDir}`);

  await ensureCurriculumEntriesTable();
  await ensureEditorSchema();

  // 1. Fetch tables
  console.log(`🔍 Veritabanı tabloları sorgulanıyor...`);

  const categoryPlaceholders = WEEKLY_CONTENT_CATEGORIES.map((_, i) => `$${i + 1}`).join(", ");
  const weeklyEntries = await query<CurriculumEntryRow>(
    `SELECT * FROM "curriculum_entries"
     WHERE "categoryId" IN (${categoryPlaceholders})
     ORDER BY "month", "week", "grade", "categoryId"`,
    [...WEEKLY_CONTENT_CATEGORIES]
  );

  const allEntries = await query<CurriculumEntryRow>(
    `SELECT * FROM "curriculum_entries"
     ORDER BY "categoryId", "grade", "month", "week"`
  );

  const editorContent = await query<EditorContentRow>(
    `SELECT * FROM "curriculum_editor_content"
     ORDER BY "slot"`
  );

  const seedExclusions = await query<SeedExclusionRow>(
    `SELECT * FROM "curriculum_seed_exclusions"
     ORDER BY "categoryId"`
  );

  const manifestFiles: BackupManifest["files"] = [];

  async function writeTrackedFile(relativePath: string, content: string) {
    const fullPath = join(targetDir, relativePath);
    await writeFile(fullPath, content, "utf-8");
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
  for (const entry of weeklyEntries) {
    if (entry.month && entry.week) {
      // Find week number 1-36
      const monthIdx = entry.month >= 9 ? entry.month - 9 : entry.month + 3;
      const wNum = monthIdx * 4 + entry.week;
      if (wNum >= 1 && wNum <= 36) {
        weekSet.add(wNum);
      }
    }
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
    const weekEditorEntries = editorContent.filter((e) =>
      e.slot.endsWith(`:${slot.month}-${slot.week}`)
    );

    // Also get merged/effective entries as served to UI
    const effectiveEntries = [];
    for (let grade = 1; grade <= 6; grade++) {
      const gradeEntries = await getCurriculumEntriesFromDb(grade, undefined, true);
      const matches = gradeEntries.filter(
        (e) =>
          e.month === slot.month &&
          e.week === slot.week &&
          !e.isExtra &&
          (e.categoryId === "konu" || e.categoryId === "hocaefendi-dinleme")
      );
      effectiveEntries.push(...matches);
    }

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
    await mkdir(weekMdDir, { recursive: true });

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
    `-- Total Editor Overrides: ${editorContent.length}`,
    `-- ==============================================================================`,
    `BEGIN;`,
    ``,
    `-- Temporarily bypass seed exclusion guard trigger for weekly content`,
    `DELETE FROM "curriculum_seed_exclusions"`,
    `WHERE "categoryId" IN ('konu', 'hocaefendi-dinleme');`,
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
  for (const ed of editorContent) {
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
      `  "entry" = EXCLUDED."entry",`,
      `  "revision" = EXCLUDED."revision",`,
      `  "updatedAt" = EXCLUDED."updatedAt";`,
      ``
    );
  }

  sqlLines.push(`-- 3. Restore seed exclusions`);
  for (const ex of seedExclusions) {
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
  - \`curriculum_entries_all.json\`: Tüm 1392 müfredat kaydının tam güvenlik kopyası.
  - \`curriculum_seed_exclusions.json\`: Kategori tohumlama muafiyetleri.
  - \`restore.sql\`: PostgreSQL üzerinde tek adımda çalıştırılabilir transaction korumalı SQL betiği.
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

  await writeFile(join(targetDir, "manifest.json"), JSON.stringify(manifest, null, 2), "utf-8");

  // 8. Update symlink / canonical pointer: backups/curriculum-backup-latest
  const latestLink = join(baseBackupsDir, "curriculum-backup-latest");
  try {
    await rm(latestLink, { recursive: true, force: true });
    await mkdir(baseBackupsDir, { recursive: true });
    if (!options?.outDir || targetDir.startsWith(baseBackupsDir)) {
      await writeFile(
        join(baseBackupsDir, "curriculum-backup-latest.json"),
        JSON.stringify({ latestDir: targetDir, timestamp }, null, 2),
        "utf-8"
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

  let totalEntriesToRestore = 0;
  let totalEditorToRestore = 0;

  // Read files to restore
  const weeklyEntriesFile = Bun.file(join(targetDir, "database/curriculum_entries_weekly.json"));
  const editorContentFile = Bun.file(join(targetDir, "database/curriculum_editor_content.json"));
  const exclusionsFile = Bun.file(join(targetDir, "database/curriculum_seed_exclusions.json"));

  if (
    !(await weeklyEntriesFile.exists()) ||
    !(await editorContentFile.exists()) ||
    !(await exclusionsFile.exists())
  ) {
    throw new Error(`Yedek dosyaları eksik. Dizin: ${targetDir}`);
  }

  const allWeeklyEntries: CurriculumEntryRow[] = await weeklyEntriesFile.json();
  const allEditorContent: EditorContentRow[] = await editorContentFile.json();
  const allExclusions: SeedExclusionRow[] = await exclusionsFile.json();

  // Filter if specific week
  const entriesToRestore: CurriculumEntryRow[] = [];
  const editorToRestore: EditorContentRow[] = [];

  for (const w of targetWeeks) {
    const slot = weekNumberToSlot(w);
    const wEntries = allWeeklyEntries.filter((e) => e.month === slot.month && e.week === slot.week);
    const wEditor = allEditorContent.filter((e) => e.slot.endsWith(`:${slot.month}-${slot.week}`));
    entriesToRestore.push(...wEntries);
    editorToRestore.push(...wEditor);
  }

  totalEntriesToRestore = entriesToRestore.length;
  totalEditorToRestore = editorToRestore.length;

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

  await ensureCurriculumEntriesTable();
  await ensureEditorSchema();

  // Execute restore in database transaction
  const pool = getPool();
  if (isPostgres && pool) {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      // Temporarily bypass exclusion guard
      const catPlaceholders = WEEKLY_CONTENT_CATEGORIES.map((_, i) => `$${i + 1}`).join(", ");
      await client.query(
        `DELETE FROM "curriculum_seed_exclusions" WHERE "categoryId" IN (${catPlaceholders})`,
        [...WEEKLY_CONTENT_CATEGORIES]
      );

      for (const w of targetWeeks) {
        const slot = weekNumberToSlot(w);

        // Delete existing weekly records for this week
        const catPlaceholdersOffset = WEEKLY_CONTENT_CATEGORIES.map((_, i) => `$${i + 3}`).join(
          ", "
        );
        await client.query(
          `DELETE FROM "curriculum_entries"
           WHERE "month" = $1 AND "week" = $2 AND "categoryId" IN (${catPlaceholdersOffset})`,
          [slot.month, slot.week, ...WEEKLY_CONTENT_CATEGORIES]
        );

        // Delete editor overrides for this week slot
        await client.query(`DELETE FROM "curriculum_editor_content" WHERE "slot" LIKE $1`, [
          `%:${slot.month}-${slot.week}`,
        ]);
      }

      // Re-insert curriculum_entries
      for (const entry of entriesToRestore) {
        await client.query(
          `INSERT INTO "curriculum_entries" (
            "id", "grade", "categoryId", "gender", "month", "week", "year",
            "isExtra", "extraOrder", "isDraft", "title", "body", "resourceUrl",
            "pdfUrl", "pageCount", "createdAt", "updatedAt"
          ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)
          ON CONFLICT ("id") DO UPDATE SET
            "title" = EXCLUDED."title",
            "body" = EXCLUDED."body",
            "resourceUrl" = EXCLUDED."resourceUrl",
            "isDraft" = EXCLUDED."isDraft",
            "updatedAt" = EXCLUDED."updatedAt"`,
          [
            entry.id,
            entry.grade,
            entry.categoryId,
            entry.gender ?? null,
            entry.month,
            entry.week,
            entry.year,
            entry.isExtra ? 1 : 0,
            entry.extraOrder ?? null,
            entry.isDraft ? 1 : 0,
            entry.title,
            entry.body,
            entry.resourceUrl ?? null,
            entry.pdfUrl ?? null,
            entry.pageCount ?? null,
            entry.createdAt,
            entry.updatedAt,
          ]
        );
      }

      // Re-insert curriculum_editor_content
      for (const ed of editorToRestore) {
        await client.query(
          `INSERT INTO "curriculum_editor_content" (
            "slot", "grade", "entryId", "entry", "revision", "updatedAt"
          ) VALUES ($1,$2,$3,$4,$5,$6)
          ON CONFLICT ("slot") DO UPDATE SET
            "entry" = EXCLUDED."entry",
            "revision" = EXCLUDED."revision",
            "updatedAt" = EXCLUDED."updatedAt"`,
          [ed.slot, ed.grade, ed.entryId, ed.entry, ed.revision, ed.updatedAt]
        );
      }

      // Restore seed exclusions
      for (const ex of allExclusions) {
        await client.query(
          `INSERT INTO "curriculum_seed_exclusions" ("categoryId", "createdAt")
           VALUES ($1, $2)
           ON CONFLICT ("categoryId") DO NOTHING`,
          [ex.categoryId, ex.createdAt]
        );
      }

      await client.query("COMMIT");
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    } finally {
      client.release();
    }
  } else {
    // In-memory test fallback
    const { bulkUpsertCurriculumEntries } = await import("../src/lib/curriculum-db");
    await bulkUpsertCurriculumEntries(
      entriesToRestore.map((e) => ({
        ...e,
        isExtra: e.isExtra ? 1 : 0,
        isDraft: e.isDraft ? 1 : 0,
      }))
    );
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
