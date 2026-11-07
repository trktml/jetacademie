"use server";

import { revalidatePath } from "next/cache";
import { requireActionUser, runUserAction } from "@/lib/action-user";
import { ActionError } from "@/lib/action-result";
import { guestProgressSchema } from "@/lib/validations/curriculum-progress";
import { importGuestProgress } from "@/lib/curriculum-progress-service";

export async function migrateGuestProgress(
  expectedUserId: string,
  guestEntryIds: string[],
  guestGender?: "erkek" | "bayan" | null
) {
  return runUserAction(async () => {
    const parsed = guestProgressSchema.safeParse({
      expectedUserId,
      entryIds: guestEntryIds,
      gender: guestGender,
    });
    if (!parsed.success) throw new ActionError("Geçersiz ilerleme verisi.");
    const user = await requireActionUser("Oturum bulunamadı.", parsed.data.expectedUserId);
    const result = await importGuestProgress(user.id, parsed.data.entryIds, parsed.data.gender);
    revalidatePath("/mufredat");
    return { ...result, userId: user.id };
  });
}
