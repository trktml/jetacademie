import { ensureDatabaseSchema } from "@/lib/auth";
import { execute, query, queryOne } from "@/lib/db";
import {
  curriculumCategories,
  curriculumEntries,
  resolveAllCurriculumEntries,
  resolveCategoryEntries,
  type CurriculumCategoryId,
  type CurriculumEntry,
} from "@/lib/curriculum";
import { getAdabEntriesForGrade } from "@/lib/data/adab-curriculum";
import { getAyetEntriesForGrade } from "@/lib/data/ayet-curriculum";
import { getEfendimizEntriesForGrade } from "@/lib/data/efendimiz-curriculum";
import { getEsmaEntriesForGrade } from "@/lib/data/esma-curriculum";
import { getHadisEntriesForGrade } from "@/lib/data/hadis-curriculum";
import {
  getAllIlmihalEntries,
  getIlmihalEntriesForGrade,
  type Gender,
} from "@/lib/data/ilmihal-curriculum";
import { getSahabeEntriesForGrade } from "@/lib/data/sahabe-curriculum";
import { getHocaefendiEntriesForGrade } from "@/lib/data/hocaefendi-curriculum";
import { getKonuEntriesForGrade } from "@/lib/data/konu-curriculum";

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

let tableEnsured = false;

/**
 * Ensures tables exist in PostgreSQL or SQLite.
 */
export async function ensureCurriculumEntriesTable(): Promise<void> {
  if (tableEnsured) return;
  await ensureDatabaseSchema();

  try {
    await execute(`
      -- Migrate any legacy siyer entries and progress to efendimiz
      UPDATE "curriculum_entries" SET "categoryId" = 'efendimiz' WHERE "categoryId" = 'siyer';
      UPDATE "curriculum_entries" SET "id" = REPLACE("id", 'siyer', 'efendimiz') WHERE "id" LIKE '%siyer%';
      UPDATE "curriculum_progress" SET "entryId" = REPLACE("entryId", 'siyer', 'efendimiz') WHERE "entryId" LIKE '%siyer%';

      -- Clean up legacy premature extra entries that violated the 48-week rule
      DELETE FROM "curriculum_entries" WHERE "id" LIKE '%-extra-%' AND "categoryId" NOT IN ('adab-i-muaseret', 'ilmihal', 'ayet', 'hadis', 'esma', 'efendimiz');
      DELETE FROM "curriculum_progress" WHERE "entryId" LIKE '%-extra-%' AND "entryId" NOT LIKE '%adab-i-muaseret%' AND "entryId" NOT LIKE '%ilmihal%' AND "entryId" NOT LIKE '%ayet%' AND "entryId" NOT LIKE '%hadis%' AND "entryId" NOT LIKE '%esma%' AND "entryId" NOT LIKE '%efendimiz%';

      -- Clean up removed categories (risale, pirlanta) and their progress
      DELETE FROM "curriculum_entries" WHERE "categoryId" IN ('risale', 'pirlanta');
      DELETE FROM "curriculum_progress" WHERE "entryId" LIKE 'risale-%' OR "entryId" LIKE 'pirlanta-%' OR "entryId" LIKE '%-risale-%' OR "entryId" LIKE '%-pirlanta-%';
    `);
    tableEnsured = true;
  } catch (err) {
    console.error("Failed to execute curriculum entries table updates:", err);
  }
}

