"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { getCompletedEntryIds, saveCompletedEntry } from "@/lib/curriculum-progress";
import { getCurriculumEntriesFromDb } from "@/lib/curriculum-db";

/**
 * Misafir modunda localStorage'a kaydedilmiş ilerleme verilerini
 * oturum açmış kullanıcının veritabanı kaydına aktarır.
 */
export async function migrateGuestProgress(guestEntryIds: string[]) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) throw new Error("Oturum bulunamadı.");

  const existingIds = new Set(getCompletedEntryIds(session.user.id));
  const validIds = new Set(getCurriculumEntriesFromDb().map((e) => e.id));

  let migratedCount = 0;
  for (const entryId of guestEntryIds) {
    if (validIds.has(entryId) && !existingIds.has(entryId)) {
      saveCompletedEntry(session.user.id, entryId);
      migratedCount++;
    }
  }

  revalidatePath("/mufredat");
  return { migratedCount };
}
