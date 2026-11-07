import { execute } from "./db";

export const SCHEMA_SQL = `
  CREATE TABLE IF NOT EXISTS "auth_request_attempts" (
    "key" text not null primary key,
    "attempts" integer not null,
    "startedAt" bigint not null
  );
  CREATE INDEX IF NOT EXISTS "auth_request_attempts_startedAt_idx" ON "auth_request_attempts" ("startedAt");

  CREATE TABLE IF NOT EXISTS "user" (
    "id" text not null primary key,
    "name" text not null,
    "email" text not null unique,
    "emailVerified" boolean not null default false,
    "image" text,
    "createdAt" timestamp not null default current_timestamp,
    "updatedAt" timestamp not null default current_timestamp
  );

  CREATE TABLE IF NOT EXISTS "session" (
    "id" text not null primary key,
    "expiresAt" timestamp not null,
    "token" text not null unique,
    "createdAt" timestamp not null default current_timestamp,
    "updatedAt" timestamp not null default current_timestamp,
    "ipAddress" text,
    "userAgent" text,
    "userId" text not null references "user" ("id") on delete cascade
  );

  CREATE TABLE IF NOT EXISTS "account" (
    "id" text not null primary key,
    "accountId" text not null,
    "providerId" text not null,
    "userId" text not null references "user" ("id") on delete cascade,
    "accessToken" text,
    "refreshToken" text,
    "idToken" text,
    "accessTokenExpiresAt" timestamp,
    "refreshTokenExpiresAt" timestamp,
    "scope" text,
    "password" text,
    "createdAt" timestamp not null default current_timestamp,
    "updatedAt" timestamp not null default current_timestamp
  );

  CREATE TABLE IF NOT EXISTS "verification" (
    "id" text not null primary key,
    "identifier" text not null,
    "value" text not null,
    "expiresAt" timestamp not null,
    "createdAt" timestamp not null default current_timestamp,
    "updatedAt" timestamp not null default current_timestamp
  );

  CREATE INDEX IF NOT EXISTS "session_userId_idx" on "session" ("userId");
  CREATE INDEX IF NOT EXISTS "account_userId_idx" on "account" ("userId");
  CREATE INDEX IF NOT EXISTS "verification_identifier_idx" on "verification" ("identifier");

  CREATE TABLE IF NOT EXISTS "curriculum_progress" (
    "userId" text not null references "user" ("id") on delete cascade,
    "entryId" text not null,
    "completedAt" timestamp not null default current_timestamp,
    primary key ("userId", "entryId")
  );

  CREATE INDEX IF NOT EXISTS "curriculum_progress_userId_completedAt_idx"
    on "curriculum_progress" ("userId", "completedAt");

  CREATE TABLE IF NOT EXISTS "user_preferences" (
    "userId" text not null primary key references "user" ("id") on delete cascade,
    "gender" text not null check ("gender" in ('erkek', 'bayan')),
    "createdAt" timestamp not null default current_timestamp,
    "updatedAt" timestamp not null default current_timestamp
  );

  CREATE TABLE IF NOT EXISTS "curriculum_entries" (
    "id" text not null primary key,
    "grade" integer not null default 1,
    "categoryId" text not null,
    "gender" text,
    "month" integer,
    "week" integer,
    "year" integer default 2026,
    "isExtra" integer not null default 0,
    "extraOrder" integer,
    "isDraft" integer not null default 0,
    "title" text not null,
    "body" text,
    "resourceUrl" text,
    "pdfUrl" text,
    "pageCount" integer,
    "createdAt" timestamp not null default current_timestamp,
    "updatedAt" timestamp not null default current_timestamp
  );

  CREATE INDEX IF NOT EXISTS "curriculum_entries_grade_category_idx"
    on "curriculum_entries" ("grade", "categoryId", "isExtra", "month", "week");
  CREATE INDEX IF NOT EXISTS "curriculum_entries_grade_category_gender_idx"
    on "curriculum_entries" ("grade", "categoryId", "gender", "isExtra", "month", "week");
  CREATE INDEX IF NOT EXISTS "curriculum_entries_draft_idx"
    on "curriculum_entries" ("isDraft");
`;

let schemaInitialized = false;
let schemaPromise: Promise<void> | null = null;
export async function ensureDatabaseSchema(): Promise<void> {
  if (schemaInitialized) return;
  schemaPromise ??= execute(SCHEMA_SQL)
    .then(() => {
      schemaInitialized = true;
    })
    .catch((err: unknown) => {
      console.error("[auth] Failed to initialize database schema:", err);
      throw err;
    })
    .finally(() => {
      schemaPromise = null;
    });
  await schemaPromise;
}
