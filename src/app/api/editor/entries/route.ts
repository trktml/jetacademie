import { getCurriculumEditorRecords, updateCurriculumEditorEntry } from "@/lib/curriculum-db";
import { parseCurriculumGrade } from "@/lib/curriculum";
import { ActionError } from "@/lib/action-result";
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
    const grade = parseCurriculumGrade(new URL(request.url).searchParams.get("sinif"));
    if (!grade) return editorResponse({ error: "Geçersiz sınıf." }, 400);
    return editorResponse(await getCurriculumEditorRecords(grade));
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
    const saved = await updateCurriculumEditorEntry(input.data);
    if (!saved)
      return editorResponse(
        { error: "Bu içerik başka bir sekmede değişti. Güncel hâlini yükleyip tekrar düzenleyin." },
        409
      );
    return editorResponse(saved);
  } catch (error) {
    if (error instanceof ActionError) return editorResponse({ error: error.message }, 400);
    return editorError(error);
  }
}
