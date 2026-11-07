import { execute, getPool, query, transaction } from "@/lib/db";
import { BELGIUM_GRADES } from "@/lib/curriculum";
import {
  WEEKLY_CONTENT_CATEGORIES,
  weekNumberToSlot,
  slotToWeekNumber,
  weeklyPackageSchema,
  weeklyCategoryPackageSchema,
  type WeeklyContentCategory,
} from "@/lib/validations/curriculum-entry";
import { curriculumVocabularyIssues } from "@/lib/curriculum-vocabulary";
import { ensureCurriculumEntriesTable } from "./schema";
import { entryToRow, rowToEntry, type CurriculumEntryRow } from "./entry-row";
import {
  lockCurriculumCategories,
  upsertCurriculumEntryRows,
  withSeedExclusionsSuspended,
} from "./repository";
import { contentSlot, getEditorOverrides } from "@/lib/editor/content";

/** One validated write path for PostgreSQL and the SQLite test driver. */
export async function saveWeeklyCurriculumPackage(
  input: unknown,
  options: { category?: WeeklyContentCategory; publish?: boolean } = {}
): Promise<void> {
  if (options.category && options.publish)
    throw new Error(
      "Tek kategori yalnız taslak kaydedilebilir; yayın için haftalık paketi tamamlayın."
    );
  const schema = options.category
    ? weeklyCategoryPackageSchema(options.category)
    : weeklyPackageSchema;
  const pkg = schema.parse(input);
  await ensureCurriculumEntriesTable();
  const categories = options.category ? [options.category] : [...WEEKLY_CONTENT_CATEGORIES];
  const entries = pkg.entries.map((entry) => ({
    ...entry,
    isDraft: !options.publish,
    isExtra: false,
    contentFormat: "markdown" as const,
  }));
  await transaction(async () => {
    await lockCurriculumCategories(categories);
    await withSeedExclusionsSuspended(categories, async () => {
      const now = new Date().toISOString();
      const written = await upsertCurriculumEntryRows(
        entries.map((entry) => entryToRow(entry, now))
      );
      if (written !== entries.length) {
        throw new Error("Haftalık paket kayıtlarının tamamı yazılamadı.");
      }
      if (options.publish) {
        const { month, week } = weekNumberToSlot(pkg.weekNumber);
        requireCompleteWeek(await readStandardWeekRows(month, week));
      }
      for (const entry of entries) {
        // Keep revisions monotonic: importing a package must invalidate stale open editor tabs.
        await execute(
          `INSERT INTO "curriculum_editor_content" ("slot", "grade", "entryId", "entry", "revision", "updatedAt")
         VALUES ($1, $2, $3, $4, 1, $5)
         ON CONFLICT ("slot") DO UPDATE SET "entryId" = EXCLUDED."entryId", "entry" = EXCLUDED."entry",
           "revision" = "curriculum_editor_content"."revision" + 1, "updatedAt" = EXCLUDED."updatedAt"`,
          [contentSlot(entry), entry.grade, entry.id, JSON.stringify(entry), now]
        );
      }
    });
  });
}

function resolveWeekSlot(weekNumberOrMonth: number, week?: number) {
  return weekNumberToSlot(
    week === undefined ? weekNumberOrMonth : slotToWeekNumber(weekNumberOrMonth, week)
  );
}

export interface WeekSummary {
  weekNumber: number;
  month: number;
  week: number;
  year: number;
  monthSlug: string;
  totalEntries: number;
  draftEntries: number;
  publishedEntries: number;
  status: "empty" | "draft" | "published" | "mixed";
}

type WeeklySlotRow = Pick<CurriculumEntryRow, "grade" | "categoryId" | "gender">;

function weeklyCoverageIssues(rows: readonly WeeklySlotRow[]): string[] {
  const expected = new Map<string, number>(
    BELGIUM_GRADES.flatMap((grade) =>
      WEEKLY_CONTENT_CATEGORIES.map((category) => [`${grade}:${category}`, 0] as const)
    )
  );
  const issues: string[] = [];
  for (const { grade, categoryId, gender } of rows) {
    const key = `${grade}:${categoryId}`;
    const count = expected.get(key);
    if (count === undefined || gender) issues.push(`Geçersiz kayıt: M${grade} / ${categoryId}`);
    else expected.set(key, count + 1);
  }
  for (const [key, count] of expected) {
    if (count === 1) continue;
    const [grade, category] = key.split(":");
    issues.push(`M${grade} / ${category}: ${count === 0 ? "eksik" : "yineleniyor"}`);
  }
  return issues;
}

function requireCompleteWeek(rows: readonly WeeklySlotRow[]): void {
  const issues = weeklyCoverageIssues(rows);
  if (issues.length) {
    throw new Error(
      `Hafta yayınlanamadı. Her sınıfta bir Konu ve bir Dinleme kaydı gerekli:\n${issues.join("\n")}`
    );
  }
}

function readStandardWeekRows(month: number, week: number): Promise<CurriculumEntryRow[]> {
  const placeholders = WEEKLY_CONTENT_CATEGORIES.map((_, i) => `$${i + 3}`).join(", ");
  return query<CurriculumEntryRow>(
    `SELECT * FROM "curriculum_entries" WHERE "month" = $1 AND "week" = $2
     AND "isExtra" = 0 AND "categoryId" IN (${placeholders})${getPool() ? " FOR UPDATE" : ""}`,
    [month, week, ...WEEKLY_CONTENT_CATEGORIES]
  );
}

