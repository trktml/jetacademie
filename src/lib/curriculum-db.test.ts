import { describe, expect, it } from "bun:test";
import {
  allowCurriculumCategoriesToSeed,
  excludeAndDeleteCurriculumCategoriesFromSeed,
  ensureCurriculumEntriesTable,
  getCurriculumEntriesFromDb,
  getCurriculumEntryByIdFromDb,
  migrateLegacyGradeOneCurriculumEntryIds,
  syncKonuCurriculumIfOutdated,
  getUserGenderFromDb,
  seedCurriculumDatabase,
  setUserGenderInDb,
  bulkUpsertCurriculumEntries,
  publishCurriculumWeek,
  deleteCurriculumWeek,
  getCurriculumWeekSummaries,
} from "./curriculum-db";
import { BELGIUM_GRADES } from "./curriculum";
import { db } from "./auth";
import { execute, query, queryOne } from "./db";

describe("Curriculum SQLite Database Module", () => {
  it("should ensure table exists and seed data without errors", async () => {
    await ensureCurriculumEntriesTable();
    await seedCurriculumDatabase();

    const allEntries = await getCurriculumEntriesFromDb();
    expect(allEntries.length).toBeGreaterThan(0);
  });

  it("should support all 6 Belgium grades", async () => {
    for (const grade of BELGIUM_GRADES) {
      const gradeEntries = await getCurriculumEntriesFromDb(grade);
      expect(gradeEntries.length).toBeGreaterThan(0);
      expect(gradeEntries.every((e) => e.grade === grade)).toBe(true);
    }
  });

  it("stores first-grade curriculum entries with grade-scoped IDs", async () => {
    const gradeOneEntries = await getCurriculumEntriesFromDb(1);
    expect(gradeOneEntries.length).toBeGreaterThan(0);
    expect(gradeOneEntries.every((entry) => entry.id.startsWith("g1-"))).toBe(true);

    const esmaEntry = await getCurriculumEntryByIdFromDb("g1-esma-kasim-2");
    expect(esmaEntry?.id).toBe("g1-esma-kasim-2");
    expect(esmaEntry?.grade).toBe(1);
  });

  it("migrates legacy first-grade entry IDs and saved progress", async () => {
    await ensureCurriculumEntriesTable();

    const migrationUserId = `curriculum_id_migration_${Date.now()}`;
    const legacyEntryId = "esma-legacy-migration-fixture";
    const gradeScopedId = `g1-${legacyEntryId}`;
    const now = new Date().toISOString();

    db.query(
      `INSERT INTO "user" ("id", "name", "email", "createdAt", "updatedAt") VALUES (?, ?, ?, ?, ?)`
    ).run(migrationUserId, "Migration Test", `${migrationUserId}@example.com`, now, now);
    db.query(
      `INSERT INTO "curriculum_entries" ("id", "grade", "categoryId", "title", "createdAt", "updatedAt") VALUES (?, ?, ?, ?, ?, ?)`
    ).run(legacyEntryId, 1, "esma", "Legacy first-grade entry", now, now);
    db.query(
      `INSERT INTO "curriculum_progress" ("userId", "entryId", "completedAt") VALUES (?, ?, ?)`
    ).run(migrationUserId, legacyEntryId, now);

    try {
      await migrateLegacyGradeOneCurriculumEntryIds();

      const migratedEntry = await queryOne<{ id: string }>(
        `SELECT "id" FROM "curriculum_entries" WHERE "id" = $1`,
        [gradeScopedId]
      );
      const migratedProgress = await queryOne<{ entryId: string }>(
        `SELECT "entryId" FROM "curriculum_progress" WHERE "userId" = $1`,
        [migrationUserId]
      );
      expect(migratedEntry?.id).toBe(gradeScopedId);
      expect(migratedProgress?.entryId).toBe(gradeScopedId);
    } finally {
      db.query(`DELETE FROM "curriculum_entries" WHERE "id" = ?`).run(gradeScopedId);
      db.query(`DELETE FROM "user" WHERE "id" = ?`).run(migrationUserId);
    }
  });

  it("removes the legacy M1 topic duplicate and preserves its completion", async () => {
    await ensureCurriculumEntriesTable();
    await seedCurriculumDatabase();

    const migrationUserId = `konu_id_migration_${Date.now()}`;
    const legacyEntryId = "g1-m1-konu-eylul-1";
    const currentEntryId = "g1-konu-eylul-1";
    const now = new Date().toISOString();

    db.query(
      `INSERT INTO "user" ("id", "name", "email", "createdAt", "updatedAt") VALUES (?, ?, ?, ?, ?)`
    ).run(migrationUserId, "Konu Migration Test", `${migrationUserId}@example.com`, now, now);
    db.query(
      `INSERT INTO "curriculum_entries" ("id", "grade", "categoryId", "title", "createdAt", "updatedAt") VALUES (?, ?, ?, ?, ?, ?)`
    ).run(legacyEntryId, 1, "konu", "Benim Büyük Sorularım", now, now);
    db.query(
      `INSERT INTO "curriculum_progress" ("userId", "entryId", "completedAt") VALUES (?, ?, ?)`
    ).run(migrationUserId, legacyEntryId, now);

    try {
      await syncKonuCurriculumIfOutdated();

      const legacyEntry = await queryOne<{ id: string }>(
        `SELECT "id" FROM "curriculum_entries" WHERE "id" = $1`,
        [legacyEntryId]
      );
      const migratedProgress = await queryOne<{ entryId: string }>(
        `SELECT "entryId" FROM "curriculum_progress" WHERE "userId" = $1`,
        [migrationUserId]
      );
      expect(legacyEntry).toBeNull();
      expect(migratedProgress?.entryId).toBe(currentEntryId);
    } finally {
      db.query(`DELETE FROM "curriculum_progress" WHERE "userId" = ?`).run(migrationUserId);
      db.query(`DELETE FROM "user" WHERE "id" = ?`).run(migrationUserId);
    }
  });

  it("should enforce standard entries and zero premature extras for categories under 48 weeks", async () => {
    const grade1Entries = await getCurriculumEntriesFromDb(1);
    const konuEntries = grade1Entries.filter((e) => e.categoryId === "konu");

    const standardKonu = konuEntries.filter((e) => !e.isExtra);
    const extraKonu = konuEntries.filter((e) => e.isExtra);

    expect(standardKonu.length).toBe(0);
    expect(extraKonu.length).toBe(0); // 0 < 48: absolutely no extras before 48 weeks
  });

  it("should return null for non-existent entry ID", async () => {
    const entry = await getCurriculumEntryByIdFromDb("non-existent-id-xyz");
    expect(entry).toBeNull();
  });

  it("should have 54 Adab-ı Muaşeret entries for all 6 grades (324 total)", async () => {
    const allEntries = await getCurriculumEntriesFromDb();
    const adabEntries = allEntries.filter((e) => e.categoryId === "adab-i-muaseret");
    expect(adabEntries.length).toBe(324);

    for (let grade = 1; grade <= 6; grade++) {
      const gradeAdab = (await getCurriculumEntriesFromDb(grade)).filter(
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

  it("should have 55 Esmâü'l-Hüsnâ entries for all 6 grades (330 total)", async () => {
    const allEntries = await getCurriculumEntriesFromDb();
    const esmaEntries = allEntries.filter((e) => e.categoryId === "esma");
    expect(esmaEntries.length).toBe(330);

    for (let grade = 1; grade <= 6; grade++) {
      const gradeEsma = (await getCurriculumEntriesFromDb(grade)).filter(
        (e) => e.categoryId === "esma"
      );
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

  it("should retrieve Esmâü'l-Hüsnâ entries across grades by deterministic ID", async () => {
    // Grade 1 standard & extra
    const g1Entry = await getCurriculumEntryByIdFromDb("esma-eylul-1");
    expect(g1Entry).not.toBeNull();
    expect(g1Entry?.title).toBe("EL-CEMÎL — Güzel olan, güzellik veren.");
    expect(g1Entry?.grade).toBe(1);
    expect(g1Entry?.isExtra).toBe(false);

    const g1Extra = await getCurriculumEntryByIdFromDb("esma-extra-1");
    expect(g1Extra).not.toBeNull();
    expect(g1Extra?.grade).toBe(1);
    expect(g1Extra?.isExtra).toBe(true);
    expect(g1Extra?.extraOrder).toBe(1);

    // Grade 4 (Lise) standard & extra
    const g4Entry = await getCurriculumEntryByIdFromDb("g4-esma-eylul-1");
    expect(g4Entry).not.toBeNull();
    expect(g4Entry?.title).toBe("EL-CEMÎL — Mutlak güzellik sahibi, güzelleştiren.");
    expect(g4Entry?.grade).toBe(4);
    expect(g4Entry?.isExtra).toBe(false);

    const g4Extra = await getCurriculumEntryByIdFromDb("g4-esma-extra-7");
    expect(g4Extra).not.toBeNull();
    expect(g4Extra?.grade).toBe(4);
    expect(g4Extra?.isExtra).toBe(true);
    expect(g4Extra?.extraOrder).toBe(7);
  });

  it("should retrieve Adab-ı Muaşeret entries across grades by deterministic ID", async () => {
    // Grade 1 standard & extra
    const g1Entry = await getCurriculumEntryByIdFromDb("adab-i-muaseret-eylul-1");
    expect(g1Entry).not.toBeNull();
    expect(g1Entry?.title).toBe("Sohbet Âdâbı — Sohbete Yer ve Gönül Hazırlığı");
    expect(g1Entry?.grade).toBe(1);
    expect(g1Entry?.isExtra).toBe(false);

    const g1Extra = await getCurriculumEntryByIdFromDb("adab-i-muaseret-extra-1");
    expect(g1Extra).not.toBeNull();
    expect(g1Extra?.grade).toBe(1);
    expect(g1Extra?.isExtra).toBe(true);
    expect(g1Extra?.extraOrder).toBe(1);

    // Grade 4 (Lise) standard & extra
    const g4Entry = await getCurriculumEntryByIdFromDb("g4-adab-i-muaseret-eylul-1");
    expect(g4Entry).not.toBeNull();
    expect(g4Entry?.title).toBe("Edep, Güzel Ahlâk ve Hilim — Edep Nedir?");
    expect(g4Entry?.grade).toBe(4);
    expect(g4Entry?.isExtra).toBe(false);

    const g4Extra = await getCurriculumEntryByIdFromDb("g4-adab-i-muaseret-extra-6");
    expect(g4Extra).not.toBeNull();
    expect(g4Extra?.grade).toBe(4);
    expect(g4Extra?.isExtra).toBe(true);
    expect(g4Extra?.extraOrder).toBe(6);
  });

  it("should store and retrieve user gender preferences in SQLite", async () => {
    const testUserId = `user_pref_test_${Date.now()}`;
    expect(await getUserGenderFromDb(testUserId)).toBeNull();

    // Insert dummy user to satisfy FK constraint
    const now = new Date().toISOString();
    db.query(
      `INSERT INTO "user" ("id", "name", "email", "createdAt", "updatedAt") VALUES (?, ?, ?, ?, ?)`
    ).run(testUserId, "Test Pref User", `${testUserId}@example.com`, now, now);

    await setUserGenderInDb(testUserId, "bayan");
    expect(await getUserGenderFromDb(testUserId)).toBe("bayan");

    await setUserGenderInDb(testUserId, "erkek");
    expect(await getUserGenderFromDb(testUserId)).toBe("erkek");
  });

  it("should filter İlmihal entries by gender in getCurriculumEntriesFromDb", async () => {
    // Ortaokul 1. Sınıf: 28 weeks for both Erkek and Bayan
    const g1Bayan = (await getCurriculumEntriesFromDb(1, "bayan")).filter(
      (e) => e.categoryId === "ilmihal"
    );
    const g1Erkek = (await getCurriculumEntriesFromDb(1, "erkek")).filter(
      (e) => e.categoryId === "ilmihal"
    );
    expect(g1Bayan.length).toBe(28);
    expect(g1Erkek.length).toBe(28);
    expect(g1Bayan.every((e) => e.gender === "bayan")).toBe(true);
    expect(g1Erkek.every((e) => e.gender === "erkek")).toBe(true);

    // Lise 4. Sınıf: 104 weeks for Bayan (48 standard + 56 extra), 98 weeks for Erkek (48 standard + 50 extra)
    const g4Bayan = (await getCurriculumEntriesFromDb(4, "bayan")).filter(
      (e) => e.categoryId === "ilmihal"
    );
    const g4Erkek = (await getCurriculumEntriesFromDb(4, "erkek")).filter(
      (e) => e.categoryId === "ilmihal"
    );
    expect(g4Bayan.length).toBe(104);
    expect(g4Erkek.length).toBe(98);

    const g4BayanExtras = g4Bayan.filter((e) => e.isExtra);
    const g4ErkekExtras = g4Erkek.filter((e) => e.isExtra);
    expect(g4BayanExtras.length).toBe(56);
    expect(g4ErkekExtras.length).toBe(50);
  });

  it("should retrieve İlmihal entries by deterministic ID", async () => {
    const bayanEntry = await getCurriculumEntryByIdFromDb("ilmihal-bayan-eylul-1");
    expect(bayanEntry).not.toBeNull();
    expect(bayanEntry?.gender).toBe("bayan");
    expect(bayanEntry?.grade).toBe(1);
    expect(bayanEntry?.pdfUrl).toBe("/curriculum/ilmihal/ortaokul/bayan/hafta-01.pdf");

    const erkekEntry = await getCurriculumEntryByIdFromDb("ilmihal-erkek-eylul-1");
    expect(erkekEntry).not.toBeNull();
    expect(erkekEntry?.gender).toBe("erkek");
    expect(erkekEntry?.grade).toBe(1);
    expect(erkekEntry?.pdfUrl).toBe("/curriculum/ilmihal/ortaokul/erkek/hafta-01.pdf");

    const liseBayanExtra56 = await getCurriculumEntryByIdFromDb("g4-ilmihal-bayan-extra-56");
    expect(liseBayanExtra56).not.toBeNull();
    expect(liseBayanExtra56?.isExtra).toBe(true);
    expect(liseBayanExtra56?.extraOrder).toBe(56);
    expect(liseBayanExtra56?.pdfUrl).toBe("/curriculum/ilmihal/lise/bayan/hafta-104.pdf");

    const liseErkekExtra50 = await getCurriculumEntryByIdFromDb("g4-ilmihal-erkek-extra-50");
    expect(liseErkekExtra50).not.toBeNull();
    expect(liseErkekExtra50?.isExtra).toBe(true);
    expect(liseErkekExtra50?.extraOrder).toBe(50);
    expect(liseErkekExtra50?.pdfUrl).toBe("/curriculum/ilmihal/lise/erkek/hafta-98.pdf");
  });

  it("should have 48 Hocaefendi Sohbetleri entries for all 6 grades (288 total)", async () => {
    for (let grade = 1; grade <= 6; grade++) {
      const entries = (await getCurriculumEntriesFromDb(grade)).filter(
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

  it("should retrieve Hocaefendi entries by deterministic ID across grades", async () => {
    const g1Entry = await getCurriculumEntryByIdFromDb("hocaefendi-dinleme-eylul-1");
    expect(g1Entry).not.toBeNull();
    expect(g1Entry?.grade).toBe(1);
    expect(g1Entry?.categoryId).toBe("hocaefendi-dinleme");
    expect(g1Entry?.resourceUrl).toStartWith("https://www.youtube.com/");

    const g6Entry = await getCurriculumEntryByIdFromDb("g6-hocaefendi-dinleme-agustos-4");
    expect(g6Entry).not.toBeNull();
    expect(g6Entry?.grade).toBe(6);
    expect(g6Entry?.categoryId).toBe("hocaefendi-dinleme");
    expect(g6Entry?.resourceUrl).toStartWith("https://www.youtube.com/");
  });

  it("should have zero Haftanın Konusu entries before new lessons are created", async () => {
    for (let grade = 1; grade <= 6; grade++) {
      const entries = (await getCurriculumEntriesFromDb(grade)).filter(
        (e) => e.categoryId === "konu"
      );
      expect(entries.length).toBe(0);
    }
  });

  it("should keep excluded categories empty across regular and forced seeding", async () => {
    const categoryId = "hocaefendi-dinleme" as const;
    await excludeAndDeleteCurriculumCategoriesFromSeed([categoryId]);

    try {
      await seedCurriculumDatabase(true);
      await seedCurriculumDatabase();

      const row = await queryOne<{ count: number | string }>(
        `SELECT COUNT(*) AS "count" FROM "curriculum_entries" WHERE "categoryId" = $1`,
        [categoryId]
      );
      expect(Number(row?.count ?? 0)).toBe(0);
      expect(await getCurriculumEntryByIdFromDb("hocaefendi-dinleme-eylul-1")).toBeNull();
    } finally {
      await allowCurriculumCategoriesToSeed([categoryId]);
      await seedCurriculumDatabase(true);
    }
  });
});

describe("Curriculum editor week locations", () => {
  it("keeps the 48 standard weeks independent for both İlmihal tracks", async () => {
    const entries = await getCurriculumEntriesFromDb(4);
    for (const gender of ["erkek", "bayan"]) {
      const standard = entries.filter(
        (entry) => entry.categoryId === "ilmihal" && entry.gender === gender && !entry.isExtra
      );
      expect(standard.length).toBe(48);
      expect(new Set(standard.map((entry) => `${entry.month}:${entry.week}`)).size).toBe(48);
    }
  });
});

describe("Curriculum week management and draft lifecycle", () => {
  it("validates the entire draft batch before publishing and preserves other categories", async () => {
    await ensureCurriculumEntriesTable();
    const ids = [
      "g1-vocabulary-publish-valid",
      "g1-vocabulary-publish-invalid",
      "g1-vocabulary-publish-preserved",
    ];
    const base = {
      grade: 1 as const,
      month: 5,
      week: 3,
      year: 2027,
      title: "Vocabulary test",
      isDraft: true,
    };
    try {
      await bulkUpsertCurriculumEntries([
        {
          ...base,
          id: ids[0],
          categoryId: "konu",
          body: "<u>niyet</u> önemlidir.\n\n## Kelime Açıklaması\n\n**niyet** — Amaç.",
        },
        {
          ...base,
          id: ids[1],
          categoryId: "hocaefendi-dinleme",
          body: "**تَعَلَّمَ**\n\nÖğrendi.\n\n## Kelime Açıklaması\n\n**taallame** — Öğrendi.",
        },
        { ...base, id: ids[2], categoryId: "adab-i-muaseret", body: "Korunan içerik." },
      ]);
      await expect(publishCurriculumWeek(35)).rejects.toThrow("'taallame' Türkçe metinde");
      const before = await query<{ id: string; isDraft: number }>(
        'SELECT "id", "isDraft" FROM "curriculum_entries" WHERE "id" IN ($1, $2, $3)',
        ids
      );
      expect(before).toHaveLength(3);
      expect(before.every((row) => row.isDraft === 1)).toBe(true);
      await execute('UPDATE "curriculum_entries" SET "body" = $1 WHERE "id" = $2', [
        "Türkçe içerik.",
        ids[1],
      ]);
      await publishCurriculumWeek(35);
      const after = await query<{ id: string; isDraft: number }>(
        'SELECT "id", "isDraft" FROM "curriculum_entries" WHERE "id" IN ($1, $2, $3)',
        ids
      );
      expect(after.find((row) => row.id === ids[0])?.isDraft).toBe(0);
      expect(after.find((row) => row.id === ids[1])?.isDraft).toBe(0);
      expect(after.find((row) => row.id === ids[2])?.isDraft).toBe(1);
    } finally {
      await execute('DELETE FROM "curriculum_entries" WHERE "id" IN ($1, $2, $3)', ids);
    }
  });
  it("supports saving drafts, listing summaries, publishing, and deleting weekly content", async () => {
    await ensureCurriculumEntriesTable();

    // Clean up week 35 (mayis-3) first to start from known state
    await deleteCurriculumWeek(35);

    const testEntries = [
      {
        id: "g1-konu-mayis-3",
        grade: 1 as const,
        categoryId: "konu" as const,
        month: 5,
        week: 3,
        year: 2027,
        title: "Test Konu Week 35",
        body: "Test Body Week 35",
        isDraft: true,
      },
      {
        id: "g1-hocaefendi-dinleme-mayis-3",
        grade: 1 as const,
        categoryId: "hocaefendi-dinleme" as const,
        month: 5,
        week: 3,
        year: 2027,
        title: "Test Sohbet Week 35",
        body: "Test Sohbet Body",
        isDraft: true,
      },
    ];

    try {
      // 1. Bulk upsert as draft
      await bulkUpsertCurriculumEntries(testEntries);

      // 2. Draft filtering: default excludes drafts, includeDrafts=true includes them
      const publishedGrade1 = await getCurriculumEntriesFromDb(1, undefined, false);
      expect(publishedGrade1.some((e) => e.id === "g1-konu-mayis-3")).toBe(false);

      const allGrade1 = await getCurriculumEntriesFromDb(1, undefined, true);
      expect(allGrade1.some((e) => e.id === "g1-konu-mayis-3")).toBe(true);

      // 3. Week summaries
      const summaries = await getCurriculumWeekSummaries();
      expect(summaries.length).toBe(36);
      const week35 = summaries.find((s) => s.weekNumber === 35);
      expect(week35).toBeDefined();
      expect(week35?.totalEntries).toBe(2);
      expect(week35?.draftEntries).toBe(2);
      expect(week35?.publishedEntries).toBe(0);
      expect(week35?.status).toBe("draft");

      // 4. Publish week 35
      const pubResult = await publishCurriculumWeek(35);
      expect(pubResult.publishedCount).toBe(2);

      const summariesAfterPub = await getCurriculumWeekSummaries();
      const week35AfterPub = summariesAfterPub.find((s) => s.weekNumber === 35);
      expect(week35AfterPub?.totalEntries).toBe(2);
      expect(week35AfterPub?.draftEntries).toBe(0);
      expect(week35AfterPub?.publishedEntries).toBe(2);
      expect(week35AfterPub?.status).toBe("published");

      // Default getCurriculumEntriesFromDb now includes them
      const publishedNow = await getCurriculumEntriesFromDb(1, undefined, false);
      expect(publishedNow.some((e) => e.id === "g1-konu-mayis-3")).toBe(true);

      // 5. Delete week 35
      const delResult = await deleteCurriculumWeek(35);
      expect(delResult.deletedCount).toBe(2);

      const summariesAfterDel = await getCurriculumWeekSummaries();
      const week35AfterDel = summariesAfterDel.find((s) => s.weekNumber === 35);
      expect(week35AfterDel?.totalEntries).toBe(0);
      expect(week35AfterDel?.status).toBe("empty");
    } finally {
      await deleteCurriculumWeek(35);
      await seedCurriculumDatabase(true);
    }
  });

  it("never deletes preserved categories (adab-i-muaseret, ilmihal, esma) when deleting a week", async () => {
    await ensureCurriculumEntriesTable();

    // Verify deleteCurriculumWeek does not affect preserved categories even if month/week match
    const initialEntries = await getCurriculumEntriesFromDb(1);
    const initialPreserved = initialEntries.filter((e) =>
      ["adab-i-muaseret", "ilmihal", "esma"].includes(e.categoryId)
    );

    // Call deleteCurriculumWeek for week 35
    await deleteCurriculumWeek(35);

    const remainingEntries = await getCurriculumEntriesFromDb(1);
    const remainingPreserved = remainingEntries.filter((e) =>
      ["adab-i-muaseret", "ilmihal", "esma"].includes(e.categoryId)
    );

    expect(remainingPreserved.length).toBe(initialPreserved.length);
  });
});
