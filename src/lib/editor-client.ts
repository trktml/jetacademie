import { z } from "zod";
import { type CurriculumCategoryId, type CurriculumEntry } from "@/lib/curriculum";
import type { EditorRecord } from "@/lib/editor/types";
import type { EditorEntryInput } from "@/lib/editor/validation";
import { editorRecordResponseSchema } from "@/lib/validations/curriculum-response";
import { requestJson } from "@/lib/client-http";
export { ApiError as EditorRequestError } from "@/lib/client-http";

const sessionSchema = z.object({ csrf: z.string().min(1) });
const successSchema = z.object({ ok: z.literal(true) });

export const getEditorEntries = (grade: number, signal?: AbortSignal) =>
  requestJson(`/api/editor/entries?sinif=${grade}`, z.array(editorRecordResponseSchema), {
    signal,
  });
export const loginEditor = (username: string, password: string) =>
  requestJson("/api/editor/session", sessionSchema, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
export const logoutEditor = (csrf: string) =>
  requestJson("/api/editor/session", successSchema, {
    method: "DELETE",
    headers: { "Content-Type": "application/json", "X-Editor-CSRF": csrf },
    body: "{}",
  });
export const saveEditorEntry = (input: EditorEntryInput, csrf: string) =>
  requestJson("/api/editor/entries", editorRecordResponseSchema, {
    method: "PUT",
    headers: { "Content-Type": "application/json", "X-Editor-CSRF": csrf },
    body: JSON.stringify(input),
  });

export interface EditorLocation {
  grade: number;
  month: number;
  week: number;
  categoryId: CurriculumCategoryId;
  gender: "erkek" | "bayan";
  extraOrder?: number;
}
export const filled = (entry?: CurriculumEntry) =>
  !!(entry?.body?.trim() || entry?.resourceUrl || entry?.pdfUrl);
export function matchLocation(
  record: EditorRecord,
  location: EditorLocation,
  categoryId = location.categoryId
): boolean {
  const entry = record.entry;
  return (
    entry.categoryId === categoryId &&
    (categoryId !== "ilmihal" || entry.gender === location.gender) &&
    (location.extraOrder
      ? !!entry.isExtra && entry.extraOrder === location.extraOrder
      : !entry.isExtra && entry.month === location.month && entry.week === location.week)
  );
}
