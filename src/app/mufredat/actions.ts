"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { canCompleteEntry, curriculumEntries, getCategoryEntries } from "@/lib/curriculum";
import { getCompletedEntryIds, saveCompletedEntry } from "@/lib/curriculum-progress";

const entryIdSchema = z.string().min(1).max(120);

export async function markEntryAsRead(entryId: string) {
  const parsedEntryId = entryIdSchema.safeParse(entryId);
  if (!parsedEntryId.success) throw new Error("Geçersiz dosya.");

  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) throw new Error("İlerlemenizi kaydetmek için giriş yapın.");

  const entry = curriculumEntries.find((candidate) => candidate.id === parsedEntryId.data);
  if (!entry) throw new Error("Dosya bulunamadı.");

  const completedEntryIds = new Set(getCompletedEntryIds(session.user.id));
  const categoryEntries = getCategoryEntries(entry.categoryId);
  if (!canCompleteEntry(entry.id, categoryEntries, completedEntryIds)) {
    throw new Error("Önce sıradaki dosyayı tamamlayın.");
  }

  saveCompletedEntry(session.user.id, entry.id);
  revalidatePath("/mufredat");
  return { entryId: entry.id };
}
