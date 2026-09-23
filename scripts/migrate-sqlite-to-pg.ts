import { existsSync } from "node:fs";
import { Database } from "bun:sqlite";
import { Pool } from "pg";
import { SCHEMA_SQL } from "../src/lib/auth";
import type { CurriculumEntryRow } from "../src/lib/curriculum-db";

interface UserRow {
  id: string;
  name: string;
  email: string;
  emailVerified: number | boolean;
  image: string | null;
  createdAt: string;
  updatedAt: string;
}

interface SessionRow {
  id: string;
  expiresAt: string;
  token: string;
  createdAt: string;
  updatedAt: string;
  ipAddress: string | null;
  userAgent: string | null;
  userId: string;
}

interface AccountRow {
  id: string;
  accountId: string;
  providerId: string;
  userId: string;
  accessToken: string | null;
  refreshToken: string | null;
  idToken: string | null;
  accessTokenExpiresAt: string | null;
  refreshTokenExpiresAt: string | null;
  scope: string | null;
  password: string | null;
  createdAt: string;
  updatedAt: string;
}

interface UserPreferencesRow {
  userId: string;
  gender: string;
  createdAt: string;
  updatedAt: string;
}

interface CurriculumProgressRow {
  userId: string;
  entryId: string;
  completedAt: string;
}

/**
 * Migration utility: Migrates data from local SQLite (auth.sqlite) to PostgreSQL.
 * Usage:
 *   DATABASE_URL="postgres://user:pass@host:5432/dbname" bun scripts/migrate-sqlite-to-pg.ts [sqlitePath]
 */
