import { ensureDatabaseSchema } from "@/lib/auth";
import { execute, getPool, getSqlite, isPostgres, query, queryOne } from "@/lib/db";
import {
  isCurriculumCategoryId,
  resolveAllCurriculumEntries,
  resolveCategoryEntries,
  type CurriculumCategoryId,
  type CurriculumEntry,
} from "@/lib/curriculum";
import { curriculumEntries } from "@/lib/curriculum-data";
import { getAdabEntriesForGrade } from "@/lib/data/adab-curriculum";
import { getEsmaEntriesForGrade } from "@/lib/data/esma-curriculum";
import {
  getAllIlmihalEntries,
  getIlmihalEntriesForGrade,
  type Gender,
} from "@/lib/data/ilmihal-curriculum";
import { getHocaefendiEntriesForGrade } from "@/lib/data/hocaefendi-curriculum";
import { getKonuEntriesForGrade } from "@/lib/data/konu-curriculum";
import { getEditorOverrideById, mergeEditorContent } from "@/lib/editor/content";
import { WEEKLY_CONTENT_CATEGORIES, weekNumberToSlot } from "@/lib/validations/curriculum-entry";
import { curriculumVocabularyIssues } from "@/lib/curriculum-vocabulary";

export interface CurriculumEntryRow {
  id: string;
  grade: number;
  categoryId: string;
  gender: string | null;
  month: number | null;
  week: number | null;
  year: number;
  isExtra: number | boolean;
  extraOrder: number | null;
  isDraft?: number | boolean;
  title: string;
  body: string | null;
  resourceUrl: string | null;
  pdfUrl: string | null;
  pageCount: number | null;
  createdAt: string;
  updatedAt: string;
}

function isPdf(url?: string | null): url is string {
  if (!url) return false;
  return url.endsWith(".pdf") || url.includes(".pdf?") || url.includes(".pdf#");
}

function withGradeScopedId<T extends { id: string; grade?: number }>(entry: T): T {
  const grade = entry.grade ?? 1;
  if (grade !== 1 || entry.id.startsWith("g1-")) return entry;
  return { ...entry, id: `g1-${entry.id}` };
}

function rowToEntry(row: CurriculumEntryRow): CurriculumEntry {
  return {
    id: row.id,
    grade: row.grade,
    gender: (row.gender as Gender) || undefined,
    categoryId: row.categoryId as CurriculumCategoryId,
    month: row.month ?? 1,
    week: row.week ?? 1,
    year: row.year,
    isExtra: Boolean(row.isExtra),
    extraOrder: row.extraOrder ?? undefined,
    isDraft: Boolean(row.isDraft),
    title: row.title,
    body: row.body ?? undefined,
    resourceUrl: row.resourceUrl ?? undefined,
    pdfUrl:
      (isPdf(row.pdfUrl) ? row.pdfUrl : isPdf(row.resourceUrl) ? row.resourceUrl : undefined) ??
      undefined,
    pageCount: row.pageCount ?? undefined,
  };
}

let tableEnsured = false;

const CURRICULUM_SEED_GUARD_TRIGGER = "curriculum_entries_seed_exclusion_guard";

async function ensurePostgresCurriculumSeedGuard(): Promise<void> {
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
}

/**
 * Ensures tables exist in PostgreSQL or SQLite.
 */
export async function ensureCurriculumEntriesTable(): Promise<void> {
  if (tableEnsured) return;
  await ensureDatabaseSchema();

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
    if (isPostgres) await ensurePostgresCurriculumSeedGuard();
    await migrateLegacyGradeOneCurriculumEntryIds();
    tableEnsured = true;
  } catch (err) {
    console.error("Failed to execute curriculum entries table updates:", err);
  }
}

async function getExcludedCurriculumSeedCategories(): Promise<Set<string>> {
  const rows = await query<{ categoryId: string }>(
    `SELECT "categoryId" FROM "curriculum_seed_exclusions"`
  );
  return new Set(rows.map((row) => row.categoryId));
}

/**
 * Excludes categories from automatic seeding and removes their entries for grades 1–6.
 * Call allowCurriculumCategoriesToSeed before intentionally regenerating these categories.
 */
export async function excludeAndDeleteCurriculumCategoriesFromSeed(
  categoryIds: readonly CurriculumCategoryId[]
): Promise<void> {
  const uniqueCategoryIds = [...new Set(categoryIds)];
  if (uniqueCategoryIds.length === 0) return;

  await ensureCurriculumEntriesTable();
  if (isPostgres) await ensurePostgresCurriculumSeedGuard();

  const createdAt = new Date().toISOString();
  for (const categoryId of uniqueCategoryIds) {
    await execute(
      `INSERT INTO "curriculum_seed_exclusions" ("categoryId", "createdAt")
       VALUES ($1, $2)
       ON CONFLICT ("categoryId") DO NOTHING`,
      [categoryId, createdAt]
    );
  }

  const placeholders = uniqueCategoryIds.map((_, index) => `$${index + 1}`).join(", ");
  await execute(
    `DELETE FROM "curriculum_entries"
     WHERE "categoryId" IN (${placeholders}) AND "grade" BETWEEN 1 AND 6`,
    uniqueCategoryIds
  );
}

