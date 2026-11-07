import { execute, getPool, query, queryOne, transaction } from "@/lib/db";
import { type CurriculumCategoryId } from "@/lib/curriculum";
import { curriculumEntries } from "@/lib/curriculum-data";
import { getAdabEntriesForGrade } from "@/lib/data/adab-curriculum";
import { getEsmaEntriesForGrade } from "@/lib/data/esma-curriculum";
import { getAllIlmihalEntries } from "@/lib/data/ilmihal-curriculum";
import { getHocaefendiEntriesForGrade } from "@/lib/data/hocaefendi-curriculum";
import { getTefekkurEntriesForGrade } from "@/lib/data/tefekkur-curriculum";
import { entryToRow, type CurriculumEntryRow } from "./entry-row";
import { ensureCurriculumEntriesTable, ensurePostgresCurriculumSeedGuard } from "./schema";
import { lockCurriculumCategories, upsertCurriculumEntryRows } from "./repository";

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
  if (getPool()) await ensurePostgresCurriculumSeedGuard();

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
    await transaction(async () => {
      await execute(`DELETE FROM "curriculum_entries" WHERE "categoryId" = $1`, [categoryId]);
      await upsertCurriculumEntryRows(batch);
    });
  } catch (err) {
    console.error(`Failed to sync category ${categoryId}:`, err);
    throw err;
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
          ...entryToRow(entry, now),
          grade,
          categoryId: "adab-i-muaseret",
          gender: null,
        });
      }
    }

    await transaction(async () => {
      await execute(`DELETE FROM "curriculum_entries" WHERE "categoryId" = $1`, [
        "adab-i-muaseret",
      ]);
      await execute(
        `DELETE FROM "curriculum_editor_content" WHERE "slot" LIKE '%:adab-i-muaseret:%' AND ("grade" <= 3 OR "grade" IS NULL)`
      );
      await upsertCurriculumEntryRows(batch);
    });
  } catch (err) {
    console.error(`Failed to sync category adab-i-muaseret:`, err);
    throw err;
  }
}

export async function syncIlmihalCurriculumIfOutdated(): Promise<void> {
  await ensureCurriculumEntriesTable();
  await syncCategoryIfOutdated("ilmihal", 774, () => {
    const now = new Date().toISOString();
    const batch: CurriculumEntryRow[] = [];
    const allIlmihal = getAllIlmihalEntries();
    for (const entry of allIlmihal) {
      batch.push({ ...entryToRow(entry, now), categoryId: "ilmihal" });
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
        batch.push({ ...entryToRow(entry, now), grade, categoryId: "esma", gender: null });
      }
    }

    await transaction(async () => {
      await execute(`DELETE FROM "curriculum_entries" WHERE "categoryId" = $1`, ["esma"]);
      await upsertCurriculumEntryRows(batch);
    });
  } catch (err) {
    console.error(`Failed to sync category esma:`, err);
    throw err;
  }
}

/** Preserve progress attached to the historical first-grade topic ID. */
export async function migrateLegacyKonuProgress(): Promise<void> {
  await ensureCurriculumEntriesTable();
  const canonicalId = "g1-konu-eylul-1";
  const legacyId = "g1-m1-konu-eylul-1";
  await transaction(async () => {
    await execute(
      `INSERT INTO "curriculum_progress" ("userId", "entryId", "completedAt")
       SELECT "userId", $1, "completedAt" FROM "curriculum_progress" WHERE "entryId" = $2
       ON CONFLICT ("userId", "entryId") DO NOTHING`,
      [canonicalId, legacyId]
    );
    await execute('DELETE FROM "curriculum_progress" WHERE "entryId" = $1', [legacyId]);
    await execute('DELETE FROM "curriculum_entries" WHERE "id" = $1 AND "categoryId" = $2', [
      legacyId,
      "konu",
    ]);
  });
}

