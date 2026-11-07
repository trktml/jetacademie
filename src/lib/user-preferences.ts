import { execute, queryOne } from "@/lib/db";
import { ensureDatabaseSchema } from "@/lib/database-schema";
import type { Gender } from "@/lib/data/ilmihal-curriculum";

export async function getUserGenderFromDb(userId: string): Promise<Gender | null> {
  await ensureDatabaseSchema();
  const row = await queryOne<{ gender: string }>(
    `SELECT "gender" FROM "user_preferences" WHERE "userId" = $1`,
    [userId]
  );
  return row?.gender === "erkek" || row?.gender === "bayan" ? row.gender : null;
}

export async function setUserGenderInDb(userId: string, gender: Gender): Promise<void> {
  await ensureDatabaseSchema();
  const now = new Date().toISOString();
  await execute(
    `INSERT INTO "user_preferences" ("userId", "gender", "createdAt", "updatedAt")
       VALUES ($1, $2, $3, $4)
       ON CONFLICT("userId") DO UPDATE SET "gender" = EXCLUDED."gender", "updatedAt" = EXCLUDED."updatedAt"`,
    [userId, gender, now, now]
  );
}
