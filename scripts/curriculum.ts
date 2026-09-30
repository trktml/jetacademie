#!/usr/bin/env bun
import { mkdir } from "node:fs/promises";
import { join } from "node:path";
import { format, resolveConfig } from "prettier";
import {
  getCurriculumEntriesFromDb,
  getCurriculumWeekSummaries,
  publishCurriculumWeek,
  deleteCurriculumWeek,
} from "../src/lib/curriculum-db";
import { getPool, isPostgres, closeDatabase } from "../src/lib/db";
import {
  weekNumberToSlot,
  weeklyPackageSchema,
  WEEKLY_CONTENT_CATEGORIES,
  type WeeklyPackage,
} from "../src/lib/validations/curriculum-entry";

function printHelp() {
  console.log(`
JetAcademie Merkezi Müfredat Yönetim Aracı (curriculum CLI)

KULLANIM:
  bun scripts/curriculum.ts <komut> [seçenekler]

KOMUTLAR:
  list                          36 haftanın durumunu (boş, taslak, yayında) listeler
  save --week <N> [seçenekler]   Haftalık 36 kaydı doğrular ve veritabanına taslak olarak kaydeder
  publish --week <N>            Belirtilen haftanın taslak kayıtlarını yayına alır (isDraft = 0)
  export --week <N> [seçenekler] Belirtilen haftanın kayıtlarını Markdown olarak dışa aktarır
  delete --week <N>             Belirtilen haftanın içerik kayıtlarını siler (adab, ilmihal, esma hariç)

SEÇENEKLER (save):
  --week, -w <1-36>             Hafta numarası (zorunlu)
  --file, -f <dosya>            Girdi JSON dosyası yolu (varsayılan: stdin)
  --publish                     Taslak yerine doğrudan yayında statüsünde kaydeder

SEÇENEKLER (export):
  --week, -w <1-36>             Hafta numarası
  --out, -o <dizin>             Çıktı dizini (varsayılan: mufredat-docs/export/hafta-XX)

ÖRNEKLER:
  bun scripts/curriculum.ts list
  bun scripts/curriculum.ts save --week 3 --file hafta-3.json
  bun scripts/curriculum.ts publish --week 3
  bun scripts/curriculum.ts export --week 3
  bun scripts/curriculum.ts delete --week 3
`);
}

export function parseArgs(args: string[]) {
  if (args.length === 0 || args[0] === "--help" || args[0] === "-h" || args[0] === "help") {
    return { command: "help", options: { help: true } };
  }

  let command = "";
  let startIndex = 0;

  if (!args[0].startsWith("-")) {
    command = args[0];
    startIndex = 1;
  }

  const options: Record<string, string | boolean> = {};

  for (let i = startIndex; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--help" || arg === "-h") {
      options.help = true;
    } else if (arg === "--publish") {
      options.publish = true;
    } else if (arg === "--stdin") {
      options.stdin = true;
    } else if (arg.startsWith("--")) {
      const key = arg.slice(2);
      const next = args[i + 1];
      if (next && !next.startsWith("-")) {
        options[key] = next;
        i++;
      } else {
        options[key] = true;
      }
    } else if (arg.startsWith("-")) {
      const key = arg.slice(1);
      const next = args[i + 1];
      if (next && !next.startsWith("-")) {
        options[key] = next;
        i++;
      } else {
        options[key] = true;
      }
    }
  }

  return { command, options };
}

async function handleList() {
  const summaries = await getCurriculumWeekSummaries();
  console.log("\n📚 JETACADEMIE 36 HAFTALIK MÜFREDAT DURUM RAPORU\n");
  console.log("┌───────┬────────────┬──────┬──────────────┬────────┬─────────┬──────────────┐");
  console.log("│ Hafta │ Slot       │ Yıl  │ Toplam Kayıt │ Taslak │ Yayında │ Durum        │");
  console.log("├───────┼────────────┼──────┼──────────────┼────────┼─────────┼──────────────┤");

  for (const s of summaries) {
    const wPad = String(s.weekNumber).padStart(2, " ");
    const slotStr = `${s.monthSlug}-${s.week}`.padEnd(10, " ");
    const yearStr = String(s.year).padEnd(4, " ");
    const totalStr = String(s.totalEntries).padStart(12, " ");
    const draftStr = String(s.draftEntries).padStart(6, " ");
    const pubStr = String(s.publishedEntries).padStart(7, " ");

    let statusLabel = "Boş         ";
    if (s.status === "published") statusLabel = "🟢 Yayında   ";
    else if (s.status === "draft") statusLabel = "🟡 Taslak    ";
    else if (s.status === "mixed") statusLabel = "🟠 Kısmi     ";

    console.log(
      `│ ${wPad}    │ ${slotStr} │ ${yearStr} │ ${totalStr} │ ${draftStr} │ ${pubStr} │ ${statusLabel} │`
    );
  }

  console.log("└───────┴────────────┴──────┴──────────────┴────────┴─────────┴──────────────┘\n");
}