export async function syncTefekkurCurriculumIfOutdated(): Promise<void> {
  await ensureCurriculumEntriesTable();
  try {
    const exclusion = await queryOne<{ categoryId: string }>(
      `SELECT "categoryId" FROM "curriculum_seed_exclusions" WHERE "categoryId" = $1`,
      ["tefekkur"]
    );
    if (exclusion) return;

    const row = await queryOne<{ c: number | string; updatedCount: number | string }>(
      `SELECT COUNT(*) as c, COUNT(CASE WHEN "body" LIKE '%Proton, nötron ve elektron%' THEN 1 END) as "updatedCount" FROM "curriculum_entries" WHERE "categoryId" = $1`,
      ["tefekkur"]
    );

    if (row && Number(row.c) === 216 && Number(row.updatedCount) >= 1) {
      return;
    }

    const now = new Date().toISOString();
    const batch: CurriculumEntryRow[] = [];
    for (let grade = 1; grade <= 6; grade++) {
      const entries = getTefekkurEntriesForGrade(grade);
      for (const entry of entries) {
        batch.push({
          ...entryToRow(entry, now),
          grade,
          categoryId: "tefekkur",
          gender: null,
          pdfUrl: null,
          pageCount: null,
        });
      }
    }

    await transaction(async () => {
      await execute(`DELETE FROM "curriculum_entries" WHERE "categoryId" = $1`, ["tefekkur"]);
      await upsertCurriculumEntryRows(batch);
    });
  } catch (err) {
    console.error("Failed to sync category tefekkur:", err);
    throw err;
  }
}

let seedPromise: Promise<void> | null = null;

export function seedCurriculumDatabase(force = false): Promise<void> {
  if (!force && seedPromise) return seedPromise;
  const previous = seedPromise ?? Promise.resolve();
  const operation = previous.catch(() => {}).then(() => seedCurriculumDatabaseOnce(force));
  seedPromise = operation;
  void operation.catch(() => {
    if (seedPromise === operation) seedPromise = null;
  });
  return operation;
}

async function seedCurriculumDatabaseOnce(force: boolean): Promise<void> {
  await ensureCurriculumEntriesTable();

  const countRow = await queryOne<{ c: number | string }>(
    `SELECT COUNT(*) as c FROM "curriculum_entries"`
  );

  const count = Number(countRow?.c ?? 0);
  await migrateLegacyKonuProgress();
  if (!force && count > 0) {
    await syncAdabCurriculumIfOutdated();
    await syncIlmihalCurriculumIfOutdated();
    await syncEsmaCurriculumIfOutdated();
    await syncTefekkurCurriculumIfOutdated();
    return;
  }

  const now = new Date().toISOString();
  const seedBatch: CurriculumEntryRow[] = [];

  // 1. Seed Grade 1 from existing static entries (which includes 54 adab entries)
  for (const entry of curriculumEntries) {
    if (entry.categoryId === "ilmihal" || entry.categoryId === "konu") continue;
    if (entry.categoryId === "hocaefendi-dinleme" && count > 0) continue;
    seedBatch.push({ ...entryToRow(entry, now), grade: 1, gender: null });
  }

  for (let grade = 2; grade <= 6; grade++) {
    const gradeAdabEntries = getAdabEntriesForGrade(grade);
    for (const entry of gradeAdabEntries) {
      seedBatch.push({
        ...entryToRow(entry, now),
        grade,
        categoryId: "adab-i-muaseret",
        gender: null,
      });
    }

    const gradeEsmaEntries = getEsmaEntriesForGrade(grade);
    for (const entry of gradeEsmaEntries) {
      seedBatch.push({ ...entryToRow(entry, now), grade, categoryId: "esma", gender: null });
    }

    if (count === 0) {
      for (const entry of getHocaefendiEntriesForGrade(grade)) {
        seedBatch.push(entryToRow(entry, now));
      }
    }

    const gradeTefekkurEntries = getTefekkurEntriesForGrade(grade);
    for (const entry of gradeTefekkurEntries) {
      seedBatch.push({
        ...entryToRow(entry, now),
        grade,
        categoryId: "tefekkur",
        gender: null,
        pdfUrl: null,
        pageCount: null,
      });
    }
  }

  // 2e. İlmihal for all 6 grades and both genders (774 entries)
  const allIlmihal = getAllIlmihalEntries();
  for (const entry of allIlmihal) {
    seedBatch.push({ ...entryToRow(entry, now), categoryId: "ilmihal" });
  }

  await transaction(async () => {
    await lockCurriculumCategories(["hocaefendi-dinleme"]);
    const excludedCategories = await getExcludedCurriculumSeedCategories();
    const eligible = seedBatch.filter((entry) => !excludedCategories.has(entry.categoryId));
    await upsertCurriculumEntryRows(
      eligible.filter((entry) => entry.categoryId !== "hocaefendi-dinleme")
    );
    // A package can be saved between the initial count and the lock. Keep its rows intact.
    await upsertCurriculumEntryRows(
      eligible.filter((entry) => entry.categoryId === "hocaefendi-dinleme"),
      "ignore"
    );
  });
}
