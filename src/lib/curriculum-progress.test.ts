import { describe, expect, it } from "bun:test";
import { execute } from "./db";
import {
  getCompletedEntryIds,
  removeCompletedEntry,
  saveCompletedEntry,
} from "./curriculum-progress";

describe("curriculum-progress", () => {
  const testUserId = `test_user_${Date.now()}`;
  const now = new Date().toISOString();

  it("saves, retrieves, and removes completed entries", async () => {
    await execute(
      `INSERT INTO "user" ("id", "name", "email", "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5)`,
      [testUserId, "Test Progress User", `${testUserId}@example.com`, now, now]
    );

    // Initial state: empty
    expect(await getCompletedEntryIds(testUserId)).toEqual([]);

    // Save entry
    await saveCompletedEntry(testUserId, "ayet-eylul-1");
    expect(await getCompletedEntryIds(testUserId)).toEqual(["ayet-eylul-1"]);

    // Save second entry
    await saveCompletedEntry(testUserId, "ayet-eylul-2");
    expect(await getCompletedEntryIds(testUserId)).toEqual(["ayet-eylul-1", "ayet-eylul-2"]);

    // Remove latest entry
    await removeCompletedEntry(testUserId, "ayet-eylul-2");
    expect(await getCompletedEntryIds(testUserId)).toEqual(["ayet-eylul-1"]);

    // Remove remaining entry
    await removeCompletedEntry(testUserId, "ayet-eylul-1");
    expect(await getCompletedEntryIds(testUserId)).toEqual([]);
  });

  it("handles removing non-existent entry gracefully", async () => {
    await expect(removeCompletedEntry(testUserId, "non-existent")).resolves.toBeUndefined();
  });
});