/**
 * Removes seed exclusions so a later seedCurriculumDatabase(true) can regenerate the categories.
 */
export async function allowCurriculumCategoriesToSeed(
  categoryIds: readonly CurriculumCategoryId[]
): Promise<void> {
  await ensureCurriculumEntriesTable();
  for (const categoryId of new Set(categoryIds)) {
    await execute(`DELETE FROM "curriculum_seed_exclusions" WHERE "categoryId" = $1`, [categoryId]);
  }
}

export async function getUserGenderFromDb(userId: string): Promise<Gender | null> {
  await ensureDatabaseSchema();
  try {
    const row = await queryOne<{ gender: string }>(
      `SELECT "gender" FROM "user_preferences" WHERE "userId" = $1`,
      [userId]
    );
    return (row?.gender as Gender) || null;
  } catch {
    return null;
  }
}

export async function setUserGenderInDb(userId: string, gender: Gender): Promise<void> {
  await ensureDatabaseSchema();
  const now = new Date().toISOString();
  try {
    await execute(
      `INSERT INTO "user_preferences" ("userId", "gender", "createdAt", "updatedAt")
       VALUES ($1, $2, $3, $4)
       ON CONFLICT("userId") DO UPDATE SET "gender" = EXCLUDED.gender, "updatedAt" = EXCLUDED.updatedAt`,
      [userId, gender, now, now]
    );
  } catch (err) {
    console.error("Failed to set user gender in DB:", err);
  }
}

export async function bulkUpsertCurriculumEntries(
  rows: Array<
    Partial<CurriculumEntryRow> & Pick<CurriculumEntryRow, "id" | "grade" | "categoryId" | "title">
  >
): Promise<void> {
  if (rows.length === 0) return;
  const now = new Date().toISOString();
  if (rows.some((row) => !isCurriculumCategoryId(row.categoryId))) {
    throw new Error("Cannot save a retired or unknown curriculum category.");
  }
  const gradeScopedRows = rows.map(withGradeScopedId);
  const CHUNK_SIZE = 50;

  for (let i = 0; i < gradeScopedRows.length; i += CHUNK_SIZE) {
    const chunk = gradeScopedRows.slice(i, i + CHUNK_SIZE);
    const valuePlaceholders: string[] = [];
    const params: unknown[] = [];
    let pIdx = 1;

    for (const r of chunk) {
      valuePlaceholders.push(
        `($${pIdx++}, $${pIdx++}, $${pIdx++}, $${pIdx++}, $${pIdx++}, $${pIdx++}, $${pIdx++}, $${pIdx++}, $${pIdx++}, $${pIdx++}, $${pIdx++}, $${pIdx++}, $${pIdx++}, $${pIdx++}, $${pIdx++}, $${pIdx++}, $${pIdx++})`
      );
      params.push(
        r.id,
        r.grade,
        r.categoryId,
        r.gender ?? null,
        r.month ?? null,
        r.week ?? null,
        r.year ?? 2026,
        r.isExtra ? 1 : 0,
        r.extraOrder ?? null,
        r.isDraft ? 1 : 0,
        r.title,
        r.body ?? null,
        r.resourceUrl ?? null,
        r.pdfUrl ?? null,
        r.pageCount ?? null,
        r.createdAt ?? now,
        r.updatedAt ?? now
      );
    }

    const sql = `
      INSERT INTO "curriculum_entries" (
        "id", "grade", "categoryId", "gender", "month", "week", "year",
        "isExtra", "extraOrder", "isDraft", "title", "body", "resourceUrl", "pdfUrl",
        "pageCount", "createdAt", "updatedAt"
      ) VALUES ${valuePlaceholders.join(", ")}
      ON CONFLICT ("id") DO UPDATE SET
        "grade" = EXCLUDED."grade",
        "categoryId" = EXCLUDED."categoryId",
        "gender" = EXCLUDED."gender",
        "month" = EXCLUDED."month",
        "week" = EXCLUDED."week",
        "year" = EXCLUDED."year",
        "isExtra" = EXCLUDED."isExtra",
        "extraOrder" = EXCLUDED."extraOrder",
        "isDraft" = EXCLUDED."isDraft",
        "title" = EXCLUDED."title",
        "body" = EXCLUDED."body",
        "resourceUrl" = EXCLUDED."resourceUrl",
        "pdfUrl" = EXCLUDED."pdfUrl",
        "pageCount" = EXCLUDED."pageCount",
        "updatedAt" = EXCLUDED."updatedAt"
    `;

    await execute(sql, params);
  }
}

