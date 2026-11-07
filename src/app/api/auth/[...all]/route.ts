import { hasTrustedRequestOrigin } from "@/lib/request-origin";
import { copyResponseCookies, privateJson } from "@/lib/http";
import {
  dispatchAuthRequest,
  mutationErrorResponse,
  readMutationJson,
} from "@/lib/mutation-security";
import { getAuth } from "@/lib/auth";

async function publicSession(response: Response) {
  if (!response.ok)
    return copyResponseCookies(
      response,
      privateJson({ error: "Oturum doğrulanamadı." }, response.status)
    );
  const data = (await response.json()) as {
    user: { id: string; name: string };
    session: { expiresAt: string };
    needsRefresh?: boolean;
  } | null;
  return copyResponseCookies(
    response,
    privateJson(
      data && {
        user: { id: data.user.id, name: data.user.name },
        session: { expiresAt: data.session.expiresAt },
        needsRefresh: data.needsRefresh,
      }
    )
  );
}

export async function GET(request: Request) {
  const path = new URL(request.url).pathname.replace(/\/+$/, "");
  if (path !== "/api/auth/get-session") {
    return privateJson({ error: "Not found" }, 404);
  }
  try {
    return await publicSession(await getAuth().handler(request));
  } catch (error) {
    return mutationErrorResponse(error, "Oturum doğrulanamadı.");
  }
}

export async function POST(request: Request) {
  const path = new URL(request.url).pathname.replace(/\/+$/, "");
  // Client sign-out and session refresh flows are exposed through the generic auth route.
  // Anonymous registration and login are dispatched internally by their own routes.
  if (path !== "/api/auth/sign-out" && path !== "/api/auth/get-session") {
    return privateJson({ error: "Not found" }, 404);
  }
  if (!hasTrustedRequestOrigin(request)) return privateJson({ error: "İstek reddedildi." }, 403);
  try {
    const body = await readMutationJson(request);
    const response = await dispatchAuthRequest(
      request,
      path.slice("/api/auth/".length),
      body ?? {}
    );
    return path === "/api/auth/get-session" ? await publicSession(response) : response;
  } catch (error) {
    return mutationErrorResponse(error, "İşlem tamamlanamadı.");
  }
}
