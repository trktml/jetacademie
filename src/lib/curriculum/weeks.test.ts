import { afterEach, beforeEach, describe, expect, it } from "bun:test";
import { execute, query, queryOne } from "@/lib/db";
import {
  getCurriculumEditorRecords,
  getCurriculumEntriesFromDb,
  getCurriculumEntryByIdFromDb,
  seedCurriculumDatabase,
} from "@/lib/curriculum-db";
import { getEditorOverrides, saveEditorContent } from "@/lib/editor/content";
import { bulkUpsertCurriculumEntries } from "./repository";
import { ensureCurriculumEntriesTable } from "./schema";
import {
  saveWeeklyCurriculumPackage,
  publishCurriculumWeek,
  deleteCurriculumWeek,
  getCurriculumWeekSummaries,
} from "./weeks";

const pkg = {
  weekNumber: 33,
  entries: Array.from({ length: 6 }, (_, index) => ({
    id: `g${index + 1}-konu-mayis-1`,
    grade: index + 1,
    categoryId: "konu" as const,
    month: 5,
    week: 1,
    year: 2027,
    title: "Paket test kaydı",
    body: "## Paket\n\nVeri tutarlılığı testi için hazırlanmış örnek kayıt.\n\n# Bana Ne Söylüyor?\n\n# Bu Hafta Tanıştığımız Kelimeler",
  })),
};
const listening = pkg.entries.map((entry) => ({
  ...entry,
  id: `g${entry.grade}-hocaefendi-dinleme-mayis-1`,
  categoryId: "hocaefendi-dinleme" as const,
  isDraft: false,
}));
beforeEach(async () => {
  await getCurriculumEntriesFromDb(1);
  await deleteCurriculumWeek(33);
  await saveWeeklyCurriculumPackage(pkg, { category: "konu" });
});
afterEach(async () => {
  await execute('DROP TRIGGER IF EXISTS "reject_weekly_fixture"');
  await execute('DROP TRIGGER IF EXISTS "skip_weekly_fixture"');
  await deleteCurriculumWeek(33);
  await execute('DELETE FROM "curriculum_entries" WHERE "id" LIKE $1', ["g6-konu-atomic-%"]);
});

