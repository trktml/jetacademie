import { db } from "@/lib/auth";
import {
  curriculumCategories,
  curriculumEntries,
  resolveAllCurriculumEntries,
  resolveCategoryEntries,
  type CurriculumCategoryId,
  type CurriculumEntry,
} from "@/lib/curriculum";
import { getAdabEntriesForGrade } from "@/lib/data/adab-curriculum";
import { getAllAyetEntries, getAyetEntriesForGrade } from "@/lib/data/ayet-curriculum";
import {
  getAllEfendimizEntries,
  getEfendimizEntriesForGrade,
} from "@/lib/data/efendimiz-curriculum";
import { getAllEsmaEntries, getEsmaEntriesForGrade } from "@/lib/data/esma-curriculum";
import { getAllHadisEntries, getHadisEntriesForGrade } from "@/lib/data/hadis-curriculum";
import {
  getAllIlmihalEntries,
  getIlmihalEntriesForGrade,
  type Gender,
} from "@/lib/data/ilmihal-curriculum";

interface CurriculumEntryRow {
  id: string;
  grade: number;
  categoryId: string;
  gender: string | null;
  month: number | null;
  week: number | null;
  year: number;
  isExtra: number;
  extraOrder: number | null;
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
    title: row.title,
    body: row.body ?? undefined,
    resourceUrl: row.resourceUrl ?? undefined,
    pdfUrl:
      (isPdf(row.pdfUrl) ? row.pdfUrl : isPdf(row.resourceUrl) ? row.resourceUrl : undefined) ??
      undefined,
    pageCount: row.pageCount ?? undefined,
  };
}

/**
 * Ensures tables exist in SQLite.
 */
export function ensureCurriculumEntriesTable() {
  if (typeof db?.exec !== "function") return;

  // 1. Create tables if they do not exist
  db.exec(`
    CREATE TABLE IF NOT EXISTS "user_preferences" (
      "userId" text not null primary key references "user" ("id") on delete cascade,
      "gender" text not null check ("gender" in ('erkek', 'bayan')),
      "createdAt" date not null,
      "updatedAt" date not null
    );

    CREATE TABLE IF NOT EXISTS "curriculum_entries" (
      "id" text not null primary key,
      "grade" integer not null default 1,
      "categoryId" text not null,
      "gender" text,
      "month" integer,
      "week" integer,
      "year" integer default 2026,
      "isExtra" integer not null default 0,
      "extraOrder" integer,
      "title" text not null,
      "body" text,
      "resourceUrl" text,
      "pdfUrl" text,
      "pageCount" integer,
      "createdAt" date not null,
      "updatedAt" date not null
    );
  `);

  // 2. Safely add columns for existing databases before creating indexes
  try {
    db.exec(`ALTER TABLE "curriculum_entries" ADD COLUMN "gender" text;`);
  } catch {
    // Column already exists
  }
  try {
    db.exec(`ALTER TABLE "curriculum_entries" ADD COLUMN "pdfUrl" text;`);
  } catch {
    // Column already exists
  }

  // 3. Create indexes and perform cleanup
  db.exec(`
    CREATE INDEX IF NOT EXISTS "curriculum_entries_grade_category_idx"
      on "curriculum_entries" ("grade", "categoryId", "isExtra", "month", "week");
    CREATE INDEX IF NOT EXISTS "curriculum_entries_grade_category_gender_idx"
      on "curriculum_entries" ("grade", "categoryId", "gender", "isExtra", "month", "week");

    -- Migrate any legacy siyer entries and progress to efendimiz
    UPDATE "curriculum_entries" SET "categoryId" = 'efendimiz' WHERE "categoryId" = 'siyer';
    UPDATE "curriculum_entries" SET "id" = REPLACE("id", 'siyer', 'efendimiz') WHERE "id" LIKE '%siyer%';
    UPDATE "curriculum_progress" SET "entryId" = REPLACE("entryId", 'siyer', 'efendimiz') WHERE "entryId" LIKE '%siyer%';

    -- Clean up legacy premature extra entries that violated the 48-week rule
    DELETE FROM "curriculum_entries" WHERE "id" LIKE '%-extra-%' AND "categoryId" NOT IN ('adab-i-muaseret', 'ilmihal', 'ayet', 'hadis', 'esma', 'efendimiz');
    DELETE FROM "curriculum_progress" WHERE "entryId" LIKE '%-extra-%' AND "entryId" NOT LIKE '%adab-i-muaseret%' AND "entryId" NOT LIKE '%ilmihal%' AND "entryId" NOT LIKE '%ayet%' AND "entryId" NOT LIKE '%hadis%' AND "entryId" NOT LIKE '%esma%' AND "entryId" NOT LIKE '%efendimiz%';
  `);
}

