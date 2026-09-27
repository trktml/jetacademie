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
  if (request.headers.get("content-type")?.split(";")[0].trim() !== "application/json")
    return editorResponse({ error: "JSON içerik gerekli." }, 415);
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
export async function readEditorJson(request: Request, maxBytes: number): Promise<unknown> {
  const reader = request.body?.getReader();
  if (!reader) return null;
  const decoder = new TextDecoder();
  let text = "";
  let bytes = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    bytes += value.byteLength;
    if (bytes > maxBytes) {
      await reader.cancel();
      throw new Error("EDITOR_BODY_TOO_LARGE");
    }
    text += decoder.decode(value, { stream: true });
  }
  try {
    return JSON.parse(text + decoder.decode());
  } catch {
    return null;
  }
}
export function editorError(error: unknown): Response {
  if (error instanceof Error && error.message === "EDITOR_BODY_TOO_LARGE")
    return editorResponse({ error: "İçerik çok büyük." }, 413);
  if (error instanceof Error && error.message === "EDITOR_NOT_CONFIGURED")
    return editorResponse({ error: "Düzenleme hesabı sunucuda yapılandırılmamış." }, 503);
  console.error(
    "[curriculum-editor] Request failed",
    error instanceof Error ? error.name : "Unknown error"
  );
  return editorResponse({ error: "İşlem tamamlanamadı. Lütfen tekrar deneyin." }, 500);
}
