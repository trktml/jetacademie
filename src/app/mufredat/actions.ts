"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { canCompleteEntry, canUnmarkEntry, getCategoryEntries } from "@/lib/curriculum";
import { curriculumEntries } from "@/lib/curriculum-data";
import { getCurriculumEntriesFromDb, getCurriculumEntryByIdFromDb } from "@/lib/curriculum-db";
import {
  getCompletedEntryIds,
  removeCompletedEntry,
  saveCompletedEntry,
} from "@/lib/curriculum-progress";

const entryIdSchema = z.string().min(1).max(120);

export async function markEntryAsRead(entryId: string) {
  const parsedEntryId = entryIdSchema.safeParse(entryId);
  if (!parsedEntryId.success) throw new Error("Geçersiz dosya.");

  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) throw new Error("İlerlemenizi kaydetmek için giriş yapın.");

  const entry =
    (await getCurriculumEntryByIdFromDb(parsedEntryId.data)) ??
    curriculumEntries.find((candidate) => candidate.id === parsedEntryId.data);
  if (!entry) throw new Error("Dosya bulunamadı.");

  const completedEntryIds = new Set(await getCompletedEntryIds(session.user.id));
  const gradeEntries = await getCurriculumEntriesFromDb(entry.grade ?? 1);
  const categoryEntries = getCategoryEntries(entry.categoryId, gradeEntries);
  if (!canCompleteEntry(entry.id, categoryEntries, completedEntryIds)) {
    throw new Error("Önce sıradaki dosyayı tamamlayın.");
  }

  await saveCompletedEntry(session.user.id, entry.id);
  revalidatePath("/mufredat");
  return { entryId: entry.id };
}

export async function unmarkEntryAsRead(entryId: string) {
  const parsedEntryId = entryIdSchema.safeParse(entryId);
  if (!parsedEntryId.success) throw new Error("Geçersiz dosya.");

  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) throw new Error("İlerlemenizi güncellemek için giriş yapın.");

  const entry =
    (await getCurriculumEntryByIdFromDb(parsedEntryId.data)) ??
    curriculumEntries.find((candidate) => candidate.id === parsedEntryId.data);
  if (!entry) throw new Error("Dosya bulunamadı.");

  const completedEntryIds = new Set(await getCompletedEntryIds(session.user.id));
  const gradeEntries = await getCurriculumEntriesFromDb(entry.grade ?? 1);
  const categoryEntries = getCategoryEntries(entry.categoryId, gradeEntries);
  if (!canUnmarkEntry(entry.id, categoryEntries, completedEntryIds)) {
    throw new Error("Yalnızca en son tamamlanan dosya geri alınabilir.");
  }

  await removeCompletedEntry(session.user.id, entry.id);
  revalidatePath("/mufredat");
  return { entryId: entry.id };
}
