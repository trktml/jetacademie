import type { CurriculumEntry } from "@/lib/curriculum";
import { makeEntryId, sortCurriculumEntries } from "@/lib/curriculum";
import { query, queryOne } from "@/lib/db";
import { ensureEditorSchema } from "./schema";
import type { EditorEntryInput } from "./validation";

export interface EditorRecord {
  entry: CurriculumEntry;
  revision: number;
  updatedAt: string | null;
}
interface ContentRow {
  entry: string;
  revision: number;
  updatedAt: string;
}
export function contentSlot(
  entry: Pick<
    CurriculumEntry,
    "grade" | "categoryId" | "gender" | "month" | "week" | "isExtra" | "extraOrder"
  >
): string {
  return `${entry.grade ?? 1}:${entry.categoryId}:${entry.gender ?? "all"}:${entry.isExtra ? `extra-${entry.extraOrder}` : `${entry.month}-${entry.week}`}`;
}
export async function getEditorOverrides(grade?: number): Promise<EditorRecord[]> {
  await ensureEditorSchema();
  const rows = await query<ContentRow>(
    `SELECT "entry", "revision", "updatedAt" FROM "curriculum_editor_content"${grade ? ' WHERE "grade" = $1' : ""}`,
    grade ? [grade] : []
  );
  return rows.map((row) => ({
    entry: JSON.parse(row.entry) as CurriculumEntry,
    revision: row.revision,
    updatedAt: row.updatedAt,
  }));
}
export async function mergeEditorContent(
  entries: CurriculumEntry[],
  grade?: number,
  gender?: "erkek" | "bayan"
): Promise<CurriculumEntry[]> {
  const overrides = (await getEditorOverrides(grade)).filter(
    ({ entry }) => !gender || !entry.gender || entry.gender === gender
  );
  const replacedIds = new Set(overrides.map((record) => record.entry.id));
  const replacedSlots = new Set(overrides.map((record) => contentSlot(record.entry)));
  return sortCurriculumEntries([
    ...entries.filter(
      (entry) => !replacedIds.has(entry.id) && !replacedSlots.has(contentSlot(entry))
    ),
    ...overrides.map((record) => record.entry),
  ]);
}
export async function getEditorOverrideById(id: string): Promise<CurriculumEntry | null> {
  await ensureEditorSchema();
  const row = await queryOne<ContentRow>(
    `SELECT "entry", "revision", "updatedAt" FROM "curriculum_editor_content" WHERE "entryId" = $1`,
    [id]
  );
  return row ? (JSON.parse(row.entry) as CurriculumEntry) : null;
}
export async function saveEditorContent(
  input: EditorEntryInput,
  baseEntries: CurriculumEntry[]
): Promise<EditorRecord | null> {
  await ensureEditorSchema();
  const location = { ...input, isExtra: !!input.extraOrder };
  const slot = contentSlot(location);
  const existing = baseEntries.find((entry) => contentSlot(entry) === slot);
  const rawId = makeEntryId(
    input.categoryId,
    input.month,
    input.week,
    input.grade,
    !!input.extraOrder,
    input.extraOrder
  );
  const canonicalId = rawId.startsWith(`g${input.grade}-`) ? rawId : `g${input.grade}-${rawId}`;
  const entry: CurriculumEntry = {
    ...existing,
    id: existing?.id ?? `${canonicalId}${input.gender ? `-${input.gender}` : ""}`,
    grade: input.grade,
    categoryId: input.categoryId,
    gender: input.gender,
    month: input.extraOrder ? 8 : input.month,
    week: input.extraOrder ? 4 : input.week,
    year: existing?.year ?? (input.month >= 9 && !input.extraOrder ? 2026 : 2027),
    isExtra: !!input.extraOrder,
    extraOrder: input.extraOrder,
    title: input.title,
    body: input.body,
    contentFormat: "markdown",
    resourceUrl: input.resourceUrl || undefined,
    pdfUrl: input.resourceUrl.toLowerCase().endsWith(".pdf")
      ? input.resourceUrl
      : input.resourceUrl === existing?.resourceUrl
        ? existing?.pdfUrl
        : undefined,
  };
  const now = new Date().toISOString();
  // Atomic compare-and-swap prevents two open tabs from overwriting each other.
  const row =
    input.revision === 0
      ? await queryOne<ContentRow>(
          `INSERT INTO "curriculum_editor_content" ("slot", "grade", "entryId", "entry", "revision", "updatedAt") VALUES ($1, $2, $3, $4, 1, $5) ON CONFLICT ("slot") DO NOTHING RETURNING "entry", "revision", "updatedAt"`,
          [slot, input.grade, entry.id, JSON.stringify(entry), now]
        )
      : await queryOne<ContentRow>(
          `UPDATE "curriculum_editor_content" SET "entry" = $1, "revision" = "revision" + 1, "updatedAt" = $2 WHERE "slot" = $3 AND "revision" = $4 RETURNING "entry", "revision", "updatedAt"`,
          [JSON.stringify(entry), now, slot, input.revision]
        );
  return row
    ? { entry: JSON.parse(row.entry), revision: row.revision, updatedAt: row.updatedAt }
    : null;
}