async function main() {
  const sqlitePath = process.argv[2] || "auth.sqlite";
  const pgUrl = process.env.DATABASE_URL;

  console.log("=== JetAcademie SQLite -> PostgreSQL Migration ===");
  console.log(`Source SQLite: ${sqlitePath}`);

  if (!existsSync(sqlitePath)) {
    console.error(`Error: Source SQLite file "${sqlitePath}" not found.`);
    process.exit(1);
  }

  if (!pgUrl || (!pgUrl.startsWith("postgres://") && !pgUrl.startsWith("postgresql://"))) {
    console.error("Error: Please provide a valid PostgreSQL connection URL in DATABASE_URL.");
    console.error(
      'Example: DATABASE_URL="postgres://postgres:password@localhost:5432/jetacademie" bun scripts/migrate-sqlite-to-pg.ts'
    );
    process.exit(1);
  }

  console.log(`Target PostgreSQL: ${pgUrl.replace(/:[^:@]+@/, ":****@")}`);

  const sqlite = new Database(sqlitePath);
  const pgPool = new Pool({ connectionString: pgUrl });

  try {
    // 1. Ensure schema in PostgreSQL
    console.log("\n[1/7] Ensuring PostgreSQL schema...");
    await pgPool.query(SCHEMA_SQL);
    console.log("✓ Schema verified.");

    // 2. Migrate 'user' table
    console.log("\n[2/7] Migrating 'user' table...");
    const users = sqlite.query<UserRow, []>(`SELECT * FROM "user"`).all();
    for (const u of users) {
      await pgPool.query(
        `INSERT INTO "user" ("id", "name", "email", "emailVerified", "image", "createdAt", "updatedAt")
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         ON CONFLICT ("id") DO UPDATE SET
           "name" = EXCLUDED."name",
           "email" = EXCLUDED."email",
           "emailVerified" = EXCLUDED."emailVerified",
           "image" = EXCLUDED."image",
           "updatedAt" = EXCLUDED."updatedAt"`,
        [u.id, u.name, u.email, Boolean(u.emailVerified), u.image, u.createdAt, u.updatedAt]
      );
    }
    console.log(`✓ Migrated ${users.length} users.`);

    // 3. Migrate 'session' table
    console.log("\n[3/7] Migrating 'session' table...");
    const sessions = sqlite.query<SessionRow, []>(`SELECT * FROM "session"`).all();
    for (const s of sessions) {
      await pgPool.query(
        `INSERT INTO "session" ("id", "expiresAt", "token", "createdAt", "updatedAt", "ipAddress", "userAgent", "userId")
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         ON CONFLICT ("id") DO NOTHING`,
        [s.id, s.expiresAt, s.token, s.createdAt, s.updatedAt, s.ipAddress, s.userAgent, s.userId]
      );
    }
    console.log(`✓ Migrated ${sessions.length} sessions.`);

    // 4. Migrate 'account' table
    console.log("\n[4/7] Migrating 'account' table...");
    const accounts = sqlite.query<AccountRow, []>(`SELECT * FROM "account"`).all();
    for (const a of accounts) {
      await pgPool.query(
        `INSERT INTO "account" (
           "id", "accountId", "providerId", "userId", "accessToken", "refreshToken",
           "idToken", "accessTokenExpiresAt", "refreshTokenExpiresAt", "scope", "password",
           "createdAt", "updatedAt"
         ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
         ON CONFLICT ("id") DO UPDATE SET
           "password" = EXCLUDED."password",
           "updatedAt" = EXCLUDED."updatedAt"`,
        [
          a.id,
          a.accountId,
          a.providerId,
          a.userId,
          a.accessToken,
          a.refreshToken,
          a.idToken,
          a.accessTokenExpiresAt,
          a.refreshTokenExpiresAt,
          a.scope,
          a.password,
          a.createdAt,
          a.updatedAt,
        ]
      );
    }
    console.log(`✓ Migrated ${accounts.length} accounts.`);

    // 5. Migrate 'user_preferences' table
    console.log("\n[5/7] Migrating 'user_preferences' table...");
    const prefs = sqlite.query<UserPreferencesRow, []>(`SELECT * FROM "user_preferences"`).all();
    for (const p of prefs) {
      await pgPool.query(
        `INSERT INTO "user_preferences" ("userId", "gender", "createdAt", "updatedAt")
         VALUES ($1, $2, $3, $4)
         ON CONFLICT ("userId") DO UPDATE SET
           "gender" = EXCLUDED."gender",
           "updatedAt" = EXCLUDED."updatedAt"`,
        [p.userId, p.gender, p.createdAt, p.updatedAt]
      );
    }
    console.log(`✓ Migrated ${prefs.length} user preferences.`);

    // 6. Migrate 'curriculum_progress' table
    console.log("\n[6/7] Migrating 'curriculum_progress' table...");
    const progress = sqlite
      .query<CurriculumProgressRow, []>(`SELECT * FROM "curriculum_progress"`)
      .all();
    for (const cp of progress) {
      await pgPool.query(
        `INSERT INTO "curriculum_progress" ("userId", "entryId", "completedAt")
         VALUES ($1, $2, $3)
         ON CONFLICT ("userId", "entryId") DO NOTHING`,
        [cp.userId, cp.entryId, cp.completedAt]
      );
    }
    console.log(`✓ Migrated ${progress.length} progress records.`);

    // 7. Migrate 'curriculum_entries' table
    console.log("\n[7/7] Migrating 'curriculum_entries' table...");
    const entries = sqlite
      .query<CurriculumEntryRow, []>(`SELECT * FROM "curriculum_entries"`)
      .all();
    const CHUNK_SIZE = 50;
    for (let i = 0; i < entries.length; i += CHUNK_SIZE) {
      const chunk = entries.slice(i, i + CHUNK_SIZE);
      for (const e of chunk) {
        await pgPool.query(
          `INSERT INTO "curriculum_entries" (
             "id", "grade", "categoryId", "gender", "month", "week", "year",
             "isExtra", "extraOrder", "title", "body", "resourceUrl", "pdfUrl",
             "pageCount", "createdAt", "updatedAt"
           ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
           ON CONFLICT ("id") DO UPDATE SET
             "title" = EXCLUDED."title",
             "body" = EXCLUDED."body",
             "resourceUrl" = EXCLUDED."resourceUrl",
             "pdfUrl" = EXCLUDED."pdfUrl",
             "updatedAt" = EXCLUDED."updatedAt"`,
          [
            e.id,
            e.grade,
            e.categoryId,
            e.gender,
            e.month,
            e.week,
            e.year,
            e.isExtra ? 1 : 0,
            e.extraOrder,
            e.title,
            e.body,
            e.resourceUrl,
            e.pdfUrl,
            e.pageCount,
            e.createdAt,
            e.updatedAt,
          ]
        );
      }
    }
    console.log(`✓ Migrated ${entries.length} curriculum entries.`);

    console.log("\n🎉 Migration completed successfully!");
  } catch (error) {
    console.error("\n❌ Migration failed:", error);
    process.exit(1);
  } finally {
    sqlite.close();
    await pgPool.end();
  }
}

main();
