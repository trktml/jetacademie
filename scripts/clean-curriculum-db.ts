import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { query, execute, closeDatabase, isPostgres } from "../src/lib/db";

const KEPT_CATEGORIES = ["adab-i-muaseret", "ilmihal", "esma"] as const;
const EXCLUDED_CATEGORIES = [
  "ayet",
  "hadis",
  "efendimiz",
  "sahabe-kissalari",
  "hocaefendi-dinleme",
  "konu",
] as const;

async function runCleanup() {
  console.log("==================================================");
  console.log("JetAcademie - PostgreSQL Curriculum Database Cleanup");
  console.log("==================================================");

  if (!isPostgres) {
    throw new Error(
      "This script is configured to run exclusively on PostgreSQL. Check your DATABASE_URL in .env."
    );
  }

  console.log("\n[1/5] Fetching pre-cleanup statistics...");

  const preEntriesCount = await query<{ categoryId: string; count: string }>(
    `SELECT "categoryId", count(*) as count FROM "curriculum_entries" GROUP BY "categoryId" ORDER BY count DESC`
  );
  console.log("Current entries by category:", preEntriesCount);

  const preProgressCount = await query<{ count: string }>(
    `SELECT count(*) as count FROM "curriculum_progress"`
  );
  console.log("Total user progress rows:", preProgressCount[0]?.count ?? "0");

  const preEditorCount = await query<{ count: string }>(
    `SELECT count(*) as count FROM "curriculum_editor_content"`
  );
  console.log("Total editor content rows:", preEditorCount[0]?.count ?? "0");

  const preExclusions = await query<{ categoryId: string }>(
    `SELECT "categoryId" FROM "curriculum_seed_exclusions"`
  );
  console.log(
    "Current exclusions:",
    preExclusions.map((r) => r.categoryId)
  );

  console.log("\n[2/5] Creating backup snapshot...");
  const allEntries = await query(`SELECT * FROM "curriculum_entries"`);
  const allProgress = await query(`SELECT * FROM "curriculum_progress"`);
  const allEditor = await query(`SELECT * FROM "curriculum_editor_content"`);
  const allExclusions = await query(`SELECT * FROM "curriculum_seed_exclusions"`);

  const backupData = {
    timestamp: new Date().toISOString(),
    keptCategories: KEPT_CATEGORIES,
    excludedCategories: EXCLUDED_CATEGORIES,
    tables: {
      curriculum_entries: allEntries,
      curriculum_progress: allProgress,
      curriculum_editor_content: allEditor,
      curriculum_seed_exclusions: allExclusions,
    },
  };

  const backupDir = join(process.cwd(), "backups");
  mkdirSync(backupDir, { recursive: true });
  const timestampStr = new Date().toISOString().replace(/[:.]/g, "-");
  const backupFilePath = join(
    backupDir,
    `jetacademie_pg_backup_before_cleanup_${timestampStr}.json`
  );
  writeFileSync(backupFilePath, JSON.stringify(backupData, null, 2), "utf-8");
  console.log(`✓ Backup saved to: ${backupFilePath}`);

  console.log("\n[3/5] Updating curriculum_seed_exclusions...");
  for (const catId of EXCLUDED_CATEGORIES) {
    await execute(
      `INSERT INTO "curriculum_seed_exclusions" ("categoryId", "createdAt")
       VALUES ($1, CURRENT_TIMESTAMP)
       ON CONFLICT ("categoryId") DO NOTHING`,
      [catId]
    );
  }
  console.log(`✓ Ensured all removed categories are excluded from auto-seed.`);

  console.log("\n[4/5] Executing cleanup in transaction...");
  await execute("BEGIN");
  try {
    // 1. Delete non-kept entries from curriculum_entries
    const deletedEntriesCount = await execute(
      `DELETE FROM "curriculum_entries"
       WHERE "categoryId" NOT IN ('adab-i-muaseret', 'ilmihal', 'esma')`
    );
    console.log(`✓ Deleted ${deletedEntriesCount} rows from curriculum_entries.`);

    // 2. Delete non-kept overrides from curriculum_editor_content
    const deletedEditorCount = await execute(
      `DELETE FROM "curriculum_editor_content"
       WHERE "slot" NOT LIKE '%:adab-i-muaseret:%'
         AND "slot" NOT LIKE '%:ilmihal:%'
         AND "slot" NOT LIKE '%:esma:%'`
    );
    console.log(`✓ Deleted ${deletedEditorCount} rows from curriculum_editor_content.`);

    // 3. Delete progress records not associated with any remaining curriculum entries
    const deletedProgressCount = await execute(
      `DELETE FROM "curriculum_progress"
       WHERE "entryId" NOT IN (SELECT "id" FROM "curriculum_entries")`
    );
    console.log(`✓ Deleted ${deletedProgressCount} unlinked rows from curriculum_progress.`);

    await execute("COMMIT");
    console.log("✓ Transaction committed successfully.");
  } catch (error) {
    await execute("ROLLBACK");
    console.error("❌ Error encountered! Rolled back transaction.", error);
    throw error;
  }

  console.log("\n[5/5] Post-cleanup verification...");
  const postEntriesCount = await query<{ categoryId: string; count: string }>(
    `SELECT "categoryId", count(*) as count FROM "curriculum_entries" GROUP BY "categoryId" ORDER BY count DESC`
  );
  console.log("Remaining entries by category:", postEntriesCount);

  const postProgressCount = await query<{ count: string }>(
    `SELECT count(*) as count FROM "curriculum_progress"`
  );
  console.log("Remaining progress rows:", postProgressCount[0]?.count ?? "0");

  const postEditorCount = await query<{ count: string }>(
    `SELECT count(*) as count FROM "curriculum_editor_content"`
  );
  console.log("Remaining editor content rows:", postEditorCount[0]?.count ?? "0");

  const postExclusions = await query<{ categoryId: string }>(
    `SELECT "categoryId" FROM "curriculum_seed_exclusions"`
  );
  console.log(
    "Current exclusions in DB:",
    postExclusions.map((r) => r.categoryId)
  );

  console.log("\n==================================================");
  console.log("Cleanup completed successfully!");
  console.log("==================================================");
}

runCleanup()
  .catch((err) => {
    console.error("Fatal cleanup failure:", err);
    process.exit(1);
  })
  .finally(async () => {
    await closeDatabase();
  });
