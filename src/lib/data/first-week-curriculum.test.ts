import { describe, expect, it } from "bun:test";
import { getFirstWeekCurriculumEntries } from "./first-week-curriculum";
import type { CurriculumCategoryId } from "@/lib/curriculum";

describe("first-week import scope", () => {
  it("exports only the six planned opening weeks with all six support categories", () => {
    const entries = getFirstWeekCurriculumEntries();
    expect(entries).toHaveLength(36);
    expect(new Set(entries.map((entry) => entry.id)).size).toBe(36);
    for (let grade = 1; grade <= 6; grade++) {
      const gradeEntries = entries.filter((entry) => entry.grade === grade);
      const expectedCategories: CurriculumCategoryId[] = [
        "konu",
        "ayet",
        "hadis",
        "efendimiz",
        "sahabe-kissalari",
        "hocaefendi-dinleme",
      ];
      expect(gradeEntries.map((entry) => entry.categoryId).sort()).toEqual(
        expectedCategories.sort()
      );
      expect(
        gradeEntries.every((entry) => entry.month === 9 && entry.week === 1 && !entry.isExtra)
      ).toBe(true);
      expect(gradeEntries.every((entry) => entry.id.startsWith(`g${grade}-`))).toBe(true);
      const body = gradeEntries.find((entry) => entry.categoryId === "konu")!.body!;
      expect(body).toContain("40 Dakikalık Akış");
      expect(body.indexOf("# Kelimeler")).toBeLessThan(body.indexOf("# Dipnotlar"));
      expect(body).not.toContain("# Kaynakça");
    }
  });
});
