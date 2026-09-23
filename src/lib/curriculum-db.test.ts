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
    const konuEntries = grade1Entries.filter((e) => e.categoryId === "konu");

    const standardKonu = konuEntries.filter((e) => !e.isExtra);
    const extraKonu = konuEntries.filter((e) => e.isExtra);

    expect(standardKonu.length).toBe(2);
    expect(extraKonu.length).toBe(0); // 2 < 48: absolutely no extras before 48 weeks
  });

  it("should retrieve a specific entry by its deterministic ID", () => {
    const entry1 = getCurriculumEntryByIdFromDb("ayet-eylul-1");
    expect(entry1).not.toBeNull();
    expect(entry1?.title).toContain("Fâtiha 1/1");
    expect(entry1?.grade).toBe(1);
    expect(entry1?.isExtra).toBe(false);

    const entry2 = getCurriculumEntryByIdFromDb("ayet-aralik-4");
    expect(entry2).not.toBeNull();
    expect(entry2?.title).toContain("Âl-i İmrân 3/31");
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

  it("should have 55 Ayet entries for all 6 grades (330 total)", () => {
    const allEntries = getCurriculumEntriesFromDb();
    const ayetEntries = allEntries.filter((e) => e.categoryId === "ayet");
    expect(ayetEntries.length).toBe(330);

    for (let grade = 1; grade <= 6; grade++) {
      const gradeAyet = getCurriculumEntriesFromDb(grade).filter((e) => e.categoryId === "ayet");
      expect(gradeAyet.length).toBe(55);

      const standard = gradeAyet.filter((e) => !e.isExtra);
      const extras = gradeAyet.filter((e) => e.isExtra);
      expect(standard.length).toBe(48);
      expect(extras.length).toBe(7);

      if (grade <= 3) {
        expect(standard[0].title).toBe("Fâtiha 1/1 — Her işe Allah’ın adıyla başlamak");
      } else {
        expect(standard[0].title).toBe("Fâtiha 1/5 — Kulluk ve istiâne");
      }
    }
  });

  it("should have 55 Hadis entries for all 6 grades (330 total)", () => {
    const allEntries = getCurriculumEntriesFromDb();
    const hadisEntries = allEntries.filter((e) => e.categoryId === "hadis");
    expect(hadisEntries.length).toBe(330);

    for (let grade = 1; grade <= 6; grade++) {
      const gradeHadis = getCurriculumEntriesFromDb(grade).filter((e) => e.categoryId === "hadis");
      expect(gradeHadis.length).toBe(55);

      const standard = gradeHadis.filter((e) => !e.isExtra);
      const extras = gradeHadis.filter((e) => e.isExtra);
      expect(standard.length).toBe(48);
      expect(extras.length).toBe(7);

      expect(standard[0].title).toBe("Niyet: Bir işi neden yapıyorum?");
      expect(standard[0].resourceUrl).toBe("https://sunnah.com/bukhari:1");
    }
  });

  it("should have 55 Esmâü'l-Hüsnâ entries for all 6 grades (330 total)", () => {
    const allEntries = getCurriculumEntriesFromDb();
    const esmaEntries = allEntries.filter((e) => e.categoryId === "esma");
    expect(esmaEntries.length).toBe(330);

    for (let grade = 1; grade <= 6; grade++) {
      const gradeEsma = getCurriculumEntriesFromDb(grade).filter((e) => e.categoryId === "esma");
      expect(gradeEsma.length).toBe(55);

      const standard = gradeEsma.filter((e) => !e.isExtra);
      const extras = gradeEsma.filter((e) => e.isExtra);
      expect(standard.length).toBe(48);
      expect(extras.length).toBe(7);

      if (grade <= 3) {
        expect(standard[0].title).toBe("EL-CEMÎL — Güzel olan, güzellik veren.");
      } else {
        expect(standard[0].title).toBe("EL-CEMÎL — Mutlak güzellik sahibi, güzelleştiren.");
      }
    }
  });

  it("should retrieve Esmâü'l-Hüsnâ entries across grades by deterministic ID", () => {
    // Grade 1 standard & extra
    const g1Entry = getCurriculumEntryByIdFromDb("esma-eylul-1");
    expect(g1Entry).not.toBeNull();
    expect(g1Entry?.title).toBe("EL-CEMÎL — Güzel olan, güzellik veren.");
    expect(g1Entry?.grade).toBe(1);
    expect(g1Entry?.isExtra).toBe(false);

    const g1Extra = getCurriculumEntryByIdFromDb("esma-extra-1");
    expect(g1Extra).not.toBeNull();
    expect(g1Extra?.grade).toBe(1);
    expect(g1Extra?.isExtra).toBe(true);
    expect(g1Extra?.extraOrder).toBe(1);

    // Grade 4 (Lise) standard & extra
    const g4Entry = getCurriculumEntryByIdFromDb("g4-esma-eylul-1");
    expect(g4Entry).not.toBeNull();
    expect(g4Entry?.title).toBe("EL-CEMÎL — Mutlak güzellik sahibi, güzelleştiren.");
    expect(g4Entry?.grade).toBe(4);
    expect(g4Entry?.isExtra).toBe(false);

    const g4Extra = getCurriculumEntryByIdFromDb("g4-esma-extra-7");
    expect(g4Extra).not.toBeNull();
    expect(g4Extra?.grade).toBe(4);
    expect(g4Extra?.isExtra).toBe(true);
    expect(g4Extra?.extraOrder).toBe(7);
  });

  it("should have 55 Efendimiz entries for all 6 grades (330 total)", () => {
    const allEntries = getCurriculumEntriesFromDb();
    const efendimizEntries = allEntries.filter((e) => e.categoryId === "efendimiz");
    expect(efendimizEntries.length).toBe(330);

    for (let grade = 1; grade <= 6; grade++) {
      const gradeEfendimiz = getCurriculumEntriesFromDb(grade).filter(
        (e) => e.categoryId === "efendimiz"
      );
      expect(gradeEfendimiz.length).toBe(55);

      const standard = gradeEfendimiz.filter((e) => !e.isExtra);
      const extras = gradeEfendimiz.filter((e) => e.isExtra);
      expect(standard.length).toBe(48);
      expect(extras.length).toBe(7);

      if (grade <= 3) {
        expect(standard[0].title).toBe(
          "ZÂHİR'E DEĞERİNİ HATIRLATMASI — İnsan dış görünüşüyle ölçülmez"
        );
      } else {
        expect(standard[0].title).toBe(
          "ZÂHİR'İN GÖNLÜNE DOKUNMASI — Değer, görünüşten daha derindir"
        );
      }
    }
  });

  it("should retrieve Efendimiz entries across grades by deterministic ID", () => {
    // Grade 1 standard & extra
    const g1Entry = getCurriculumEntryByIdFromDb("efendimiz-eylul-1");
    expect(g1Entry).not.toBeNull();
    expect(g1Entry?.title).toContain("ZÂHİR'E DEĞERİNİ HATIRLATMASI");
    expect(g1Entry?.grade).toBe(1);
    expect(g1Entry?.isExtra).toBe(false);

    const g1Extra = getCurriculumEntryByIdFromDb("efendimiz-extra-1");
    expect(g1Extra).not.toBeNull();
    expect(g1Extra?.isExtra).toBe(true);
    expect(g1Extra?.extraOrder).toBe(1);

    // Grade 4 (Lise) standard & extra
    const g4Entry = getCurriculumEntryByIdFromDb("g4-efendimiz-eylul-1");
    expect(g4Entry).not.toBeNull();
    expect(g4Entry?.title).toContain("ZÂHİR'İN GÖNLÜNE DOKUNMASI");
    expect(g4Entry?.grade).toBe(4);
    expect(g4Entry?.isExtra).toBe(false);

    const g4Extra = getCurriculumEntryByIdFromDb("g4-efendimiz-extra-7");
    expect(g4Extra).not.toBeNull();
    expect(g4Extra?.grade).toBe(4);
    expect(g4Extra?.isExtra).toBe(true);
    expect(g4Extra?.extraOrder).toBe(7);
  });

  it("should have 55 Sahabe Kıssaları entries for all 6 grades (330 total)", () => {
    const allEntries = getCurriculumEntriesFromDb();
    const sahabeEntries = allEntries.filter((e) => e.categoryId === "sahabe-kissalari");
    expect(sahabeEntries.length).toBe(330);

    for (let grade = 1; grade <= 6; grade++) {
      const gradeSahabe = getCurriculumEntriesFromDb(grade).filter(
        (e) => e.categoryId === "sahabe-kissalari"
      );
      expect(gradeSahabe.length).toBe(55);

      const standard = gradeSahabe.filter((e) => !e.isExtra);
      const extras = gradeSahabe.filter((e) => e.isExtra);
      expect(standard.length).toBe(48);
      expect(extras.length).toBe(7);

      if (grade <= 3) {
        expect(standard[0].title).toBe("Hz. Ebû Bekir — Yılların Güveni");
      } else {
        expect(standard[0].title).toBe("Sa’d b. Rebî — “Malımın Yarısı Senin”");
      }
    }
  });

  it("should retrieve Sahabe Kıssaları entries across grades by deterministic ID", () => {
    // Grade 1 standard & extra
    const g1Entry = getCurriculumEntryByIdFromDb("sahabe-kissalari-eylul-1");
    expect(g1Entry).not.toBeNull();
    expect(g1Entry?.title).toBe("Hz. Ebû Bekir — Yılların Güveni");
    expect(g1Entry?.grade).toBe(1);
    expect(g1Entry?.isExtra).toBe(false);

    const g1Extra = getCurriculumEntryByIdFromDb("sahabe-kissalari-extra-1");
    expect(g1Extra).not.toBeNull();
    expect(g1Extra?.isExtra).toBe(true);
    expect(g1Extra?.extraOrder).toBe(1);

    // Grade 4 (Lise) standard & extra
    const g4Entry = getCurriculumEntryByIdFromDb("g4-sahabe-kissalari-eylul-1");
    expect(g4Entry).not.toBeNull();
    expect(g4Entry?.title).toBe("Sa’d b. Rebî — “Malımın Yarısı Senin”");
    expect(g4Entry?.grade).toBe(4);
    expect(g4Entry?.isExtra).toBe(false);

    const g4Extra = getCurriculumEntryByIdFromDb("g4-sahabe-kissalari-extra-7");
    expect(g4Extra).not.toBeNull();
    expect(g4Extra?.grade).toBe(4);
    expect(g4Extra?.isExtra).toBe(true);
    expect(g4Extra?.extraOrder).toBe(7);
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

  it("should not assign non-PDF resourceUrl as pdfUrl for Hadis entries", () => {
    const hadisEntry = getCurriculumEntryByIdFromDb("hadis-eylul-2");
    expect(hadisEntry).not.toBeNull();
    expect(hadisEntry?.categoryId).toBe("hadis");
    expect(hadisEntry?.resourceUrl).toBe("https://sunnah.com/bukhari:8");
    expect(hadisEntry?.pdfUrl).toBeUndefined();

    const allEntries = getCurriculumEntriesFromDb(1);
    const hadisList = allEntries.filter((e) => e.categoryId === "hadis");
    expect(hadisList.length).toBe(55);
    for (const entry of hadisList) {
      expect(entry.pdfUrl).toBeUndefined();
      expect(entry.resourceUrl).toBeDefined();
    }
  });

  it("should have 48 Hocaefendi Sohbetleri entries for all 6 grades (288 total)", () => {
    for (let grade = 1; grade <= 6; grade++) {
      const entries = getCurriculumEntriesFromDb(grade).filter(
        (e) => e.categoryId === "hocaefendi-dinleme"
      );
      expect(entries.length).toBe(48);
      expect(entries.every((e) => !e.isExtra)).toBe(true);
      expect(entries.every((e) => e.resourceUrl?.startsWith("https://www.youtube.com/"))).toBe(
        true
      );
      expect(entries.every((e) => e.body?.includes("📚 **Kelimeler ve Anlamları**:"))).toBe(true);
    }
  });

  it("should retrieve Hocaefendi entries by deterministic ID across grades", () => {
    const g1Entry = getCurriculumEntryByIdFromDb("hocaefendi-dinleme-eylul-1");
    expect(g1Entry).not.toBeNull();
    expect(g1Entry?.grade).toBe(1);
    expect(g1Entry?.categoryId).toBe("hocaefendi-dinleme");
    expect(g1Entry?.resourceUrl).toStartWith("https://www.youtube.com/");

    const g6Entry = getCurriculumEntryByIdFromDb("g6-hocaefendi-dinleme-agustos-4");
    expect(g6Entry).not.toBeNull();
    expect(g6Entry?.grade).toBe(6);
    expect(g6Entry?.categoryId).toBe("hocaefendi-dinleme");
    expect(g6Entry?.resourceUrl).toStartWith("https://www.youtube.com/");
  });

  it("should have 2 Haftanın Konusu entries for all 6 grades (12 total)", () => {
    for (let grade = 1; grade <= 6; grade++) {
      const entries = getCurriculumEntriesFromDb(grade).filter((e) => e.categoryId === "konu");
      expect(entries.length).toBe(2);
      expect(entries[0].week).toBe(1);
      expect(entries[1].week).toBe(2);
      expect(entries[0].month).toBe(9);
      expect(entries[1].month).toBe(9);
      expect(entries.every((e) => !e.isExtra)).toBe(true);
    }
  });

  it("should retrieve Haftanın Konusu entries across grades with real titles and content", () => {
    const g1w1 = getCurriculumEntryByIdFromDb("konu-eylul-1");
    expect(g1w1).not.toBeNull();
    expect(g1w1?.title).toBe("RİSALE-İ NUR: BİR KİTABIN SIRA DIŞI YOLCULUĞU");
    expect(g1w1?.body).toContain("📚 **Kelimeler ve Anlamları**:");

    const g2w1 = getCurriculumEntryByIdFromDb("g2-konu-eylul-1");
    expect(g2w1).not.toBeNull();
    expect(g2w1?.title).toBe("İKİ KİLİMLİK BİR DÜKKÂNDA BAŞLAYAN YOLCULUK");

    const g6w1 = getCurriculumEntryByIdFromDb("g6-konu-eylul-1");
    expect(g6w1).not.toBeNull();
    expect(g6w1?.title).toBe("BAZI KİTAPLAR NEDEN İNSANIN BAKIŞINI DEĞİŞTİRİR?");
    // M6-01 does not have vocab section as per user specification
    expect(g6w1?.body).not.toContain("📚 **Kelimeler ve Anlamları**:");

    const g6w2 = getCurriculumEntryByIdFromDb("g6-konu-eylul-2");
    expect(g6w2).not.toBeNull();
    expect(g6w2?.title).toBe("BİR ÖMRÜN MERKEZİNDE NE VARDI?");
    expect(g6w2?.body).toContain("📚 **Kelimeler ve Anlamları**:");
  });
});
