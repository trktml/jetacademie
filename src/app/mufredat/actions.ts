"use server";

import { revalidatePath } from "next/cache";
import { ActionError } from "@/lib/action-result";
import { runUserAction, requireActionUser } from "@/lib/action-user";
import { entryIdSchema } from "@/lib/validations/curriculum-progress";
import { updateEntryProgress } from "@/lib/curriculum-progress-service";

async function updateProgress(entryId: string, completed: boolean, expectedUserId?: string) {
  const parsed = entryIdSchema.safeParse(entryId);
  if (!parsed.success) throw new ActionError("Geçersiz dosya.");
  const user = await requireActionUser(
    completed
      ? "İlerlemenizi kaydetmek için giriş yapın."
      : "İlerlemenizi güncellemek için giriş yapın.",
    expectedUserId
  );
  const result = await updateEntryProgress(user.id, parsed.data, completed);
  revalidatePath("/mufredat");
  return { ...result, userId: user.id };
}

export async function markEntryAsRead(entryId: string, expectedUserId?: string) {
  return runUserAction(() => updateProgress(entryId, true, expectedUserId));
}

export async function unmarkEntryAsRead(entryId: string, expectedUserId?: string) {
  return runUserAction(() => updateProgress(entryId, false, expectedUserId));
}
