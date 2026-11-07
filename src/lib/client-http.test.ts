import { afterEach, describe, expect, it, mock } from "bun:test";
import { z } from "zod";
import { ApiError, postJson, requestJson } from "./client-http";
const originalFetch = globalThis.fetch;
afterEach(() => {
  globalThis.fetch = originalFetch;
});
const schema = z.object({ success: z.literal(true) });

describe("client JSON boundary", () => {
  it("validates successful payloads and sends JSON without caching private data", async () => {
    const fetchMock = mock(async () => Response.json({ success: true }));
    globalThis.fetch = fetchMock as unknown as typeof fetch;
    expect(await postJson("/api/account/delete", { password: "test" }, schema, "Failed")).toEqual({
      success: true,
    });
    expect(fetchMock).toHaveBeenCalledWith("/api/account/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: "test" }),
      credentials: "same-origin",
      cache: "no-store",
    });
  });
  it("reports server errors and handles HTML proxy responses", async () => {
    globalThis.fetch = mock(async () =>
      Response.json({ error: "Oturum süresi doldu." }, { status: 401 })
    ) as unknown as typeof fetch;
    await expect(requestJson("/api", schema)).rejects.toMatchObject({
      status: 401,
      message: "Oturum süresi doldu.",
    });
    globalThis.fetch = mock(
      async () => new Response("<h1>Gateway error</h1>", { status: 502 })
    ) as unknown as typeof fetch;
    await expect(requestJson("/api", schema, {}, "Tekrar deneyin.")).rejects.toMatchObject({
      status: 502,
      message: "Tekrar deneyin.",
    });
  });
  it("rejects a malformed successful response before it can erase local state", async () => {
    globalThis.fetch = mock(async () =>
      Response.json({ success: "true" })
    ) as unknown as typeof fetch;
    await expect(requestJson("/api", schema)).rejects.toBeInstanceOf(ApiError);
  });
  it("preserves request cancellation", async () => {
    const controller = new AbortController();
    globalThis.fetch = mock(async (_url: unknown, init?: RequestInit) => {
      expect(init?.signal).toBe(controller.signal);
      throw new DOMException("Aborted", "AbortError");
    }) as unknown as typeof fetch;
    await expect(requestJson("/api", schema, { signal: controller.signal })).rejects.toMatchObject({
      name: "AbortError",
    });
  });
});
