import {
  isJsonRequest,
  readBoundedJson,
  RequestBodyTimeoutError,
  RequestBodyTooLargeError,
} from "@/lib/http";
import { editorConfig, getEditorToken, hasEditorSession, validEditorCsrf } from "./auth";

export function editorResponse(body: unknown, status = 200): Response {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow", Vary: "Cookie" },
  });
}
export function checkEditorMutation(request: Request): Response | null {
  const config = editorConfig();
  if (
    request.headers.get("origin") !== config.origin ||
    request.headers.get("sec-fetch-site") === "cross-site"
  )
    return editorResponse({ error: "İstek reddedildi." }, 403);
  if (!isJsonRequest(request)) return editorResponse({ error: "JSON içerik gerekli." }, 415);
  return null;
}
export async function authorizeEditor(
  request: Request,
  mutation = false
): Promise<Response | null> {
  const token = getEditorToken(request);
  if (!(await hasEditorSession(token)))
    return editorResponse({ error: "Oturum süresi doldu. Tekrar giriş yapın." }, 401);
  if (mutation && (!token || !validEditorCsrf(request, token)))
    return editorResponse({ error: "İstek reddedildi." }, 403);
  return null;
}
export const readEditorJson = readBoundedJson;
export function editorError(error: unknown): Response {
  if (error instanceof RequestBodyTooLargeError)
    return editorResponse({ error: "İçerik çok büyük." }, 413);
  if (error instanceof RequestBodyTimeoutError)
    return editorResponse({ error: "İstek zaman aşımına uğradı." }, 408);
  if (error instanceof Error && error.message === "EDITOR_NOT_CONFIGURED")
    return editorResponse({ error: "Düzenleme hesabı sunucuda yapılandırılmamış." }, 503);
  console.error(
    "[curriculum-editor] Request failed",
    error instanceof Error ? error.name : "Unknown error"
  );
  return editorResponse({ error: "İşlem tamamlanamadı. Lütfen tekrar deneyin." }, 500);
}
