import { ensureDatabaseSchema } from "@/lib/database-schema";
import { execute, getPool, query, queryOne, transaction } from "@/lib/db";
import { ensureEditorSchema } from "@/lib/editor/schema";

let tableEnsured = false;
let tablePromise: Promise<void> | null = null;

const CURRICULUM_SEED_GUARD_TRIGGER = "curriculum_entries_seed_exclusion_guard";

export async function ensurePostgresCurriculumSeedGuard(): Promise<void> {
  await execute(`
    CREATE OR REPLACE FUNCTION "guard_excluded_curriculum_entry"()
    RETURNS trigger
    LANGUAGE plpgsql
    AS $$
    BEGIN
      IF EXISTS (
        SELECT 1
        FROM "curriculum_seed_exclusions"
        WHERE "categoryId" = NEW."categoryId"
      ) THEN
        RETURN NULL;
      END IF;
      RETURN NEW;
    END;
    $$
  `);

  const existingTrigger = await queryOne<{ exists: boolean }>(
    `SELECT EXISTS (
       SELECT 1
       FROM pg_trigger
       WHERE "tgname" = $1
         AND "tgrelid" = '"curriculum_entries"'::regclass
         AND NOT "tgisinternal"
     ) AS "exists"`,
    [CURRICULUM_SEED_GUARD_TRIGGER]
  );

  if (existingTrigger?.exists) return;

  try {
    await execute(`
      CREATE TRIGGER "${CURRICULUM_SEED_GUARD_TRIGGER}"
      BEFORE INSERT OR UPDATE OF "categoryId" ON "curriculum_entries"
      FOR EACH ROW
      EXECUTE FUNCTION "guard_excluded_curriculum_entry"()
    `);
  } catch (error) {
    const triggerAfterRace = await queryOne<{ exists: boolean }>(
      `SELECT EXISTS (
         SELECT 1
         FROM pg_trigger
         WHERE "tgname" = $1
           AND "tgrelid" = '"curriculum_entries"'::regclass
           AND NOT "tgisinternal"
       ) AS "exists"`,
      [CURRICULUM_SEED_GUARD_TRIGGER]
    );

    if (!triggerAfterRace?.exists) throw error;
  }
}

/** @internal Migrates legacy first-grade IDs and their saved progress. */
export async function migrateLegacyGradeOneCurriculumEntryIds(): Promise<void> {
  await transaction(async () => {
    const legacyEntries = await query<{ id: string }>(
      `SELECT "id" FROM "curriculum_entries"
     WHERE "grade" = 1 AND "id" NOT LIKE 'g1-%'`
    );

    for (const { id } of legacyEntries) {
      const gradeScopedId = `g1-${id}`;

      // Preserve completed progress while safely handling an already-migrated duplicate.
      await execute(
        `INSERT INTO "curriculum_progress" ("userId", "entryId", "completedAt")
       SELECT "userId", $1, "completedAt"
       FROM "curriculum_progress"
       WHERE "entryId" = $2
       ON CONFLICT ("userId", "entryId") DO NOTHING`,
        [gradeScopedId, id]
      );
      await execute(`DELETE FROM "curriculum_progress" WHERE "entryId" = $1`, [id]);

      const existingGradeScopedEntry = await queryOne<{ id: string }>(
        `SELECT "id" FROM "curriculum_entries" WHERE "id" = $1`,
        [gradeScopedId]
      );
      if (existingGradeScopedEntry) {
        await execute(`DELETE FROM "curriculum_entries" WHERE "id" = $1 AND "grade" = 1`, [id]);
      } else {
        await execute(`UPDATE "curriculum_entries" SET "id" = $1 WHERE "id" = $2 AND "grade" = 1`, [
          gradeScopedId,
          id,
        ]);
      }
    }
  });
}

/**
 * Ensures tables exist in PostgreSQL or SQLite.
 */
export function ensureCurriculumEntriesTable(): Promise<void> {
  if (tableEnsured) return Promise.resolve();
  tablePromise ??= initializeCurriculumEntriesTable().finally(() => {
    tablePromise = null;
  });
  return tablePromise;
}

async function initializeCurriculumEntriesTable(): Promise<void> {
  await ensureDatabaseSchema();
  await ensureEditorSchema();

  try {
    await execute(`
      -- Clean up legacy premature extra entries that violated the 48-week rule
      DELETE FROM "curriculum_entries" WHERE "id" LIKE '%-extra-%' AND "categoryId" NOT IN ('adab-i-muaseret', 'ilmihal', 'ayet', 'hadis', 'esma', 'efendimiz', 'sahabe-kissalari', 'siyer');
      DELETE FROM "curriculum_progress" WHERE "entryId" LIKE '%-extra-%' AND "entryId" NOT LIKE '%adab-i-muaseret%' AND "entryId" NOT LIKE '%ilmihal%' AND "entryId" NOT LIKE '%ayet%' AND "entryId" NOT LIKE '%hadis%' AND "entryId" NOT LIKE '%esma%' AND "entryId" NOT LIKE '%efendimiz%' AND "entryId" NOT LIKE '%sahabe-kissalari%' AND "entryId" NOT LIKE '%siyer%';

      -- Clean up removed categories (risale, pirlanta) and their progress
      DELETE FROM "curriculum_entries" WHERE "categoryId" IN ('risale', 'pirlanta');
      DELETE FROM "curriculum_progress" WHERE "entryId" LIKE 'risale-%' OR "entryId" LIKE 'pirlanta-%' OR "entryId" LIKE '%-risale-%' OR "entryId" LIKE '%-pirlanta-%';

      -- Persist intentional omissions so startup seeding does not recreate deleted categories
      CREATE TABLE IF NOT EXISTS "curriculum_seed_exclusions" (
        "categoryId" text not null primary key,
        "createdAt" timestamp not null default current_timestamp
      );
    `);
    for (const categoryId of ["ayet", "hadis", "efendimiz", "sahabe-kissalari", "siyer"]) {
      await execute(
        `INSERT INTO "curriculum_seed_exclusions" ("categoryId", "createdAt")
         VALUES ($1, $2) ON CONFLICT ("categoryId") DO NOTHING`,
        [categoryId, new Date().toISOString()]
      );
    }
    if (getPool()) await ensurePostgresCurriculumSeedGuard();
    await migrateLegacyGradeOneCurriculumEntryIds();
    tableEnsured = true;
  } catch (err) {
    console.error("Failed to execute curriculum entries table updates:", err);
    throw err;
  }
}
