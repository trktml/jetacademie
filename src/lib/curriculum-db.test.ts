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

  it("should enforce standard entries and zero premature extras for categories under 48 weeks", () => {
    const grade1Entries = getCurriculumEntriesFromDb(1);
    const ayetEntries = grade1Entries.filter((e) => e.categoryId === "ayet");

    const standardAyet = ayetEntries.filter((e) => !e.isExtra);
    const extraAyet = ayetEntries.filter((e) => e.isExtra);

    expect(standardAyet.length).toBe(16);
    expect(extraAyet.length).toBe(0); // 16 < 48: absolutely no extras before 48 weeks
  });

  it("should retrieve a specific entry by its deterministic ID", () => {
    const entry1 = getCurriculumEntryByIdFromDb("ayet-eylul-1");
    expect(entry1).not.toBeNull();
    expect(entry1?.title).toContain("Bakara Suresi");
    expect(entry1?.grade).toBe(1);
    expect(entry1?.isExtra).toBe(false);

    const entry2 = getCurriculumEntryByIdFromDb("ayet-aralik-4");
    expect(entry2).not.toBeNull();
    expect(entry2?.title).toContain("İsrâ Suresi");
    expect(entry2?.grade).toBe(1);
    expect(entry2?.isExtra).toBe(false);
  });

  it("should return null for non-existent entry ID", () => {
    const entry = getCurriculumEntryByIdFromDb("non-existent-id-xyz");
    expect(entry).toBeNull();
  });
});