async function syncCategoryIfOutdated(
  categoryId: string,
  minCount: number,
  generateRows: () => CurriculumEntryRow[]
): Promise<void> {
  try {
    const exclusion = await queryOne<{ categoryId: string }>(
      `SELECT "categoryId" FROM "curriculum_seed_exclusions" WHERE "categoryId" = $1`,
      [categoryId]
    );
    if (exclusion) return;

    const row = await queryOne<{ c: number | string }>(
      `SELECT COUNT(*) as c FROM "curriculum_entries" WHERE "categoryId" = $1`,
      [categoryId]
    );

    if (row && Number(row.c) >= minCount) {
      return;
    }

    const batch = generateRows();
    await execute(`DELETE FROM "curriculum_entries" WHERE "categoryId" = $1`, [categoryId]);
    await bulkUpsertCurriculumEntries(batch);
  } catch (err) {
    console.error(`Failed to sync category ${categoryId}:`, err);
  }
}

export async function syncAdabCurriculumIfOutdated(): Promise<void> {
  await ensureCurriculumEntriesTable();
  try {
    const exclusion = await queryOne<{ categoryId: string }>(
      `SELECT "categoryId" FROM "curriculum_seed_exclusions" WHERE "categoryId" = $1`,
      ["adab-i-muaseret"]
    );
    if (exclusion) return;

    const row = await queryOne<{ c: number | string; missingPdf: number | string }>(
      `SELECT COUNT(*) as c, COUNT(CASE WHEN "grade" <= 3 AND "pdfUrl" IS NULL THEN 1 END) as "missingPdf" FROM "curriculum_entries" WHERE "categoryId" = $1`,
      ["adab-i-muaseret"]
    );

    if (row && Number(row.c) === 252 && Number(row.missingPdf) === 0) {
      return;
    }

    const now = new Date().toISOString();
    const batch: CurriculumEntryRow[] = [];
    for (let grade = 1; grade <= 6; grade++) {
      const entries = getAdabEntriesForGrade(grade);
      for (const entry of entries) {
        batch.push({
          id: entry.id,
          grade,
          categoryId: "adab-i-muaseret",
          gender: null,
          month: entry.month,
          week: entry.week,
          year: entry.year,
          isExtra: entry.isExtra ? 1 : 0,
          extraOrder: entry.extraOrder ?? null,
          title: entry.title,
          body: entry.body ?? null,
          resourceUrl: entry.resourceUrl ?? null,
          pdfUrl: isPdf(entry.pdfUrl)
            ? entry.pdfUrl
            : isPdf(entry.resourceUrl)
              ? entry.resourceUrl
              : null,
          pageCount: entry.pageCount ?? null,
          createdAt: now,
          updatedAt: now,
        });
      }
    }

    await execute(`DELETE FROM "curriculum_entries" WHERE "categoryId" = $1`, ["adab-i-muaseret"]);
    await execute(
      `DELETE FROM "curriculum_editor_content" WHERE "slot" LIKE '%:adab-i-muaseret:%' AND ("grade" <= 3 OR "grade" IS NULL)`
    );
    await bulkUpsertCurriculumEntries(batch);
  } catch (err) {
    console.error(`Failed to sync category adab-i-muaseret:`, err);
  }
}

export async function syncIlmihalCurriculumIfOutdated(): Promise<void> {
  await ensureCurriculumEntriesTable();
  await syncCategoryIfOutdated("ilmihal", 774, () => {
    const now = new Date().toISOString();
    const batch: CurriculumEntryRow[] = [];
    const allIlmihal = getAllIlmihalEntries();
    for (const entry of allIlmihal) {
      batch.push({
        id: entry.id,
        grade: entry.grade ?? 1,
        categoryId: "ilmihal",
        gender: entry.gender ?? null,
        month: entry.month,
        week: entry.week,
        year: entry.year,
        isExtra: entry.isExtra ? 1 : 0,
        extraOrder: entry.extraOrder ?? null,
        title: entry.title,
        body: entry.body ?? null,
        resourceUrl: entry.resourceUrl ?? null,
        pdfUrl: isPdf(entry.pdfUrl)
          ? entry.pdfUrl
          : isPdf(entry.resourceUrl)
            ? entry.resourceUrl
            : null,
        pageCount: entry.pageCount ?? null,
        createdAt: now,
        updatedAt: now,
      });
    }
    return batch;
  });
}

