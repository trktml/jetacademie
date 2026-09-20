import { db } from "@/lib/auth";
import {
  curriculumCategories,
  curriculumEntries,
  resolveAllCurriculumEntries,
  resolveCategoryEntries,
  type CurriculumCategoryId,
  type CurriculumEntry,
} from "@/lib/curriculum";

interface CurriculumEntryRow {
  id: string;
  grade: number;
  categoryId: string;
  month: number | null;
  week: number | null;
  year: number;
  isExtra: number;
  extraOrder: number | null;
  title: string;
  body: string | null;
  resourceUrl: string | null;
  pageCount: number | null;
  createdAt: string;
  updatedAt: string;
}

function rowToEntry(row: CurriculumEntryRow): CurriculumEntry {
  return {
    id: row.id,
    grade: row.grade,
    categoryId: row.categoryId as CurriculumCategoryId,
    month: row.month ?? 1,
    week: row.week ?? 1,
    year: row.year,
    isExtra: Boolean(row.isExtra),
    extraOrder: row.extraOrder ?? undefined,
    title: row.title,
    body: row.body ?? undefined,
    resourceUrl: row.resourceUrl ?? undefined,
    pageCount: row.pageCount ?? undefined,
  };
}

/**
 * Ensures table curriculum_entries exists in SQLite.
 */
export function ensureCurriculumEntriesTable() {
  if (typeof db?.exec !== "function") return;

  db.exec(`
    CREATE TABLE IF NOT EXISTS "curriculum_entries" (
      "id" text not null primary key,
      "grade" integer not null default 1,
      "categoryId" text not null,
      "month" integer,
      "week" integer,
      "year" integer default 2026,
      "isExtra" integer not null default 0,
      "extraOrder" integer,
      "title" text not null,
      "body" text,
      "resourceUrl" text,
      "pageCount" integer,
      "createdAt" date not null,
      "updatedAt" date not null
    );
    CREATE INDEX IF NOT EXISTS "curriculum_entries_grade_category_idx"
      on "curriculum_entries" ("grade", "categoryId", "isExtra", "month", "week");

    -- Clean up legacy premature extra entries that violated the 48-week rule
    DELETE FROM "curriculum_entries" WHERE "id" LIKE '%-extra-%';
    DELETE FROM "curriculum_progress" WHERE "entryId" LIKE '%-extra-%';
  `);
}

/**
 * Seeds initial curriculum entries for all 6 Belgium grades,
 * including 48-week standard curriculum and extra contents.
 */
export function seedCurriculumDatabase(force = false): void {
  ensureCurriculumEntriesTable();

  if (
    typeof db?.query !== "function" ||
    typeof db?.prepare !== "function" ||
    typeof db?.transaction !== "function"
  ) {
    return;
  }

  const countRow = db
    .query<{ count: number }, []>(`SELECT COUNT(*) as count FROM "curriculum_entries"`)
    .get();

  if (!force && countRow && countRow.count > 0) {
    return;
  }

  const now = new Date().toISOString();

  // Prepare seed batch
  const seedBatch: Array<{
    id: string;
    grade: number;
    categoryId: string;
    month: number | null;
    week: number | null;
    year: number;
    isExtra: number;
    extraOrder: number | null;
    title: string;
    body: string | null;
    resourceUrl: string | null;
    pageCount: number | null;
    createdAt: string;
    updatedAt: string;
  }> = [];

  // 1. Seed Grade 1 from existing static entries
  for (const entry of curriculumEntries) {
    seedBatch.push({
      id: entry.id,
      grade: 1,
      categoryId: entry.categoryId,
      month: entry.month,
      week: entry.week,
      year: entry.year,
      isExtra: entry.isExtra ? 1 : 0,
      extraOrder: entry.extraOrder ?? null,
      title: entry.title,
      body: entry.body ?? null,
      resourceUrl: entry.resourceUrl ?? null,
      pageCount: entry.pageCount ?? null,
      createdAt: now,
      updatedAt: now,
    });
  }

  // 2. Seed template standard entries for Grades 2 through 6 (2 sample standard weeks for September)
  for (let grade = 2; grade <= 6; grade++) {
    for (const cat of curriculumCategories) {
      seedBatch.push({
        id: `g${grade}-${cat.id}-eylul-1`,
        grade,
        categoryId: cat.id,
        month: 9,
        week: 1,
        year: 2026,
        isExtra: 0,
        extraOrder: null,
        title: `${grade}. Sınıf ${cat.label} — 1. Hafta Başlangıç`,
        body: `Belçika ${grade}. Sınıf müfredatına uygun ${cat.label} ilk hafta ders notları ve temel hedefler.`,
        resourceUrl: null,
        pageCount: 2,
        createdAt: now,
        updatedAt: now,
      });

      seedBatch.push({
        id: `g${grade}-${cat.id}-eylul-2`,
        grade,
        categoryId: cat.id,
        month: 9,
        week: 2,
        year: 2026,
        isExtra: 0,
        extraOrder: null,
        title: `${grade}. Sınıf ${cat.label} — 2. Hafta Konusu`,
        body: `Belçika ${grade}. Sınıf ${cat.label} dersi 2. hafta kapsamlı tahlil ve etkinlik rehberi.`,
        resourceUrl: null,
        pageCount: 2,
        createdAt: now,
        updatedAt: now,
      });
    }
  }

  const insertStmt = db.prepare(`
    INSERT OR REPLACE INTO "curriculum_entries" (
      "id", "grade", "categoryId", "month", "week", "year",
      "isExtra", "extraOrder", "title", "body", "resourceUrl",
      "pageCount", "createdAt", "updatedAt"
    ) VALUES (
      $id, $grade, $categoryId, $month, $week, $year,
      $isExtra, $extraOrder, $title, $body, $resourceUrl,
      $pageCount, $createdAt, $updatedAt
    )
  `);

  const runTransaction = db.transaction((rows: typeof seedBatch) => {
    for (const row of rows) {
      insertStmt.run({
        $id: row.id,
        $grade: row.grade,
        $categoryId: row.categoryId,
        $month: row.month,
        $week: row.week,
        $year: row.year,
        $isExtra: row.isExtra,
        $extraOrder: row.extraOrder,
        $title: row.title,
        $body: row.body,
        $resourceUrl: row.resourceUrl,
        $pageCount: row.pageCount,
        $createdAt: row.createdAt,
        $updatedAt: row.updatedAt,
      });
    }
  });

  runTransaction(seedBatch);
}

