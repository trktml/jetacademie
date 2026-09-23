import { betterAuth } from "better-auth";
import { Database } from "bun:sqlite";
import {
  activeDatabaseUrl,
  execute,
  getPool,
  getSqlite,
  isPostgres,
  resolveDatabaseUrl,
} from "./db";

export { isPostgres, activeDatabaseUrl };

export const SCHEMA_SQL = `
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
`;

// In-memory test environment initialization
if (!isPostgres) {
  const sqlite = getSqlite();
  if (sqlite) {
    sqlite.exec(SCHEMA_SQL);
  }
}

let schemaInitialized = false;
export async function ensureDatabaseSchema(): Promise<void> {
  if (schemaInitialized) return;
  try {
    await execute(SCHEMA_SQL);
    schemaInitialized = true;
  } catch (err) {
    console.error("[auth] Failed to initialize database schema:", err);
  }
}

// Database instance exported for tests & legacy compatibility
export const db = getSqlite() ?? (getPool() as unknown as Database);
export const dbPath = activeDatabaseUrl;
export const activeDbPath = activeDatabaseUrl;

export function resolveDatabasePath(
  envDatabaseUrl = process.env.DATABASE_URL,
  nodeEnv = process.env.NODE_ENV,
  bunEnv = process.env.BUN_ENV
): string {
  return resolveDatabaseUrl(envDatabaseUrl, nodeEnv, bunEnv);
}

export function initializeDatabase(targetPath: string): { db: Database; activePath: string } {
  try {
    const instance = new Database(targetPath);
    return { db: instance, activePath: targetPath };
  } catch {
    const fallback = new Database("/tmp/auth.sqlite");
    return { db: fallback, activePath: "/tmp/auth.sqlite" };
  }
}

export const auth = betterAuth({
  database: isPostgres
    ? (getPool() as NonNullable<ReturnType<typeof getPool>>)
    : (getSqlite() as NonNullable<ReturnType<typeof getSqlite>>),
  secret:
    process.env.BETTER_AUTH_SECRET || "development-secret-must-be-at-least-32-characters-long",
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  emailAndPassword: {
    enabled: true,
  },
  user: {
    deleteUser: {
      enabled: true,
    },
  },
});
