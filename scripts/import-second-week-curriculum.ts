import { mkdir } from "node:fs/promises";
import { join } from "node:path";
import { format, resolveConfig } from "prettier";
import { getSecondWeekCurriculumEntries } from "../src/lib/data/second-week-curriculum";
import { closeDatabase, getPool, isPostgres } from "../src/lib/db";

const entries = getSecondWeekCurriculumEntries();
const categories = [...new Set(entries.map((entry) => entry.categoryId))];
const ids = entries.map((entry) => entry.id);
if (
  entries.length !== 36 ||
  new Set(ids).size !== 36 ||
  categories.length !== 6 ||
  entries.some(
    (entry) =>
      entry.month !== 9 ||
      entry.week !== 2 ||
      entry.year !== 2026 ||
      entry.isExtra ||
      entry.id !== `g${entry.grade}-${entry.categoryId}-eylul-2`
  ) ||
  Array.from({ length: 6 }, (_, n) => n + 1).some(
    (grade) => entries.filter((entry) => entry.grade === grade).length !== 6
  )
)
  throw new Error(
    "Import must contain exactly six categories for each of the six grades, September week two only."
  );

const outputDir = join(process.cwd(), "mufredat-docs/icerikler/ikinci-hafta");
await mkdir(outputDir, { recursive: true });
const prettierConfig = await resolveConfig(join(outputDir, "M1-02.md"));
for (let grade = 1; grade <= 6; grade++) {
  await Bun.write(
    join(outputDir, `M${grade}-02.md`),
    await format(
      entries
        .filter((entry) => entry.grade === grade)
        .map((entry) => entry.body)
        .join("\n\n---\n\n") + "\n",
      { ...prettierConfig, parser: "markdown" }
    )
  );
}

if (process.argv.includes("--export-only")) {
  console.log(`Exported ${entries.length} second-week entries to ${outputDir}.`);
} else {
  const pool = getPool();
  if (!isPostgres || !pool)
    throw new Error("This import requires the configured persistent PostgreSQL database.");
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query("SELECT pg_advisory_xact_lock(2026092701)");
    const outsideSql = `SELECT count(*)::int AS count,
      md5(COALESCE(string_agg(row_to_json(e)::text, '' ORDER BY "id"), '')) AS digest
      FROM "curriculum_entries" e WHERE NOT ("id" = ANY($1::text[]))`;
    const progressSql = `SELECT count(*)::int AS count,
      md5(COALESCE(string_agg(row_to_json(p)::text, '' ORDER BY "userId", "entryId"), '')) AS digest
      FROM "curriculum_progress" p`;
    const exclusionsSql = `SELECT count(*)::int AS count,
      md5(COALESCE(string_agg(row_to_json(s)::text, '' ORDER BY "categoryId"), '')) AS digest
      FROM "curriculum_seed_exclusions" s`;
    const before = (await client.query(outsideSql, [ids])).rows[0];
    const progressBefore = (await client.query(progressSql)).rows[0];
    const exclusionsBefore = (await client.query(exclusionsSql)).rows[0];
    const existing = await client.query(
      `SELECT "id", "grade", "categoryId", "month", "week", "year", "isExtra" FROM "curriculum_entries" WHERE "id" = ANY($1::text[]) FOR UPDATE`,
      [ids]
    );
    for (const row of existing.rows) {
      const expected = entries.find((entry) => entry.id === row.id)!;
      if (
        row.grade !== expected.grade ||
        row.categoryId !== expected.categoryId ||
        row.month !== 9 ||
        row.week !== 2 ||
        row.year !== 2026 ||
        row.isExtra
      ) {
        throw new Error(`Existing ID belongs to a different curriculum slot: ${row.id}`);
      }
    }
    // Temporarily bypass the intentional seed guard inside this transaction only.
    // Other connections never see the exclusions removed; restore the exact rows before commit.
    const exclusions = await client.query(
      'DELETE FROM "curriculum_seed_exclusions" WHERE "categoryId" = ANY($1::text[]) RETURNING *',
      [categories]
    );
    for (const entry of entries) {
      const result = await client.query(
        `INSERT INTO "curriculum_entries"
        ("id", "grade", "categoryId", "gender", "month", "week", "year", "isExtra", "extraOrder", "title", "body", "resourceUrl", "pdfUrl", "pageCount", "createdAt", "updatedAt")
        VALUES ($1,$2,$3,NULL,$4,$5,$6,0,NULL,$7,$8,$9,NULL,NULL,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
        ON CONFLICT ("id") DO UPDATE SET "title" = EXCLUDED."title", "body" = EXCLUDED."body", "resourceUrl" = EXCLUDED."resourceUrl", "updatedAt" = CURRENT_TIMESTAMP
        RETURNING "id", "body"`,
        [
          entry.id,
          entry.grade,
          entry.categoryId,
          entry.month,
          entry.week,
          entry.year,
          entry.title,
          entry.body,
          entry.resourceUrl ?? null,
        ]
      );
      if (result.rowCount !== 1 || result.rows[0].body !== entry.body)
        throw new Error(`Import verification failed: ${entry.id}`);
    }
    for (const original of exclusions.rows) {
      await client.query(
        'INSERT INTO "curriculum_seed_exclusions" ("categoryId", "createdAt") VALUES ($1,$2)',
        [original.categoryId, original.createdAt]
      );
    }
    const after = (await client.query(outsideSql, [ids])).rows[0];
    const progressAfter = (await client.query(progressSql)).rows[0];
    const exclusionsAfter = (await client.query(exclusionsSql)).rows[0];
    for (const [name, initial, final] of [
      ["other entries", before, after],
      ["completion progress", progressBefore, progressAfter],
      ["seed exclusions", exclusionsBefore, exclusionsAfter],
    ] as const) {
      if (initial.count !== final.count || initial.digest !== final.digest)
        throw new Error(`Preservation verification failed: ${name}`);
    }
    const saved = await client.query(
      'SELECT "grade", count(*)::int AS entries FROM "curriculum_entries" WHERE "id" = ANY($1::text[]) GROUP BY "grade" ORDER BY "grade"',
      [ids]
    );
    if (saved.rows.length !== 6 || saved.rows.some((row) => row.entries !== 6))
      throw new Error("Saved entry count does not match the import.");
    await client.query("COMMIT");
    console.log(
      `Saved and verified 36 second-week entries; preserved ${before.count} other entries, ${progressBefore.count} progress records, and all seed exclusions.`
    );
    console.table(saved.rows);
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
    await closeDatabase();
  }
}