export async function syncEsmaCurriculumIfOutdated(): Promise<void> {
  await ensureCurriculumEntriesTable();
  try {
    const exclusion = await queryOne<{ categoryId: string }>(
      `SELECT "categoryId" FROM "curriculum_seed_exclusions" WHERE "categoryId" = $1`,
      ["esma"]
    );
    if (exclusion) return;

    const row = await queryOne<{ c: number | string; updatedCount: number | string }>(
      `SELECT COUNT(*) as c, COUNT(CASE WHEN "body" LIKE '%Kâinattaki%' THEN 1 END) as "updatedCount" FROM "curriculum_entries" WHERE "categoryId" = $1`,
      ["esma"]
    );

    if (row && Number(row.c) === 330 && Number(row.updatedCount) === 330) {
      return;
    }

    const now = new Date().toISOString();
    const batch: CurriculumEntryRow[] = [];
    for (let grade = 1; grade <= 6; grade++) {
      const entries = getEsmaEntriesForGrade(grade);
      for (const entry of entries) {
        batch.push({
          id: entry.id,
          grade,
          categoryId: "esma",
          gender: null,
          month: entry.month,
          week: entry.week,
          year: entry.year,
          isExtra: entry.isExtra ? 1 : 0,
          extraOrder: entry.extraOrder ?? null,
          title: entry.title,
          body: entry.body ?? null,
          resourceUrl: entry.resourceUrl ?? null,
          pdfUrl: isPdf(entry.pdfUrl)
            ? entry.pdfUrl
            : isPdf(entry.resourceUrl)
              ? entry.resourceUrl
              : null,
          pageCount: entry.pageCount ?? null,
          createdAt: now,
          updatedAt: now,
        });
      }
    }

    await execute(`DELETE FROM "curriculum_entries" WHERE "categoryId" = $1`, ["esma"]);
    await bulkUpsertCurriculumEntries(batch);
  } catch (err) {
    console.error(`Failed to sync category esma:`, err);
  }
}

export async function syncHocaefendiCurriculumIfOutdated(): Promise<void> {
  await ensureCurriculumEntriesTable();
  await syncCategoryIfOutdated("hocaefendi-dinleme", 288, () => {
    const now = new Date().toISOString();
    const batch: CurriculumEntryRow[] = [];
    for (let grade = 1; grade <= 6; grade++) {
      const entries = getHocaefendiEntriesForGrade(grade);
      for (const entry of entries) {
        batch.push({
          id: entry.id,
          grade,
          categoryId: "hocaefendi-dinleme",
          gender: null,
          month: entry.month,
          week: entry.week,
          year: entry.year,
          isExtra: entry.isExtra ? 1 : 0,
          extraOrder: entry.extraOrder ?? null,
          title: entry.title,
          body: entry.body ?? null,
          resourceUrl: entry.resourceUrl ?? null,
          pdfUrl: isPdf(entry.pdfUrl)
            ? entry.pdfUrl
            : isPdf(entry.resourceUrl)
              ? entry.resourceUrl
              : null,
          pageCount: entry.pageCount ?? null,
          createdAt: now,
          updatedAt: now,
        });
      }
    }
    return batch;
  });
}

export async function syncKonuCurriculumIfOutdated(): Promise<void> {
  await ensureCurriculumEntriesTable();
  try {
    const exclusion = await queryOne<{ categoryId: string }>(
      `SELECT "categoryId" FROM "curriculum_seed_exclusions" WHERE "categoryId" = $1`,
      ["konu"]
    );
    if (exclusion) return;

    const now = new Date().toISOString();
    const batch: CurriculumEntryRow[] = [];
    for (let grade = 1; grade <= 6; grade++) {
      const entries = getKonuEntriesForGrade(grade);
      for (const entry of entries) {
        batch.push({
          id: entry.id,
          grade,
          categoryId: "konu",
          gender: null,
          month: entry.month,
          week: entry.week,
          year: entry.year,
          isExtra: 0,
          extraOrder: null,
          title: entry.title,
          body: entry.body ?? null,
          resourceUrl: null,
          pdfUrl: null,
          pageCount: 2,
          createdAt: now,
          updatedAt: now,
        });
      }
    }
    await bulkUpsertCurriculumEntries(batch);

    // Replace the legacy grade-one M1 topic alias with its canonical curriculum ID.
    // Carry any saved completion forward before removing the duplicate entry.
    await execute(
      `INSERT INTO "curriculum_progress" ("userId", "entryId", "completedAt")
       SELECT "userId", $1, "completedAt"
       FROM "curriculum_progress"
       WHERE "entryId" = $2
       ON CONFLICT ("userId", "entryId") DO NOTHING`,
      ["g1-konu-eylul-1", "g1-m1-konu-eylul-1"]
    );
    await execute(`DELETE FROM "curriculum_progress" WHERE "entryId" = $1`, ["g1-m1-konu-eylul-1"]);
    await execute(
      `DELETE FROM "curriculum_entries"
       WHERE "id" = $1 AND "grade" = 1 AND "categoryId" = $2`,
      ["g1-m1-konu-eylul-1", "konu"]
    );
  } catch (err) {
    console.error("Failed to sync category konu:", err);
  }
}

