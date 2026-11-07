/** Checks browser mutation requests before they reach custom authentication routes. */
import { getAuth } from "@/lib/auth";
import { hasTrustedRequestOrigin } from "@/lib/request-origin";
import { configuredAppOrigin } from "@/lib/auth-configuration";
import { z } from "zod";
import {
  isJsonRequest,
  privateJson,
  readBoundedJson,
  RequestBodyTimeoutError,
  RequestBodyTooLargeError,
} from "@/lib/http";

const authUserResponseSchema = z.object({ user: z.object({ id: z.string().min(1) }) });

/** Keep only the authenticated identity; the internal response also contains session secrets. */
export async function readAuthResponseUserId(response: Response): Promise<string> {
  return authUserResponseSchema.parse(await response.json()).user.id;
}

export function dispatchAuthRequest(
  request: Request,
  path: string,
  body: unknown
): Promise<Response> {
  const headers = new Headers();
  for (const name of ["cookie", "origin", "sec-fetch-site", "sec-fetch-mode", "sec-fetch-dest"]) {
    const value = request.headers.get(name);
    if (value) headers.set(name, value);
  }
  headers.set("content-type", "application/json");
  return getAuth().handler(
    new Request(new URL(`/api/auth/${path}`, configuredAppOrigin()), {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
  );
}

export function validateMutationRequest(request: Request): Response | null {
  if (!isJsonRequest(request)) {
    return privateJson({ error: "JSON içerik gerekli." }, 415);
  }

  if (!hasTrustedRequestOrigin(request)) {
    return privateJson({ error: "İstek reddedildi." }, 403);
  }

  const length = Number(request.headers.get("content-length"));
  if (length > 8192) {
    return privateJson({ error: "İstek çok büyük." }, 413);
  }
  return null;
}

export function readMutationJson(request: Request): Promise<unknown> {
  return readBoundedJson(request, 8192);
}

export function mutationErrorResponse(error: unknown, message: string): Response {
  if (error instanceof RequestBodyTooLargeError) {
    return privateJson({ error: "İstek çok büyük." }, 413);
  }
  if (error instanceof RequestBodyTimeoutError) {
    return privateJson({ error: "İstek zaman aşımına uğradı." }, 408);
  }
  console.error(
    "[mutation] Request failed:",
    error instanceof Error ? error.name : "Unknown error"
  );
  return privateJson({ error: message }, 500);
}
