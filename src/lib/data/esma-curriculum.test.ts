import { describe, expect, it } from "bun:test";
import {
  getEsmaEntriesForGrade,
  getAllEsmaEntries,
  liseEsmaCurriculum,
  ortaokulEsmaCurriculum,
} from "./esma-curriculum";

describe("esma-curriculum", () => {
  it("contains exactly 55 weeks for both Ortaokul and Lise", () => {
    expect(ortaokulEsmaCurriculum.length).toBe(55);
    expect(liseEsmaCurriculum.length).toBe(55);
  });

  it("assigns sequential week numbers from 1 to 55 with complete data", () => {
    ortaokulEsmaCurriculum.forEach((item, index) => {
      expect(item.weekNumber).toBe(index + 1);
      expect(item.name).toBeTruthy();
      expect(item.meaning).toBeTruthy();
      expect(item.title).toContain(" — ");
      expect(item.body).toBeTruthy();
    });

    liseEsmaCurriculum.forEach((item, index) => {
      expect(item.weekNumber).toBe(index + 1);
      expect(item.name).toBeTruthy();
      expect(item.meaning).toBeTruthy();
      expect(item.title).toContain(" — ");
      expect(item.body).toBeTruthy();
    });
  });

  it("produces 55 curriculum entries for each grade with 48 standard and 7 extras", () => {
    for (let grade = 1; grade <= 6; grade++) {
      const entries = getEsmaEntriesForGrade(grade);
      expect(entries.length).toBe(55);

      const standard = entries.filter((e) => !e.isExtra);
      const extras = entries.filter((e) => e.isExtra);

      expect(standard.length).toBe(48);
      expect(extras.length).toBe(7);

      // Grade 1 ID pattern
      if (grade === 1) {
        expect(standard[0].id).toBe("esma-eylul-1");
        expect(standard[15].id).toBe("esma-aralik-4");
        expect(standard[16].id).toBe("esma-ocak-1");
        expect(standard[47].id).toBe("esma-agustos-4");
        expect(extras[0].id).toBe("esma-extra-1");
        expect(extras[6].id).toBe("esma-extra-7");
      } else {
        expect(standard[0].id).toBe(`g${grade}-esma-eylul-1`);
        expect(extras[0].id).toBe(`g${grade}-esma-extra-1`);
      }
    }
  });

  it("uses Ortaokul content for grades 1, 2, 3 and Lise content for grades 4, 5, 6", () => {
    const g1 = getEsmaEntriesForGrade(1);
    const g2 = getEsmaEntriesForGrade(2);
    const g3 = getEsmaEntriesForGrade(3);
    const g4 = getEsmaEntriesForGrade(4);
    const g5 = getEsmaEntriesForGrade(5);
    const g6 = getEsmaEntriesForGrade(6);

    // Ortaokul week 1 is EL-CEMÎL with Ortaokul meaning
    expect(g1[0].title).toBe("EL-CEMÎL — Güzel olan, güzellik veren.");
    expect(g2[0].title).toBe("EL-CEMÎL — Güzel olan, güzellik veren.");
    expect(g3[0].title).toBe("EL-CEMÎL — Güzel olan, güzellik veren.");

    // Lise week 1 is EL-CEMÎL with Lise meaning
    expect(g4[0].title).toBe("EL-CEMÎL — Mutlak güzellik sahibi, güzelleştiren.");
    expect(g5[0].title).toBe("EL-CEMÎL — Mutlak güzellik sahibi, güzelleştiren.");
    expect(g6[0].title).toBe("EL-CEMÎL — Mutlak güzellik sahibi, güzelleştiren.");

    // Verify Ortaokul and Lise bodies differ
    expect(g1[0].body).not.toBe(g4[0].body);
  });

  it("returns 330 entries for all 6 grades", () => {
    const all = getAllEsmaEntries();
    expect(all.length).toBe(330);
  });
});
