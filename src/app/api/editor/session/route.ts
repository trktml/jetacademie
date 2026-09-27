import { NextResponse } from "next/server";
import {
  createEditorSession,
  editorConfig,
  editorCookieName,
  editorCsrf,
  EDITOR_SESSION_SECONDS,
  getEditorToken,
  reserveEditorLogin,
  revokeEditorSession,
  verifyEditorCredentials,
} from "@/lib/editor/auth";
import {
  authorizeEditor,
  checkEditorMutation,
  editorError,
  editorResponse,
  readEditorJson,
} from "@/lib/editor/http";
import { editorLoginSchema } from "@/lib/editor/validation";

export async function GET(request: Request) {
  try {
    const denied = await authorizeEditor(request);
    if (denied) return denied;
    return editorResponse({ csrf: editorCsrf(getEditorToken(request)!) });
  } catch (error) {
    return editorError(error);
  }
}
export async function POST(request: Request) {
  try {
    editorConfig();
    const denied = checkEditorMutation(request);
    if (denied) return denied;
    if (!(await reserveEditorLogin())) {
      const response = editorResponse(
        { error: "Çok fazla giriş denemesi. 15 dakika sonra tekrar deneyin." },
        429
      );
      response.headers.set("Retry-After", "900");
      return response;
    }
    const input = editorLoginSchema.safeParse(await readEditorJson(request, 2048));
    if (!input.success) return editorResponse({ error: "Kullanıcı adı veya şifre hatalı." }, 400);
    if (!(await verifyEditorCredentials(input.data.username, input.data.password)))
      return editorResponse({ error: "Kullanıcı adı veya şifre hatalı." }, 401);
    const previous = getEditorToken(request);
    if (previous) await revokeEditorSession(previous);
    const token = await createEditorSession();
    const response = NextResponse.json(
      { csrf: editorCsrf(token) },
      { headers: { "Cache-Control": "no-store" } }
    );
    response.cookies.set(editorCookieName(), token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: EDITOR_SESSION_SECONDS,
    });
    return response;
  } catch (error) {
    return editorError(error);
  }
}
export async function DELETE(request: Request) {
  try {
    const denied = checkEditorMutation(request) || (await authorizeEditor(request, true));
    if (denied) return denied;
    await revokeEditorSession(getEditorToken(request)!);
    const response = NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
    response.cookies.set(editorCookieName(), "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 0,
    });
    return response;
  } catch (error) {
    return editorError(error);
  }
}
