export class RequestBodyTooLargeError extends Error {}
export class RequestBodyTimeoutError extends Error {}

/** Enforce the actual stream size, including chunked requests without Content-Length. */
export async function readBoundedJson(
  request: Request,
  maxBytes: number,
  timeoutMs = 10_000
): Promise<unknown> {
  const length = Number(request.headers.get("content-length"));
  if (length > maxBytes) throw new RequestBodyTooLargeError();
  const reader = request.body?.getReader();
  if (!reader) return null;
  const decoder = new TextDecoder();
  const read = async () => {
    let body = "";
    let bytes = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > maxBytes) throw new RequestBodyTooLargeError();
      body += decoder.decode(value, { stream: true });
    }
    try {
      return JSON.parse(body + decoder.decode()) as unknown;
    } catch {
      return null;
    }
  };
  let timer: ReturnType<typeof setTimeout> | undefined;
  const deadline = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new RequestBodyTimeoutError()), timeoutMs);
  });
  try {
    return await Promise.race([read(), deadline]);
  } catch (error) {
    // Cancellation of a teed stream can wait for the other branch. Return immediately.
    void reader.cancel().catch(() => {});
    throw error;
  } finally {
    clearTimeout(timer);
    reader.releaseLock();
  }
}

export function privateJson(body: unknown, status = 200): Response {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "private, no-store", Vary: "Cookie" },
  });
}

export function copyResponseCookies(source: Response, target: Response): Response {
  for (const cookie of source.headers.getSetCookie()) target.headers.append("set-cookie", cookie);
  return target;
}

export function isJsonRequest(request: Request): boolean {
  return (
    request.headers.get("content-type")?.split(";", 1)[0]?.trim().toLowerCase() ===
    "application/json"
  );
}
