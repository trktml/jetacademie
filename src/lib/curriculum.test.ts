import { describe, expect, it } from "bun:test";
import {
  canCompleteEntry,
  canUnmarkEntry,
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

  it("has 16 sample entries for ayet and 2 for other categories (32 total)", () => {
    expect(curriculumEntries.length).toBe(32);

    expect(getCategoryEntries("ayet").length).toBe(16);

    for (const category of curriculumCategories) {
      if (category.id === "ayet") continue;
      const entries = getCategoryEntries(category.id);
      expect(entries.length).toBe(2);
    }
  });

  it("uses category-month-week ID pattern", () => {
    expect(curriculumEntries[0].id).toBe("ayet-eylul-1");
    expect(curriculumEntries[1].id).toBe("ayet-eylul-2");
    expect(curriculumEntries[2].id).toBe("ayet-eylul-3");
    expect(curriculumEntries[3].id).toBe("ayet-eylul-4");
    expect(curriculumEntries[4].id).toBe("ayet-ekim-1");
    expect(curriculumEntries[15].id).toBe("ayet-aralik-4");

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

  describe("canUnmarkEntry", () => {
    it("allows unmarking the only completed entry", () => {
      const entries = getCategoryEntries("hadis");
      const completed = new Set(["hadis-eylul-1"]);
      expect(canUnmarkEntry("hadis-eylul-1", entries, completed)).toBe(true);
    });

    it("allows unmarking only the latest completed entry when multiple are completed", () => {
      const entries = getCategoryEntries("hadis");
      const completed = new Set(["hadis-eylul-1", "hadis-eylul-2"]);

      // hadis-eylul-2 is the latest -> allowed
      expect(canUnmarkEntry("hadis-eylul-2", entries, completed)).toBe(true);
      // hadis-eylul-1 has hadis-eylul-2 after it -> NOT allowed
      expect(canUnmarkEntry("hadis-eylul-1", entries, completed)).toBe(false);
    });

    it("returns false if the entry is not currently completed", () => {
      const entries = getCategoryEntries("hadis");
      const completed = new Set<string>();
      expect(canUnmarkEntry("hadis-eylul-1", entries, completed)).toBe(false);
    });

    it("returns false for non-existent entry", () => {
      const entries = getCategoryEntries("hadis");
      const completed = new Set(["hadis-eylul-1"]);
      expect(canUnmarkEntry("unknown-entry", entries, completed)).toBe(false);
    });
  });
});
