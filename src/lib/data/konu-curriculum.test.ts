import { describe, expect, it } from "bun:test";
import {
  konuCurriculumItems,
  getKonuItem,
  getKonuEntriesForGrade,
  getAllKonuEntries,
} from "./konu-curriculum";

describe("konu-curriculum data integrity", () => {
  it("contains the first four weeks for grade 1 and first two entries for other grades", () => {
    expect(konuCurriculumItems.length).toBe(14);
  });

  it("has four opening entries for grade 1 and two entries for grades 2–6", () => {
    for (let grade = 1; grade <= 6; grade++) {
      const entries = getKonuEntriesForGrade(grade);
      const expectedCount = grade === 1 ? 4 : 2;
      expect(entries.length).toBe(expectedCount);
      expect(entries.map((entry) => entry.week)).toEqual(
        Array.from({ length: expectedCount }, (_, index) => index + 1)
      );
      expect(entries.every((entry) => entry.month === 9)).toBe(true);
      expect(entries.every((entry) => entry.categoryId === "konu")).toBe(true);
    }
  });

  it("correctly identifies entry IDs across grades", () => {
    expect(getKonuItem("g1-konu-eylul-1")).toBe(getKonuItem("konu-eylul-1"));
    expect(getKonuItem("konu-eylul-1")?.title).toBe("Benim Büyük Sorularım");
    expect(getKonuItem("konu-eylul-2")?.title).toBe("Bu Eser Neden Hâlâ Okunuyor?");
    expect(getKonuItem("konu-eylul-3")?.title).toBe("Bediüzzaman Kimdir?");
    expect(getKonuItem("konu-eylul-4")?.title).toBe(
      "Bir Kitapla Nasıl Arkadaş Olunur? — Hocaefendi ve Risale Okuma Kültürü"
    );
    expect(getKonuItem("g2-konu-eylul-1")?.title).toBe(
      "Geçen Yıldan Bugüne: Bir Metni İkinci Kez Okumak"
    );
    expect(getKonuItem("g6-konu-eylul-2")?.title).toBe(
      "Bediüzzaman: Bir Ömür Nasıl Bir Merkez Etrafında Toplanır?"
    );
  });

  it("includes vocabulary and structured sections for M6-01", () => {
    const m6w1 = getKonuItem("g6-konu-eylul-1");
    expect(m6w1).toBeDefined();
    expect(m6w1?.vocab.length).toBeGreaterThanOrEqual(5);
    expect(m6w1?.sections.length).toBeGreaterThan(0);
  });

  it("has non-empty vocabulary lists for all lessons", () => {
    for (const item of konuCurriculumItems) {
      expect(item.vocab.length).toBeGreaterThanOrEqual(item.grade === 1 ? 3 : 5);
      for (const v of item.vocab) {
        expect(v.word.trim().length).toBeGreaterThan(0);
        expect(v.definition.trim().length).toBeGreaterThan(0);
      }
    }
  });

  it("has positive reading minutes and discussion questions for all appropriate lessons", () => {
    for (const item of konuCurriculumItems) {
      expect(item.readingMinutes).toBeGreaterThanOrEqual(2);
      expect(item.sections.length).toBeGreaterThan(0);
      expect(item.discussionQuestions.length).toBeGreaterThan(0);
    }
  });

  it("getAllKonuEntries returns all 14 entries with category konu", () => {
    const all = getAllKonuEntries();
    expect(all.length).toBe(14);
    expect(all.every((e) => e.categoryId === "konu")).toBe(true);
  });
});
