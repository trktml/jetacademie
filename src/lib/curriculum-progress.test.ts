import { describe, expect, it } from "bun:test";
import { db } from "./auth";
import {
  getCompletedEntryIds,
  removeCompletedEntry,
  saveCompletedEntry,
} from "./curriculum-progress";

describe("curriculum-progress", () => {
  const testUserId = `test_user_${Date.now()}`;
  const now = new Date().toISOString();
  db.query(
    `INSERT INTO "user" ("id", "name", "email", "createdAt", "updatedAt") VALUES (?, ?, ?, ?, ?)`
  ).run(testUserId, "Test Progress User", `${testUserId}@example.com`, now, now);

  it("saves, retrieves, and removes completed entries", () => {
    // Initial state: empty
    expect(getCompletedEntryIds(testUserId)).toEqual([]);

    // Save entry
    saveCompletedEntry(testUserId, "ayet-eylul-1");
    expect(getCompletedEntryIds(testUserId)).toEqual(["ayet-eylul-1"]);

    // Save second entry
    saveCompletedEntry(testUserId, "ayet-eylul-2");
    expect(getCompletedEntryIds(testUserId)).toEqual(["ayet-eylul-1", "ayet-eylul-2"]);

    // Remove latest entry
    removeCompletedEntry(testUserId, "ayet-eylul-2");
    expect(getCompletedEntryIds(testUserId)).toEqual(["ayet-eylul-1"]);

    // Remove remaining entry
    removeCompletedEntry(testUserId, "ayet-eylul-1");
    expect(getCompletedEntryIds(testUserId)).toEqual([]);
  });

  it("handles removing non-existent entry gracefully", () => {
    expect(() => removeCompletedEntry(testUserId, "non-existent")).not.toThrow();
  });
});