let seedPromise: Promise<void> | null = null;

export function seedCurriculumDatabase(force = false): Promise<void> {
  if (force) {
    seedPromise = null;
    return seedCurriculumDatabaseOnce(true);
  }

  seedPromise ??= seedCurriculumDatabaseOnce(false).catch((error: unknown) => {
    seedPromise = null;
    throw error;
  });
  return seedPromise;
}

async function seedCurriculumDatabaseOnce(force: boolean): Promise<void> {
  await ensureCurriculumEntriesTable();

  const countRow = await queryOne<{ c: number | string }>(
    `SELECT COUNT(*) as c FROM "curriculum_entries"`
  );

  const count = Number(countRow?.c ?? 0);
  if (!force && count > 0) {
    await syncAdabCurriculumIfOutdated();
    await syncIlmihalCurriculumIfOutdated();
    await syncEsmaCurriculumIfOutdated();
    await syncHocaefendiCurriculumIfOutdated();
    await syncKonuCurriculumIfOutdated();
    return;
  }

  const now = new Date().toISOString();
  const seedBatch: CurriculumEntryRow[] = [];

  // 1. Seed Grade 1 from existing static entries (which includes 54 adab entries)
  for (const entry of curriculumEntries) {
    if (entry.categoryId === "ilmihal") continue;
    seedBatch.push({
      id: entry.id,
      grade: 1,
      categoryId: entry.categoryId,
      gender: null,
      month: entry.month,
      week: entry.week,
      year: entry.year,
      isExtra: entry.isExtra ? 1 : 0,
      extraOrder: entry.extraOrder ?? null,
      title: entry.title,
      body: entry.body ?? null,
      resourceUrl: entry.resourceUrl ?? null,
      pdfUrl: isPdf(entry.pdfUrl)
        ? entry.pdfUrl
        : isPdf(entry.resourceUrl)
          ? entry.resourceUrl
          : null,
      pageCount: entry.pageCount ?? null,
      createdAt: now,
      updatedAt: now,
    });
  }

  for (let grade = 2; grade <= 6; grade++) {
    const gradeAdabEntries = getAdabEntriesForGrade(grade);
    for (const entry of gradeAdabEntries) {
      seedBatch.push({
        id: entry.id,
        grade,
        categoryId: "adab-i-muaseret",
        gender: null,
        month: entry.month,
        week: entry.week,
        year: entry.year,
        isExtra: entry.isExtra ? 1 : 0,
        extraOrder: entry.extraOrder ?? null,
        title: entry.title,
        body: entry.body ?? null,
        resourceUrl: entry.resourceUrl ?? null,
        pdfUrl: isPdf(entry.pdfUrl)
          ? entry.pdfUrl
          : isPdf(entry.resourceUrl)
            ? entry.resourceUrl
            : null,
        pageCount: entry.pageCount ?? null,
        createdAt: now,
        updatedAt: now,
      });
    }

    const gradeEsmaEntries = getEsmaEntriesForGrade(grade);
    for (const entry of gradeEsmaEntries) {
      seedBatch.push({
        id: entry.id,
        grade,
        categoryId: "esma",
        gender: null,
        month: entry.month,
        week: entry.week,
        year: entry.year,
        isExtra: entry.isExtra ? 1 : 0,
        extraOrder: entry.extraOrder ?? null,
        title: entry.title,
        body: entry.body ?? null,
        resourceUrl: entry.resourceUrl ?? null,
        pdfUrl: isPdf(entry.pdfUrl)
          ? entry.pdfUrl
          : isPdf(entry.resourceUrl)
            ? entry.resourceUrl
            : null,
        pageCount: entry.pageCount ?? null,
        createdAt: now,
        updatedAt: now,
      });
    }

    const gradeHocaefendiEntries = getHocaefendiEntriesForGrade(grade);
    for (const entry of gradeHocaefendiEntries) {
      seedBatch.push({
        id: entry.id,
        grade,
        categoryId: "hocaefendi-dinleme",
        gender: null,
        month: entry.month,
        week: entry.week,
        year: entry.year,
        isExtra: entry.isExtra ? 1 : 0,
        extraOrder: entry.extraOrder ?? null,
        title: entry.title,
        body: entry.body ?? null,
        resourceUrl: entry.resourceUrl ?? null,
        pdfUrl: isPdf(entry.pdfUrl)
          ? entry.pdfUrl
          : isPdf(entry.resourceUrl)
            ? entry.resourceUrl
            : null,
        pageCount: entry.pageCount ?? null,
        createdAt: now,
        updatedAt: now,
      });
    }

    const gradeKonuEntries = getKonuEntriesForGrade(grade);
    for (const entry of gradeKonuEntries) {
      seedBatch.push({
        id: entry.id,
        grade,
        categoryId: "konu",
        gender: null,
        month: entry.month,
        week: entry.week,
        year: entry.year,
        isExtra: 0,
        extraOrder: null,
        title: entry.title,
        body: entry.body ?? null,
        resourceUrl: null,
        pdfUrl: null,
        pageCount: 2,
        createdAt: now,
        updatedAt: now,
      });
    }
  }

  // 2e. İlmihal for all 6 grades and both genders (774 entries)
  const allIlmihal = getAllIlmihalEntries();
  for (const entry of allIlmihal) {
    seedBatch.push({
      id: entry.id,
      grade: entry.grade ?? 1,
      categoryId: "ilmihal",
      gender: entry.gender ?? null,
      month: entry.month,
      week: entry.week,
      year: entry.year,
      isExtra: entry.isExtra ? 1 : 0,
      extraOrder: entry.extraOrder ?? null,
      title: entry.title,
      body: entry.body ?? null,
      resourceUrl: entry.resourceUrl ?? null,
      pdfUrl: isPdf(entry.pdfUrl)
        ? entry.pdfUrl
        : isPdf(entry.resourceUrl)
          ? entry.resourceUrl
          : null,
      pageCount: entry.pageCount ?? null,
      createdAt: now,
      updatedAt: now,
    });
  }

  const excludedCategories = await getExcludedCurriculumSeedCategories();
  await bulkUpsertCurriculumEntries(
    seedBatch.filter((entry) => !excludedCategories.has(entry.categoryId))
  );
}

