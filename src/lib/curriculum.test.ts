import { describe, expect, it } from "bun:test";
import {
  canCompleteEntry,
  curriculumCategories,
  getUnlockedEntryIndex,
  type CurriculumEntry,
} from "./curriculum";

const entries = [
  { id: "e1", categoryId: "ayet", year: 2026, month: 9, week: 1, title: "Birinci" },
  { id: "e2", categoryId: "ayet", year: 2026, month: 9, week: 2, title: "İkinci" },
] satisfies CurriculumEntry[];

describe("curriculum", () => {
  it("contains only the nine real curriculum categories", () => {
    expect(curriculumCategories.map((category) => category.label)).toEqual([
      "Ayet",
      "Hadis",
      "Siyer",
      "Sahabe kıssaları",
      "Risale",
      "Hocaefendi dinleme",
      "Pırlanta",
      "İlmihal",
      "Adab-ı Muaşeret",
    ]);
  });

  it("unlocks only the first unread entry", () => {
    expect(getUnlockedEntryIndex(entries, new Set())).toBe(0);
    expect(getUnlockedEntryIndex(entries, new Set(["e1"]))).toBe(1);
  });

  it("does not allow skipping an unread entry", () => {
    expect(canCompleteEntry("e2", entries, new Set())).toBe(false);
    expect(canCompleteEntry("e2", entries, new Set(["e1"]))).toBe(true);
  });
});
