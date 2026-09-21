import { describe, expect, it } from "bun:test";
import {
  getAllSahabeEntries,
  getSahabeEntriesForGrade,
  liseSahabeCurriculum,
  ortaokulSahabeCurriculum,
} from "./sahabe-curriculum";

describe("sahabe-curriculum", () => {
  it("contains exactly 55 weeks for both Ortaokul and Lise", () => {
    expect(ortaokulSahabeCurriculum.length).toBe(55);
    expect(liseSahabeCurriculum.length).toBe(55);
  });

  it("assigns sequential week numbers from 1 to 55 with complete data", () => {
    ortaokulSahabeCurriculum.forEach((item, index) => {
      expect(item.weekNumber).toBe(index + 1);
      expect(item.rawTitle).toBeTruthy();
      expect(item.sahabi).toBeTruthy();
      expect(item.topic).toBeTruthy();
      expect(item.hadise).toBeTruthy();
      expect(item.lesson).toBeTruthy();
      expect(item.practice).toBeTruthy();
      expect(item.source).toContain("Kaynak:");
      expect(item.title).toContain(" — ");
      expect(item.body).toContain("Bugün bana ne söylüyor?");
      expect(item.body).toContain("Bu hafta dene:");
      expect(item.body).toContain("Kaynak:");
    });

    liseSahabeCurriculum.forEach((item, index) => {
      expect(item.weekNumber).toBe(index + 1);
      expect(item.rawTitle).toBeTruthy();
      expect(item.sahabi).toBeTruthy();
      expect(item.topic).toBeTruthy();
      expect(item.hadise).toBeTruthy();
      expect(item.lesson).toBeTruthy();
      expect(item.practice).toBeTruthy();
      expect(item.source).toContain("Kaynak:");
      expect(item.title).toContain(" — ");
      expect(item.body).toContain("Bugün bana ne söylüyor?");
      expect(item.body).toContain("Bu hafta dene:");
      expect(item.body).toContain("Kaynak:");
    });
  });

  it("produces 55 curriculum entries for each grade with 48 standard and 7 extras", () => {
    for (let grade = 1; grade <= 6; grade++) {
      const entries = getSahabeEntriesForGrade(grade);
      expect(entries.length).toBe(55);

      const standard = entries.filter((e) => !e.isExtra);
      const extras = entries.filter((e) => e.isExtra);

      expect(standard.length).toBe(48);
      expect(extras.length).toBe(7);

      // Grade 1 ID pattern
      if (grade === 1) {
        expect(standard[0].id).toBe("sahabe-kissalari-eylul-1");
        expect(standard[15].id).toBe("sahabe-kissalari-aralik-4");
        expect(standard[16].id).toBe("sahabe-kissalari-ocak-1");
        expect(standard[47].id).toBe("sahabe-kissalari-agustos-4");
        expect(extras[0].id).toBe("sahabe-kissalari-extra-1");
        expect(extras[6].id).toBe("sahabe-kissalari-extra-7");
      } else {
        expect(standard[0].id).toBe(`g${grade}-sahabe-kissalari-eylul-1`);
        expect(extras[0].id).toBe(`g${grade}-sahabe-kissalari-extra-1`);
      }
    }
  });

  it("uses Ortaokul content for grades 1, 2, 3 and Lise content for grades 4, 5, 6", () => {
    const g1 = getSahabeEntriesForGrade(1);
    const g2 = getSahabeEntriesForGrade(2);
    const g3 = getSahabeEntriesForGrade(3);
    const g4 = getSahabeEntriesForGrade(4);
    const g5 = getSahabeEntriesForGrade(5);
    const g6 = getSahabeEntriesForGrade(6);

    // Ortaokul week 1 title
    expect(g1[0].title).toBe("Hz. Ebû Bekir — Yılların Güveni");
    expect(g2[0].title).toBe("Hz. Ebû Bekir — Yılların Güveni");
    expect(g3[0].title).toBe("Hz. Ebû Bekir — Yılların Güveni");

    // Lise week 1 title
    expect(g4[0].title).toBe("Sa’d b. Rebî — “Malımın Yarısı Senin”");
    expect(g5[0].title).toBe("Sa’d b. Rebî — “Malımın Yarısı Senin”");
    expect(g6[0].title).toBe("Sa’d b. Rebî — “Malımın Yarısı Senin”");

    // Verify Ortaokul and Lise bodies differ
    expect(g1[0].body).not.toBe(g4[0].body);
  });

  it("returns 330 entries for all 6 grades", () => {
    const all = getAllSahabeEntries();
    expect(all.length).toBe(330);
  });
});