export function getFallbackEntries(grade?: number, gender?: Gender): CurriculumEntry[] {
  if (typeof grade === "number" && grade >= 1 && grade <= 6) {
    const adab = getAdabEntriesForGrade(grade);
    const esma = getEsmaEntriesForGrade(grade);
    const hocaefendi = getHocaefendiEntriesForGrade(grade);
    const ilmihal = gender
      ? getIlmihalEntriesForGrade(grade, gender)
      : [
          ...getIlmihalEntriesForGrade(grade, "erkek"),
          ...getIlmihalEntriesForGrade(grade, "bayan"),
        ];
    const others = curriculumEntries
      .filter(
        (e) =>
          e.categoryId !== "adab-i-muaseret" &&
          e.categoryId !== "ilmihal" &&
          e.categoryId !== "esma" &&
          e.categoryId !== "hocaefendi-dinleme"
      )
      .map((e) => ({ ...e, grade, id: grade === 1 ? e.id : `g${grade}-${e.id}` }));
    return resolveAllCurriculumEntries([
      ...others,
      ...adab,
      ...esma,
      ...hocaefendi,
      ...ilmihal,
    ]).map(withGradeScopedId);
  }
  const ilmihalG1 = gender
    ? getIlmihalEntriesForGrade(1, gender)
    : [...getIlmihalEntriesForGrade(1, "erkek"), ...getIlmihalEntriesForGrade(1, "bayan")];
  const othersG1 = curriculumEntries.filter((e) => e.categoryId !== "ilmihal");
  return resolveAllCurriculumEntries([...othersG1, ...ilmihalG1]).map(withGradeScopedId);
}

/**
 * Retrieves all entries from PostgreSQL or SQLite, optionally filtered by Belgium grade and gender for İlmihal.
 */
export async function getCurriculumEntriesFromDb(
  grade?: number,
  gender?: Gender,
  includeDrafts = false
): Promise<CurriculumEntry[]> {
  await seedCurriculumDatabase();

  try {
    let rows: CurriculumEntryRow[];
    if (typeof grade === "number" && grade >= 1 && grade <= 6) {
      rows = await query<CurriculumEntryRow>(
        `SELECT * FROM "curriculum_entries" WHERE "grade" = $1 ORDER BY "isExtra" ASC, "year" ASC, "month" ASC, "week" ASC, "extraOrder" ASC`,
        [grade]
      );
    } else {
      rows = await query<CurriculumEntryRow>(
        `SELECT * FROM "curriculum_entries" ORDER BY "grade" ASC, "isExtra" ASC, "year" ASC, "month" ASC, "week" ASC, "extraOrder" ASC`
      );
    }

    if (!rows || rows.length === 0) {
      return mergeEditorContent(getFallbackEntries(grade, gender), grade, gender);
    }

    rows = rows.filter((row) => isCurriculumCategoryId(row.categoryId));

    let filteredRows = gender
      ? rows.filter((r) => r.categoryId !== "ilmihal" || !r.gender || r.gender === gender)
      : rows;

    if (!includeDrafts) {
      filteredRows = filteredRows.filter((r) => !r.isDraft);
    }

    const entries = filteredRows.map(rowToEntry);
    return mergeEditorContent(resolveAllCurriculumEntries(entries), grade, gender);
  } catch {
    return mergeEditorContent(getFallbackEntries(grade, gender), grade, gender);
  }
}

