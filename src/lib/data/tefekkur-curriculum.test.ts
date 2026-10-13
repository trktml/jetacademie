import { describe, expect, it } from "bun:test";
import {
  getAllTefekkurEntries,
  getTefekkurEntriesForGrade,
  tefekkurCurriculumItems,
} from "./tefekkur-curriculum";

describe("tefekkur-curriculum", () => {
  it("contains exactly 36 tefekkur items across 6 weeks and 6 grades", () => {
    expect(tefekkurCurriculumItems.length).toBe(36);
  });

  it("assigns each week 6 grades and valid month/week periods", () => {
    for (let week = 1; week <= 6; week++) {
      const itemsForWeek = tefekkurCurriculumItems.filter((item) => item.weekNumber === week);
      expect(itemsForWeek.length).toBe(6);

      const grades = itemsForWeek.map((item) => item.grade).sort();
      expect(grades).toEqual([1, 2, 3, 4, 5, 6]);

      const expectedMonth = week <= 4 ? 9 : 10;
      const expectedWeekInMonth = week <= 4 ? week : week - 4;

      for (const item of itemsForWeek) {
        expect(item.month).toBe(expectedMonth);
        expect(item.weekInMonth).toBe(expectedWeekInMonth);
        expect(item.year).toBe(2026);
        expect(item.youtubeUrl).toMatch(/^https:\/\/www\.youtube\.com\/watch\?v=[\w-]{11}$/);
        expect(item.title.length).toBeGreaterThan(3);
        expect(item.body.length).toBeGreaterThan(20);
      }
    }
  });

  it("produces 6 entries for each grade with correct deterministic IDs", () => {
    for (let grade = 1; grade <= 6; grade++) {
      const entries = getTefekkurEntriesForGrade(grade);
      expect(entries.length).toBe(6);

      const prefix = grade === 1 ? "" : `g${grade}-`;
      expect(entries[0].id).toBe(`${prefix}tefekkur-eylul-1`);
      expect(entries[1].id).toBe(`${prefix}tefekkur-eylul-2`);
      expect(entries[2].id).toBe(`${prefix}tefekkur-eylul-3`);
      expect(entries[3].id).toBe(`${prefix}tefekkur-eylul-4`);
      expect(entries[4].id).toBe(`${prefix}tefekkur-ekim-1`);
      expect(entries[5].id).toBe(`${prefix}tefekkur-ekim-2`);

      for (const entry of entries) {
        expect(entry.grade).toBe(grade);
        expect(entry.categoryId).toBe("tefekkur");
        expect(entry.isExtra).toBe(false);
        expect(entry.resourceUrl).toBeDefined();
      }
    }
  });

  it("returns exactly 36 entries for all grades combined via getAllTefekkurEntries", () => {
    const all = getAllTefekkurEntries();
    expect(all.length).toBe(36);

    const ids = new Set(all.map((e) => e.id));
    expect(ids.size).toBe(36);
  });
});
