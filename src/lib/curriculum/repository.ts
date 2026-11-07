import { execute, getPool, query, transaction } from "@/lib/db";
import {
  curriculumYearForPeriod,
  isCurriculumCategoryId,
  type CurriculumCategoryId,
} from "@/lib/curriculum";
import { withGradeScopedId, type CurriculumEntryRow } from "./entry-row";

export type CurriculumEntryWrite = Partial<CurriculumEntryRow> &
  Pick<CurriculumEntryRow, "id" | "grade" | "categoryId" | "title">;

export const CURRICULUM_LOCK_NAMESPACE = "jetacademie:curriculum";

/** Serialize catalog writes in a stable order across application and CLI processes. */
export async function lockCurriculumCategories(categories: readonly CurriculumCategoryId[]) {
  if (!getPool()) return;
  for (const category of [...new Set(categories)].sort()) {
    await query("SELECT pg_advisory_xact_lock(hashtext($1), hashtext($2))", [
      CURRICULUM_LOCK_NAMESPACE,
      category,
    ]);
  }
}

export interface SeedExclusionRow {
  categoryId: string;
  createdAt: string;
}

export async function saveSeedExclusions(exclusions: SeedExclusionRow[]): Promise<void> {
  for (const exclusion of exclusions) {
    await execute(
      `INSERT INTO "curriculum_seed_exclusions" ("categoryId", "createdAt")
       VALUES ($1, $2) ON CONFLICT ("categoryId") DO NOTHING`,
      [exclusion.categoryId, exclusion.createdAt]
    );
  }
}

/** Temporarily allow explicit writes to excluded categories inside the caller's transaction. */
export async function withSeedExclusionsSuspended<T>(
  categories: readonly CurriculumCategoryId[],
  work: () => Promise<T>
): Promise<T> {
  const placeholders = categories.map((_, i) => `$${i + 1}`).join(", ");
  const exclusions = await query<SeedExclusionRow>(
    `DELETE FROM "curriculum_seed_exclusions" WHERE "categoryId" IN (${placeholders})
     RETURNING "categoryId", "createdAt"`,
    [...categories]
  );
  const result = await work();
  await saveSeedExclusions(exclusions);
  return result;
}

/** Public batches are atomic even when they span multiple SQL statements. */
export async function bulkUpsertCurriculumEntries(rows: CurriculumEntryWrite[]): Promise<void> {
  if (rows.length === 0) return;
  await transaction(() => upsertCurriculumEntryRows(rows));
}

/** Internal primitive for services that already own a transaction; counts actual writes. */
export async function upsertCurriculumEntryRows(
  rows: CurriculumEntryWrite[],
  conflict: "update" | "ignore" = "update"
): Promise<number> {
  if (rows.length === 0) return 0;
  const now = new Date().toISOString();
  if (rows.some((row) => !isCurriculumCategoryId(row.categoryId))) {
    throw new Error("Cannot save a retired or unknown curriculum category.");
  }
  const gradeScopedRows = rows.map(withGradeScopedId);
  const CHUNK_SIZE = 50;
  let written = 0;

  for (let i = 0; i < gradeScopedRows.length; i += CHUNK_SIZE) {
    const chunk = gradeScopedRows.slice(i, i + CHUNK_SIZE);
    const valuePlaceholders: string[] = [];
    const params: unknown[] = [];
    let pIdx = 1;

    for (const r of chunk) {
      valuePlaceholders.push(
        `($${pIdx++}, $${pIdx++}, $${pIdx++}, $${pIdx++}, $${pIdx++}, $${pIdx++}, $${pIdx++}, $${pIdx++}, $${pIdx++}, $${pIdx++}, $${pIdx++}, $${pIdx++}, $${pIdx++}, $${pIdx++}, $${pIdx++}, $${pIdx++}, $${pIdx++})`
      );
      params.push(
        r.id,
        r.grade,
        r.categoryId,
        r.gender ?? null,
        r.month ?? null,
        r.week ?? null,
        r.year ?? curriculumYearForPeriod(r.month ?? 1, Boolean(r.isExtra)),
        r.isExtra ? 1 : 0,
        r.extraOrder ?? null,
        r.isDraft ? 1 : 0,
        r.title,
        r.body ?? null,
        r.resourceUrl ?? null,
        r.pdfUrl ?? null,
        r.pageCount ?? null,
        r.createdAt ?? now,
        r.updatedAt ?? now
      );
    }

    const sql = `
      INSERT INTO "curriculum_entries" (
        "id", "grade", "categoryId", "gender", "month", "week", "year",
        "isExtra", "extraOrder", "isDraft", "title", "body", "resourceUrl", "pdfUrl",
        "pageCount", "createdAt", "updatedAt"
      ) VALUES ${valuePlaceholders.join(", ")}
      ON CONFLICT ("id") ${
        conflict === "ignore"
          ? "DO NOTHING"
          : `DO UPDATE SET
        "grade" = EXCLUDED."grade",
        "categoryId" = EXCLUDED."categoryId",
        "gender" = EXCLUDED."gender",
        "month" = EXCLUDED."month",
        "week" = EXCLUDED."week",
        "year" = EXCLUDED."year",
        "isExtra" = EXCLUDED."isExtra",
        "extraOrder" = EXCLUDED."extraOrder",
        "isDraft" = EXCLUDED."isDraft",
        "title" = EXCLUDED."title",
        "body" = EXCLUDED."body",
        "resourceUrl" = EXCLUDED."resourceUrl",
        "pdfUrl" = EXCLUDED."pdfUrl",
        "pageCount" = EXCLUDED."pageCount",
        "updatedAt" = EXCLUDED."updatedAt"`
      }
    `;

    written += await execute(sql, params);
  }
  return written;
}
