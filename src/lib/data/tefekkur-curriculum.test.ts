import { describe, expect, it } from "bun:test";
import {
  getAllTefekkurEntries,
  getTefekkurEntriesForGrade,
  tefekkurCurriculumItems,
} from "./tefekkur-curriculum";

describe("tefekkur-curriculum", () => {
  it("contains exactly 216 tefekkur items across 36 weeks and 6 grades", () => {
    expect(tefekkurCurriculumItems.length).toBe(216);
  });

  it("assigns each week 6 grades and valid month/week periods across all 36 weeks", () => {
    for (let week = 1; week <= 36; week++) {
      const itemsForWeek = tefekkurCurriculumItems.filter((item) => item.weekNumber === week);
      expect(itemsForWeek.length).toBe(6);

      const grades = itemsForWeek.map((item) => item.grade).sort();
      expect(grades).toEqual([1, 2, 3, 4, 5, 6]);

      const monthIndex = Math.floor((week - 1) / 4);
      const expectedMonth = ((monthIndex + 8) % 12) + 1;
      const expectedWeekInMonth = ((week - 1) % 4) + 1;
      const expectedYear = monthIndex < 4 ? 2026 : 2027;

      for (const item of itemsForWeek) {
        expect(item.month).toBe(expectedMonth);
        expect(item.weekInMonth).toBe(expectedWeekInMonth);
        expect(item.year).toBe(expectedYear);
        expect(item.youtubeUrl).toMatch(/^https:\/\/www\.youtube\.com\/watch\?v=[\w-]{11}$/);
        expect(item.title.length).toBeGreaterThan(3);
        expect(item.body.length).toBeGreaterThan(20);
        expect(item.summary.length).toBeGreaterThan(15);
      }
    }
  });

  it("ensures no video repetition within any single grade across all 36 weeks", () => {
    for (let grade = 1; grade <= 6; grade++) {
      const itemsForGrade = tefekkurCurriculumItems.filter((item) => item.grade === grade);
      expect(itemsForGrade.length).toBe(36);

      const videoUrls = itemsForGrade.map((item) => item.youtubeUrl);
      const uniqueVideoUrls = new Set(videoUrls);
      expect(uniqueVideoUrls.size).toBe(36);
    }
  });

  it("produces 36 entries for each grade with correct deterministic IDs", () => {
    for (let grade = 1; grade <= 6; grade++) {
      const entries = getTefekkurEntriesForGrade(grade);
      expect(entries.length).toBe(36);

      const prefix = grade === 1 ? "" : `g${grade}-`;
      expect(entries[0].id).toBe(`${prefix}tefekkur-eylul-1`);
      expect(entries[1].id).toBe(`${prefix}tefekkur-eylul-2`);
      expect(entries[2].id).toBe(`${prefix}tefekkur-eylul-3`);
      expect(entries[3].id).toBe(`${prefix}tefekkur-eylul-4`);
      expect(entries[4].id).toBe(`${prefix}tefekkur-ekim-1`);
      expect(entries[35].id).toBe(`${prefix}tefekkur-mayis-4`);

      for (const entry of entries) {
        expect(entry.grade).toBe(grade);
        expect(entry.categoryId).toBe("tefekkur");
        expect(entry.isExtra).toBe(false);
        expect(entry.resourceUrl).toBeDefined();
        expect(entry.resourceUrl).toMatch(/^https:\/\/www\.youtube\.com\/watch\?v=[\w-]{11}$/);
      }
    }
  });

  it("returns exactly 216 entries for all grades combined via getAllTefekkurEntries", () => {
    const all = getAllTefekkurEntries();
    expect(all.length).toBe(216);

    const ids = new Set(all.map((e) => e.id));
    expect(ids.size).toBe(216);
  });

  it("provides rich and diverse reflection content without repetitive generic text", () => {
    const bodies = tefekkurCurriculumItems.map((item) => item.body);
    const uniqueBodies = new Set(bodies);
    // Across 216 items utilizing 200 distinct videos, there should be at least 190 unique bespoke bodies
    expect(uniqueBodies.size).toBeGreaterThanOrEqual(190);

    const summaries = tefekkurCurriculumItems.map((item) => item.summary);
    const uniqueSummaries = new Set(summaries);
    expect(uniqueSummaries.size).toBeGreaterThanOrEqual(190);
  });
});