export interface WeekSummary {
  weekNumber: number;
  month: number;
  week: number;
  year: number;
  monthSlug: string;
  totalEntries: number;
  draftEntries: number;
  publishedEntries: number;
  status: "empty" | "draft" | "published" | "mixed";
}

/**
 * Publishes draft entries for a given week number (1-36) or month and week.
 */
export async function publishCurriculumWeek(
  weekNumberOrMonth: number,
  weekArg?: number
): Promise<{ updatedCount: number; publishedCount: number }> {
  await ensureCurriculumEntriesTable();
  let month: number;
  let week: number;
  if (typeof weekArg === "number") {
    month = weekNumberOrMonth;
    week = weekArg;
  } else {
    const slot = weekNumberToSlot(weekNumberOrMonth);
    month = slot.month;
    week = slot.week;
  }

  const placeholders = WEEKLY_CONTENT_CATEGORIES.map((_, i) => `$${i + 3}`).join(", ");
  const params = [month, week, ...WEEKLY_CONTENT_CATEGORIES];
  const selection = `"month" = $1 AND "week" = $2 AND "isDraft" = 1 AND "categoryId" IN (${placeholders})`;
  const selectSql = `SELECT "id", "body" FROM "curriculum_entries" WHERE ${selection}`;
  const updateSql = `UPDATE "curriculum_entries"
     SET "isDraft" = 0, "updatedAt" = CURRENT_TIMESTAMP
     WHERE ${selection} RETURNING "id"`;
  const validate = (rows: { id: string; body: string }[]) => {
    const issues = rows.flatMap((row) =>
      curriculumVocabularyIssues(row.body).map((message) => `${row.id}: ${message}`)
    );
    if (issues.length)
      throw new Error(`Kelime listesi doğrulaması başarısız:\n${issues.join("\n")}`);
  };

  const pool = getPool();
  if (isPostgres && pool) {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      const rows = await client.query<{ id: string; body: string }>(
        `${selectSql} FOR UPDATE`,
        params
      );
      validate(rows.rows);
      const res = await client.query<{ id: string }>(
        updateSql.replace(" RETURNING", ` AND "id" = ANY($${params.length + 1}::text[]) RETURNING`),
        [...params, rows.rows.map((row) => row.id)]
      );
      await client.query("COMMIT");
      return { updatedCount: res.rowCount ?? 0, publishedCount: res.rowCount ?? 0 };
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }

  const sqlite = getSqlite();
  if (!sqlite) throw new Error("No database client initialized");
  return sqlite.transaction(() => {
    const sqliteParams = params.map(String);
    validate(
      sqlite.query(selectSql.replace(/\$\d+/g, "?")).all(...sqliteParams) as {
        id: string;
        body: string;
      }[]
    );
    const res = sqlite.query(updateSql.replace(/\$\d+/g, "?")).all(...sqliteParams);
    return { updatedCount: res.length, publishedCount: res.length };
  })();
}

/**
 * Deletes entries for a given week number (1-36) or month and week for the two weekly content categories.
 * Strictly preserves adab-i-muaseret, ilmihal, and esma categories.
 */
export async function deleteCurriculumWeek(
  weekNumberOrMonth: number,
  weekArg?: number
): Promise<{ deletedCount: number }> {
  await ensureCurriculumEntriesTable();
  let month: number;
  let week: number;
  if (typeof weekArg === "number") {
    month = weekNumberOrMonth;
    week = weekArg;
  } else {
    const slot = weekNumberToSlot(weekNumberOrMonth);
    month = slot.month;
    week = slot.week;
  }

  const allowedCategories = WEEKLY_CONTENT_CATEGORIES;
  const placeholders = allowedCategories.map((_, i) => `$${i + 3}`).join(", ");
  const res = await query<{ id: string }>(
    `DELETE FROM "curriculum_entries"
     WHERE "month" = $1 AND "week" = $2 AND "categoryId" IN (${placeholders})
     RETURNING "id"`,
    [month, week, ...allowedCategories]
  );
  if (res.length > 0) {
    const ids = res.map((r) => r.id);
    const idPlaceholders = ids.map((_, i) => `$${i + 1}`).join(", ");
    await query(`DELETE FROM "curriculum_progress" WHERE "entryId" IN (${idPlaceholders})`, ids);
  }
  return { deletedCount: res.length };
}

