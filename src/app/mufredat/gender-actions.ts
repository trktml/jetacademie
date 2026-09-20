"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { getUserGenderFromDb, setUserGenderInDb } from "@/lib/curriculum-db";
import { type Gender } from "@/lib/data/ilmihal-curriculum";

export async function updateUserGender(gender: Gender) {
  if (gender !== "erkek" && gender !== "bayan") {
    throw new Error("Geçersiz cinsiyet tercihi.");
  }

  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    throw new Error("Tercihinizi kaydetmek için giriş yapın.");
  }

  setUserGenderInDb(session.user.id, gender);
  revalidatePath("/mufredat");
  return { success: true, gender };
}

export async function getUserGender(): Promise<Gender | null> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) return null;
  return getUserGenderFromDb(session.user.id);
}
