import { describe, expect, it } from "bun:test";
import {
  getAllEfendimizEntries,
  getEfendimizEntriesForGrade,
  liseEfendimizCurriculum,
  ortaokulEfendimizCurriculum,
} from "./efendimiz-curriculum";

describe("efendimiz-curriculum", () => {
  it("contains exactly 55 weeks for both Ortaokul and Lise", () => {
    expect(ortaokulEfendimizCurriculum.length).toBe(55);
    expect(liseEfendimizCurriculum.length).toBe(55);
  });

  it("assigns sequential week numbers from 1 to 55 with complete data", () => {
    ortaokulEfendimizCurriculum.forEach((item, index) => {
      expect(item.weekNumber).toBe(index + 1);
      expect(item.header).toBeTruthy();
      expect(item.story).toBeTruthy();
      expect(item.practice).toContain("Bu hafta:");
      expect(item.title).toContain(" — ");
      expect(item.body).toBeTruthy();
    });

    liseEfendimizCurriculum.forEach((item, index) => {
      expect(item.weekNumber).toBe(index + 1);
      expect(item.header).toBeTruthy();
      expect(item.story).toBeTruthy();
      expect(item.practice).toBeTruthy();
      expect(item.title).toContain(" — ");
      expect(item.body).toBeTruthy();
    });
  });

  it("produces 55 curriculum entries for each grade with 48 standard and 7 extras", () => {
    for (let grade = 1; grade <= 6; grade++) {
      const entries = getEfendimizEntriesForGrade(grade);
      expect(entries.length).toBe(55);

      const standard = entries.filter((e) => !e.isExtra);
      const extras = entries.filter((e) => e.isExtra);

      expect(standard.length).toBe(48);
      expect(extras.length).toBe(7);

      // Grade 1 ID pattern
      if (grade === 1) {
        expect(standard[0].id).toBe("efendimiz-eylul-1");
        expect(standard[15].id).toBe("efendimiz-aralik-4");
        expect(standard[16].id).toBe("efendimiz-ocak-1");
        expect(standard[47].id).toBe("efendimiz-agustos-4");
        expect(extras[0].id).toBe("efendimiz-extra-1");
        expect(extras[6].id).toBe("efendimiz-extra-7");
      } else {
        expect(standard[0].id).toBe(`g${grade}-efendimiz-eylul-1`);
        expect(extras[0].id).toBe(`g${grade}-efendimiz-extra-1`);
      }
    }
  });

  it("uses Ortaokul content for grades 1, 2, 3 and Lise content for grades 4, 5, 6", () => {
    const g1 = getEfendimizEntriesForGrade(1);
    const g2 = getEfendimizEntriesForGrade(2);
    const g3 = getEfendimizEntriesForGrade(3);
    const g4 = getEfendimizEntriesForGrade(4);
    const g5 = getEfendimizEntriesForGrade(5);
    const g6 = getEfendimizEntriesForGrade(6);

    // Ortaokul week 1 header
    expect(g1[0].title).toBe("ZÂHİR'E DEĞERİNİ HATIRLATMASI — İnsan dış görünüşüyle ölçülmez");
    expect(g2[0].title).toBe("ZÂHİR'E DEĞERİNİ HATIRLATMASI — İnsan dış görünüşüyle ölçülmez");
    expect(g3[0].title).toBe("ZÂHİR'E DEĞERİNİ HATIRLATMASI — İnsan dış görünüşüyle ölçülmez");

    // Lise week 1 header
    expect(g4[0].title).toBe("ZÂHİR'İN GÖNLÜNE DOKUNMASI — Değer, görünüşten daha derindir");
    expect(g5[0].title).toBe("ZÂHİR'İN GÖNLÜNE DOKUNMASI — Değer, görünüşten daha derindir");
    expect(g6[0].title).toBe("ZÂHİR'İN GÖNLÜNE DOKUNMASI — Değer, görünüşten daha derindir");

    // Verify Ortaokul and Lise bodies differ
    expect(g1[0].body).not.toBe(g4[0].body);
  });

  it("returns 330 entries for all 6 grades", () => {
    const all = getAllEfendimizEntries();
    expect(all.length).toBe(330);
  });
});
