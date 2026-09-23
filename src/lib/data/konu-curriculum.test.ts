import { describe, expect, it } from "bun:test";
import {
  konuCurriculumItems,
  getKonuItem,
  getKonuEntriesForGrade,
  getAllKonuEntries,
} from "./konu-curriculum";

describe("konu-curriculum data integrity", () => {
  it("contains exactly 12 items for 6 grades (2 weeks each)", () => {
    expect(konuCurriculumItems.length).toBe(12);
  });

  it("has exactly 2 entries per grade for all 6 Belgium grades", () => {
    for (let grade = 1; grade <= 6; grade++) {
      const entries = getKonuEntriesForGrade(grade);
      expect(entries.length).toBe(2);
      expect(entries[0].week).toBe(1);
      expect(entries[1].week).toBe(2);
      expect(entries[0].month).toBe(9);
      expect(entries[1].month).toBe(9);
      expect(entries[0].categoryId).toBe("konu");
      expect(entries[1].categoryId).toBe("konu");
    }
  });

  it("correctly identifies entry IDs across grades", () => {
    expect(getKonuItem("konu-eylul-1")?.title).toBe(
      "RİSALE-İ NUR: BİR KİTABIN SIRA DIŞI YOLCULUĞU"
    );
    expect(getKonuItem("konu-eylul-2")?.title).toBe("BEDİÜZZAMAN KİMDİR?");
    expect(getKonuItem("g2-konu-eylul-1")?.title).toBe(
      "İKİ KİLİMLİK BİR DÜKKÂNDA BAŞLAYAN YOLCULUK"
    );
    expect(getKonuItem("g6-konu-eylul-2")?.title).toBe("BİR ÖMRÜN MERKEZİNDE NE VARDI?");
  });

  it("handles M6-01 with zero vocabulary items as instructed by user", () => {
    const m6w1 = getKonuItem("g6-konu-eylul-1");
    expect(m6w1).toBeDefined();
    expect(m6w1?.vocab.length).toBe(0);
    expect(m6w1?.sections.length).toBeGreaterThan(0);
  });

  it("has non-empty vocabulary lists for all other 11 lessons", () => {
    for (const item of konuCurriculumItems) {
      if (item.grade === 6 && item.weekNumber === 1) continue;
      expect(item.vocab.length).toBeGreaterThanOrEqual(5);
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
      if (!(item.grade === 6 && item.weekNumber === 1)) {
        expect(item.discussionQuestions.length).toBeGreaterThan(0);
      }
    }
  });

  it("getAllKonuEntries returns all 12 entries with category konu", () => {
    const all = getAllKonuEntries();
    expect(all.length).toBe(12);
    expect(all.every((e) => e.categoryId === "konu")).toBe(true);
  });
});
