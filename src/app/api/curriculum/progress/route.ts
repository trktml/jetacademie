import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getCompletedEntryIds } from "@/lib/curriculum-progress";
import { getUserGenderFromDb } from "@/lib/curriculum-db";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    return NextResponse.json({
      isSignedIn: false,
      completedEntryIds: [],
      gender: null,
    });
  }

  const [completedEntryIds, gender] = await Promise.all([
    getCompletedEntryIds(session.user.id),
    getUserGenderFromDb(session.user.id),
  ]);

  return NextResponse.json({
    isSignedIn: true,
    completedEntryIds,
    gender,
  });
}
