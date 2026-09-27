import { mkdir } from "node:fs/promises";
import { join } from "node:path";
import { format, resolveConfig } from "prettier";
import { getFirstWeekCurriculumEntries } from "../src/lib/data/first-week-curriculum";
import { closeDatabase, getPool, isPostgres } from "../src/lib/db";

const entries = getFirstWeekCurriculumEntries();
const outputDir = join(process.cwd(), "mufredat-docs/icerikler/ilk-hafta");
await mkdir(outputDir, { recursive: true });
const prettierConfig = await resolveConfig(join(outputDir, "M1-01.md"));
for (let grade = 1; grade <= 6; grade++) {
  const lessons = entries.filter((entry) => entry.grade === grade);
  await Bun.write(
    join(outputDir, `M${grade}-01.md`),
    await format(lessons.map((entry) => entry.body).join("\n\n---\n\n") + "\n", {
      ...prettierConfig,
      parser: "markdown",
    })
  );
}

if (process.argv.includes("--export-only")) {
  console.log(`Exported ${entries.length} entries to ${outputDir}.`);
} else {
  if (!isPostgres || !getPool()) {
    throw new Error("This import requires the configured persistent PostgreSQL database.");
  }
  const client = await getPool()!.connect();
  try {
    await client.query("BEGIN");
    await client.query("SELECT pg_advisory_xact_lock(2026092701)");
    const categories = [...new Set(entries.map((entry) => entry.categoryId))];
    // The existing guard blocks inserts into intentionally excluded categories.
    // Remove exclusions inside this transaction only, and restore them before commit.
    const exclusions = await client.query(
      'DELETE FROM "curriculum_seed_exclusions" WHERE "categoryId" = ANY($1::text[]) RETURNING *',
      [categories]
    );
    for (const entry of entries) {
      const result = await client.query(
        `INSERT INTO "curriculum_entries"
         ("id", "grade", "categoryId", "gender", "month", "week", "year", "isExtra", "extraOrder", "title", "body", "resourceUrl", "pdfUrl", "pageCount", "createdAt", "updatedAt")
         VALUES ($1,$2,$3,NULL,9,1,2026,0,NULL,$4,$5,$6,NULL,NULL,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
         ON CONFLICT ("id") DO UPDATE SET
         "title" = EXCLUDED."title", "body" = EXCLUDED."body", "resourceUrl" = EXCLUDED."resourceUrl", "updatedAt" = CURRENT_TIMESTAMP
         RETURNING "id", "body"`,
        [
          entry.id,
          entry.grade,
          entry.categoryId,
          entry.title,
          entry.body,
          entry.resourceUrl ?? null,
        ]
      );
      if (result.rowCount !== 1 || result.rows[0].body !== entry.body) {
        throw new Error(`Import verification failed: ${entry.id}`);
      }
    }
    // Keep later weeks empty on startup, even when the database is initially sparse.
    for (const categoryId of categories) {
      const original = exclusions.rows.find((row) => row.categoryId === categoryId);
      await client.query(
        `INSERT INTO "curriculum_seed_exclusions" ("categoryId", "createdAt") VALUES ($1,$2)
         ON CONFLICT ("categoryId") DO NOTHING`,
        [categoryId, original?.createdAt ?? new Date()]
      );
    }
    const saved = await client.query(
      `SELECT "grade", "categoryId", "id", length("body") AS "characters"
       FROM "curriculum_entries" WHERE "id" = ANY($1::text[]) ORDER BY "grade", "categoryId"`,
      [entries.map((entry) => entry.id)]
    );
    if (saved.rowCount !== entries.length)
      throw new Error("Saved entry count does not match the import.");
    await client.query("COMMIT");
    console.log(`Saved and verified ${saved.rowCount} first-week entries across six grades.`);
    console.table(saved.rows);
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
    await closeDatabase();
  }
}
