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
  it("contains all nine real curriculum categories", () => {
    expect(curriculumCategories.map((category) => category.label)).toEqual([
      "Esmâü'l-Hüsnâ",
      "Efendimiz",
      "Ayet",
      "Hadis",
      "Sahabe kıssaları",
      "Hocaefendi Sohbetleri",
      "Haftanın Konusu",
      "İlmihal",
      "Adab-ı Muaşeret",
    ]);
  });

  it("provides concise short labels for compact navigation", () => {
    expect(curriculumCategories.map((category) => category.shortLabel)).toEqual([
      "Esmâ",
      "Siyer",
      "Ayet",
      "Hadis",
      "Sahabe",
      "Sohbet",
      "Konu",
      "İlmihal",
      "Adab",
    ]);
  });

  it("has 55 entries for ayet, 55 for hadis, 55 for esma, 55 for efendimiz, 55 for sahabe-kissalari, 54 for adab-i-muaseret, 56 for ilmihal (28 erkek + 28 bayan), 48 for hocaefendi-dinleme, and 2 for other categories", () => {
    expect(curriculumEntries.length).toBe(435);

    expect(getCategoryEntries("ayet").length).toBe(55);
    expect(getCategoryEntries("hadis").length).toBe(55);
    expect(getCategoryEntries("esma").length).toBe(55);
    expect(getCategoryEntries("efendimiz").length).toBe(55);
    expect(getCategoryEntries("sahabe-kissalari").length).toBe(55);
    expect(getCategoryEntries("adab-i-muaseret").length).toBe(54);
    expect(getCategoryEntries("hocaefendi-dinleme").length).toBe(48);
    expect(getCategoryEntries("ilmihal", curriculumEntries, 1, "erkek").length).toBe(28);
    expect(getCategoryEntries("ilmihal", curriculumEntries, 1, "bayan").length).toBe(28);

    for (const category of curriculumCategories) {
      if (
        category.id === "ayet" ||
        category.id === "hadis" ||
        category.id === "esma" ||
        category.id === "efendimiz" ||
        category.id === "sahabe-kissalari" ||
        category.id === "adab-i-muaseret" ||
        category.id === "hocaefendi-dinleme" ||
        category.id === "ilmihal"
      )
        continue;
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
    expect(makeEntryId("konu", 12, 2)).toBe("konu-aralik-2");
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
    const konuEntries = getCategoryEntries("konu");
    expect(konuEntries[0].week).toBe(1);
    expect(konuEntries[1].week).toBe(2);
    expect(konuEntries[0].title).toContain("İman");
    expect(konuEntries[1].title).toContain("İhlas");
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

  describe("48-week curriculum & automatic extra conversion", () => {
    it("defines total curriculum weeks as 48 (12 months x 4 weeks)", async () => {
      const { TOTAL_CURRICULUM_WEEKS, TOTAL_CURRICULUM_MONTHS, WEEKS_PER_MONTH } =
        await import("./curriculum");
      expect(TOTAL_CURRICULUM_MONTHS).toBe(12);
      expect(WEEKS_PER_MONTH).toBe(4);
      expect(TOTAL_CURRICULUM_WEEKS).toBe(48);
    });

    it("ensures categories with <= 48 entries have ZERO extra entries even if flagged", () => {
      const konuEntries = getCategoryEntries("konu");
      expect(konuEntries.length).toBe(2);
      expect(konuEntries.every((e) => !e.isExtra)).toBe(true);

      // Even if raw entries had isExtra: true before 48 weeks, they must resolve to false
      const rawWithPrematureExtra = [
        ...konuEntries,
        {
          id: "fake-premature-extra",
          categoryId: "konu" as const,
          month: 12,
          week: 4,
          year: 2026,
          isExtra: true,
          extraOrder: 1,
          title: "Premature Extra",
        },
      ];
      const resolved = getCategoryEntries("konu", rawWithPrematureExtra);
      expect(resolved.length).toBe(3);
      expect(resolved.every((e) => !e.isExtra)).toBe(true);
    });

    it("automatically converts entries beyond 48 weeks into extras", () => {
      // Create 50 entries: 48 standard + 2 beyond 48 weeks
      const mock50Entries = Array.from({ length: 50 }, (_, i) => {
        const weekNum = i + 1;
        const month = Math.min(12, Math.floor(i / 4) + 1);
        const week = (i % 4) + 1;
        return {
          id: `ayet-w${weekNum}`,
          grade: 1,
          categoryId: "ayet" as const,
          month,
          week,
          year: 2026,
          title: `Ayet Hafta ${weekNum}`,
        };
      });

      const resolved = getCategoryEntries("ayet", mock50Entries);
      expect(resolved.length).toBe(50);

      // First 48 entries must be standard (isExtra: false)
      for (let i = 0; i < 48; i++) {
        expect(resolved[i].isExtra).toBe(false);
        expect(resolved[i].extraOrder).toBeUndefined();
      }

      // 49th entry must be Ekstra 1
      expect(resolved[48].isExtra).toBe(true);
      expect(resolved[48].extraOrder).toBe(1);

      // 50th entry must be Ekstra 2
      expect(resolved[49].isExtra).toBe(true);
      expect(resolved[49].extraOrder).toBe(2);
    });

    it("requires completing all 48 weeks before an extra entry can be completed", () => {
      const mock50Entries = Array.from({ length: 50 }, (_, i) => ({
        id: `ayet-w${i + 1}`,
        grade: 1,
        categoryId: "ayet" as const,
        month: Math.min(12, Math.floor(i / 4) + 1),
        week: (i % 4) + 1,
        year: 2026,
        title: `Ayet Hafta ${i + 1}`,
      }));

      const resolved = getCategoryEntries("ayet", mock50Entries);
      const extra1 = resolved[48]; // 49th entry (Ekstra 1)

      // Only 47 weeks completed: extra cannot be completed
      const first47Ids = new Set(resolved.slice(0, 47).map((e) => e.id));
      expect(canCompleteEntry(extra1.id, resolved, first47Ids)).toBe(false);

      // All 48 weeks completed: extra CAN be completed
      const all48Ids = new Set(resolved.slice(0, 48).map((e) => e.id));
      expect(canCompleteEntry(extra1.id, resolved, all48Ids)).toBe(true);
    });
  });
});
