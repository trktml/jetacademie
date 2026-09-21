import { describe, expect, it } from "bun:test";
import {
  getAyetEntriesForGrade,
  getAllAyetEntries,
  liseAyetCurriculum,
  ortaokulAyetCurriculum,
} from "./ayet-curriculum";

describe("ayet-curriculum", () => {
  it("contains exactly 55 weeks for both Ortaokul and Lise", () => {
    expect(ortaokulAyetCurriculum.length).toBe(55);
    expect(liseAyetCurriculum.length).toBe(55);
  });

  it("assigns sequential week numbers from 1 to 55 with complete data", () => {
    ortaokulAyetCurriculum.forEach((item, index) => {
      expect(item.weekNumber).toBe(index + 1);
      expect(item.surahVerse).toBeTruthy();
      expect(item.topic).toBeTruthy();
      expect(item.arabic).toBeTruthy();
      expect(item.translation).toBeTruthy();
      expect(item.explanation).toBeTruthy();
      expect(item.title).toContain(" — ");
      expect(item.body).toContain("Meâl (Suat Yıldırım):");
      expect(item.body).toContain("Açıklama:");
    });

    liseAyetCurriculum.forEach((item, index) => {
      expect(item.weekNumber).toBe(index + 1);
      expect(item.surahVerse).toBeTruthy();
      expect(item.topic).toBeTruthy();
      expect(item.arabic).toBeTruthy();
      expect(item.translation).toBeTruthy();
      expect(item.explanation).toBeTruthy();
      expect(item.title).toContain(" — ");
      expect(item.body).toContain("Meâl (Suat Yıldırım):");
      expect(item.body).toContain("Açıklama:");
    });
  });

  it("produces 55 curriculum entries for each grade with 48 standard and 7 extras", () => {
    for (let grade = 1; grade <= 6; grade++) {
      const entries = getAyetEntriesForGrade(grade);
      expect(entries.length).toBe(55);

      const standard = entries.filter((e) => !e.isExtra);
      const extras = entries.filter((e) => e.isExtra);

      expect(standard.length).toBe(48);
      expect(extras.length).toBe(7);

      // Grade 1 ID pattern
      if (grade === 1) {
        expect(standard[0].id).toBe("ayet-eylul-1");
        expect(standard[15].id).toBe("ayet-aralik-4");
        expect(standard[16].id).toBe("ayet-ocak-1");
        expect(standard[47].id).toBe("ayet-agustos-4");
        expect(extras[0].id).toBe("ayet-extra-1");
        expect(extras[6].id).toBe("ayet-extra-7");
      } else {
        expect(standard[0].id).toBe(`g${grade}-ayet-eylul-1`);
        expect(extras[0].id).toBe(`g${grade}-ayet-extra-1`);
      }
    }
  });

  it("uses Ortaokul content for grades 1, 2, 3 and Lise content for grades 4, 5, 6", () => {
    const g1 = getAyetEntriesForGrade(1);
    const g2 = getAyetEntriesForGrade(2);
    const g3 = getAyetEntriesForGrade(3);
    const g4 = getAyetEntriesForGrade(4);
    const g5 = getAyetEntriesForGrade(5);
    const g6 = getAyetEntriesForGrade(6);

    // Ortaokul week 1 is Fâtiha 1/1
    expect(g1[0].title).toBe("Fâtiha 1/1 — Her işe Allah’ın adıyla başlamak");
    expect(g2[0].title).toBe("Fâtiha 1/1 — Her işe Allah’ın adıyla başlamak");
    expect(g3[0].title).toBe("Fâtiha 1/1 — Her işe Allah’ın adıyla başlamak");

    // Lise week 1 is Fâtiha 1/5
    expect(g4[0].title).toBe("Fâtiha 1/5 — Kulluk ve istiâne");
    expect(g5[0].title).toBe("Fâtiha 1/5 — Kulluk ve istiâne");
    expect(g6[0].title).toBe("Fâtiha 1/5 — Kulluk ve istiâne");

    // Verify Ortaokul and Lise bodies differ
    expect(g1[0].body).not.toBe(g4[0].body);
  });

  it("returns 330 entries for all 6 grades", () => {
    const all = getAllAyetEntries();
    expect(all.length).toBe(330);
  });
});
