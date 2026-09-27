import { execute } from "@/lib/db";

let ready: Promise<void> | undefined;
export function ensureEditorSchema(): Promise<void> {
  ready ??= execute(`
    CREATE TABLE IF NOT EXISTS "curriculum_editor_sessions" (
      "tokenHash" text PRIMARY KEY,
      "credentialVersion" text NOT NULL,
      "expiresAt" bigint NOT NULL
    );
    CREATE TABLE IF NOT EXISTS "curriculum_editor_attempts" (
      "key" text PRIMARY KEY,
      "attempts" integer NOT NULL,
      "startedAt" bigint NOT NULL
    );
    CREATE TABLE IF NOT EXISTS "curriculum_editor_content" (
      "slot" text PRIMARY KEY,
      "grade" integer NOT NULL,
      "entryId" text NOT NULL UNIQUE,
      "entry" text NOT NULL,
      "revision" integer NOT NULL,
      "updatedAt" text NOT NULL
    );
    CREATE INDEX IF NOT EXISTS "curriculum_editor_content_grade" ON "curriculum_editor_content" ("grade");
  `)
    .then(() => {})
    .catch((error) => {
      ready = undefined;
      throw error;
    });
  return ready;
}