export function getUserGenderFromDb(userId: string): Gender | null {
  ensureCurriculumEntriesTable();
  if (typeof db?.query !== "function") return null;
  try {
    const row = db
      .query<{ gender: string }, [string]>(
        `SELECT "gender" FROM "user_preferences" WHERE "userId" = ?`
      )
      .get(userId);
    return (row?.gender as Gender) || null;
  } catch {
    return null;
  }
}

export function setUserGenderInDb(userId: string, gender: Gender): void {
  ensureCurriculumEntriesTable();
  if (typeof db?.prepare !== "function") return;
  const now = new Date().toISOString();
  try {
    const stmt = db.prepare(`
      INSERT INTO "user_preferences" ("userId", "gender", "createdAt", "updatedAt")
      VALUES (?, ?, ?, ?)
      ON CONFLICT("userId") DO UPDATE SET "gender" = excluded.gender, "updatedAt" = excluded.updatedAt
    `);
    stmt.run(userId, gender, now, now);
  } catch (err) {
    console.error("Failed to set user gender in DB:", err);
  }
}

/**
 * Ensures adab-i-muaseret entries are fully synced across all 6 grades (54 entries each, total 324).
 * If old placeholder entries are present or count < 324, this cleanly syncs adab-i-muaseret
 * without touching other categories or user progress.
 */
