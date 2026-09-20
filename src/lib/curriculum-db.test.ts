import { describe, expect, it } from "bun:test";
import {
  ensureCurriculumEntriesTable,
  getCurriculumEntriesFromDb,
  getCurriculumEntryByIdFromDb,
  getUserGenderFromDb,
  seedCurriculumDatabase,
  setUserGenderInDb,
} from "./curriculum-db";
import { BELGIUM_GRADES } from "./curriculum";
import { db } from "./auth";

describe("Curriculum SQLite Database Module", () => {
  it("should ensure table exists and seed data without errors", () => {
    ensureCurriculumEntriesTable();
    seedCurriculumDatabase();

    const allEntries = getCurriculumEntriesFromDb();
    expect(allEntries.length).toBeGreaterThan(0);
  });

  it("should support all 6 Belgium grades", () => {
    for (const grade of BELGIUM_GRADES) {
      const gradeEntries = getCurriculumEntriesFromDb(grade);
      expect(gradeEntries.length).toBeGreaterThan(0);
      expect(gradeEntries.every((e) => e.grade === grade)).toBe(true);
    }
  });

  it("should enforce standard entries and zero premature extras for categories under 48 weeks", () => {
    const grade1Entries = getCurriculumEntriesFromDb(1);
    const ayetEntries = grade1Entries.filter((e) => e.categoryId === "ayet");

    const standardAyet = ayetEntries.filter((e) => !e.isExtra);
    const extraAyet = ayetEntries.filter((e) => e.isExtra);

    expect(standardAyet.length).toBe(16);
    expect(extraAyet.length).toBe(0); // 16 < 48: absolutely no extras before 48 weeks
  });

  it("should retrieve a specific entry by its deterministic ID", () => {
    const entry1 = getCurriculumEntryByIdFromDb("ayet-eylul-1");
    expect(entry1).not.toBeNull();
    expect(entry1?.title).toContain("Bakara Suresi");
    expect(entry1?.grade).toBe(1);
    expect(entry1?.isExtra).toBe(false);

    const entry2 = getCurriculumEntryByIdFromDb("ayet-aralik-4");
    expect(entry2).not.toBeNull();
    expect(entry2?.title).toContain("İsrâ Suresi");
    expect(entry2?.grade).toBe(1);
    expect(entry2?.isExtra).toBe(false);
  });

  it("should return null for non-existent entry ID", () => {
    const entry = getCurriculumEntryByIdFromDb("non-existent-id-xyz");
    expect(entry).toBeNull();
  });

  it("should have 54 Adab-ı Muaşeret entries for all 6 grades (324 total)", () => {
    const allEntries = getCurriculumEntriesFromDb();
    const adabEntries = allEntries.filter((e) => e.categoryId === "adab-i-muaseret");
    expect(adabEntries.length).toBe(324);

    for (let grade = 1; grade <= 6; grade++) {
      const gradeAdab = getCurriculumEntriesFromDb(grade).filter(
        (e) => e.categoryId === "adab-i-muaseret"
      );
      expect(gradeAdab.length).toBe(54);

      const standard = gradeAdab.filter((e) => !e.isExtra);
      const extras = gradeAdab.filter((e) => e.isExtra);
      expect(standard.length).toBe(48);
      expect(extras.length).toBe(6);

      // Verify middle school content for grades 1-3
      if (grade <= 3) {
        expect(standard[0].title).toBe("Sohbet Âdâbı — Sohbete Yer ve Gönül Hazırlığı");
      } else {
        // Verify high school content for grades 4-6
        expect(standard[0].title).toBe("Edep, Güzel Ahlâk ve Hilim — Edep Nedir?");
      }
    }
  });

  it("should retrieve Adab-ı Muaşeret entries across grades by deterministic ID", () => {
    // Grade 1 standard & extra
    const g1Entry = getCurriculumEntryByIdFromDb("adab-i-muaseret-eylul-1");
    expect(g1Entry).not.toBeNull();
    expect(g1Entry?.title).toBe("Sohbet Âdâbı — Sohbete Yer ve Gönül Hazırlığı");
    expect(g1Entry?.grade).toBe(1);
    expect(g1Entry?.isExtra).toBe(false);

    const g1Extra = getCurriculumEntryByIdFromDb("adab-i-muaseret-extra-1");
    expect(g1Extra).not.toBeNull();
    expect(g1Extra?.grade).toBe(1);
    expect(g1Extra?.isExtra).toBe(true);
    expect(g1Extra?.extraOrder).toBe(1);

    // Grade 4 (Lise) standard & extra
    const g4Entry = getCurriculumEntryByIdFromDb("g4-adab-i-muaseret-eylul-1");
    expect(g4Entry).not.toBeNull();
    expect(g4Entry?.title).toBe("Edep, Güzel Ahlâk ve Hilim — Edep Nedir?");
    expect(g4Entry?.grade).toBe(4);
    expect(g4Entry?.isExtra).toBe(false);

    const g4Extra = getCurriculumEntryByIdFromDb("g4-adab-i-muaseret-extra-6");
    expect(g4Extra).not.toBeNull();
    expect(g4Extra?.grade).toBe(4);
    expect(g4Extra?.isExtra).toBe(true);
    expect(g4Extra?.extraOrder).toBe(6);
  });

  it("should store and retrieve user gender preferences in SQLite", () => {
    const testUserId = `user_pref_test_${Date.now()}`;
    expect(getUserGenderFromDb(testUserId)).toBeNull();

    // Insert dummy user to satisfy FK constraint
    const now = new Date().toISOString();
    db.query(
      `INSERT INTO "user" ("id", "name", "email", "createdAt", "updatedAt") VALUES (?, ?, ?, ?, ?)`
    ).run(testUserId, "Test Pref User", `${testUserId}@example.com`, now, now);

    setUserGenderInDb(testUserId, "bayan");
    expect(getUserGenderFromDb(testUserId)).toBe("bayan");

    setUserGenderInDb(testUserId, "erkek");
    expect(getUserGenderFromDb(testUserId)).toBe("erkek");
  });

  it("should filter İlmihal entries by gender in getCurriculumEntriesFromDb", () => {
    // Ortaokul 1. Sınıf: 28 weeks for both Erkek and Bayan
    const g1Bayan = getCurriculumEntriesFromDb(1, "bayan").filter(
      (e) => e.categoryId === "ilmihal"
    );
    const g1Erkek = getCurriculumEntriesFromDb(1, "erkek").filter(
      (e) => e.categoryId === "ilmihal"
    );
    expect(g1Bayan.length).toBe(28);
    expect(g1Erkek.length).toBe(28);
    expect(g1Bayan.every((e) => e.gender === "bayan")).toBe(true);
    expect(g1Erkek.every((e) => e.gender === "erkek")).toBe(true);

    // Lise 4. Sınıf: 104 weeks for Bayan (48 standard + 56 extra), 98 weeks for Erkek (48 standard + 50 extra)
    const g4Bayan = getCurriculumEntriesFromDb(4, "bayan").filter(
      (e) => e.categoryId === "ilmihal"
    );
    const g4Erkek = getCurriculumEntriesFromDb(4, "erkek").filter(
      (e) => e.categoryId === "ilmihal"
    );
    expect(g4Bayan.length).toBe(104);
    expect(g4Erkek.length).toBe(98);

    const g4BayanExtras = g4Bayan.filter((e) => e.isExtra);
    const g4ErkekExtras = g4Erkek.filter((e) => e.isExtra);
    expect(g4BayanExtras.length).toBe(56);
    expect(g4ErkekExtras.length).toBe(50);
  });

  it("should retrieve İlmihal entries by deterministic ID", () => {
    const bayanEntry = getCurriculumEntryByIdFromDb("ilmihal-bayan-eylul-1");
    expect(bayanEntry).not.toBeNull();
    expect(bayanEntry?.gender).toBe("bayan");
    expect(bayanEntry?.grade).toBe(1);
    expect(bayanEntry?.pdfUrl).toBe("/curriculum/ilmihal/ortaokul/bayan/hafta-01.pdf");

    const erkekEntry = getCurriculumEntryByIdFromDb("ilmihal-erkek-eylul-1");
    expect(erkekEntry).not.toBeNull();
    expect(erkekEntry?.gender).toBe("erkek");
    expect(erkekEntry?.grade).toBe(1);
    expect(erkekEntry?.pdfUrl).toBe("/curriculum/ilmihal/ortaokul/erkek/hafta-01.pdf");

    const liseBayanExtra56 = getCurriculumEntryByIdFromDb("g4-ilmihal-bayan-extra-56");
    expect(liseBayanExtra56).not.toBeNull();
    expect(liseBayanExtra56?.isExtra).toBe(true);
    expect(liseBayanExtra56?.extraOrder).toBe(56);
    expect(liseBayanExtra56?.pdfUrl).toBe("/curriculum/ilmihal/lise/bayan/hafta-104.pdf");

    const liseErkekExtra50 = getCurriculumEntryByIdFromDb("g4-ilmihal-erkek-extra-50");
    expect(liseErkekExtra50).not.toBeNull();
    expect(liseErkekExtra50?.isExtra).toBe(true);
    expect(liseErkekExtra50?.extraOrder).toBe(50);
    expect(liseErkekExtra50?.pdfUrl).toBe("/curriculum/ilmihal/lise/erkek/hafta-98.pdf");
  });
});
