"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { getAuth } from "@/lib/auth";
import { ActionError } from "@/lib/action-result";
import { runUserAction, requireActionUser } from "@/lib/action-user";
import { getUserGenderFromDb, setUserGenderInDb } from "@/lib/user-preferences";
import { type Gender } from "@/lib/data/ilmihal-curriculum";

export async function updateUserGender(gender: Gender, expectedUserId?: string) {
  return runUserAction(async () => {
    if (gender !== "erkek" && gender !== "bayan") {
      throw new ActionError("Geçersiz cinsiyet tercihi.");
    }

    const user = await requireActionUser("Tercihinizi kaydetmek için giriş yapın.", expectedUserId);

    await setUserGenderInDb(user.id, gender);
    revalidatePath("/mufredat");
    return { success: true, gender, userId: user.id };
  });
}

export async function getUserGender(): Promise<Gender | null> {
  const session = await getAuth().api.getSession({ headers: await headers() });
  if (!session?.user) return null;
  return await getUserGenderFromDb(session.user.id);
}
