import { ensureDatabaseSchema } from "@/lib/auth";
import { execute, queryOne } from "@/lib/db";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;

/** Reserves an attempt atomically across app instances for an existing account. */
export async function reserveLoginAttempt(
  email: string
): Promise<{ allowed: boolean; userId: string | null }> {
  await ensureDatabaseSchema();
  const user = await queryOne<{ id: string }>(`SELECT "id" FROM "user" WHERE "email" = $1`, [
    email,
  ]);
  if (!user) return { allowed: true, userId: null };

  const now = Date.now();
  const cutoff = now - WINDOW_MS;
  const row = await queryOne<{ attempts: number }>(
    `INSERT INTO "auth_login_attempts" ("userId", "attempts", "windowStartedAt")
     VALUES ($1, 1, $2)
     ON CONFLICT ("userId") DO UPDATE SET
       "attempts" = CASE
         WHEN "auth_login_attempts"."windowStartedAt" <= $3 THEN 1
         WHEN "auth_login_attempts"."attempts" >= $4 THEN $5
         ELSE "auth_login_attempts"."attempts" + 1
       END,
       "windowStartedAt" = CASE
         WHEN "auth_login_attempts"."windowStartedAt" <= $6 THEN $7
         ELSE "auth_login_attempts"."windowStartedAt"
       END
     RETURNING "attempts"`,
    [user.id, now, cutoff, MAX_ATTEMPTS + 1, MAX_ATTEMPTS + 1, cutoff, now]
  );

  return { allowed: (row?.attempts ?? MAX_ATTEMPTS + 1) <= MAX_ATTEMPTS, userId: user.id };
}

export async function clearLoginAttempts(userId: string): Promise<void> {
  await execute(`DELETE FROM "auth_login_attempts" WHERE "userId" = $1`, [userId]);
}
