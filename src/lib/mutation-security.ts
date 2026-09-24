/** Checks browser mutation requests before they reach custom authentication routes. */
import { auth } from "@/lib/auth";

export function dispatchAuthRequest(
  request: Request,
  path: string,
  body: unknown
): Promise<Response> {
  const headers = new Headers(request.headers);
  headers.delete("content-length");
  return auth.handler(
    new Request(new URL(`/api/auth/${path}`, request.url), {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
  );
}

export function validateMutationRequest(request: Request): Response | null {
  const contentType = request.headers.get("content-type")?.split(";", 1)[0]?.trim().toLowerCase();
  if (contentType !== "application/json") {
    return Response.json({ error: "JSON içerik gerekli." }, { status: 415 });
  }

  const site = request.headers.get("sec-fetch-site");
  if (site === "cross-site") {
    return Response.json({ error: "İstek reddedildi." }, { status: 403 });
  }

  const origin = request.headers.get("origin");
  const allowedUrl = process.env.BETTER_AUTH_URL || new URL(request.url).origin;
  if (!origin || origin !== new URL(allowedUrl).origin) {
    return Response.json({ error: "İstek reddedildi." }, { status: 403 });
  }

  const length = Number(request.headers.get("content-length"));
  if (length > 8192) {
    return Response.json({ error: "İstek çok büyük." }, { status: 413 });
  }
  return null;
}

export async function readMutationJson(request: Request): Promise<unknown> {
  const reader = request.body?.getReader();
  if (!reader) return null;
  const decoder = new TextDecoder();
  let body = "";
  let bytes = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    bytes += value.byteLength;
    if (bytes > 8192) {
      await reader.cancel();
      throw new Error("REQUEST_TOO_LARGE");
    }
    body += decoder.decode(value, { stream: true });
  }
  body += decoder.decode();
  try {
    return JSON.parse(body) as unknown;
  } catch {
    return null;
  }
}

export function mutationErrorResponse(error: unknown, message: string): Response {
  if (error instanceof Error && error.message === "REQUEST_TOO_LARGE") {
    return Response.json({ error: "İstek çok büyük." }, { status: 413 });
  }
  console.error("[mutation] Request failed:", error);
  return Response.json({ error: message }, { status: 500 });
}
