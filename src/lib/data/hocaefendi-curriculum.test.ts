import { describe, expect, it } from "bun:test";
import {
  getAllHocaefendiEntries,
  getHocaefendiEntriesForGrade,
  hocaefendiGrade1Curriculum,
  hocaefendiGrade2Curriculum,
  hocaefendiGrade3Curriculum,
  hocaefendiGrade4Curriculum,
  hocaefendiGrade5Curriculum,
  hocaefendiGrade6Curriculum,
} from "./hocaefendi-curriculum";

describe("hocaefendi-curriculum", () => {
  it("contains exactly 48 weeks for all 6 individual grades", () => {
    expect(hocaefendiGrade1Curriculum.length).toBe(48);
    expect(hocaefendiGrade2Curriculum.length).toBe(48);
    expect(hocaefendiGrade3Curriculum.length).toBe(48);
    expect(hocaefendiGrade4Curriculum.length).toBe(48);
    expect(hocaefendiGrade5Curriculum.length).toBe(48);
    expect(hocaefendiGrade6Curriculum.length).toBe(48);
  });

  it("assigns sequential week numbers from 1 to 48 with complete metadata and FR/NL vocabulary", () => {
    const curricula = [
      hocaefendiGrade1Curriculum,
      hocaefendiGrade2Curriculum,
      hocaefendiGrade3Curriculum,
      hocaefendiGrade4Curriculum,
      hocaefendiGrade5Curriculum,
      hocaefendiGrade6Curriculum,
    ];

    curricula.forEach((gradeList, gradeIndex) => {
      const expectedGrade = gradeIndex + 1;
      gradeList.forEach((item, index) => {
        expect(item.weekNumber).toBe(index + 1);
        expect(item.grade).toBe(expectedGrade);
        expect(item.title).toBeTruthy();
        expect(item.summary).toBeTruthy();
        expect(item.youtubeUrl).toStartWith("https://www.youtube.com/");
        expect(item.videoId).toBeTruthy();
        expect(item.vocab.length).toBeGreaterThanOrEqual(4);
        expect(item.vocab.length).toBeLessThanOrEqual(6);
        expect(item.body).toContain("📚 **Kelimeler ve Anlamları**:");
        expect(item.body).toContain("FR:");
        expect(item.body).toContain("NL:");

        item.vocab.forEach((v) => {
          expect(v.word).toBeTruthy();
          expect(v.tr).toBeTruthy();
          expect(v.fr).toBeTruthy();
          expect(v.nl).toBeTruthy();
        });
      });
    });
  });

  it("produces 48 standard curriculum entries for each grade with correct ID formatting", () => {
    for (let grade = 1; grade <= 6; grade++) {
      const entries = getHocaefendiEntriesForGrade(grade);
      expect(entries.length).toBe(48);

      const standard = entries.filter((e) => !e.isExtra);
      expect(standard.length).toBe(48);

      // Grade 1 ID pattern
      if (grade === 1) {
        expect(standard[0].id).toBe("hocaefendi-dinleme-eylul-1");
        expect(standard[15].id).toBe("hocaefendi-dinleme-aralik-4");
        expect(standard[16].id).toBe("hocaefendi-dinleme-ocak-1");
        expect(standard[47].id).toBe("hocaefendi-dinleme-agustos-4");
      } else {
        expect(standard[0].id).toBe(`g${grade}-hocaefendi-dinleme-eylul-1`);
        expect(standard[15].id).toBe(`g${grade}-hocaefendi-dinleme-aralik-4`);
        expect(standard[16].id).toBe(`g${grade}-hocaefendi-dinleme-ocak-1`);
        expect(standard[47].id).toBe(`g${grade}-hocaefendi-dinleme-agustos-4`);
      }

      // Check date resolution
      expect(standard[0].month).toBe(9);
      expect(standard[0].year).toBe(2026);
      expect(standard[16].month).toBe(1);
      expect(standard[16].year).toBe(2027);
      expect(standard[47].month).toBe(8);
      expect(standard[47].year).toBe(2027);
    }
  });

  it("returns exactly 288 entries for all 6 grades combined via getAllHocaefendiEntries", () => {
    const all = getAllHocaefendiEntries();
    expect(all.length).toBe(288);

    // Verify all have categoryId 'hocaefendi-dinleme' and valid resourceUrl
    all.forEach((entry) => {
      expect(entry.categoryId).toBe("hocaefendi-dinleme");
      expect(entry.resourceUrl).toStartWith("https://www.youtube.com/");
      expect(entry.body).toBeTruthy();
      expect(entry.title).toBeTruthy();
    });
  });
});
