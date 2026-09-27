import { getCurriculumEntriesFromDb } from "@/lib/curriculum-db";
import { contentSlot, getEditorOverrides, saveEditorContent } from "@/lib/editor/content";
import {
  authorizeEditor,
  checkEditorMutation,
  editorError,
  editorResponse,
  readEditorJson,
} from "@/lib/editor/http";
import { editorEntrySchema } from "@/lib/editor/validation";

export async function GET(request: Request) {
  try {
    const denied = await authorizeEditor(request);
    if (denied) return denied;
    const grade = Number(new URL(request.url).searchParams.get("sinif"));
    if (!Number.isInteger(grade) || grade < 1 || grade > 6)
      return editorResponse({ error: "Geçersiz sınıf." }, 400);
    const entries = await getCurriculumEntriesFromDb(grade);
    const overrides = await getEditorOverrides(grade);
    const revisions = new Map(overrides.map((record) => [contentSlot(record.entry), record]));
    return editorResponse(
      entries.map((entry) => ({
        entry,
        revision: revisions.get(contentSlot(entry))?.revision ?? 0,
        updatedAt: revisions.get(contentSlot(entry))?.updatedAt ?? null,
      }))
    );
  } catch (error) {
    return editorError(error);
  }
}
export async function PUT(request: Request) {
  try {
    const denied = checkEditorMutation(request) || (await authorizeEditor(request, true));
    if (denied) return denied;
    const input = editorEntrySchema.safeParse(await readEditorJson(request, 450000));
    if (!input.success)
      return editorResponse({ error: input.error.issues[0]?.message ?? "İçerik geçersiz." }, 400);
    const entries = await getCurriculumEntriesFromDb(input.data.grade);
    if (input.data.extraOrder) {
      const standard = entries.filter(
        (entry) =>
          entry.categoryId === input.data.categoryId &&
          entry.gender === input.data.gender &&
          !entry.isExtra
      );
      if (new Set(standard.map(contentSlot)).size < 48)
        return editorResponse({ error: "Ek hafta için önce 48 normal haftayı doldurun." }, 400);
      const lastExtra = Math.max(
        0,
        ...entries
          .filter(
            (entry) =>
              entry.categoryId === input.data.categoryId &&
              entry.gender === input.data.gender &&
              entry.isExtra
          )
          .map((entry) => entry.extraOrder ?? 0)
      );
      if (input.data.extraOrder > lastExtra + 1)
        return editorResponse({ error: "Ek haftaları sırayla ekleyin." }, 400);
    }
    const saved = await saveEditorContent(input.data, entries);
    if (!saved)
      return editorResponse(
        { error: "Bu içerik başka bir sekmede değişti. Güncel hâlini yükleyip tekrar düzenleyin." },
        409
      );
    return editorResponse(saved);
  } catch (error) {
    return editorError(error);
  }
}
