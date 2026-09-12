import { describe, expect, it } from "bun:test";
import {
  canCompleteEntry,
  curriculumCategories,
  curriculumEntries,
  getCategoryEntries,
  getUnlockedEntryIndex,
  makeEntryId,
} from "./curriculum";

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

  it("provides concise short labels for compact navigation", () => {
    expect(curriculumCategories.map((category) => category.shortLabel)).toEqual([
      "Ayet",
      "Hadis",
      "Siyer",
      "Sahabe",
      "Risale",
      "Dinleme",
      "Pırlanta",
      "İlmihal",
      "Adab",
    ]);
  });

  it("has 2 sample entries per category (18 total)", () => {
    expect(curriculumEntries.length).toBe(18);

    for (const category of curriculumCategories) {
      const entries = getCategoryEntries(category.id);
      expect(entries.length).toBe(2);
    }
  });

  it("uses category-month-week ID pattern", () => {
    expect(curriculumEntries[0].id).toBe("ayet-eylul-1");
    expect(curriculumEntries[1].id).toBe("ayet-eylul-2");

    const hadisEntries = getCategoryEntries("hadis");
    expect(hadisEntries[0].id).toBe("hadis-eylul-1");
    expect(hadisEntries[1].id).toBe("hadis-eylul-2");
  });

  it("makeEntryId generates correct patterns", () => {
    expect(makeEntryId("hadis", 9, 1)).toBe("hadis-eylul-1");
    expect(makeEntryId("ayet", 1, 3)).toBe("ayet-ocak-3");
    expect(makeEntryId("risale", 12, 2)).toBe("risale-aralik-2");
  });

  it("unlocks only the first unread entry", () => {
    const entries = getCategoryEntries("hadis");
    expect(getUnlockedEntryIndex(entries, new Set())).toBe(0);
    expect(getUnlockedEntryIndex(entries, new Set(["hadis-eylul-1"]))).toBe(1);
  });

  it("does not allow skipping an unread entry", () => {
    const entries = getCategoryEntries("hadis");
    expect(canCompleteEntry("hadis-eylul-2", entries, new Set())).toBe(false);
    expect(canCompleteEntry("hadis-eylul-2", entries, new Set(["hadis-eylul-1"]))).toBe(true);
  });

  it("tracks progress independently per category", () => {
    const ayetEntries = getCategoryEntries("ayet");
    const hadisEntries = getCategoryEntries("hadis");

    // Completing ayet-eylul-1 should NOT unlock hadis-eylul-2
    const completedAyet = new Set(["ayet-eylul-1"]);
    expect(getUnlockedEntryIndex(ayetEntries, completedAyet)).toBe(1); // ayet-eylul-2 unlocked
    expect(getUnlockedEntryIndex(hadisEntries, completedAyet)).toBe(0); // hadis-eylul-1 still first

    expect(canCompleteEntry("hadis-eylul-2", hadisEntries, completedAyet)).toBe(false);
    expect(canCompleteEntry("ayet-eylul-2", ayetEntries, completedAyet)).toBe(true);
  });

  it("returns entries sorted by year/month/week within a category", () => {
    const risaleEntries = getCategoryEntries("risale");
    expect(risaleEntries[0].week).toBe(1);
    expect(risaleEntries[1].week).toBe(2);
    expect(risaleEntries[0].title).toContain("Bismillah");
    expect(risaleEntries[1].title).toContain("İman ve Küfür");
  });
});