/**
 * Publishes a complete week; already-published rows count toward its coverage.
 */
export async function publishCurriculumWeek(
  weekNumberOrMonth: number,
  weekArg?: number
): Promise<{ updatedCount: number; publishedCount: number }> {
  await ensureCurriculumEntriesTable();
  const { month, week } = resolveWeekSlot(weekNumberOrMonth, weekArg);

  const validate = (rows: { id: string; body: string }[]) => {
    const issues = rows.flatMap((row) =>
      curriculumVocabularyIssues(row.body).map((message) => `${row.id}: ${message}`)
    );
    if (issues.length)
      throw new Error(`Kelime listesi doğrulaması başarısız:\n${issues.join("\n")}`);
  };

  return transaction(async () => {
    await lockCurriculumCategories(WEEKLY_CONTENT_CATEGORIES);
    const rows = await readStandardWeekRows(month, week);
    const drafts = rows.filter((row) => row.isDraft);
    if (drafts.length === 0) return { updatedCount: 0, publishedCount: 0 };
    requireCompleteWeek(rows);
    const overrides = new Map(
      (await getEditorOverrides()).map(({ entry }) => [contentSlot(entry), entry])
    );
    validate(
      drafts.map((row) => ({
        id: row.id,
        body: overrides.get(contentSlot(rowToEntry(row)))?.body ?? row.body ?? "",
      }))
    );
    const idParams = drafts.map((_, index) => `$${index + 1}`).join(", ");
    const updated = await query<{ id: string }>(
      `UPDATE "curriculum_entries" SET "isDraft" = 0, "updatedAt" = CURRENT_TIMESTAMP
       WHERE "id" IN (${idParams}) RETURNING "id"`,
      drafts.map((row) => row.id)
    );
    return { updatedCount: updated.length, publishedCount: updated.length };
  });
}

/**
 * Deletes entries for a given week number (1-36) or month and week for the two weekly content categories.
 * Strictly preserves adab-i-muaseret, ilmihal, and esma categories.
 */
export async function deleteCurriculumWeek(
  weekNumberOrMonth: number,
  weekArg?: number
): Promise<{ deletedCount: number }> {
  await ensureCurriculumEntriesTable();
  const { month, week } = resolveWeekSlot(weekNumberOrMonth, weekArg);

  return transaction(async () => {
    await lockCurriculumCategories(WEEKLY_CONTENT_CATEGORIES);
    const placeholders = WEEKLY_CONTENT_CATEGORIES.map((_, i) => `$${i + 3}`).join(", ");
    const removed = await query<{ id: string }>(
      `DELETE FROM "curriculum_entries" WHERE "month" = $1 AND "week" = $2 AND "isExtra" = 0 AND "categoryId" IN (${placeholders}) RETURNING "id"`,
      [month, week, ...WEEKLY_CONTENT_CATEGORIES]
    );
    const ids = new Set(removed.map((row) => row.id));
    for (const category of WEEKLY_CONTENT_CATEGORIES) {
      const editorRows = await query<{ entryId: string }>(
        'DELETE FROM "curriculum_editor_content" WHERE "slot" LIKE $1 RETURNING "entryId"',
        [`%:${category}:%:${month}-${week}`]
      );
      for (const row of editorRows) ids.add(row.entryId);
    }
    if (ids.size) {
      const idParams = [...ids].map((_, index) => `$${index + 1}`).join(", ");
      await execute(`DELETE FROM "curriculum_progress" WHERE "entryId" IN (${idParams})`, [...ids]);
      await execute(`DELETE FROM "curriculum_editor_content" WHERE "entryId" IN (${idParams})`, [
        ...ids,
      ]);
    }
    return { deletedCount: removed.length };
  });
}

/**
 * Returns a high-level summary of all 36 curriculum weeks and their draft/published status.
 */
export async function getCurriculumWeekSummaries(): Promise<WeekSummary[]> {
  await ensureCurriculumEntriesTable();
  type SummaryRow = WeeklySlotRow & Pick<CurriculumEntryRow, "month" | "week" | "isDraft">;
  const rows = await query<SummaryRow>(
    `SELECT "month", "week", "grade", "categoryId", "gender", "isDraft"
     FROM "curriculum_entries"
     WHERE "categoryId" IN ('konu', 'hocaefendi-dinleme')
       AND "isExtra" = 0
       AND "month" IS NOT NULL AND "week" IS NOT NULL`
  );

  const slotMap = new Map<string, SummaryRow[]>();
  for (const r of rows) {
    const key = `${r.month}-${r.week}`;
    const group = slotMap.get(key);
    if (group) group.push(r);
    else slotMap.set(key, [r]);
  }

  const summaries: WeekSummary[] = [];
  for (let w = 1; w <= 36; w++) {
    const slot = weekNumberToSlot(w);
    const entries = slotMap.get(`${slot.month}-${slot.week}`) ?? [];
    const draftEntries = entries.filter((entry) => entry.isDraft).length;
    const publishedEntries = entries.length - draftEntries;
    let status: WeekSummary["status"] = "empty";
    if (entries.length > 0) {
      if (publishedEntries === 0) status = "draft";
      else if (draftEntries === 0 && weeklyCoverageIssues(entries).length === 0)
        status = "published";
      else status = "mixed";
    }

    summaries.push({
      weekNumber: w,
      month: slot.month,
      week: slot.week,
      year: slot.year,
      monthSlug: slot.monthSlug,
      totalEntries: entries.length,
      draftEntries,
      publishedEntries,
      status,
    });
  }

  return summaries;
}