describe("weekly curriculum write service", () => {
  it("reads an editor snapshot while a forced seed is queued without deadlocking SQLite", async () => {
    const [records] = await Promise.all([
      getCurriculumEditorRecords(1),
      seedCurriculumDatabase(true),
    ]);
    expect(records.some((record) => record.entry.id === pkg.entries[0].id)).toBe(true);
  });
  it("rolls back all chunks when a later batch fails", async () => {
    await ensureCurriculumEntriesTable();
    const rows = Array.from({ length: 51 }, (_, i) => ({
      id: `g6-konu-atomic-${i}`,
      grade: 6,
      categoryId: "konu",
      title: "Atomic fixture",
    }));
    // Simulate a database constraint failure in the second SQL chunk.
    Object.assign(rows[50], { title: null });
    await expect(bulkUpsertCurriculumEntries(rows)).rejects.toThrow();
    expect(
      await queryOne('SELECT "id" FROM "curriculum_entries" WHERE "id" LIKE $1', [
        "g6-konu-atomic-%",
      ])
    ).toBeNull();
  });
  it("shares package/override content and invalidates stale editor revisions", async () => {
    await saveWeeklyCurriculumPackage(pkg, { category: "konu" });
    const record = (await getEditorOverrides(1)).find(
      (item) => item.entry.id === pkg.entries[0].id
    )!;
    const edit = {
      ...pkg.entries[0],
      title: "Editör başlığı",
      body: pkg.entries[0].body,
      resourceUrl: "",
      revision: record.revision,
    };
    expect(
      await saveEditorContent(edit, await getCurriculumEntriesFromDb(1, undefined, true))
    ).not.toBeNull();
    await saveWeeklyCurriculumPackage(
      { ...pkg, entries: pkg.entries.map((entry) => ({ ...entry, title: "Yeni paket" })) },
      { category: "konu" }
    );
    expect(
      await saveEditorContent(edit, await getCurriculumEntriesFromDb(1, undefined, true))
    ).toBeNull();
    expect(
      (await getCurriculumEntriesFromDb(1, undefined, true)).find((entry) => entry.id === edit.id)
        ?.title
    ).toBe("Yeni paket");
    expect(await getCurriculumEntryByIdFromDb(edit.id)).toBeNull();
  });
  it("restores both exclusions and previous content when a package write fails", async () => {
    await execute(
      'INSERT INTO "curriculum_seed_exclusions" ("categoryId") VALUES ($1) ON CONFLICT DO NOTHING',
      ["konu"]
    );
    const before = await query(
      'SELECT * FROM "curriculum_editor_content" WHERE "slot" LIKE $1 ORDER BY "slot"',
      ["%:konu:all:5-1"]
    );
    await execute(`CREATE TRIGGER "reject_weekly_fixture" BEFORE INSERT ON "curriculum_editor_content"
      WHEN NEW."slot" = '6:konu:all:5-1' BEGIN SELECT RAISE(ABORT, 'fixture failure'); END;`);
    try {
      await expect(saveWeeklyCurriculumPackage(pkg, { category: "konu" })).rejects.toThrow(
        "fixture failure"
      );
      expect(
        await query(
          'SELECT * FROM "curriculum_editor_content" WHERE "slot" LIKE $1 ORDER BY "slot"',
          ["%:konu:all:5-1"]
        )
      ).toEqual(before);
      expect(
        await queryOne(
          'SELECT "categoryId" FROM "curriculum_seed_exclusions" WHERE "categoryId" = $1',
          ["konu"]
        )
      ).not.toBeNull();
      expect(
        (
          await queryOne<{ title: string }>(
            'SELECT "title" FROM "curriculum_entries" WHERE "id" = $1',
            [pkg.entries[0].id]
          )
        )?.title
      ).toBe("Paket test kaydı");
    } finally {
      await execute('DROP TRIGGER "reject_weekly_fixture"');
      await execute('DELETE FROM "curriculum_seed_exclusions" WHERE "categoryId" = $1', ["konu"]);
    }
  });
  it("rolls back skipped base writes before updating editor overrides", async () => {
    await bulkUpsertCurriculumEntries(listening);
    await publishCurriculumWeek(33);
    const baseBefore = await query(
      'SELECT * FROM "curriculum_entries" WHERE "categoryId" = $1 AND "month" = 5 AND "week" = 1 ORDER BY "id"',
      ["konu"]
    );
    const overridesBefore = await query(
      'SELECT * FROM "curriculum_editor_content" WHERE "slot" LIKE $1 ORDER BY "slot"',
      ["%:konu:all:5-1"]
    );
    await execute(`CREATE TRIGGER "skip_weekly_fixture" BEFORE INSERT ON "curriculum_entries"
      WHEN NEW."id" = 'g6-konu-mayis-1' BEGIN SELECT RAISE(IGNORE); END;`);
    await expect(
      saveWeeklyCurriculumPackage(
        { ...pkg, entries: pkg.entries.map((entry) => ({ ...entry, title: "New draft" })) },
        { category: "konu" }
      )
    ).rejects.toThrow("Haftalık paket kayıtlarının tamamı yazılamadı.");
    expect(
      await query(
        'SELECT * FROM "curriculum_entries" WHERE "categoryId" = $1 AND "month" = 5 AND "week" = 1 ORDER BY "id"',
        ["konu"]
      )
    ).toEqual(baseBefore);
    expect(
      await query(
        'SELECT * FROM "curriculum_editor_content" WHERE "slot" LIKE $1 ORDER BY "slot"',
        ["%:konu:all:5-1"]
      )
    ).toEqual(overridesBefore);
  });
  it("validates the text actually displayed after an editor override before publishing", async () => {
    await bulkUpsertCurriculumEntries(listening);
    const record = (await getEditorOverrides(1)).find(
      (item) => item.entry.id === pkg.entries[0].id
    )!;
    await execute('UPDATE "curriculum_editor_content" SET "entry" = $1 WHERE "entryId" = $2', [
      JSON.stringify({
        ...record.entry,
        body: "Bir örnek metin.\n\n# Bu Hafta Tanıştığımız Kelimeler\n\n**olmayan** — Metinde geçmiyor.",
      }),
      record.entry.id,
    ]);
    await expect(publishCurriculumWeek(33)).rejects.toThrow("Kelime listesi doğrulaması başarısız");
    expect(await getCurriculumEntryByIdFromDb(record.entry.id)).toBeNull();
    await saveWeeklyCurriculumPackage(pkg, { category: "konu" });
    expect((await publishCurriculumWeek(33)).publishedCount).toBe(6);
    expect((await getCurriculumEntryByIdFromDb(record.entry.id))?.isDraft).toBe(false);
  });

  it("keeps all drafts private when twelve rows do not cover every grade and category", async () => {
    await bulkUpsertCurriculumEntries([
      ...listening.slice(0, 5),
      { ...listening[0], id: "g1-hocaefendi-dinleme-duplicate" },
    ]);
    await expect(publishCurriculumWeek(33)).rejects.toThrow("M6 / hocaefendi-dinleme: eksik");
    expect((await getCurriculumWeekSummaries())[32]).toMatchObject({
      draftEntries: 6,
      publishedEntries: 6,
      status: "mixed",
    });
    expect(await getCurriculumEntryByIdFromDb(pkg.entries[0].id)).toBeNull();

    await execute('DELETE FROM "curriculum_entries" WHERE "id" = $1', [
      "g1-hocaefendi-dinleme-duplicate",
    ]);
    await bulkUpsertCurriculumEntries([listening[5]]);
    expect((await publishCurriculumWeek(33)).publishedCount).toBe(6);
    expect((await getCurriculumWeekSummaries())[32]).toMatchObject({
      draftEntries: 0,
      publishedEntries: 12,
      status: "published",
    });
  });

  it("labels an already-public but incomplete week as partial", async () => {
    await deleteCurriculumWeek(33);
    await bulkUpsertCurriculumEntries(listening);
    expect((await getCurriculumWeekSummaries())[32]).toMatchObject({
      draftEntries: 0,
      publishedEntries: 6,
      status: "mixed",
    });
  });
  it("does not expose a draft through a legacy ID for the same lesson slot", async () => {
    const legacyId = "g1-konu-legacy-mayis-1";
    await bulkUpsertCurriculumEntries([{ ...pkg.entries[0], id: legacyId, isDraft: 0 }]);

    expect(await getCurriculumEntryByIdFromDb(legacyId)).toBeNull();
    expect(await getCurriculumEntryByIdFromDb(pkg.entries[0].id)).toBeNull();
    expect((await getCurriculumEntriesFromDb(1)).some((entry) => entry.id === legacyId)).toBe(
      false
    );
  });

  it("rolls back direct publication when a legacy row duplicates a slot", async () => {
    await bulkUpsertCurriculumEntries([{ ...listening[0], id: "g1-dinleme-legacy-mayis-1" }]);
    const complete = { ...pkg, entries: [...pkg.entries, ...listening] };
    await expect(saveWeeklyCurriculumPackage(complete, { publish: true })).rejects.toThrow(
      "M1 / hocaefendi-dinleme: yineleniyor"
    );
    expect((await getCurriculumWeekSummaries())[32]).toMatchObject({
      draftEntries: 6,
      publishedEntries: 1,
      status: "mixed",
    });
    expect(await getCurriculumEntryByIdFromDb(pkg.entries[0].id)).toBeNull();
  });

  it("publishes and deletes only standard weeks, preserving extra rows in the same period", async () => {
    await bulkUpsertCurriculumEntries(listening);
    const extra = {
      ...pkg.entries[0],
      id: "g1-konu-extra-fixture",
      isExtra: 1,
      isDraft: 1,
      extraOrder: 1,
    };
    await bulkUpsertCurriculumEntries([extra]);
    try {
      expect((await publishCurriculumWeek(33)).publishedCount).toBe(6);
      expect((await deleteCurriculumWeek(33)).deletedCount).toBe(12);
      expect(
        await queryOne('SELECT "isDraft" FROM "curriculum_entries" WHERE "id" = $1', [extra.id])
      ).toEqual({ isDraft: 1 });
    } finally {
      await execute('DELETE FROM "curriculum_entries" WHERE "id" = $1', [extra.id]);
    }
  });

  it("uses the academic year for omitted dates and rejects a conflicting year", async () => {
    const undated = pkg.entries.map((entry) => ({ ...entry, year: undefined }));
    await saveWeeklyCurriculumPackage({ ...pkg, entries: undated }, { category: "konu" });
    const records = await getCurriculumEditorRecords(1);
    expect(records.find(({ entry }) => entry.id === undated[0].id)?.entry.year).toBe(2027);
    await expect(
      saveWeeklyCurriculumPackage(
        { ...pkg, entries: [{ ...undated[0], year: 2026 }, ...undated.slice(1)] },
        { category: "konu" }
      )
    ).rejects.toThrow("yıl 2027 olmalıdır");
  });

  it("rejects malformed packages and isolated category publication before writing", async () => {
    await expect(
      saveWeeklyCurriculumPackage({ ...pkg, entries: pkg.entries.slice(1) }, { category: "konu" })
    ).rejects.toThrow();
    await expect(
      saveWeeklyCurriculumPackage(pkg, { category: "konu", publish: true })
    ).rejects.toThrow("Tek kategori");
  });
});