export async function getUserGenderFromDb(userId: string): Promise<Gender | null> {
  await ensureCurriculumEntriesTable();
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
  await ensureCurriculumEntriesTable();
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

export async function bulkUpsertCurriculumEntries(rows: Array<CurriculumEntryRow>): Promise<void> {
  if (rows.length === 0) return;
  const CHUNK_SIZE = 50;

  for (let i = 0; i < rows.length; i += CHUNK_SIZE) {
    const chunk = rows.slice(i, i + CHUNK_SIZE);
    const valuePlaceholders: string[] = [];
    const params: unknown[] = [];
    let pIdx = 1;

    for (const r of chunk) {
      valuePlaceholders.push(
        `($${pIdx++}, $${pIdx++}, $${pIdx++}, $${pIdx++}, $${pIdx++}, $${pIdx++}, $${pIdx++}, $${pIdx++}, $${pIdx++}, $${pIdx++}, $${pIdx++}, $${pIdx++}, $${pIdx++}, $${pIdx++}, $${pIdx++}, $${pIdx++})`
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
        r.title,
        r.body ?? null,
        r.resourceUrl ?? null,
        r.pdfUrl ?? null,
        r.pageCount ?? null,
        r.createdAt,
        r.updatedAt
      );
    }

    const sql = `
      INSERT INTO "curriculum_entries" (
        "id", "grade", "categoryId", "gender", "month", "week", "year",
        "isExtra", "extraOrder", "title", "body", "resourceUrl", "pdfUrl",
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
  await syncCategoryIfOutdated("adab-i-muaseret", 324, () => {
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
          pdfUrl: null,
          pageCount: entry.pageCount ?? null,
          createdAt: now,
          updatedAt: now,
        });
      }
    }
    return batch;
  });
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

export async function syncAyetCurriculumIfOutdated(): Promise<void> {
  await ensureCurriculumEntriesTable();
  await syncCategoryIfOutdated("ayet", 330, () => {
    const now = new Date().toISOString();
    const batch: CurriculumEntryRow[] = [];
    for (let grade = 1; grade <= 6; grade++) {
      const entries = getAyetEntriesForGrade(grade);
      for (const entry of entries) {
        batch.push({
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

export async function syncHadisCurriculumIfOutdated(): Promise<void> {
  await ensureCurriculumEntriesTable();
  await syncCategoryIfOutdated("hadis", 330, () => {
    const now = new Date().toISOString();
    const batch: CurriculumEntryRow[] = [];
    for (let grade = 1; grade <= 6; grade++) {
      const entries = getHadisEntriesForGrade(grade);
      for (const entry of entries) {
        batch.push({
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

export async function syncEsmaCurriculumIfOutdated(): Promise<void> {
  await ensureCurriculumEntriesTable();
  await syncCategoryIfOutdated("esma", 330, () => {
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
    return batch;
  });
}

export async function syncEfendimizCurriculumIfOutdated(): Promise<void> {
  await ensureCurriculumEntriesTable();
  await syncCategoryIfOutdated("efendimiz", 330, () => {
    const now = new Date().toISOString();
    const batch: CurriculumEntryRow[] = [];
    for (let grade = 1; grade <= 6; grade++) {
      const entries = getEfendimizEntriesForGrade(grade);
      for (const entry of entries) {
        batch.push({
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

export async function syncSahabeCurriculumIfOutdated(): Promise<void> {
  await ensureCurriculumEntriesTable();
  await syncCategoryIfOutdated("sahabe-kissalari", 330, () => {
    const now = new Date().toISOString();
    const batch: CurriculumEntryRow[] = [];
    for (let grade = 1; grade <= 6; grade++) {
      const entries = getSahabeEntriesForGrade(grade);
      for (const entry of entries) {
        batch.push({
          id: entry.id,
          grade,
          categoryId: "sahabe-kissalari",
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
  await syncCategoryIfOutdated("konu", 12, () => {
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
    return batch;
  });
}

export async function seedCurriculumDatabase(force = false): Promise<void> {
  await ensureCurriculumEntriesTable();

  const countRow = await queryOne<{ c: number | string }>(
    `SELECT COUNT(*) as c FROM "curriculum_entries"`
  );

  const count = Number(countRow?.c ?? 0);
  if (!force && count > 0) {
    await syncAyetCurriculumIfOutdated();
    await syncHadisCurriculumIfOutdated();
    await syncAdabCurriculumIfOutdated();
    await syncIlmihalCurriculumIfOutdated();
    await syncEsmaCurriculumIfOutdated();
    await syncEfendimizCurriculumIfOutdated();
    await syncSahabeCurriculumIfOutdated();
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

  // 2. Seed template standard entries for Grades 2 through 6
  for (let grade = 2; grade <= 6; grade++) {
    for (const cat of curriculumCategories) {
      if (
        cat.id === "adab-i-muaseret" ||
        cat.id === "ilmihal" ||
        cat.id === "ayet" ||
        cat.id === "hadis" ||
        cat.id === "esma" ||
        cat.id === "efendimiz" ||
        cat.id === "sahabe-kissalari" ||
        cat.id === "hocaefendi-dinleme" ||
        cat.id === "konu"
      ) {
        continue;
      }
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
        pdfUrl: null,
        pageCount: entry.pageCount ?? null,
        createdAt: now,
        updatedAt: now,
      });
    }

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

    const gradeSahabeEntries = getSahabeEntriesForGrade(grade);
    for (const entry of gradeSahabeEntries) {
      seedBatch.push({
        id: entry.id,
        grade,
        categoryId: "sahabe-kissalari",
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

  await bulkUpsertCurriculumEntries(seedBatch);
}

export function getFallbackEntries(grade?: number, gender?: Gender): CurriculumEntry[] {
  if (typeof grade === "number" && grade >= 1 && grade <= 6) {
    const ayet = getAyetEntriesForGrade(grade);
    const hadis = getHadisEntriesForGrade(grade);
    const adab = getAdabEntriesForGrade(grade);
    const esma = getEsmaEntriesForGrade(grade);
    const efendimiz = getEfendimizEntriesForGrade(grade);
    const sahabe = getSahabeEntriesForGrade(grade);
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
          e.categoryId !== "ayet" &&
          e.categoryId !== "hadis" &&
          e.categoryId !== "esma" &&
          e.categoryId !== "efendimiz" &&
          e.categoryId !== "sahabe-kissalari" &&
          e.categoryId !== "hocaefendi-dinleme"
      )
      .map((e) => ({ ...e, grade, id: grade === 1 ? e.id : `g${grade}-${e.id}` }));
    return resolveAllCurriculumEntries([
      ...others,
      ...ayet,
      ...hadis,
      ...adab,
      ...esma,
      ...efendimiz,
      ...sahabe,
      ...hocaefendi,
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
 * Retrieves all entries from PostgreSQL or SQLite, optionally filtered by Belgium grade and gender for İlmihal.
 */
export async function getCurriculumEntriesFromDb(
  grade?: number,
  gender?: Gender
): Promise<CurriculumEntry[]> {
  await ensureCurriculumEntriesTable();
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
export async function getCurriculumEntryByIdFromDb(id: string): Promise<CurriculumEntry | null> {
  await ensureCurriculumEntriesTable();
  await seedCurriculumDatabase();

  try {
    const row = await queryOne<CurriculumEntryRow>(
      `SELECT * FROM "curriculum_entries" WHERE "id" = $1`,
      [id]
    );

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
    return resolvedCategoryEntries.find((e) => e.id === id) ?? rowToEntry(row);
  } catch {
    for (let g = 1; g <= 6; g++) {
      const match = getFallbackEntries(g).find((e) => e.id === id);
      if (match) return match;
    }
    return null;
  }
}
