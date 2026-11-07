import { describe, expect, it } from "bun:test";
import { execute, queryOne, transaction } from "./db";

describe("database consistency", () => {
  it("binds repeated and reordered PostgreSQL parameters correctly in SQLite", async () => {
    const row = await queryOne<{ a: string; b: string; c: string }>(
      "SELECT $2 AS a, $1 AS b, $2 AS c",
      ["first", "second"]
    );
    expect(row).toEqual({ a: "second", b: "first", c: "second" });
  });

  it("returns actual affected row counts", async () => {
    await execute('CREATE TABLE IF NOT EXISTS "db_count_test" ("id" integer PRIMARY KEY)');
    expect(
      await execute('INSERT INTO "db_count_test" VALUES ($1) ON CONFLICT DO NOTHING', [1])
    ).toBe(1);
    expect(
      await execute('INSERT INTO "db_count_test" VALUES ($1) ON CONFLICT DO NOTHING', [1])
    ).toBe(0);
    expect(await execute('DELETE FROM "db_count_test" WHERE "id" = $1', [2])).toBe(0);
  });

  it("does not substitute parameter-like text inside SQL literals or comments", async () => {
    const row = await queryOne("SELECT '$1' AS literal, $1 AS bound -- $2", ["value"]);
    expect(row).toEqual({ literal: "$1", bound: "value" });
  });

  it("rolls back failures without rolling back unrelated concurrent work", async () => {
    await execute('CREATE TABLE IF NOT EXISTS "db_transaction_test" ("id" integer PRIMARY KEY)');
    let entered!: () => void;
    const started = new Promise<void>((resolve) => {
      entered = resolve;
    });
    let continueTransaction!: () => void;
    const gate = new Promise<void>((resolve) => {
      continueTransaction = resolve;
    });
    const failed = transaction(async () => {
      await execute('INSERT INTO "db_transaction_test" VALUES (1)');
      entered();
      await gate;
      throw new Error("rollback fixture");
    });
    await started;
    const unrelated = execute('INSERT INTO "db_transaction_test" VALUES (2)');
    continueTransaction();
    await expect(failed).rejects.toThrow("rollback fixture");
    await unrelated;
    expect(await queryOne('SELECT "id" FROM "db_transaction_test" WHERE "id" = 1')).toBeNull();
    expect(await queryOne('SELECT "id" FROM "db_transaction_test" WHERE "id" = 2')).toEqual({
      id: 2,
    });
  });
});
