import { describe, expect, it } from "bun:test";
import type { CurriculumCategoryId } from "@/lib/curriculum";
import { getKonuItem, konuCurriculumItems } from "./konu-curriculum";
import { getFirstWeekCurriculumEntries } from "./first-week-curriculum";
import { getSecondWeekCurriculumEntries } from "./second-week-curriculum";
import { secondWeekKonuItems } from "./konu-second-weeks";

const categories: CurriculumCategoryId[] = [
  "konu",
  "ayet",
  "hadis",
  "efendimiz",
  "sahabe-kissalari",
  "hocaefendi-dinleme",
];

describe("second-week curriculum", () => {
  it("exports exactly six categories per grade with unique canonical week-two IDs", () => {
    const entries = getSecondWeekCurriculumEntries();
    expect(entries).toHaveLength(36);
    expect(new Set(entries.map((entry) => entry.id)).size).toBe(36);
    for (let grade = 1; grade <= 6; grade++) {
      const group = entries.filter((entry) => entry.grade === grade);
      expect(group.map((entry) => entry.categoryId).sort()).toEqual([...categories].sort());
      for (const entry of group) {
        expect(entry.id).toBe(`g${grade}-${entry.categoryId}-eylul-2`);
        expect([entry.month, entry.week, entry.year]).toEqual([9, 2, 2026]);
        expect(entry.isExtra).toBe(false);
      }
    }
  });

  it("uses the new structured lesson in the reader without duplicate or changed week-one entries", () => {
    expect(new Set(konuCurriculumItems.map((item) => item.id)).size).toBe(
      konuCurriculumItems.length
    );
    for (const item of secondWeekKonuItems) {
      expect(getKonuItem(`g${item.grade}-konu-eylul-2`)).toBe(item);
    }
    for (const entry of getFirstWeekCurriculumEntries().filter(
      (entry) => entry.categoryId === "konu"
    )) {
      expect(getKonuItem(entry.id)?.body).toBe(entry.body);
    }
  });

  it("has source-separated lessons and complete forty-minute teaching materials", () => {
    for (const item of secondWeekKonuItems) {
      expect(item.discussionQuestions).toHaveLength(2);
      expect(item.sections.filter((section) => section.kind === "quote")).toHaveLength(3);
      expect(item.sections.some((section) => section.kind === "arabic")).toBe(true);
      expect(item.body).not.toContain("40 Dakikalık Akış");
      expect(item.body.indexOf("# Bana Ne Söylüyor?")).toBeLessThan(
        item.body.indexOf("# Bu Hafta Tanıştığımız Kelimeler")
      );
      expect(item.body.indexOf("# Bu Hafta Tanıştığımız Kelimeler")).toBeLessThan(
        item.body.indexOf("# Dipnotlar")
      );
      expect(item.takeaway.length).toBeGreaterThanOrEqual(3);
      expect(item.sources.length).toBeGreaterThanOrEqual(3);
      expect(item.body.split(/\s+/).length).toBeGreaterThan(700);
    }
  });

  it("ensures all entries have verified sources and structured sections without placeholder warnings", () => {
    const entries = getSecondWeekCurriculumEntries();
    for (const entry of entries) {
      expect(entry.body).not.toContain("Kaynak doğrulaması gerekli");
      expect(entry.body).not.toContain("henüz doğrulanmamıştır");
      expect(entry.body).not.toContain("# Kaynakça");
      expect(entry.body).toContain("# Dipnotlar");
      expect(entry.body).toContain("# Bana Ne Söylüyor?");
      expect(entry.body).toContain("# Bu Hafta Tanıştığımız Kelimeler");
    }
  });
});
