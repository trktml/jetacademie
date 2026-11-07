import type { CurriculumEntry } from "@/lib/curriculum";
import { curriculumYearForPeriod, isCurriculumCategoryId, makeEntryId } from "@/lib/curriculum";
import { curriculumPdfUrl, curriculumResourceUrl } from "@/lib/curriculum-resource-url";
import { query, queryOne } from "@/lib/db";
import { ensureEditorSchema } from "./schema";
import type { EditorEntryInput } from "./validation";
import type { EditorRecord } from "./types";

export type { EditorRecord } from "./types";
export interface ContentRow {
  entry: string;
  revision: number;
  updatedAt: string;
}
export function readEditorRecord({ entry, revision, updatedAt }: ContentRow): EditorRecord {
  const data = JSON.parse(entry) as CurriculumEntry;
  return {
    entry: {
      ...data,
      year: data.year ?? curriculumYearForPeriod(data.month, data.isExtra),
      resourceUrl: curriculumResourceUrl(data.resourceUrl),
      pdfUrl: curriculumPdfUrl(data.pdfUrl) ?? curriculumPdfUrl(data.resourceUrl),
    },
    revision,
    updatedAt,
  };
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
  return rows.map(readEditorRecord).filter(({ entry }) => isCurriculumCategoryId(entry.categoryId));
}
export function mergeEditorContent(
  entries: CurriculumEntry[],
  overrides: EditorRecord[]
): CurriculumEntry[] {
  const baseBySlot = new Map<string, CurriculumEntry>();
  for (const entry of entries) {
    const slot = contentSlot(entry);
    // If a legacy duplicate remains, a published alias must not expose a draft slot.
    if (!baseBySlot.has(slot) || entry.isDraft) baseBySlot.set(slot, entry);
  }
  const replacedSlots = new Set<string>();
  const replacedIds = new Set<string>();
  const edited = overrides.map(({ entry }) => {
    const slot = contentSlot(entry);
    replacedSlots.add(slot);
    replacedIds.add(entry.id);
    return { ...entry, isDraft: baseBySlot.get(slot)?.isDraft ?? entry.isDraft };
  });
  return [
    ...entries.filter(
      (entry) => !replacedIds.has(entry.id) && !replacedSlots.has(contentSlot(entry))
    ),
    ...edited,
  ];
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
    year: existing?.year ?? curriculumYearForPeriod(input.month, Boolean(input.extraOrder)),
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
  return row ? readEditorRecord(row) : null;
}