async function handleSave(options: Record<string, string | boolean>) {
  const weekVal = options.week || options.w;
  if (!weekVal || typeof weekVal !== "string") {
    throw new Error("Lütfen hafta numarasını belirtin: --week <1-36>");
  }
  const weekNumber = Number(weekVal);
  if (!Number.isInteger(weekNumber) || weekNumber < 1 || weekNumber > 36) {
    throw new Error(`Geçersiz hafta numarası: ${weekVal}. 1 ile 36 arasında olmalıdır.`);
  }

  let rawJson = "";
  const filePath = (options.file || options.f) as string | undefined;

  if (filePath) {
    const file = Bun.file(filePath);
    if (!(await file.exists())) {
      throw new Error(`Girdi dosyası bulunamadı: ${filePath}`);
    }
    rawJson = await file.text();
  } else {
    // Read from stdin
    console.log("JSON girdisi stdin üzerinden okunuyor...");
    rawJson = await Bun.stdin.text();
  }

  if (!rawJson.trim()) {
    throw new Error("Girdi verisi boş.");
  }

  const parsed = JSON.parse(rawJson);
  const validated = weeklyPackageSchema.safeParse(parsed);

  if (!validated.success) {
    console.error("\n❌ Şema doğrulama hataları:");
    for (const issue of validated.error.issues) {
      console.error(` - [${issue.path.join(".")}] ${issue.message}`);
    }
    throw new Error("Haftalık paket doğrulamadan geçemedi.");
  }

  const pkg: WeeklyPackage = validated.data;
  if (pkg.weekNumber !== weekNumber) {
    throw new Error(
      `Girdi paketindeki hafta numarası (${pkg.weekNumber}) argüman ile (${weekNumber}) uyuşmuyor.`
    );
  }

  const shouldPublish = Boolean(options.publish);
  const isDraftVal = !shouldPublish;

  console.log(
    `\n⏳ Hafta ${weekNumber} için 36 kayıt veritabanına aktarılıyor (isDraft: ${isDraftVal})...`
  );

  const pool = getPool();
  if (isPostgres && pool) {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      // Temporarily bypass the seed guard trigger inside this transaction
      const exclusions = await client.query(
        'DELETE FROM "curriculum_seed_exclusions" WHERE "categoryId" = ANY($1::text[]) RETURNING *',
        [[...WEEKLY_CONTENT_CATEGORIES]]
      );

      for (const entry of pkg.entries) {
        await client.query(
          `INSERT INTO "curriculum_entries" (
            "id", "grade", "categoryId", "gender", "month", "week", "year",
            "isExtra", "extraOrder", "isDraft", "title", "body", "resourceUrl",
            "pdfUrl", "pageCount", "createdAt", "updatedAt"
          ) VALUES ($1,$2,$3,NULL,$4,$5,$6,0,NULL,$7,$8,$9,$10,NULL,NULL,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
          ON CONFLICT ("id") DO UPDATE SET
            "title" = EXCLUDED."title",
            "body" = EXCLUDED."body",
            "resourceUrl" = EXCLUDED."resourceUrl",
            "isDraft" = EXCLUDED."isDraft",
            "updatedAt" = CURRENT_TIMESTAMP`,
          [
            entry.id,
            entry.grade,
            entry.categoryId,
            entry.month,
            entry.week,
            entry.year,
            isDraftVal ? 1 : 0,
            entry.title,
            entry.body,
            entry.resourceUrl ?? null,
          ]
        );
      }

      // Restore exclusions
      for (const row of exclusions.rows) {
        await client.query(
          `INSERT INTO "curriculum_seed_exclusions" ("categoryId", "createdAt")
           VALUES ($1, $2)
           ON CONFLICT ("categoryId") DO NOTHING`,
          [row.categoryId, row.createdAt]
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
    // In-memory test SQLite fallback
    const { bulkUpsertCurriculumEntries } = await import("../src/lib/curriculum-db");
    const now = new Date().toISOString();
    await bulkUpsertCurriculumEntries(
      pkg.entries.map((e) => ({
        id: e.id,
        grade: e.grade,
        categoryId: e.categoryId,
        gender: null,
        month: e.month,
        week: e.week,
        year: e.year,
        isExtra: 0,
        extraOrder: null,
        isDraft: isDraftVal ? 1 : 0,
        title: e.title,
        body: e.body,
        resourceUrl: e.resourceUrl ?? null,
        pdfUrl: null,
        pageCount: null,
        createdAt: now,
        updatedAt: now,
      }))
    );
  }

  console.log(
    `✅ Hafta ${weekNumber} başarıyla kaydedildi! (36 kayıt, Statü: ${isDraftVal ? "Taslak" : "Yayında"})\n`
  );
}

async function handlePublish(options: Record<string, string | boolean>) {
  const weekVal = options.week || options.w;
  if (!weekVal || typeof weekVal !== "string") {
    throw new Error("Lütfen yayınlanacak hafta numarasını belirtin: --week <1-36>");
  }
  const weekNumber = Number(weekVal);
  if (!Number.isInteger(weekNumber) || weekNumber < 1 || weekNumber > 36) {
    throw new Error(`Geçersiz hafta numarası: ${weekVal}. 1 ile 36 arasında olmalıdır.`);
  }

  const slot = weekNumberToSlot(weekNumber);
  const result = await publishCurriculumWeek(slot.month, slot.week);

  if (result.updatedCount === 0) {
    console.log(
      `ℹ️ Hafta ${weekNumber} (${slot.monthSlug}-${slot.week}) için yayına alınacak taslak kayıt bulunamadı.`
    );
  } else {
    console.log(
      `🎉 Hafta ${weekNumber} (${slot.monthSlug}-${slot.week}) başarıyla YAYINA ALINDI! (${result.updatedCount} kayıt)`
    );
  }
}

async function handleExport(options: Record<string, string | boolean>) {
  const weekVal = options.week || options.w;
  if (!weekVal || typeof weekVal !== "string") {
    throw new Error("Lütfen dışa aktarılacak hafta numarasını belirtin: --week <1-36>");
  }
  const weekNumber = Number(weekVal);
  if (!Number.isInteger(weekNumber) || weekNumber < 1 || weekNumber > 36) {
    throw new Error(`Geçersiz hafta numarası: ${weekVal}. 1 ile 36 arasında olmalıdır.`);
  }

  const slot = weekNumberToSlot(weekNumber);
  const weekPad = String(weekNumber).padStart(2, "0");
  const outDir =
    (options.out as string) ||
    (options.o as string) ||
    join(process.cwd(), `mufredat-docs/export/hafta-${weekPad}`);

  await mkdir(outDir, { recursive: true });
  const prettierConfig = await resolveConfig(join(outDir, "M1.md"));

  for (let grade = 1; grade <= 6; grade++) {
    const gradeEntries = await getCurriculumEntriesFromDb(grade, undefined, true);
    const weekEntries = gradeEntries.filter(
      (e) => e.month === slot.month && e.week === slot.week && !e.isExtra
    );

    if (weekEntries.length === 0) {
      console.warn(`⚠️ ${grade}. sınıf için Hafta ${weekNumber} kaydı bulunamadı.`);
      continue;
    }

    const content =
      weekEntries.map((entry) => entry.body ?? `# ${entry.title}`).join("\n\n---\n\n") + "\n";

    const formatted = await format(content, { ...prettierConfig, parser: "markdown" });
    const targetFile = join(outDir, `M${grade}-${weekPad}.md`);
    await Bun.write(targetFile, formatted);
    console.log(`📄 Dışa aktarıldı: ${targetFile}`);
  }

  console.log(`\n✅ Hafta ${weekNumber} Markdown dosyaları başarıyla dışa aktarıldı: ${outDir}\n`);
}

async function handleDelete(options: Record<string, string | boolean>) {
  const weekVal = options.week || options.w;
  if (!weekVal || typeof weekVal !== "string") {
    throw new Error("Lütfen silinecek hafta numarasını belirtin: --week <1-36>");
  }
  const weekNumber = Number(weekVal);
  if (!Number.isInteger(weekNumber) || weekNumber < 1 || weekNumber > 36) {
    throw new Error(`Geçersiz hafta numarası: ${weekVal}. 1 ile 36 arasında olmalıdır.`);
  }

  const slot = weekNumberToSlot(weekNumber);
  const result = await deleteCurriculumWeek(slot.month, slot.week);

  console.log(
    `🗑️ Hafta ${weekNumber} (${slot.monthSlug}-${slot.week}) için ${result.deletedCount} kayıt silindi (adab, ilmihal ve esma korundu).`
  );
}

async function main() {
  const args = process.argv.slice(2);
  const { command, options } = parseArgs(args);

  if (!command || options.help || command === "help") {
    printHelp();
    return;
  }

  try {
    switch (command) {
      case "list":
        await handleList();
        break;
      case "save":
        await handleSave(options);
        break;
      case "publish":
        await handlePublish(options);
        break;
      case "export":
        await handleExport(options);
        break;
      case "delete":
        await handleDelete(options);
        break;
      default:
        console.error(`Bilinmeyen komut: '${command}'`);
        printHelp();
        process.exit(1);
    }
  } catch (error) {
    console.error(`\n❌ Hata: ${error instanceof Error ? error.message : String(error)}\n`);
    process.exit(1);
  } finally {
    await closeDatabase();
  }
}

if (import.meta.main) {
  await main();
}