/**
 * Returns a high-level summary of all 36 curriculum weeks and their draft/published status.
 */
export async function getCurriculumWeekSummaries(): Promise<WeekSummary[]> {
  await ensureCurriculumEntriesTable();
  const rows = await query<{
    month: number;
    week: number;
    total: number | string;
    drafts: number | string;
    published: number | string;
  }>(
    `SELECT "month", "week",
            COUNT(*) as total,
            COUNT(CASE WHEN "isDraft" = 1 THEN 1 END) as drafts,
            COUNT(CASE WHEN "isDraft" = 0 THEN 1 END) as published
     FROM "curriculum_entries"
     WHERE "categoryId" IN ('konu', 'hocaefendi-dinleme')
       AND "month" IS NOT NULL AND "week" IS NOT NULL
     GROUP BY "month", "week"`
  );

  const slotMap = new Map<string, { total: number; drafts: number; published: number }>();
  for (const r of rows) {
    slotMap.set(`${r.month}-${r.week}`, {
      total: Number(r.total),
      drafts: Number(r.drafts),
      published: Number(r.published),
    });
  }

  const summaries: WeekSummary[] = [];
  for (let w = 1; w <= 36; w++) {
    const slot = weekNumberToSlot(w);
    const counts = slotMap.get(`${slot.month}-${slot.week}`) ?? {
      total: 0,
      drafts: 0,
      published: 0,
    };
    let status: WeekSummary["status"] = "empty";
    if (counts.total > 0) {
      if (counts.drafts === counts.total) status = "draft";
      else if (counts.published === counts.total) status = "published";
      else status = "mixed";
    }

    summaries.push({
      weekNumber: w,
      month: slot.month,
      week: slot.week,
      year: slot.year,
      monthSlug: slot.monthSlug,
      totalEntries: counts.total,
      draftEntries: counts.drafts,
      publishedEntries: counts.published,
      status,
    });
  }

  return summaries;
}

/**
 * Finds a single curriculum entry by ID.
 */
export async function getCurriculumEntryByIdFromDb(id: string): Promise<CurriculumEntry | null> {
  await seedCurriculumDatabase();
  const override = await getEditorOverrideById(/^g[1-6]-/.test(id) ? id : `g1-${id}`);
  if (override && isCurriculumCategoryId(override.categoryId)) return override;

  try {
    let row = await queryOne<CurriculumEntryRow>(
      `SELECT * FROM "curriculum_entries" WHERE "id" = $1`,
      [id]
    );

    // Accept legacy unprefixed grade-one URLs while returning the canonical database ID.
    if (!row && !/^g[1-6]-/.test(id)) {
      row = await queryOne<CurriculumEntryRow>(
        `SELECT * FROM "curriculum_entries" WHERE "id" = $1`,
        [`g1-${id}`]
      );
    }

    if (!row) {
      for (let g = 1; g <= 6; g++) {
        const match = getFallbackEntries(g).find(
          (e) => e.id === id || (!/^g[1-6]-/.test(id) && e.id === `g1-${id}`)
        );
        if (match) {
          const exclusion = await queryOne<{ categoryId: string }>(
            `SELECT "categoryId" FROM "curriculum_seed_exclusions" WHERE "categoryId" = $1`,
            [match.categoryId]
          );
          if (exclusion) return null;
          return match;
        }
      }
      return null;
    }

    if (!isCurriculumCategoryId(row.categoryId)) return null;

    // Resolve within its category to ensure accurate 48-week extra status
    let categoryRows: CurriculumEntryRow[];
    if (row.categoryId === "ilmihal" && row.gender) {
      categoryRows = await query<CurriculumEntryRow>(
        `SELECT * FROM "curriculum_entries" WHERE "grade" = $1 AND "categoryId" = $2 AND "gender" = $3`,
        [row.grade, row.categoryId, row.gender]
      );
    } else {
      categoryRows = await query<CurriculumEntryRow>(
        `SELECT * FROM "curriculum_entries" WHERE "grade" = $1 AND "categoryId" = $2`,
        [row.grade, row.categoryId]
      );
    }

    const resolvedCategoryEntries = resolveCategoryEntries(categoryRows.map(rowToEntry));
    return resolvedCategoryEntries.find((e) => e.id === row.id) ?? rowToEntry(row);
  } catch {
    for (let g = 1; g <= 6; g++) {
      const match = getFallbackEntries(g).find(
        (e) => e.id === id || (!/^g[1-6]-/.test(id) && e.id === `g1-${id}`)
      );
      if (match) return match;
    }
    return null;
  }
}
