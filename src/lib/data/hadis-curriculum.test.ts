import { describe, expect, it } from "bun:test";
import {
  getHadisEntriesForGrade,
  getAllHadisEntries,
  liseHadisCurriculum,
  ortaokulHadisCurriculum,
} from "./hadis-curriculum";

describe("hadis-curriculum", () => {
  it("contains exactly 55 weeks for both Ortaokul and Lise", () => {
    expect(ortaokulHadisCurriculum.length).toBe(55);
    expect(liseHadisCurriculum.length).toBe(55);
  });

  it("assigns sequential week numbers from 1 to 55 with complete data", () => {
    ortaokulHadisCurriculum.forEach((item, index) => {
      expect(item.weekNumber).toBe(index + 1);
      expect(item.topic).toBeTruthy();
      expect(item.arabic).toBeTruthy();
      expect(item.turkish).toBeTruthy();
      expect(item.source).toBeTruthy();
      expect(item.authenticity).toBeTruthy();
      expect(item.verifyUrl).toStartWith("https://sunnah.com/");
      expect(item.body).toContain("Türkçe Anlamı:");
      expect(item.body).toContain("Kaynak:");
    });

    liseHadisCurriculum.forEach((item, index) => {
      expect(item.weekNumber).toBe(index + 1);
      expect(item.topic).toBeTruthy();
      expect(item.arabic).toBeTruthy();
      expect(item.turkish).toBeTruthy();
      expect(item.source).toBeTruthy();
      expect(item.authenticity).toBeTruthy();
      expect(item.verifyUrl).toStartWith("https://sunnah.com/");
      expect(item.body).toContain("Türkçe Anlamı:");
      expect(item.body).toContain("Kaynak:");
    });
  });

  it("produces 55 curriculum entries for each grade with 48 standard and 7 extras", () => {
    for (let grade = 1; grade <= 6; grade++) {
      const entries = getHadisEntriesForGrade(grade);
      expect(entries.length).toBe(55);

      const standard = entries.filter((e) => !e.isExtra);
      const extras = entries.filter((e) => e.isExtra);

      expect(standard.length).toBe(48);
      expect(extras.length).toBe(7);

      // Grade 1 ID pattern
      if (grade === 1) {
        expect(standard[0].id).toBe("hadis-eylul-1");
        expect(standard[15].id).toBe("hadis-aralik-4");
        expect(standard[16].id).toBe("hadis-ocak-1");
        expect(standard[47].id).toBe("hadis-agustos-4");
        expect(extras[0].id).toBe("hadis-extra-1");
        expect(extras[6].id).toBe("hadis-extra-7");
      } else {
        expect(standard[0].id).toBe(`g${grade}-hadis-eylul-1`);
        expect(extras[0].id).toBe(`g${grade}-hadis-extra-1`);
      }
    }
  });

  it("uses Ortaokul content for grades 1, 2, 3 and Lise content for grades 4, 5, 6", () => {
    const g1 = getHadisEntriesForGrade(1);
    const g2 = getHadisEntriesForGrade(2);
    const g3 = getHadisEntriesForGrade(3);
    const g4 = getHadisEntriesForGrade(4);
    const g5 = getHadisEntriesForGrade(5);
    const g6 = getHadisEntriesForGrade(6);

    // Ortaokul week 3 is Dinde denge: Zorlaştırmadan devam etmek
    expect(g1[2].title).toBe("Dinde denge: Zorlaştırmadan devam etmek");
    expect(g2[2].title).toBe("Dinde denge: Zorlaştırmadan devam etmek");
    expect(g3[2].title).toBe("Dinde denge: Zorlaştırmadan devam etmek");

    // Lise week 3 is Helâl, haram ve şüpheli alanlar: Kalbi korumak
    expect(g4[2].title).toBe("Helâl, haram ve şüpheli alanlar: Kalbi korumak");
    expect(g5[2].title).toBe("Helâl, haram ve şüpheli alanlar: Kalbi korumak");
    expect(g6[2].title).toBe("Helâl, haram ve şüpheli alanlar: Kalbi korumak");

    // Verify bodies differ
    expect(g1[2].body).not.toBe(g4[2].body);
  });

  it("returns 330 entries for all 6 grades", () => {
    const all = getAllHadisEntries();
    expect(all.length).toBe(330);
  });
});
