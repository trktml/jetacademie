import { describe, expect, it } from "bun:test";
import {
  getAdabEntriesForGrade,
  liseAdabCurriculum,
  ortaokulAdabCurriculum,
} from "./adab-curriculum";

describe("adab-curriculum", () => {
  it("contains exactly 54 weeks for both Ortaokul and Lise", () => {
    expect(ortaokulAdabCurriculum.length).toBe(54);
    expect(liseAdabCurriculum.length).toBe(54);
  });

  it("assigns sequential week numbers from 1 to 54", () => {
    ortaokulAdabCurriculum.forEach((item, index) => {
      expect(item.weekNumber).toBe(index + 1);
      expect(item.title).toContain(" — ");
      expect(item.body).toContain("• ");
    });

    liseAdabCurriculum.forEach((item, index) => {
      expect(item.weekNumber).toBe(index + 1);
      expect(item.title).toContain(" — ");
      expect(item.body).toContain("• ");
    });
  });

  it("produces 54 curriculum entries for each grade with 48 standard and 6 extras", () => {
    for (let grade = 1; grade <= 6; grade++) {
      const entries = getAdabEntriesForGrade(grade);
      expect(entries.length).toBe(54);

      const standard = entries.filter((e) => !e.isExtra);
      const extras = entries.filter((e) => e.isExtra);

      expect(standard.length).toBe(48);
      expect(extras.length).toBe(6);

      // Grade 1 ID pattern
      if (grade === 1) {
        expect(standard[0].id).toBe("adab-i-muaseret-eylul-1");
        expect(standard[15].id).toBe("adab-i-muaseret-aralik-4");
        expect(standard[16].id).toBe("adab-i-muaseret-ocak-1");
        expect(standard[47].id).toBe("adab-i-muaseret-agustos-4");
        expect(extras[0].id).toBe("adab-i-muaseret-extra-1");
        expect(extras[5].id).toBe("adab-i-muaseret-extra-6");
      } else {
        expect(standard[0].id).toBe(`g${grade}-adab-i-muaseret-eylul-1`);
        expect(extras[0].id).toBe(`g${grade}-adab-i-muaseret-extra-1`);
      }
    }
  });

  it("uses Ortaokul content for grades 1, 2, 3 and Lise content for grades 4, 5, 6", () => {
    const g1 = getAdabEntriesForGrade(1);
    const g2 = getAdabEntriesForGrade(2);
    const g3 = getAdabEntriesForGrade(3);
    const g4 = getAdabEntriesForGrade(4);
    const g5 = getAdabEntriesForGrade(5);
    const g6 = getAdabEntriesForGrade(6);

    // Ortaokul week 1 is Sohbet Âdâbı
    expect(g1[0].title).toBe("Sohbet Âdâbı — Sohbete Yer ve Gönül Hazırlığı");
    expect(g2[0].title).toBe("Sohbet Âdâbı — Sohbete Yer ve Gönül Hazırlığı");
    expect(g3[0].title).toBe("Sohbet Âdâbı — Sohbete Yer ve Gönül Hazırlığı");

    // Lise week 1 is Edep, Güzel Ahlâk ve Hilim
    expect(g4[0].title).toBe("Edep, Güzel Ahlâk ve Hilim — Edep Nedir?");
    expect(g5[0].title).toBe("Edep, Güzel Ahlâk ve Hilim — Edep Nedir?");
    expect(g6[0].title).toBe("Edep, Güzel Ahlâk ve Hilim — Edep Nedir?");

    // Verify Ortaokul and Lise bodies differ
    expect(g1[0].body).not.toBe(g4[0].body);
  });
});
