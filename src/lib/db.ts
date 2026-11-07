import { Pool, type PoolClient, type PoolConfig } from "pg";
import { AsyncLocalStorage } from "node:async_hooks";
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

  if (nodeEnv === "production") {
    if (!url) throw new Error("Production requires DATABASE_URL.");
    if (!/^postgres(?:ql)?:\/\//.test(url)) {
      throw new Error("Production requires a PostgreSQL DATABASE_URL.");
    }
    if (url.startsWith("postgres")) {
      const password = decodeURIComponent(new URL(url).password);
      if (!password || password === "postgres" || password === "change-me-in-production") {
        throw new Error("Production requires a non-default database password.");
      }
    }
  }

  return url || "postgres://postgres:postgres@localhost:5432/jetacademie";
}

function poolSize(value = process.env.PG_POOL_MAX || "20"): number {
  const size = Number(value);
  if (!Number.isInteger(size) || size < 1 || size > 100)
    throw new Error("PG_POOL_MAX must be an integer between 1 and 100.");
  return size;
}

type Driver = { kind: "postgres"; pool: Pool } | { kind: "sqlite"; database: Database };
let driver: Driver | undefined;

function getDriver(): Driver {
  if (driver) return driver;
  const url = resolveDatabaseUrl();
  if (/^postgres(?:ql)?:\/\//.test(url)) {
    const config: PoolConfig = {
      connectionString: url,
      max: poolSize(),
      statement_timeout: 15000,
      idle_in_transaction_session_timeout: 15000,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    };
    const pool = new Pool(config);
    pool.on("error", (error) => console.error("[db] Unexpected PostgreSQL pool error:", error));
    return (driver = { kind: "postgres", pool });
  }
  const database = new Database(url);
  database.exec("PRAGMA foreign_keys = ON");
  return (driver = { kind: "sqlite", database });
}

export function getPool(): Pool | null {
  const current = getDriver();
  return current.kind === "postgres" ? current.pool : null;
}

export function getSqlite(): Database | null {
  const current = getDriver();
  return current.kind === "sqlite" ? current.database : null;
}

/**
 * Translates PostgreSQL $1, $2, ... parameter placeholders to SQLite ? placeholders
 * when running under the in-memory SQLite test driver.
 */
function translatePgToSqlite(
  sql: string,
  params: unknown[] = []
): { sql: string; params: unknown[] } {
  const sqliteParams: unknown[] = [];
  const sqliteSql = sql.replace(
    /'(?:''|[^'])*'|"(?:""|[^"])*"|--[^\n]*|\/\*[\s\S]*?\*\/|\$\$[\s\S]*?\$\$|\$([a-zA-Z_]\w*)\$[\s\S]*?\$\1\$|\$(\d+)/g,
    (match, _tag: string, index: string) => {
      if (!index) return match;
      const p = params[Number(index) - 1];
      if (Number(index) < 1 || Number(index) > params.length)
        throw new Error("Missing SQL parameter");
      sqliteParams.push(
        p instanceof Date ? p.toISOString() : typeof p === "boolean" ? Number(p) : p
      );
      return "?";
    }
  );
  /* Map by placeholder occurrence, so $2, $1, $2 matches PostgreSQL semantics. */
  return { sql: sqliteSql, params: sqliteParams };
}

type TransactionContext = { client?: PoolClient; active: boolean };
const transactions = new AsyncLocalStorage<TransactionContext>();
let sqliteQueue: Promise<void> = Promise.resolve();

async function withSqliteLock<T>(work: () => Promise<T>): Promise<T> {
  const previous = sqliteQueue;
  let release!: () => void;
  sqliteQueue = new Promise<void>((resolve) => {
    release = resolve;
  });
  await previous;
  try {
    return await work();
  } finally {
    release();
  }
}

/** All database helpers in work share one connection and commit or roll back together. */
export async function transaction<T>(work: () => Promise<T>): Promise<T> {
  if (transactions.getStore()?.active) throw new Error("Nested transactions are not supported");
  const run = async (client?: PoolClient) => {
    const context: TransactionContext = { client, active: true };
    return transactions.run(context, async () => {
      let begun = false;
      let broken = false;
      try {
        await execute("BEGIN");
        begun = true;
        const result = await work();
        await execute("COMMIT");
        return result;
      } catch (error) {
        if (begun) {
          try {
            await execute("ROLLBACK");
          } catch (rollbackError) {
            broken = true;
            throw new AggregateError(
              [error, rollbackError],
              "Database transaction and rollback failed"
            );
          }
        }
        throw error;
      } finally {
        context.active = false;
        client?.release(broken);
      }
    });
  };
  const pool = getPool();
  if (pool) return run(await pool.connect());
  return withSqliteLock(() => run());
}

/** Read several tables from one consistent snapshot in either driver. */
export function readOnlyTransaction<T>(work: () => Promise<T>): Promise<T> {
  return transaction(async () => {
    if (getPool()) await execute("SET TRANSACTION ISOLATION LEVEL REPEATABLE READ READ ONLY");
    return work();
  });
}

function transactionContext(): TransactionContext | undefined {
  const context = transactions.getStore();
  if (context && !context.active) throw new Error("Database transaction has already ended");
  return context;
}

function sqliteBindings(params: unknown[]): (string | number | boolean | null)[] {
  return params.map((p) => {
    if (typeof p === "boolean") return p ? 1 : 0;
    if (p instanceof Date) return p.toISOString();
    return p;
  }) as (string | number | boolean | null)[];
}

/**
 * Executes a query and returns an array of result rows.
 */
export async function query<T = unknown>(sqlText: string, params: unknown[] = []): Promise<T[]> {
  const context = transactionContext();
  const current = getDriver();
  if (current.kind === "postgres") {
    const res = await (context?.client ?? current.pool).query(sqlText, params);
    return res.rows as T[];
  }

  const read = async () => {
    const { sql, params: mappedParams } = translatePgToSqlite(sqlText, params);
    return current.database.query(sql).all(...sqliteBindings(mappedParams)) as T[];
  };
  return context ? read() : withSqliteLock(read);
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
  const context = transactionContext();
  const current = getDriver();
  if (current.kind === "postgres") {
    const res = await (context?.client ?? current.pool).query(sqlText, params);
    return res.rowCount ?? 0;
  }

  const write = async () => {
    const { sql, params: mappedParams } = translatePgToSqlite(sqlText, params);
    if (mappedParams.length > 0)
      return current.database.query(sql).run(...sqliteBindings(mappedParams)).changes;
    const countChanges = () =>
      current.database.query<{ count: number }, []>("SELECT total_changes() AS count").get()!.count;
    const before = countChanges();
    current.database.exec(sql);
    return countChanges() - before;
  };
  return context ? write() : withSqliteLock(write);
}

/**
 * Closes the active database connection pool (useful for tests or graceful shutdown).
 */
export async function closeDatabase(): Promise<void> {
  if (driver?.kind === "postgres") await driver.pool.end();
  else driver?.database.close();
  driver = undefined;
}
