import { describe, expect, it } from "bun:test";
import {
  getAllIlmihalEntries,
  getIlmihalEntriesForGrade,
  liseIlmihalBayan,
  liseIlmihalErkek,
  ortaokulIlmihalBayan,
  ortaokulIlmihalErkek,
} from "./ilmihal-curriculum";

describe("ilmihal-curriculum", () => {
  it("contains 28 weeks for Ortaokul and 104/98 weeks for Lise", () => {
    expect(ortaokulIlmihalBayan.length).toBe(28);
    expect(ortaokulIlmihalErkek.length).toBe(28);
    expect(liseIlmihalBayan.length).toBe(104);
    expect(liseIlmihalErkek.length).toBe(98);
  });

  it("produces 774 total İlmihal entries across all 6 grades and both genders", () => {
    const all = getAllIlmihalEntries();
    expect(all.length).toBe(774);
  });

  it("produces 28 standard weeks and 0 extras for Ortaokul (grades 1, 2, 3)", () => {
    for (let grade = 1; grade <= 3; grade++) {
      for (const gender of ["erkek", "bayan"] as const) {
        const entries = getIlmihalEntriesForGrade(grade, gender);
        expect(entries.length).toBe(28);

        const standard = entries.filter((e) => !e.isExtra);
        const extras = entries.filter((e) => e.isExtra);
        expect(standard.length).toBe(28);
        expect(extras.length).toBe(0);

        if (grade === 1) {
          expect(standard[0].id).toBe(`ilmihal-${gender}-eylul-1`);
          expect(standard[27].id).toBe(`ilmihal-${gender}-mart-4`);
        } else {
          expect(standard[0].id).toBe(`g${grade}-ilmihal-${gender}-eylul-1`);
          expect(standard[27].id).toBe(`g${grade}-ilmihal-${gender}-mart-4`);
        }
      }
    }
  });

  it("produces 48 standard weeks + extras for Lise (grades 4, 5, 6)", () => {
    for (let grade = 4; grade <= 6; grade++) {
      // Bayan: 104 weeks (48 standard + 56 extras)
      const bayanEntries = getIlmihalEntriesForGrade(grade, "bayan");
      expect(bayanEntries.length).toBe(104);
      const bayanStandard = bayanEntries.filter((e) => !e.isExtra);
      const bayanExtras = bayanEntries.filter((e) => e.isExtra);
      expect(bayanStandard.length).toBe(48);
      expect(bayanExtras.length).toBe(56);
      expect(bayanStandard[0].id).toBe(`g${grade}-ilmihal-bayan-eylul-1`);
      expect(bayanExtras[0].id).toBe(`g${grade}-ilmihal-bayan-extra-1`);
      expect(bayanExtras[55].id).toBe(`g${grade}-ilmihal-bayan-extra-56`);

      // Erkek: 98 weeks (48 standard + 50 extras)
      const erkekEntries = getIlmihalEntriesForGrade(grade, "erkek");
      expect(erkekEntries.length).toBe(98);
      const erkekStandard = erkekEntries.filter((e) => !e.isExtra);
      const erkekExtras = erkekEntries.filter((e) => e.isExtra);
      expect(erkekStandard.length).toBe(48);
      expect(erkekExtras.length).toBe(50);
      expect(erkekStandard[0].id).toBe(`g${grade}-ilmihal-erkek-eylul-1`);
      expect(erkekExtras[0].id).toBe(`g${grade}-ilmihal-erkek-extra-1`);
      expect(erkekExtras[49].id).toBe(`g${grade}-ilmihal-erkek-extra-50`);
    }
  });

  it("includes women-specific rulings in Lise Bayan but not in Lise Erkek", () => {
    const bayanEntries = getIlmihalEntriesForGrade(4, "bayan");
    const erkekEntries = getIlmihalEntriesForGrade(4, "erkek");

    const bayanHasOzelHaller = bayanEntries.some(
      (e) => e.title.includes("Hanımlara Özel Hâller") || e.body?.includes("Âdet")
    );
    expect(bayanHasOzelHaller).toBe(true);

    const erkekHasHayiz = erkekEntries.some((e) => e.title.includes("Hayız"));
    expect(erkekHasHayiz).toBe(false);
  });
});