export function syncAdabCurriculumIfOutdated(): void {
  if (
    typeof db?.query !== "function" ||
    typeof db?.prepare !== "function" ||
    typeof db?.transaction !== "function" ||
    typeof db?.exec !== "function"
  ) {
    return;
  }

  try {
    const row = db
      .query<{ count: number }, []>(
        `SELECT COUNT(*) as count FROM "curriculum_entries" WHERE "categoryId" = 'adab-i-muaseret'`
      )
      .get();

    // 6 grades * 54 weeks = 324 entries
    if (row && row.count >= 324) {
      return;
    }

    const now = new Date().toISOString();
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

    const adabBatch: Array<{
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

    for (let grade = 1; grade <= 6; grade++) {
      const entries = getAdabEntriesForGrade(grade);
      for (const entry of entries) {
        adabBatch.push({
          id: entry.id,
          grade,
          categoryId: "adab-i-muaseret",
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
    }

    const runSync = db.transaction((rows: typeof adabBatch) => {
      db.exec(`DELETE FROM "curriculum_entries" WHERE "categoryId" = 'adab-i-muaseret'`);
      for (const r of rows) {
        insertStmt.run({
          $id: r.id,
          $grade: r.grade,
          $categoryId: r.categoryId,
          $month: r.month,
          $week: r.week,
          $year: r.year,
          $isExtra: r.isExtra,
          $extraOrder: r.extraOrder,
          $title: r.title,
          $body: r.body,
          $resourceUrl: r.resourceUrl,
          $pageCount: r.pageCount,
          $createdAt: r.createdAt,
          $updatedAt: r.updatedAt,
        });
      }
    });

    runSync(adabBatch);
  } catch (err) {
    console.error("Failed to sync adab curriculum:", err);
  }
}

/**
 * Ensures ilmihal entries are fully synced across all 6 grades and both genders (total 774 entries).
 * If old placeholder entries are present or count < 774, this cleanly syncs ilmihal
 * without touching other categories or user progress.
 */
export function syncIlmihalCurriculumIfOutdated(): void {
  if (
    typeof db?.query !== "function" ||
    typeof db?.prepare !== "function" ||
    typeof db?.transaction !== "function" ||
    typeof db?.exec !== "function"
  ) {
    return;
  }

  try {
    const row = db
      .query<{ count: number; withPdf: number }, []>(
        `SELECT COUNT(*) as count, SUM(CASE WHEN "pdfUrl" IS NOT NULL THEN 1 ELSE 0 END) as withPdf FROM "curriculum_entries" WHERE "categoryId" = 'ilmihal'`
      )
      .get();

    // 6 grades * (28 ortaokul + 104/98 lise) * 2 genders = 774 entries with pdfUrl populated
    if (row && row.count >= 774 && (row.withPdf ?? 0) >= 774) {
      return;
    }

    const now = new Date().toISOString();
    const insertStmt = db.prepare(`
      INSERT OR REPLACE INTO "curriculum_entries" (
        "id", "grade", "categoryId", "gender", "month", "week", "year",
        "isExtra", "extraOrder", "title", "body", "resourceUrl", "pdfUrl",
        "pageCount", "createdAt", "updatedAt"
      ) VALUES (
        $id, $grade, $categoryId, $gender, $month, $week, $year,
        $isExtra, $extraOrder, $title, $body, $resourceUrl, $pdfUrl,
        $pageCount, $createdAt, $updatedAt
      )
    `);

    const ilmihalEntries = getAllIlmihalEntries();
    const runSync = db.transaction((entries: typeof ilmihalEntries) => {
      db.exec(`DELETE FROM "curriculum_entries" WHERE "categoryId" = 'ilmihal'`);
      for (const e of entries) {
        insertStmt.run({
          $id: e.id,
          $grade: e.grade ?? 1,
          $categoryId: "ilmihal",
          $gender: e.gender ?? null,
          $month: e.month,
          $week: e.week,
          $year: e.year,
          $isExtra: e.isExtra ? 1 : 0,
          $extraOrder: e.extraOrder ?? null,
          $title: e.title,
          $body: e.body ?? null,
          $resourceUrl: e.resourceUrl ?? null,
          $pdfUrl: isPdf(e.pdfUrl) ? e.pdfUrl : isPdf(e.resourceUrl) ? e.resourceUrl : null,
          $pageCount: e.pageCount ?? null,
          $createdAt: now,
          $updatedAt: now,
        });
      }
    });

    runSync(ilmihalEntries);
  } catch (err) {
    console.error("Failed to sync ilmihal curriculum:", err);
  }
}

/**
 * Ensures ayet entries are fully synced across all 6 grades (55 entries each, total 330).
 * If old placeholder entries are present or count < 330, this cleanly syncs ayet
 * without touching other categories or user progress.
 */
export function syncAyetCurriculumIfOutdated(): void {
  if (
    typeof db?.query !== "function" ||
    typeof db?.prepare !== "function" ||
    typeof db?.transaction !== "function" ||
    typeof db?.exec !== "function"
  ) {
    return;
  }

  try {
    const row = db
      .query<{ count: number }, []>(
        `SELECT COUNT(*) as count FROM "curriculum_entries" WHERE "categoryId" = 'ayet'`
      )
      .get();

    // 6 grades * 55 weeks = 330 entries
    if (row && row.count >= 330) {
      return;
    }

    const now = new Date().toISOString();
    const insertStmt = db.prepare(`
      INSERT OR REPLACE INTO "curriculum_entries" (
        "id", "grade", "categoryId", "gender", "month", "week", "year",
        "isExtra", "extraOrder", "title", "body", "resourceUrl", "pdfUrl",
        "pageCount", "createdAt", "updatedAt"
      ) VALUES (
        $id, $grade, $categoryId, $gender, $month, $week, $year,
        $isExtra, $extraOrder, $title, $body, $resourceUrl, $pdfUrl,
        $pageCount, $createdAt, $updatedAt
      )
    `);

    const ayetEntries = getAllAyetEntries();
    const runSync = db.transaction((entries: typeof ayetEntries) => {
      db.exec(`DELETE FROM "curriculum_entries" WHERE "categoryId" = 'ayet'`);
      for (const e of entries) {
        insertStmt.run({
          $id: e.id,
          $grade: e.grade ?? 1,
          $categoryId: "ayet",
          $gender: null,
          $month: e.month,
          $week: e.week,
          $year: e.year,
          $isExtra: e.isExtra ? 1 : 0,
          $extraOrder: e.extraOrder ?? null,
          $title: e.title,
          $body: e.body ?? null,
          $resourceUrl: e.resourceUrl ?? null,
          $pdfUrl: null,
          $pageCount: null,
          $createdAt: now,
          $updatedAt: now,
        });
      }
    });

    runSync(ayetEntries);
  } catch (err) {
    console.error("Failed to sync ayet curriculum:", err);
  }
}

/**
 * Ensures hadis entries are fully synced across all 6 grades (55 entries each, total 330).
 * If old placeholder entries are present or count < 330, this cleanly syncs hadis
 * without touching other categories or user progress.
 */
export function syncHadisCurriculumIfOutdated(): void {
  if (
    typeof db?.query !== "function" ||
    typeof db?.prepare !== "function" ||
    typeof db?.transaction !== "function" ||
    typeof db?.exec !== "function"
  ) {
    return;
  }

  try {
    const row = db
      .query<{ count: number }, []>(
        `SELECT COUNT(*) as count FROM "curriculum_entries" WHERE "categoryId" = 'hadis'`
      )
      .get();

    // 6 grades * 55 weeks = 330 entries
    if (row && row.count >= 330) {
      return;
    }

    const now = new Date().toISOString();
    const insertStmt = db.prepare(`
      INSERT OR REPLACE INTO "curriculum_entries" (
        "id", "grade", "categoryId", "gender", "month", "week", "year",
        "isExtra", "extraOrder", "title", "body", "resourceUrl", "pdfUrl",
        "pageCount", "createdAt", "updatedAt"
      ) VALUES (
        $id, $grade, $categoryId, $gender, $month, $week, $year,
        $isExtra, $extraOrder, $title, $body, $resourceUrl, $pdfUrl,
        $pageCount, $createdAt, $updatedAt
      )
    `);

    const hadisEntries = getAllHadisEntries();
    const runSync = db.transaction((entries: typeof hadisEntries) => {
      db.exec(`DELETE FROM "curriculum_entries" WHERE "categoryId" = 'hadis'`);
      for (const e of entries) {
        insertStmt.run({
          $id: e.id,
          $grade: e.grade ?? 1,
          $categoryId: "hadis",
          $gender: null,
          $month: e.month,
          $week: e.week,
          $year: e.year,
          $isExtra: e.isExtra ? 1 : 0,
          $extraOrder: e.extraOrder ?? null,
          $title: e.title,
          $body: e.body ?? null,
          $resourceUrl: e.resourceUrl ?? null,
          $pdfUrl: null,
          $pageCount: null,
          $createdAt: now,
          $updatedAt: now,
        });
      }
    });

    runSync(hadisEntries);
  } catch (err) {
    console.error("Failed to sync hadis curriculum:", err);
  }
}

/**
 * Ensures esma entries are fully synced across all 6 grades (55 entries each, total 330).
 * If old placeholder entries are present or count < 330, this cleanly syncs esma
 * without touching other categories or user progress.
 */
export function syncEsmaCurriculumIfOutdated(): void {
  if (
    typeof db?.query !== "function" ||
    typeof db?.prepare !== "function" ||
    typeof db?.transaction !== "function" ||
    typeof db?.exec !== "function"
  ) {
    return;
  }

  try {
    const row = db
      .query<{ count: number }, []>(
        `SELECT COUNT(*) as count FROM "curriculum_entries" WHERE "categoryId" = 'esma'`
      )
      .get();

    // 6 grades * 55 weeks = 330 entries
    if (row && row.count >= 330) {
      return;
    }

    const now = new Date().toISOString();
    const insertStmt = db.prepare(`
      INSERT OR REPLACE INTO "curriculum_entries" (
        "id", "grade", "categoryId", "gender", "month", "week", "year",
        "isExtra", "extraOrder", "title", "body", "resourceUrl", "pdfUrl",
        "pageCount", "createdAt", "updatedAt"
      ) VALUES (
        $id, $grade, $categoryId, $gender, $month, $week, $year,
        $isExtra, $extraOrder, $title, $body, $resourceUrl, $pdfUrl,
        $pageCount, $createdAt, $updatedAt
      )
    `);

    const esmaEntries = getAllEsmaEntries();
    const runSync = db.transaction((entries: typeof esmaEntries) => {
      db.exec(`DELETE FROM "curriculum_entries" WHERE "categoryId" = 'esma'`);
      for (const e of entries) {
        insertStmt.run({
          $id: e.id,
          $grade: e.grade ?? 1,
          $categoryId: "esma",
          $gender: null,
          $month: e.month,
          $week: e.week,
          $year: e.year,
          $isExtra: e.isExtra ? 1 : 0,
          $extraOrder: e.extraOrder ?? null,
          $title: e.title,
          $body: e.body ?? null,
          $resourceUrl: e.resourceUrl ?? null,
          $pdfUrl: null,
          $pageCount: null,
          $createdAt: now,
          $updatedAt: now,
        });
      }
    });

    runSync(esmaEntries);
  } catch (err) {
    console.error("Failed to sync esma curriculum:", err);
  }
}

/**
 * Ensures efendimiz entries are fully synced across all 6 grades (55 entries each, total 330).
 * If old placeholder entries are present or count < 330, this cleanly syncs efendimiz
 * without touching other categories or user progress.
 */
export function syncEfendimizCurriculumIfOutdated(): void {
  if (
    typeof db?.query !== "function" ||
    typeof db?.prepare !== "function" ||
    typeof db?.transaction !== "function" ||
    typeof db?.exec !== "function"
  ) {
    return;
  }

  try {
    const row = db
      .query<{ count: number }, []>(
        `SELECT COUNT(*) as count FROM "curriculum_entries" WHERE "categoryId" = 'efendimiz'`
      )
      .get();

    // 6 grades * 55 weeks = 330 entries
    if (row && row.count >= 330) {
      return;
    }

    const now = new Date().toISOString();
    const insertStmt = db.prepare(`
      INSERT OR REPLACE INTO "curriculum_entries" (
        "id", "grade", "categoryId", "gender", "month", "week", "year",
        "isExtra", "extraOrder", "title", "body", "resourceUrl", "pdfUrl",
        "pageCount", "createdAt", "updatedAt"
      ) VALUES (
        $id, $grade, $categoryId, $gender, $month, $week, $year,
        $isExtra, $extraOrder, $title, $body, $resourceUrl, $pdfUrl,
        $pageCount, $createdAt, $updatedAt
      )
    `);

    const efendimizEntries = getAllEfendimizEntries();
    const runSync = db.transaction((entries: typeof efendimizEntries) => {
      db.exec(`DELETE FROM "curriculum_entries" WHERE "categoryId" IN ('efendimiz', 'siyer')`);
      for (const e of entries) {
        insertStmt.run({
          $id: e.id,
          $grade: e.grade ?? 1,
          $categoryId: "efendimiz",
          $gender: null,
          $month: e.month,
          $week: e.week,
          $year: e.year,
          $isExtra: e.isExtra ? 1 : 0,
          $extraOrder: e.extraOrder ?? null,
          $title: e.title,
          $body: e.body ?? null,
          $resourceUrl: e.resourceUrl ?? null,
          $pdfUrl: null,
          $pageCount: null,
          $createdAt: now,
          $updatedAt: now,
        });
      }
    });

    runSync(efendimizEntries);
  } catch (err) {
    console.error("Failed to sync efendimiz curriculum:", err);
  }
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
    syncAyetCurriculumIfOutdated();
    syncHadisCurriculumIfOutdated();
    syncAdabCurriculumIfOutdated();
    syncIlmihalCurriculumIfOutdated();
    syncEsmaCurriculumIfOutdated();
    syncEfendimizCurriculumIfOutdated();
    return;
  }

  const now = new Date().toISOString();

  // Prepare seed batch
  const seedBatch: Array<{
    id: string;
    grade: number;
    categoryId: string;
    gender: string | null;
    month: number | null;
    week: number | null;
    year: number;
    isExtra: number;
    extraOrder: number | null;
    title: string;
    body: string | null;
    resourceUrl: string | null;
    pdfUrl: string | null;
    pageCount: number | null;
    createdAt: string;
    updatedAt: string;
  }> = [];

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

  // 2. Seed template standard entries for Grades 2 through 6
  for (let grade = 2; grade <= 6; grade++) {
    // 2a. Categories other than adab-i-muaseret, ilmihal, ayet, hadis, esma, and efendimiz
    for (const cat of curriculumCategories) {
      if (
        cat.id === "adab-i-muaseret" ||
        cat.id === "ilmihal" ||
        cat.id === "ayet" ||
        cat.id === "hadis" ||
        cat.id === "esma" ||
        cat.id === "efendimiz"
      )
        continue;
      seedBatch.push({
        id: `g${grade}-${cat.id}-eylul-1`,
        grade,
        categoryId: cat.id,
        gender: null,
        month: 9,
        week: 1,
        year: 2026,
        isExtra: 0,
        extraOrder: null,
        title: `${grade}. Sınıf ${cat.label} — 1. Hafta Başlangıç`,
        body: `Belçika ${grade}. Sınıf müfredatına uygun ${cat.label} ilk hafta ders notları ve temel hedefler.`,
        resourceUrl: null,
        pdfUrl: null,
        pageCount: 2,
        createdAt: now,
        updatedAt: now,
      });

      seedBatch.push({
        id: `g${grade}-${cat.id}-eylul-2`,
        grade,
        categoryId: cat.id,
        gender: null,
        month: 9,
        week: 2,
        year: 2026,
        isExtra: 0,
        extraOrder: null,
        title: `${grade}. Sınıf ${cat.label} — 2. Hafta Konusu`,
        body: `Belçika ${grade}. Sınıf ${cat.label} dersi 2. hafta kapsamlı tahlil ve etkinlik rehberi.`,
        resourceUrl: null,
        pdfUrl: null,
        pageCount: 2,
        createdAt: now,
        updatedAt: now,
      });
    }

    // 2b. Adab-ı Muaşeret for Grades 2 through 6 (54 weeks)
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

    // 2c. Ayet for Grades 2 through 6 (55 weeks)
    const gradeAyetEntries = getAyetEntriesForGrade(grade);
    for (const entry of gradeAyetEntries) {
      seedBatch.push({
        id: entry.id,
        grade,
        categoryId: "ayet",
        gender: null,
        month: entry.month,
        week: entry.week,
        year: entry.year,
        isExtra: entry.isExtra ? 1 : 0,
        extraOrder: entry.extraOrder ?? null,
        title: entry.title,
        body: entry.body ?? null,
        resourceUrl: entry.resourceUrl ?? null,
        pdfUrl: null,
        pageCount: null,
        createdAt: now,
        updatedAt: now,
      });
    }

    // 2d. Hadis for Grades 2 through 6 (55 weeks)
    const gradeHadisEntries = getHadisEntriesForGrade(grade);
    for (const entry of gradeHadisEntries) {
      seedBatch.push({
        id: entry.id,
        grade,
        categoryId: "hadis",
        gender: null,
        month: entry.month,
        week: entry.week,
        year: entry.year,
        isExtra: entry.isExtra ? 1 : 0,
        extraOrder: entry.extraOrder ?? null,
        title: entry.title,
        body: entry.body ?? null,
        resourceUrl: entry.resourceUrl ?? null,
        pdfUrl: null,
        pageCount: null,
        createdAt: now,
        updatedAt: now,
      });
    }

    // 2e. Esmâü'l-Hüsnâ for Grades 2 through 6 (55 weeks)
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
        pdfUrl: null,
        pageCount: null,
        createdAt: now,
        updatedAt: now,
      });
    }

    // 2f. Efendimiz for Grades 2 through 6 (55 weeks)
    const gradeEfendimizEntries = getEfendimizEntriesForGrade(grade);
    for (const entry of gradeEfendimizEntries) {
      seedBatch.push({
        id: entry.id,
        grade,
        categoryId: "efendimiz",
        gender: null,
        month: entry.month,
        week: entry.week,
        year: entry.year,
        isExtra: entry.isExtra ? 1 : 0,
        extraOrder: entry.extraOrder ?? null,
        title: entry.title,
        body: entry.body ?? null,
        resourceUrl: entry.resourceUrl ?? null,
        pdfUrl: null,
        pageCount: null,
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

  const insertStmt = db.prepare(`
    INSERT OR REPLACE INTO "curriculum_entries" (
      "id", "grade", "categoryId", "gender", "month", "week", "year",
      "isExtra", "extraOrder", "title", "body", "resourceUrl", "pdfUrl",
      "pageCount", "createdAt", "updatedAt"
    ) VALUES (
      $id, $grade, $categoryId, $gender, $month, $week, $year,
      $isExtra, $extraOrder, $title, $body, $resourceUrl, $pdfUrl,
      $pageCount, $createdAt, $updatedAt
    )
  `);

  const runTransaction = db.transaction((rows: typeof seedBatch) => {
    for (const row of rows) {
      insertStmt.run({
        $id: row.id,
        $grade: row.grade,
        $categoryId: row.categoryId,
        $gender: row.gender,
        $month: row.month,
        $week: row.week,
        $year: row.year,
        $isExtra: row.isExtra,
        $extraOrder: row.extraOrder,
        $title: row.title,
        $body: row.body,
        $resourceUrl: row.resourceUrl,
        $pdfUrl: row.pdfUrl,
        $pageCount: row.pageCount,
        $createdAt: row.createdAt,
        $updatedAt: row.updatedAt,
      });
    }
  });

  runTransaction(seedBatch);
}

function getFallbackEntries(grade?: number, gender?: Gender): CurriculumEntry[] {
  if (typeof grade === "number" && grade >= 1 && grade <= 6) {
    const ayet = getAyetEntriesForGrade(grade);
    const hadis = getHadisEntriesForGrade(grade);
    const adab = getAdabEntriesForGrade(grade);
    const esma = getEsmaEntriesForGrade(grade);
    const efendimiz = getEfendimizEntriesForGrade(grade);
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
          e.categoryId !== "ayet" &&
          e.categoryId !== "hadis" &&
          e.categoryId !== "esma" &&
          e.categoryId !== "efendimiz"
      )
      .map((e) => ({ ...e, grade, id: grade === 1 ? e.id : `g${grade}-${e.id}` }));
    return resolveAllCurriculumEntries([
      ...others,
      ...ayet,
      ...hadis,
      ...adab,
      ...esma,
      ...efendimiz,
      ...ilmihal,
    ]);
  }
  const ilmihalG1 = gender
    ? getIlmihalEntriesForGrade(1, gender)
    : [...getIlmihalEntriesForGrade(1, "erkek"), ...getIlmihalEntriesForGrade(1, "bayan")];
  const othersG1 = curriculumEntries.filter((e) => e.categoryId !== "ilmihal");
  return resolveAllCurriculumEntries([...othersG1, ...ilmihalG1]);
}

/**
 * Retrieves all entries from SQLite, optionally filtered by Belgium grade and gender for İlmihal.
 */
export function getCurriculumEntriesFromDb(grade?: number, gender?: Gender): CurriculumEntry[] {
  ensureCurriculumEntriesTable();
  seedCurriculumDatabase();

  if (typeof db?.query !== "function") {
    return getFallbackEntries(grade, gender);
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
      return getFallbackEntries(grade, gender);
    }

    const filteredRows = gender
      ? rows.filter((r) => r.categoryId !== "ilmihal" || !r.gender || r.gender === gender)
      : rows;

    const entries = filteredRows.map(rowToEntry);
    return resolveAllCurriculumEntries(entries);
  } catch {
    return getFallbackEntries(grade, gender);
  }
}

/**
 * Finds a single curriculum entry by ID.
 */
export function getCurriculumEntryByIdFromDb(id: string): CurriculumEntry | null {
  ensureCurriculumEntriesTable();
  seedCurriculumDatabase();

  if (typeof db?.query !== "function") {
    for (let g = 1; g <= 6; g++) {
      const match = getFallbackEntries(g).find((e) => e.id === id);
      if (match) return match;
    }
    return null;
  }

  try {
    const row = db
      .query<CurriculumEntryRow, [string]>(`SELECT * FROM "curriculum_entries" WHERE "id" = ?`)
      .get(id);

    if (!row) {
      for (let g = 1; g <= 6; g++) {
        const match = getFallbackEntries(g).find((e) => e.id === id);
        if (match) return match;
      }
      return null;
    }

    // Resolve within its category to ensure accurate 48-week extra status
    let categoryRows: CurriculumEntryRow[];
    if (row.categoryId === "ilmihal" && row.gender) {
      categoryRows = db
        .query<CurriculumEntryRow, [number, string, string]>(
          `SELECT * FROM "curriculum_entries" WHERE "grade" = ? AND "categoryId" = ? AND "gender" = ?`
        )
        .all(row.grade, row.categoryId, row.gender);
    } else {
      categoryRows = db
        .query<CurriculumEntryRow, [number, string]>(
          `SELECT * FROM "curriculum_entries" WHERE "grade" = ? AND "categoryId" = ?`
        )
        .all(row.grade, row.categoryId);
    }

    const resolvedCategoryEntries = resolveCategoryEntries(categoryRows.map(rowToEntry));
    return resolvedCategoryEntries.find((e) => e.id === id) ?? rowToEntry(row);
  } catch {
    for (let g = 1; g <= 6; g++) {
      const match = getFallbackEntries(g).find((e) => e.id === id);
      if (match) return match;
    }
    return null;
  }
}
