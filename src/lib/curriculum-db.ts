import {
  TOTAL_CURRICULUM_WEEKS,
  isCurriculumCategoryId,
  resolveAllCurriculumEntries,
  type CurriculumEntry,
} from "@/lib/curriculum";
import { query, readOnlyTransaction, transaction } from "@/lib/db";
import type { Gender } from "@/lib/data/ilmihal-curriculum";
import {
  contentSlot,
  getEditorOverrides,
  mergeEditorContent,
  saveEditorContent,
} from "@/lib/editor/content";
import { ActionError } from "@/lib/action-result";
import type { EditorEntryInput } from "@/lib/editor/validation";
import { lockCurriculumCategories } from "./curriculum/repository";
import type { EditorRecord } from "@/lib/editor/types";
import { rowToEntry, type CurriculumEntryRow } from "./curriculum/entry-row";
import { seedCurriculumDatabase } from "./curriculum/seed";

// Stable entry point for existing routes, actions and maintenance scripts.
export type { CurriculumEntryRow } from "./curriculum/entry-row";
export {
  ensureCurriculumEntriesTable,
  migrateLegacyGradeOneCurriculumEntryIds,
} from "./curriculum/schema";
export { bulkUpsertCurriculumEntries } from "./curriculum/repository";
export {
  seedCurriculumDatabase,
  excludeAndDeleteCurriculumCategoriesFromSeed,
  allowCurriculumCategoriesToSeed,
  syncAdabCurriculumIfOutdated,
  syncIlmihalCurriculumIfOutdated,
  syncEsmaCurriculumIfOutdated,
  migrateLegacyKonuProgress,
  syncTefekkurCurriculumIfOutdated,
} from "./curriculum/seed";
export {
  saveWeeklyCurriculumPackage,
  publishCurriculumWeek,
  deleteCurriculumWeek,
  getCurriculumWeekSummaries,
  type WeekSummary,
} from "./curriculum/weeks";
export { getUserGenderFromDb, setUserGenderInDb } from "./user-preferences";

/** Read the base catalog and editor changes from the same committed snapshot. */
async function readCatalog(grade?: number, includeDrafts = false): Promise<EditorRecord[]> {
  await seedCurriculumDatabase();
  return readOnlyTransaction(() => readCatalogRows(grade, includeDrafts));
}

async function readCatalogRows(grade: number | undefined, includeDrafts: boolean) {
  const rows = await query<CurriculumEntryRow>(
    `SELECT * FROM "curriculum_entries"${grade === undefined ? "" : ' WHERE "grade" = $1'} ORDER BY "id"`,
    grade === undefined ? [] : [grade]
  );
  return resolveCurriculumCatalog(rows, await getEditorOverrides(grade), includeDrafts);
}

export function resolveCurriculumCatalog(
  rows: CurriculumEntryRow[],
  overrides: EditorRecord[],
  includeDrafts: boolean
): EditorRecord[] {
  const revisionById = new Map(overrides.map((record) => [record.entry.id, record]));
  const entries = mergeEditorContent(
    rows.filter((row) => isCurriculumCategoryId(row.categoryId)).map(rowToEntry),
    overrides
  );

  return resolveAllCurriculumEntries(entries)
    .filter((entry) => includeDrafts || !entry.isDraft)
    .map((entry) => {
      const revision = revisionById.get(entry.id);
      return { entry, revision: revision?.revision ?? 0, updatedAt: revision?.updatedAt ?? null };
    });
}

export function getCurriculumEditorRecords(grade: number): Promise<EditorRecord[]> {
  return readCatalog(grade, true);
}

export async function getCurriculumEntriesFromDb(
  grade?: number,
  gender?: Gender,
  includeDrafts = false
): Promise<CurriculumEntry[]> {
  return (await readCatalog(grade, includeDrafts))
    .map(({ entry }) => entry)
    .filter((entry) => !gender || !entry.gender || entry.gender === gender);
}

export async function getCurriculumEntryByIdFromDb(id: string): Promise<CurriculumEntry | null> {
  const { entries, canonicalId } = await getPublishedCurriculumForEntry(id);
  return entries.find((entry) => entry.id === canonicalId) ?? null;
}

/** Use the same published catalog to look up an entry and check its place in the sequence. */
export async function getPublishedCurriculumForEntry(id: string) {
  const scopedGrade = /^g([1-6])-/.exec(id);
  const grade = scopedGrade ? Number(scopedGrade[1]) : 1;
  const canonicalId = scopedGrade ? id : `g1-${id}`;
  return { entries: await getCurriculumEntriesFromDb(grade), canonicalId };
}

/** Validate and save against one catalog state while package writes hold the same category lock. */
export async function updateCurriculumEditorEntry(input: EditorEntryInput) {
  await seedCurriculumDatabase();
  return transaction(async () => {
    await lockCurriculumCategories([input.categoryId]);
    const entries = (await readCatalogRows(input.grade, true)).map(({ entry }) => entry);
    if (input.extraOrder) {
      const track = entries.filter(
        (entry) => entry.categoryId === input.categoryId && entry.gender === input.gender
      );
      const standard = new Set(track.filter((entry) => !entry.isExtra).map(contentSlot));
      if (standard.size < TOTAL_CURRICULUM_WEEKS) {
        throw new ActionError("Ek hafta için önce 48 normal haftayı doldurun.");
      }
      const lastExtra = Math.max(0, ...track.map((entry) => entry.extraOrder ?? 0));
      if (input.extraOrder > lastExtra + 1) {
        throw new ActionError("Ek haftaları sırayla ekleyin.");
      }
    }
    return saveEditorContent(input, entries);
  });
}
