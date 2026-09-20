import { describe, expect, it } from "bun:test";
import {
  ensureCurriculumEntriesTable,
  getCurriculumEntriesFromDb,
  getCurriculumEntryByIdFromDb,
  seedCurriculumDatabase,
} from "./curriculum-db";
import { BELGIUM_GRADES } from "./curriculum";

describe("Curriculum SQLite Database Module", () => {
  it("should ensure table exists and seed data without errors", () => {
    ensureCurriculumEntriesTable();
    seedCurriculumDatabase();

    const allEntries = getCurriculumEntriesFromDb();
    expect(allEntries.length).toBeGreaterThan(0);
  });

  it("should support all 6 Belgium grades", () => {
    for (const grade of BELGIUM_GRADES) {
      const gradeEntries = getCurriculumEntriesFromDb(grade);
      expect(gradeEntries.length).toBeGreaterThan(0);
      expect(gradeEntries.every((e) => e.grade === grade)).toBe(true);
    }
  });

  it("should place standard entries before extra entries within a category", () => {
    const grade1Entries = getCurriculumEntriesFromDb(1);
    const ayetEntries = grade1Entries.filter((e) => e.categoryId === "ayet");

    const standardAyet = ayetEntries.filter((e) => !e.isExtra);
    const extraAyet = ayetEntries.filter((e) => e.isExtra);

    expect(standardAyet.length).toBeGreaterThan(0);
    expect(extraAyet.length).toBeGreaterThan(0);

    // Extra entries must follow all standard entries
    const firstExtraIdx = ayetEntries.findIndex((e) => e.isExtra);
    const lastStandardIdx = ayetEntries.findLastIndex((e) => !e.isExtra);

    expect(firstExtraIdx).toBeGreaterThan(lastStandardIdx);
  });

  it("should retrieve a specific entry by its deterministic ID", () => {
    const entry = getCurriculumEntryByIdFromDb("ayet-eylul-1");
    expect(entry).not.toBeNull();
    expect(entry?.title).toContain("Bakara Suresi");
    expect(entry?.grade).toBe(1);

    const extraEntry = getCurriculumEntryByIdFromDb("g1-ayet-extra-1");
    expect(extraEntry).not.toBeNull();
    expect(extraEntry?.isExtra).toBe(true);
    expect(extraEntry?.extraOrder).toBe(1);
  });

  it("should return null for non-existent entry ID", () => {
    const entry = getCurriculumEntryByIdFromDb("non-existent-id-xyz");
    expect(entry).toBeNull();
  });
});
