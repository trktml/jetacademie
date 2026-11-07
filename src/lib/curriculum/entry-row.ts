import {
  curriculumYearForPeriod,
  type CurriculumCategoryId,
  type CurriculumEntry,
} from "@/lib/curriculum";
import type { Gender } from "@/lib/data/ilmihal-curriculum";
import { curriculumPdfUrl, curriculumResourceUrl } from "@/lib/curriculum-resource-url";

export interface CurriculumEntryRow {
  id: string;
  grade: number;
  categoryId: string;
  gender: string | null;
  month: number | null;
  week: number | null;
  year: number | null;
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

export function withGradeScopedId<T extends { id: string; grade?: number }>(entry: T): T {
  const grade = entry.grade ?? 1;
  if (grade !== 1 || entry.id.startsWith("g1-")) return entry;
  return { ...entry, id: `g1-${entry.id}` };
}

export function rowToEntry(row: CurriculumEntryRow): CurriculumEntry {
  const month = row.month ?? 1;
  const isExtra = Boolean(row.isExtra);
  return {
    id: row.id,
    grade: row.grade,
    gender: (row.gender as Gender) || undefined,
    categoryId: row.categoryId as CurriculumCategoryId,
    month,
    week: row.week ?? 1,
    year: row.year ?? curriculumYearForPeriod(month, isExtra),
    isExtra,
    extraOrder: row.extraOrder ?? undefined,
    isDraft: Boolean(row.isDraft),
    title: row.title,
    body: row.body ?? undefined,
    resourceUrl: curriculumResourceUrl(row.resourceUrl),
    pdfUrl: curriculumPdfUrl(row.pdfUrl) ?? curriculumPdfUrl(row.resourceUrl),
    pageCount: row.pageCount ?? undefined,
  };
}

/** One mapping for seed, import and database persistence. */
export function entryToRow(
  entry: CurriculumEntry,
  now = new Date().toISOString()
): CurriculumEntryRow {
  return {
    id: entry.id,
    grade: entry.grade ?? 1,
    categoryId: entry.categoryId,
    gender: entry.gender ?? null,
    month: entry.month,
    week: entry.week,
    year: entry.year,
    isExtra: entry.isExtra ? 1 : 0,
    extraOrder: entry.extraOrder ?? null,
    isDraft: entry.isDraft ? 1 : 0,
    title: entry.title,
    body: entry.body ?? null,
    resourceUrl: curriculumResourceUrl(entry.resourceUrl) ?? null,
    pdfUrl: curriculumPdfUrl(entry.pdfUrl) ?? curriculumPdfUrl(entry.resourceUrl) ?? null,
    pageCount: entry.pageCount ?? null,
    createdAt: now,
    updatedAt: now,
  };
}
