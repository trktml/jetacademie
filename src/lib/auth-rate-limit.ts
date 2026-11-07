import { createHash } from "node:crypto";
import { ensureDatabaseSchema } from "@/lib/database-schema";
import { execute, queryOne } from "@/lib/db";
import { privateJson } from "@/lib/http";

export const AUTH_WINDOW_MS = 15 * 60 * 1000;
const attemptKey = (scope: string, subject: string) =>
  createHash("sha256").update(`${scope}:${subject}`).digest("hex");
let nextCleanupAt = 0;

export async function clearAuthAttempts(scope: string, subject: string): Promise<void> {
  await execute('DELETE FROM "auth_request_attempts" WHERE "key" = $1', [
    attemptKey(scope, subject),
  ]);
}

/** Database-backed and atomic; attacker-controlled IP headers cannot reset the budget. */
export async function reserveAuthAttempt(
  scope: string,
  subject: string,
  max: number
): Promise<boolean> {
  await ensureDatabaseSchema();
  const now = Date.now();
  const key = attemptKey(scope, subject);
  if (now >= nextCleanupAt) {
    nextCleanupAt = now + AUTH_WINDOW_MS;
    try {
      await execute('DELETE FROM "auth_request_attempts" WHERE "startedAt" <= $1', [
        now - AUTH_WINDOW_MS,
      ]);
    } catch (error) {
      nextCleanupAt = 0;
      throw error;
    }
  }
  const row = await queryOne<{ attempts: number }>(
    `INSERT INTO "auth_request_attempts" ("key", "attempts", "startedAt") VALUES ($1, 1, $2)
     ON CONFLICT ("key") DO UPDATE SET
       "attempts" = CASE WHEN "auth_request_attempts"."startedAt" <= $3 THEN 1
         ELSE "auth_request_attempts"."attempts" + 1 END,
       "startedAt" = CASE WHEN "auth_request_attempts"."startedAt" <= $3 THEN $2
         ELSE "auth_request_attempts"."startedAt" END
     WHERE "auth_request_attempts"."startedAt" <= $3 OR "auth_request_attempts"."attempts" < $4
     RETURNING "attempts"`,
    [key, now, now - AUTH_WINDOW_MS, max]
  );
  return row !== null;
}

export function authLimitResponse(): Response {
  const response = privateJson({ error: "Çok fazla deneme. 15 dakika sonra tekrar deneyin." }, 429);
  response.headers.set("Retry-After", String(AUTH_WINDOW_MS / 1000));
  return response;
}
