import { db } from "@/lib/auth";
import {
  curriculumCategories,
  curriculumEntries,
  sortCurriculumEntries,
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

  // 2. Seed Extra entries for Grade 1 (e.g. 48 hafta sonrası ilave dosyalar)
  curriculumCategories.forEach((cat) => {
    seedBatch.push({
      id: `g1-${cat.id}-extra-1`,
      grade: 1,
      categoryId: cat.id,
      month: 12,
      week: 4,
      year: 2026,
      isExtra: 1,
      extraOrder: 1,
      title: `${cat.label} — 1. İlave Derinleşme Dosyası`,
      body: `1. Sınıf ${cat.label} müfredatının yıllık 48 haftalık periyodu sonrasında okunacak özel derinleşme ve pekiştirme metni.`,
      resourceUrl: null,
      pageCount: 3,
      createdAt: now,
      updatedAt: now,
    });
    seedBatch.push({
      id: `g1-${cat.id}-extra-2`,
      grade: 1,
      categoryId: cat.id,
      month: 12,
      week: 4,
      year: 2026,
      isExtra: 1,
      extraOrder: 2,
      title: `${cat.label} — 2. İlave İnceleme ve Kaynakça`,
      body: `1. Sınıf ${cat.label} konularına ilişkin ek okuma listesi, tahliller ve tatil dönemi için önerilen kaynaklar.`,
      resourceUrl: null,
      pageCount: 4,
      createdAt: now,
      updatedAt: now,
    });
  });

  // 3. Seed template standard & extra entries for Grades 2 through 6
  for (let grade = 2; grade <= 6; grade++) {
    for (const cat of curriculumCategories) {
      // 2 sample standard weeks for September (similar to grade 1 initial set)
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

      // Extra entry for that grade and category
      seedBatch.push({
        id: `g${grade}-${cat.id}-extra-1`,
        grade,
        categoryId: cat.id,
        month: 12,
        week: 4,
        year: 2026,
        isExtra: 1,
        extraOrder: 1,
        title: `${grade}. Sınıf ${cat.label} — İlave / Ekstra Metin 1`,
        body: `${grade}. Sınıf ${cat.label} alanında yıl sonu veya ileri okuma için hazırlanmış ek müfredat dosyası.`,
        resourceUrl: null,
        pageCount: 3,
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
    return sortCurriculumEntries(filtered);
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
      return sortCurriculumEntries(filtered);
    }

    const entries = rows.map(rowToEntry);
    return sortCurriculumEntries(entries);
  } catch {
    const filtered =
      typeof grade === "number" && grade >= 1 && grade <= 6
        ? curriculumEntries.filter((e) => (e.grade ?? 1) === grade)
        : curriculumEntries;
    return sortCurriculumEntries(filtered);
  }
}

/**
 * Finds a single curriculum entry by ID.
 */
export function getCurriculumEntryByIdFromDb(id: string): CurriculumEntry | null {
  ensureCurriculumEntriesTable();
  seedCurriculumDatabase();

  if (typeof db?.query !== "function") {
    return curriculumEntries.find((e) => e.id === id) ?? null;
  }

  try {
    const row = db
      .query<CurriculumEntryRow, [string]>(`SELECT * FROM "curriculum_entries" WHERE "id" = ?`)
      .get(id);

    return row ? rowToEntry(row) : (curriculumEntries.find((e) => e.id === id) ?? null);
  } catch {
    return curriculumEntries.find((e) => e.id === id) ?? null;
  }
}
