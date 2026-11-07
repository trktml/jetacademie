import type { z } from "zod";

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/** Treat proxy error pages and malformed successful responses as failed requests. */
export async function requestJson<T>(
  url: string,
  schema: z.ZodType<T>,
  init: RequestInit = {},
  errorMessage = "İşlem tamamlanamadı. Lütfen tekrar deneyin."
): Promise<T> {
  const response = await fetch(url, { ...init, credentials: "same-origin", cache: "no-store" });
  const body: unknown = await response.json().catch(() => null);
  if (!response.ok) {
    const message =
      body && typeof body === "object" && "error" in body && typeof body.error === "string"
        ? body.error
        : errorMessage;
    throw new ApiError(message, response.status);
  }
  const parsed = schema.safeParse(body);
  if (!parsed.success) throw new ApiError(errorMessage, response.status);
  return parsed.data;
}

export function postJson<T>(
  url: string,
  body: unknown,
  schema: z.ZodType<T>,
  errorMessage: string
) {
  return requestJson(
    url,
    schema,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    },
    errorMessage
  );
}
