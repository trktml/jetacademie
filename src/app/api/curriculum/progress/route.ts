import { privateJson } from "@/lib/http";
import { headers } from "next/headers";
import { getAuth } from "@/lib/auth";
import { getCompletedEntryIds } from "@/lib/curriculum-progress";
import { getUserGenderFromDb } from "@/lib/user-preferences";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getAuth().api.getSession({ headers: await headers() });
  if (!session?.user) {
    return privateJson({
      userId: null,
      isSignedIn: false,
      completedEntryIds: [],
      gender: null,
    });
  }

  const [completedEntryIds, gender] = await Promise.all([
    getCompletedEntryIds(session.user.id),
    getUserGenderFromDb(session.user.id),
  ]);

  return privateJson({
    userId: session.user.id,
    isSignedIn: true,
    completedEntryIds,
    gender,
  });
}
