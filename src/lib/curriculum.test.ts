import { describe, expect, it } from "bun:test";
import {
  canCompleteEntry,
  canUnmarkEntry,
  curriculumCategories,
  getCategoryEntries as getCategoryEntriesWithData,
  getUnlockedEntryIndex,
  makeEntryId,
  parseCurriculumGrade,
} from "./curriculum";
import { curriculumEntries } from "./curriculum-data";

function getCategoryEntries(
  categoryId: Parameters<typeof getCategoryEntriesWithData>[0],
  entries: Parameters<typeof getCategoryEntriesWithData>[1] = curriculumEntries,
  grade?: Parameters<typeof getCategoryEntriesWithData>[2],
  gender?: Parameters<typeof getCategoryEntriesWithData>[3]
) {
  return getCategoryEntriesWithData(categoryId, entries, grade, gender);
}

describe("curriculum", () => {
  it("accepts only canonical grade links and leaves other entries for the selector", () => {
    for (const grade of [1, 2, 3, 4, 5, 6] as const) {
      expect(parseCurriculumGrade(String(grade))).toBe(grade);
    }
    for (const value of [undefined, "", "0", "7", "2.5", "01", "abc", ["1", "2"]]) {
      expect(parseCurriculumGrade(value)).toBeNull();
    }
  });

  it("contains all five active curriculum categories", () => {
    expect(curriculumCategories.map((category) => category.label)).toEqual([
      "Haftanın Konusu",
      "Hocaefendi Sohbetleri",
      "İlmihal",
      "Adab-ı Muaşeret",
      "Esmâü'l-Hüsnâ",
    ]);
  });

  it("provides concise short labels for compact navigation", () => {
    expect(curriculumCategories.map((category) => category.shortLabel)).toEqual([
      "Konu",
      "Sohbet",
      "İlmihal",
      "Adab",
      "Esmâ",
    ]);
  });

  it("retains the five active categories and their seeded entries", () => {
    expect(curriculumEntries.length).toBe(213);

    expect(getCategoryEntries("esma").length).toBe(55);
    expect(getCategoryEntries("adab-i-muaseret").length).toBe(54);
    expect(getCategoryEntries("hocaefendi-dinleme").length).toBe(48);
    expect(getCategoryEntries("ilmihal", curriculumEntries, 1, "erkek").length).toBe(28);
    expect(getCategoryEntries("ilmihal", curriculumEntries, 1, "bayan").length).toBe(28);

    for (const category of curriculumCategories) {
      if (
        category.id === "esma" ||
        category.id === "adab-i-muaseret" ||
        category.id === "hocaefendi-dinleme" ||
        category.id === "ilmihal"
      )
        continue;
      const entries = getCategoryEntries(category.id);
      expect(entries.length).toBe(0);
    }
  });

  it("uses category-month-week ID pattern", () => {
    expect(getCategoryEntries("esma")[0].id).toBe("esma-eylul-1");
    expect(getCategoryEntries("esma")[1].id).toBe("esma-eylul-2");
    expect(getCategoryEntries("esma")[2].id).toBe("esma-eylul-3");
    expect(getCategoryEntries("esma")[3].id).toBe("esma-eylul-4");
    expect(getCategoryEntries("esma")[4].id).toBe("esma-ekim-1");
    expect(getCategoryEntries("esma")[15].id).toBe("esma-aralik-4");

    const adabEntries = getCategoryEntries("adab-i-muaseret");
    expect(adabEntries[0].id).toBe("adab-i-muaseret-eylul-1");
    expect(adabEntries[1].id).toBe("adab-i-muaseret-eylul-2");
  });

  it("makeEntryId generates correct patterns", () => {
    expect(makeEntryId("adab-i-muaseret", 9, 1)).toBe("adab-i-muaseret-eylul-1");
    expect(makeEntryId("esma", 1, 3)).toBe("esma-ocak-3");
    expect(makeEntryId("konu", 12, 2)).toBe("konu-aralik-2");
  });

  it("unlocks only the first unread entry", () => {
    const entries = getCategoryEntries("adab-i-muaseret");
    expect(getUnlockedEntryIndex(entries, new Set())).toBe(0);
    expect(getUnlockedEntryIndex(entries, new Set(["adab-i-muaseret-eylul-1"]))).toBe(1);
  });

  it("does not allow skipping an unread entry", () => {
    const entries = getCategoryEntries("adab-i-muaseret");
    expect(canCompleteEntry("adab-i-muaseret-eylul-2", entries, new Set())).toBe(false);
    expect(
      canCompleteEntry("adab-i-muaseret-eylul-2", entries, new Set(["adab-i-muaseret-eylul-1"]))
    ).toBe(true);
  });

  it("tracks progress independently per category", () => {
    const esmaEntries = getCategoryEntries("esma");
    const adabEntries = getCategoryEntries("adab-i-muaseret");

    // Completing esma-eylul-1 should NOT unlock adab-i-muaseret-eylul-2
    const completedAyet = new Set(["esma-eylul-1"]);
    expect(getUnlockedEntryIndex(esmaEntries, completedAyet)).toBe(1); // esma-eylul-2 unlocked
    expect(getUnlockedEntryIndex(adabEntries, completedAyet)).toBe(0); // adab-i-muaseret-eylul-1 still first

    expect(canCompleteEntry("adab-i-muaseret-eylul-2", adabEntries, completedAyet)).toBe(false);
    expect(canCompleteEntry("esma-eylul-2", esmaEntries, completedAyet)).toBe(true);
  });

  it("returns entries sorted by year/month/week within a category", () => {
    const esmaEntries = getCategoryEntries("esma");
    expect(esmaEntries[0].week).toBe(1);
    expect(esmaEntries[1].week).toBe(2);
    expect(esmaEntries[2].week).toBe(3);
    expect(esmaEntries[3].week).toBe(4);
    expect(esmaEntries[0].id).toBe("esma-eylul-1");
    expect(esmaEntries[1].id).toBe("esma-eylul-2");
  });

  describe("canUnmarkEntry", () => {
    it("allows unmarking the only completed entry", () => {
      const entries = getCategoryEntries("adab-i-muaseret");
      const completed = new Set(["adab-i-muaseret-eylul-1"]);
      expect(canUnmarkEntry("adab-i-muaseret-eylul-1", entries, completed)).toBe(true);
    });

    it("allows unmarking only the latest completed entry when multiple are completed", () => {
      const entries = getCategoryEntries("adab-i-muaseret");
      const completed = new Set(["adab-i-muaseret-eylul-1", "adab-i-muaseret-eylul-2"]);

      // adab-i-muaseret-eylul-2 is the latest -> allowed
      expect(canUnmarkEntry("adab-i-muaseret-eylul-2", entries, completed)).toBe(true);
      // adab-i-muaseret-eylul-1 has adab-i-muaseret-eylul-2 after it -> NOT allowed
      expect(canUnmarkEntry("adab-i-muaseret-eylul-1", entries, completed)).toBe(false);
    });

    it("returns false if the entry is not currently completed", () => {
      const entries = getCategoryEntries("adab-i-muaseret");
      const completed = new Set<string>();
      expect(canUnmarkEntry("adab-i-muaseret-eylul-1", entries, completed)).toBe(false);
    });

    it("returns false for non-existent entry", () => {
      const entries = getCategoryEntries("adab-i-muaseret");
      const completed = new Set(["adab-i-muaseret-eylul-1"]);
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
      expect(konuEntries.length).toBe(0);
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
      expect(resolved.length).toBe(konuEntries.length + 1);
      expect(resolved.every((e) => !e.isExtra)).toBe(true);
    });

    it("automatically converts entries beyond 48 weeks into extras", () => {
      // Create 50 entries: 48 standard + 2 beyond 48 weeks
      const mock50Entries = Array.from({ length: 50 }, (_, i) => {
        const weekNum = i + 1;
        const month = Math.min(12, Math.floor(i / 4) + 1);
        const week = (i % 4) + 1;
        return {
          id: `esma-w${weekNum}`,
          grade: 1,
          categoryId: "esma" as const,
          month,
          week,
          year: 2026,
          title: `Ayet Hafta ${weekNum}`,
        };
      });

      const resolved = getCategoryEntries("esma", mock50Entries);
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
        id: `esma-w${i + 1}`,
        grade: 1,
        categoryId: "esma" as const,
        month: Math.min(12, Math.floor(i / 4) + 1),
        week: (i % 4) + 1,
        year: 2026,
        title: `Ayet Hafta ${i + 1}`,
      }));

      const resolved = getCategoryEntries("esma", mock50Entries);
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
