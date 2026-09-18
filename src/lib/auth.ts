import { betterAuth } from "better-auth";
import { Database } from "bun:sqlite";
import { existsSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";

/**
 * Resolves the SQLite database path with automated test isolation guardrails.
 * If running under test mode and DATABASE_URL is unset or pointing to the local dev file (auth.sqlite),
 * it routes to ':memory:' to prevent tests from wiping developer data.
 */
export function resolveDatabasePath(
  envDatabaseUrl = process.env.DATABASE_URL,
  nodeEnv = process.env.NODE_ENV,
  bunEnv = process.env.BUN_ENV
): string {
  const isTest = nodeEnv === "test" || bunEnv === "test";
  if (isTest && (!envDatabaseUrl || envDatabaseUrl === "auth.sqlite")) {
    return ":memory:";
  }
  return envDatabaseUrl || "auth.sqlite";
}

export const dbPath = resolveDatabasePath();

/**
 * Creates and initializes the Bun SQLite database connection with WAL mode and busy timeout.
 * If the configured path fails due to container volume permission restrictions (SQLITE_CANTOPEN),
 * outputs actionable diagnostic information and attempts an emergency fallback to /tmp/auth.sqlite
 * so the application remains responsive rather than crashing unhandled at module import time.
 */
export function initializeDatabase(targetPath: string): { db: Database; activePath: string } {
  const tryOpen = (path: string) => {
    if (path !== ":memory:") {
      const dir = dirname(path);
      if (dir && dir !== "." && !existsSync(dir)) {
        try {
          mkdirSync(dir, { recursive: true });
        } catch (dirErr) {
          console.warn(`[auth] Warning: could not create directory "${dir}":`, dirErr);
        }
      }
    }
    const instance = new Database(path);
    instance.exec("PRAGMA busy_timeout = 5000;");
    instance.exec("PRAGMA journal_mode = WAL;");
    instance.exec("PRAGMA foreign_keys = ON;");
    return instance;
  };

  try {
    const instance = tryOpen(targetPath);
    return { db: instance, activePath: targetPath };
  } catch (primaryErr) {
    const errorMsg = primaryErr instanceof Error ? primaryErr.message : String(primaryErr);
    console.error(
      `[auth] ERROR: Failed to open SQLite database at "${targetPath}": ${errorMsg}. ` +
        `(uid: ${typeof process.getuid === "function" ? process.getuid() : "n/a"}, ` +
        `gid: ${typeof process.getgid === "function" ? process.getgid() : "n/a"})`
    );

    if (targetPath !== ":memory:" && targetPath !== "/tmp/auth.sqlite") {
      const fallbackPath = "/tmp/auth.sqlite";
      console.warn(
        `[auth] EMERGENCY FALLBACK: Attempting to open fallback database at "${fallbackPath}" to prevent crash.`
      );
      try {
        const fallbackDb = tryOpen(fallbackPath);
        console.warn(
          `[auth] Operating on temporary fallback database "${fallbackPath}". ` +
            `NOTICE: Persistent data will NOT survive container restarts until directory permissions for "${targetPath}" are resolved.`
        );
        return { db: fallbackDb, activePath: fallbackPath };
      } catch (fallbackErr) {
        console.error(`[auth] Fallback database also failed:`, fallbackErr);
      }
    }

    throw primaryErr;
  }
}

const initialized = initializeDatabase(dbPath);
export const db = initialized.db;
export const activeDbPath = initialized.activePath;

// Initialize Better-Auth tables if they do not exist yet
db.exec(`
  CREATE TABLE IF NOT EXISTS "user" (
    "id" text not null primary key,
    "name" text not null,
    "email" text not null unique,
    "emailVerified" integer not null default 0,
    "image" text,
    "createdAt" date not null,
    "updatedAt" date not null
  );
  CREATE TABLE IF NOT EXISTS "session" (
    "id" text not null primary key,
    "expiresAt" date not null,
    "token" text not null unique,
    "createdAt" date not null,
    "updatedAt" date not null,
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
    "accessTokenExpiresAt" date,
    "refreshTokenExpiresAt" date,
    "scope" text,
    "password" text,
    "createdAt" date not null,
    "updatedAt" date not null
  );
  CREATE TABLE IF NOT EXISTS "verification" (
    "id" text not null primary key,
    "identifier" text not null,
    "value" text not null,
    "expiresAt" date not null,
    "createdAt" date not null,
    "updatedAt" date not null
  );
  CREATE INDEX IF NOT EXISTS "session_userId_idx" on "session" ("userId");
  CREATE INDEX IF NOT EXISTS "account_userId_idx" on "account" ("userId");
  CREATE INDEX IF NOT EXISTS "verification_identifier_idx" on "verification" ("identifier");
  CREATE TABLE IF NOT EXISTS "curriculum_progress" (
    "userId" text not null references "user" ("id") on delete cascade,
    "entryId" text not null,
    "completedAt" date not null,
    primary key ("userId", "entryId")
  );
  CREATE INDEX IF NOT EXISTS "curriculum_progress_userId_completedAt_idx"
    on "curriculum_progress" ("userId", "completedAt");
`);

export const auth = betterAuth({
  database: db,
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