/**
 * Retrieves all entries from SQLite, optionally filtered by Belgium grade.
 */
export function getCurriculumEntriesFromDb(grade?: number): CurriculumEntry[] {
  ensureCurriculumEntriesTable();
  seedCurriculumDatabase();

  if (typeof db?.query !== "function") {
    const filtered =
      typeof grade === "number" && grade >= 1 && grade <= 6
        ? curriculumEntries.filter((e) => (e.grade ?? 1) === grade)
        : curriculumEntries;
    return resolveAllCurriculumEntries(filtered);
  }

  try {
    let rows: CurriculumEntryRow[];
    if (typeof grade === "number" && grade >= 1 && grade <= 6) {
      rows = db
        .query<CurriculumEntryRow, [number]>(
          `SELECT * FROM "curriculum_entries" WHERE "grade" = ? ORDER BY "isExtra" ASC, "year" ASC, "month" ASC, "week" ASC, "extraOrder" ASC`
        )
        .all(grade);
    } else {
      rows = db
        .query<CurriculumEntryRow, []>(
          `SELECT * FROM "curriculum_entries" ORDER BY "grade" ASC, "isExtra" ASC, "year" ASC, "month" ASC, "week" ASC, "extraOrder" ASC`
        )
        .all();
    }

    if (!rows || rows.length === 0) {
      const filtered =
        typeof grade === "number" && grade >= 1 && grade <= 6
          ? curriculumEntries.filter((e) => (e.grade ?? 1) === grade)
          : curriculumEntries;
      return resolveAllCurriculumEntries(filtered);
    }

    const entries = rows.map(rowToEntry);
    return resolveAllCurriculumEntries(entries);
  } catch {
    const filtered =
      typeof grade === "number" && grade >= 1 && grade <= 6
        ? curriculumEntries.filter((e) => (e.grade ?? 1) === grade)
        : curriculumEntries;
    return resolveAllCurriculumEntries(filtered);
  }
}

/**
 * Finds a single curriculum entry by ID.
 */
export function getCurriculumEntryByIdFromDb(id: string): CurriculumEntry | null {
  ensureCurriculumEntriesTable();
  seedCurriculumDatabase();

  if (typeof db?.query !== "function") {
    const all = resolveAllCurriculumEntries(curriculumEntries);
    return all.find((e) => e.id === id) ?? null;
  }

  try {
    const row = db
      .query<CurriculumEntryRow, [string]>(`SELECT * FROM "curriculum_entries" WHERE "id" = ?`)
      .get(id);

    if (!row) {
      const all = resolveAllCurriculumEntries(curriculumEntries);
      return all.find((e) => e.id === id) ?? null;
    }

    // Resolve within its category to ensure accurate 48-week extra status
    const categoryRows = db
      .query<CurriculumEntryRow, [number, string]>(
        `SELECT * FROM "curriculum_entries" WHERE "grade" = ? AND "categoryId" = ?`
      )
      .all(row.grade, row.categoryId);

    const resolvedCategoryEntries = resolveCategoryEntries(categoryRows.map(rowToEntry));
    return resolvedCategoryEntries.find((e) => e.id === id) ?? rowToEntry(row);
  } catch {
    const all = resolveAllCurriculumEntries(curriculumEntries);
    return all.find((e) => e.id === id) ?? null;
  }
}
