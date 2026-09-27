import { createHash, createHmac, randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { execute, queryOne } from "@/lib/db";
import { ensureEditorSchema } from "./schema";

function deriveKey(password: string, salt: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    scrypt(
      password,
      salt,
      64,
      { cost: 131072, blockSize: 8, parallelization: 1, maxmem: 256 * 1024 * 1024 },
      (error, key) => {
        if (error) reject(error);
        else resolve(key);
      }
    );
  });
}
export const EDITOR_SESSION_SECONDS = 8 * 60 * 60;
export const editorCookieName = () =>
  process.env.NODE_ENV === "production" ? "__Host-jet-editor" : "jet-editor";
const digest = (value: string) => createHash("sha256").update(value).digest("hex");

export function editorConfig() {
  const username = process.env.CURRICULUM_ADMIN_USERNAME;
  const passwordHash = process.env.CURRICULUM_ADMIN_PASSWORD_HASH;
  const secret = process.env.CURRICULUM_ADMIN_SECRET;
  const origin = process.env.CURRICULUM_ADMIN_ORIGIN || process.env.NEXT_PUBLIC_APP_URL;
  if (
    !username ||
    !passwordHash ||
    !/^scrypt:[a-f0-9]{32}:[a-f0-9]{128}$/.test(passwordHash) ||
    !secret ||
    secret.length < 32 ||
    !origin
  ) {
    throw new Error("EDITOR_NOT_CONFIGURED");
  }
  const url = new URL(origin);
  if (url.origin !== origin || (process.env.NODE_ENV === "production" && url.protocol !== "https:"))
    throw new Error("EDITOR_NOT_CONFIGURED");
  return {
    username,
    passwordHash,
    secret,
    origin,
    version: digest(`${username}:${passwordHash}:${secret}`),
  };
}

export async function hashEditorPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const key = await deriveKey(password, salt);
  return `scrypt:${salt}:${key.toString("hex")}`;
}

export async function verifyEditorCredentials(
  username: string,
  password: string
): Promise<boolean> {
  const config = editorConfig();
  const [, salt, expected] = config.passwordHash.split(":");
  const actual = await deriveKey(password, salt);
  const userMatches = timingSafeEqual(
    Buffer.from(digest(username)),
    Buffer.from(digest(config.username))
  );
  return timingSafeEqual(actual, Buffer.from(expected, "hex")) && userMatches;
}

/** A single atomic budget covers every username, including invented accounts. */
export async function reserveEditorLogin(): Promise<boolean> {
  await ensureEditorSchema();
  const now = Date.now();
  const cutoff = now - 15 * 60 * 1000;
  const row = await queryOne<{ attempts: number }>(
    `
    INSERT INTO "curriculum_editor_attempts" ("key", "attempts", "startedAt") VALUES ('login', 1, $1)
    ON CONFLICT ("key") DO UPDATE SET
      "attempts" = CASE WHEN "curriculum_editor_attempts"."startedAt" <= $2 THEN 1 ELSE CASE WHEN "curriculum_editor_attempts"."attempts" < 11 THEN "curriculum_editor_attempts"."attempts" + 1 ELSE 11 END END,
      "startedAt" = CASE WHEN "curriculum_editor_attempts"."startedAt" <= $3 THEN $4 ELSE "curriculum_editor_attempts"."startedAt" END
    RETURNING "attempts"`,
    [now, cutoff, cutoff, now]
  );
  return Number(row?.attempts ?? 11) <= 10;
}

export function editorCsrf(token: string): string {
  return createHmac("sha256", editorConfig().secret).update(token).digest("hex");
}
export async function createEditorSession(): Promise<string> {
  const config = editorConfig();
  await ensureEditorSchema();
  await execute(`DELETE FROM "curriculum_editor_sessions" WHERE "expiresAt" <= $1`, [Date.now()]);
  const token = randomBytes(32).toString("hex");
  await execute(
    `INSERT INTO "curriculum_editor_sessions" ("tokenHash", "credentialVersion", "expiresAt") VALUES ($1, $2, $3)`,
    [digest(token), config.version, Date.now() + EDITOR_SESSION_SECONDS * 1000]
  );
  return token;
}
export async function hasEditorSession(token?: string): Promise<boolean> {
  const config = editorConfig();
  if (!token || !/^[a-f0-9]{64}$/.test(token)) return false;
  await ensureEditorSchema();
  const row = await queryOne<{ credentialVersion: string; expiresAt: number | string }>(
    `SELECT "credentialVersion", "expiresAt" FROM "curriculum_editor_sessions" WHERE "tokenHash" = $1`,
    [digest(token)]
  );
  return !!row && row.credentialVersion === config.version && Number(row.expiresAt) > Date.now();
}
export async function revokeEditorSession(token: string): Promise<void> {
  await ensureEditorSchema();
  await execute(`DELETE FROM "curriculum_editor_sessions" WHERE "tokenHash" = $1`, [digest(token)]);
}
export function getEditorToken(request: Request): string | undefined {
  return request.headers
    .get("cookie")
    ?.split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${editorCookieName()}=`))
    ?.slice(editorCookieName().length + 1);
}
export function validEditorCsrf(request: Request, token: string): boolean {
  const csrf = request.headers.get("x-editor-csrf");
  return (
    !!csrf &&
    /^[a-f0-9]{64}$/.test(csrf) &&
    timingSafeEqual(Buffer.from(csrf), Buffer.from(editorCsrf(token)))
  );
}
