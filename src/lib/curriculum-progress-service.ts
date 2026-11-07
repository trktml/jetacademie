import { canCompleteEntry, canUnmarkEntry, getCategoryEntries } from "@/lib/curriculum";
import { getCurriculumEntriesFromDb, getPublishedCurriculumForEntry } from "@/lib/curriculum-db";
import {
  getCompletedEntryIds,
  removeCompletedEntry,
  saveCompletedEntry,
} from "@/lib/curriculum-progress";
import { getPool, query, transaction } from "@/lib/db";
import { getUserGenderFromDb, setUserGenderInDb } from "@/lib/user-preferences";
import type { Gender } from "@/lib/data/ilmihal-curriculum";
import { ActionError } from "@/lib/action-result";

/** Serialize a user's progress mutations across app instances before checking sequence rules. */
async function lockUser(userId: string): Promise<void> {
  if (getPool()) await query('SELECT "id" FROM "user" WHERE "id" = $1 FOR UPDATE', [userId]);
}

export async function updateEntryProgress(userId: string, entryId: string, completed: boolean) {
  const { entries, canonicalId } = await getPublishedCurriculumForEntry(entryId);
  const entry = entries.find((entry) => entry.id === canonicalId);
  if (!entry) throw new ActionError("Dosya bulunamadı.");
  return transaction(async () => {
    await lockUser(userId);
    const completedIds = new Set(await getCompletedEntryIds(userId));
    const categoryEntries = getCategoryEntries(
      entry.categoryId,
      entries,
      entry.grade,
      entry.gender
    );
    const permitted = completed
      ? canCompleteEntry(entry.id, categoryEntries, completedIds)
      : canUnmarkEntry(entry.id, categoryEntries, completedIds);
    if (!permitted)
      throw new ActionError(
        completed
          ? "Önce mevcut dersi tamamlayın."
          : "Yalnızca en son tamamlanan dosya geri alınabilir."
      );
    if (completed) await saveCompletedEntry(userId, entry.id);
    else await removeCompletedEntry(userId, entry.id);
    return { entryId: entry.id };
  });
}

export async function importGuestProgress(
  userId: string,
  entryIds: string[],
  gender?: Gender | null
) {
  const validIds = new Set((await getCurriculumEntriesFromDb()).map((entry) => entry.id));
  const uniqueIds = [...new Set(entryIds)].filter((id) => validIds.has(id));
  return transaction(async () => {
    await lockUser(userId);
    if (gender && !(await getUserGenderFromDb(userId))) await setUserGenderInDb(userId, gender);
    let migratedCount = 0;
    for (let start = 0; start < uniqueIds.length; start += 200) {
      const chunk = uniqueIds.slice(start, start + 200);
      const values = chunk.map((_, index) => `($1, $${index + 2})`).join(", ");
      const inserted = await query<{ entryId: string }>(
        `INSERT INTO "curriculum_progress" ("userId", "entryId") VALUES ${values}
         ON CONFLICT ("userId", "entryId") DO NOTHING RETURNING "entryId"`,
        [userId, ...chunk]
      );
      migratedCount += inserted.length;
    }
    return { migratedCount };
  });
}
