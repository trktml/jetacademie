import { describe, expect, it } from "bun:test";
import { curriculumCategoryIds, type CurriculumEntry } from "./curriculum";
import {
  bulkUpsertCurriculumEntries,
  ensureCurriculumEntriesTable,
  getCurriculumEntriesFromDb,
  getCurriculumEntryByIdFromDb,
  getCurriculumWeekSummaries,
  publishCurriculumWeek,
  seedCurriculumDatabase,
} from "./curriculum-db";
import { execute, queryOne } from "./db";
import { getEditorOverrideById, getEditorOverrides } from "./editor/content";
import { ensureEditorSchema } from "./editor/schema";
import { editorEntrySchema } from "./editor/validation";
import { weeklyEntryInputSchema } from "./validations/curriculum-entry";

const retiredCategories = ["ayet", "hadis", "efendimiz", "sahabe-kissalari", "siyer"];

describe("retired curriculum categories", () => {
  it("rejects retired categories in both authoring schemas and database writes", async () => {
    for (const categoryId of retiredCategories) {
      const entry = {
        id: `g1-${categoryId}-eylul-1`,
        grade: 1,
        categoryId,
        month: 9,
        week: 1,
        year: 2026,
        title: "Retired category",
        body: "This content must not be saved as a separate category.",
        resourceUrl: "",
        revision: 0,
      };
      expect(weeklyEntryInputSchema.safeParse({ ...entry, resourceUrl: undefined }).success).toBe(
        false
      );
      const editorInput = {
        grade: entry.grade,
        categoryId,
        month: entry.month,
        week: entry.week,
        title: entry.title,
        body: entry.body,
        resourceUrl: entry.resourceUrl,
        revision: entry.revision,
      };
      expect(editorEntrySchema.safeParse({ ...editorInput, categoryId: "konu" }).success).toBe(
        true
      );
      expect(editorEntrySchema.safeParse(editorInput).success).toBe(false);
      await expect(bulkUpsertCurriculumEntries([entry])).rejects.toThrow("retired");
    }
  });

  it("keeps historical records stored while hiding them from reads, overrides, and publication", async () => {
    await ensureCurriculumEntriesTable();
    await ensureEditorSchema();
    await seedCurriculumDatabase();
    const before = (await getCurriculumWeekSummaries())[35];
    const ids = retiredCategories.map((category) => `g1-${category}-retired-test`);
    try {
      for (const [index, categoryId] of retiredCategories.entries()) {
        const id = ids[index];
        const historicalEntry = {
          id,
          grade: 1,
          categoryId,
          month: 5,
          week: 4,
          year: 2027,
          isDraft: false,
          title: "Historical source",
          body: "Stored for reference; never automatically appended to Topic.",
        } as CurriculumEntry;
        // Simulate records written before these categories were retired.
        await execute(
          `INSERT INTO "curriculum_entries"
           ("id", "grade", "categoryId", "month", "week", "year", "isDraft", "title", "body")
           VALUES ($1, 1, $2, 5, 4, 2027, 1, $3, $4)`,
          [id, categoryId, historicalEntry.title, historicalEntry.body]
        );
        await execute(
          `INSERT INTO "curriculum_editor_content"
           ("slot", "grade", "entryId", "entry", "revision", "updatedAt")
           VALUES ($1, 1, $2, $3, 1, $4)`,
          [
            `1:${categoryId}:retired-test`,
            id,
            JSON.stringify(historicalEntry),
            new Date().toISOString(),
          ]
        );
      }
      await seedCurriculumDatabase(true);
      for (const id of ids) {
        expect(await getCurriculumEntryByIdFromDb(id)).toBeNull();
        expect(await getEditorOverrideById(id)).toBeNull();
      }
      expect((await getEditorOverrides()).some(({ entry }) => ids.includes(entry.id))).toBe(false);
      for (const includeDrafts of [false, true]) {
        const entries = await getCurriculumEntriesFromDb(1, undefined, includeDrafts);
        expect(entries.every((entry) => curriculumCategoryIds.includes(entry.categoryId))).toBe(
          true
        );
        expect(entries.some((entry) => ids.includes(entry.id))).toBe(false);
      }
      expect((await getCurriculumWeekSummaries())[35]).toEqual(before);
      await publishCurriculumWeek(36);
      const stored = await queryOne<{ count: number }>(
        `SELECT COUNT(*) AS "count" FROM "curriculum_entries"
         WHERE "id" LIKE 'g1-%-retired-test' AND "isDraft" = 1`
      );
      expect(stored?.count).toBe(retiredCategories.length);
      for (const categoryId of retiredCategories) {
        expect(
          await queryOne(
            'SELECT "categoryId" FROM "curriculum_seed_exclusions" WHERE "categoryId" = $1',
            [categoryId]
          )
        ).not.toBeNull();
      }
    } finally {
      for (const id of ids) {
        await execute('DELETE FROM "curriculum_entries" WHERE "id" = $1', [id]);
        await execute('DELETE FROM "curriculum_editor_content" WHERE "entryId" = $1', [id]);
      }
    }
  });
});
