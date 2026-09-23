import { Pool, type PoolConfig } from "pg";
import { Database } from "bun:sqlite";

/**
 * Resolves the database connection string or path.
 * In test mode without an explicit PostgreSQL URL, it defaults to ':memory:'.
 */
export function resolveDatabaseUrl(
  envDatabaseUrl?: string,
  nodeEnv = process.env.NODE_ENV,
  bunEnv = process.env.BUN_ENV
): string {
  const isTest = nodeEnv === "test" || bunEnv === "test";
  const url = envDatabaseUrl !== undefined ? envDatabaseUrl : process.env.DATABASE_URL;

  if (isTest) {
    if (url && url !== "auth.sqlite" && url !== ":memory:" && !url.startsWith("postgres")) {
      return url;
    }
    return ":memory:";
  }

  return url || "postgres://postgres:postgres@localhost:5432/jetacademie";
}

export const activeDatabaseUrl = resolveDatabaseUrl();
export const isPostgres =
  activeDatabaseUrl.startsWith("postgres://") || activeDatabaseUrl.startsWith("postgresql://");

let poolInstance: Pool | null = null;
let sqliteInstance: Database | null = null;

if (isPostgres) {
  const config: PoolConfig = {
    connectionString: activeDatabaseUrl,
    max: parseInt(process.env.PG_POOL_MAX || "20", 10),
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
  };
  poolInstance = new Pool(config);

  poolInstance.on("error", (err) => {
    console.error("[db] Unexpected PostgreSQL pool error:", err);
  });
} else {
  // Test isolation / SQLite in-memory fallback
  sqliteInstance = new Database(activeDatabaseUrl === ":memory:" ? ":memory:" : activeDatabaseUrl);
  sqliteInstance.exec("PRAGMA foreign_keys = ON;");
}

export function getPool(): Pool | null {
  return poolInstance;
}

export function getSqlite(): Database | null {
  return sqliteInstance;
}

/**
 * Translates PostgreSQL $1, $2, ... parameter placeholders to SQLite ? placeholders
 * when running under the in-memory SQLite test driver.
 */
function translatePgToSqlite(
  sql: string,
  params: unknown[] = []
): { sql: string; params: unknown[] } {
  const sqliteSql = sql.replace(/\$(\d+)/g, "?");
  const sqliteParams = params.map((p) => {
    if (typeof p === "boolean") return p ? 1 : 0;
    if (p instanceof Date) return p.toISOString();
    return p;
  });
  return { sql: sqliteSql, params: sqliteParams };
}

/**
 * Executes a query and returns an array of result rows.
 */
export async function query<T = unknown>(sqlText: string, params: unknown[] = []): Promise<T[]> {
  if (isPostgres && poolInstance) {
    const res = await poolInstance.query(sqlText, params);
    return res.rows as T[];
  }

  if (sqliteInstance) {
    const { sql, params: mappedParams } = translatePgToSqlite(sqlText, params);
    const stmt = sqliteInstance.query(sql);
    return stmt.all(...(mappedParams as (string | number | boolean | null)[])) as T[];
  }

  throw new Error("No database client initialized");
}

/**
 * Executes a query and returns the first row or null if not found.
 */
export async function queryOne<T = unknown>(
  sqlText: string,
  params: unknown[] = []
): Promise<T | null> {
  const rows = await query<T>(sqlText, params);
  return rows[0] ?? null;
}

/**
 * Executes a command (INSERT, UPDATE, DELETE, DDL) and returns the number of affected rows.
 */
export async function execute(sqlText: string, params: unknown[] = []): Promise<number> {
  if (isPostgres && poolInstance) {
    const res = await poolInstance.query(sqlText, params);
    return res.rowCount ?? 0;
  }

  if (sqliteInstance) {
    const { sql, params: mappedParams } = translatePgToSqlite(sqlText, params);
    if (mappedParams.length > 0) {
      sqliteInstance.query(sql).run(...(mappedParams as (string | number | boolean | null)[]));
    } else {
      sqliteInstance.exec(sql);
    }
    return 1;
  }

  throw new Error("No database client initialized");
}

/**
 * Closes the active database connection pool (useful for tests or graceful shutdown).
 */
export async function closeDatabase(): Promise<void> {
  if (poolInstance) {
    await poolInstance.end();
    poolInstance = null;
  }
  if (sqliteInstance) {
    sqliteInstance.close();
    sqliteInstance = null;
  }
}
