import { describe, expect, it } from "bun:test";
import {
  getAdabEntriesForGrade,
  liseAdabCurriculum,
  ortaokulAdabCurriculum,
} from "./adab-curriculum";

describe("adab-curriculum", () => {
  it("contains exactly 30 weeks for Ortaokul and 54 weeks for Lise", () => {
    expect(ortaokulAdabCurriculum.length).toBe(30);
    expect(liseAdabCurriculum.length).toBe(54);
  });

  it("assigns sequential week numbers and modular pdfUrl for Ortaokul", () => {
    ortaokulAdabCurriculum.forEach((item, index) => {
      expect(item.weekNumber).toBe(index + 1);
      expect(item.title).toContain(" — ");
      expect(item.body).toContain("• ");
      expect(item.pageCount).toBe(3);
      const padWeek = String(index + 1).padStart(2, "0");
      expect(item.pdfUrl).toBe(`/curriculum/adab/ortaokul/hafta-${padWeek}.pdf`);
    });

    liseAdabCurriculum.forEach((item, index) => {
      expect(item.weekNumber).toBe(index + 1);
      expect(item.title).toContain(" — ");
      expect(item.body).toContain("• ");
    });
  });

  it("produces 30 entries for Ortaokul (grades 1-3) and 54 entries for Lise (grades 4-6)", () => {
    for (let grade = 1; grade <= 3; grade++) {
      const entries = getAdabEntriesForGrade(grade);
      expect(entries.length).toBe(30);
      expect(entries.every((e) => !e.isExtra)).toBe(true);
      expect(entries.every((e) => e.pdfUrl && e.pageCount === 3)).toBe(true);

      if (grade === 1) {
        expect(entries[0].id).toBe("adab-i-muaseret-eylul-1");
        expect(entries[15].id).toBe("adab-i-muaseret-aralik-4");
        expect(entries[16].id).toBe("adab-i-muaseret-ocak-1");
        expect(entries[29].id).toBe("adab-i-muaseret-nisan-2");
      } else {
        expect(entries[0].id).toBe(`g${grade}-adab-i-muaseret-eylul-1`);
        expect(entries[29].id).toBe(`g${grade}-adab-i-muaseret-nisan-2`);
      }
    }

    for (let grade = 4; grade <= 6; grade++) {
      const entries = getAdabEntriesForGrade(grade);
      expect(entries.length).toBe(54);

      const standard = entries.filter((e) => !e.isExtra);
      const extras = entries.filter((e) => e.isExtra);

      expect(standard.length).toBe(48);
      expect(extras.length).toBe(6);

      expect(standard[0].id).toBe(`g${grade}-adab-i-muaseret-eylul-1`);
      expect(extras[0].id).toBe(`g${grade}-adab-i-muaseret-extra-1`);
    }
  });

  it("uses Ortaokul content for grades 1, 2, 3 and Lise content for grades 4, 5, 6", () => {
    const g1 = getAdabEntriesForGrade(1);
    const g2 = getAdabEntriesForGrade(2);
    const g3 = getAdabEntriesForGrade(3);
    const g4 = getAdabEntriesForGrade(4);
    const g5 = getAdabEntriesForGrade(5);
    const g6 = getAdabEntriesForGrade(6);

    // Ortaokul week 1 is Âdâb-ı Muaşeret
    expect(g1[0].title).toBe("Âdâb-ı Muaşeret — Ahdinde Durmak, Dostu Aramak ve Kusurları Örtmek");
    expect(g2[0].title).toBe("Âdâb-ı Muaşeret — Ahdinde Durmak, Dostu Aramak ve Kusurları Örtmek");
    expect(g3[0].title).toBe("Âdâb-ı Muaşeret — Ahdinde Durmak, Dostu Aramak ve Kusurları Örtmek");

    // Lise week 1 is Edep, Güzel Ahlâk ve Hilim
    expect(g4[0].title).toBe("Edep, Güzel Ahlâk ve Hilim — Edep Nedir?");
    expect(g5[0].title).toBe("Edep, Güzel Ahlâk ve Hilim — Edep Nedir?");
    expect(g6[0].title).toBe("Edep, Güzel Ahlâk ve Hilim — Edep Nedir?");

    // Verify Ortaokul and Lise bodies differ
    expect(g1[0].body).not.toBe(g4[0].body);
  });
});
