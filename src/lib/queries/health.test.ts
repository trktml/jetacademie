import { describe, expect, it, mock } from "bun:test";
import { fetchHealth, getBaseUrl, healthQueryOptions } from "./health";
import { makeQueryClient } from "@/lib/query-client";

describe("health queries", () => {
  describe("getBaseUrl", () => {
    it("should return empty string in browser environment", () => {
      (globalThis as unknown as { window?: unknown }).window = {} as unknown as Window &
        typeof globalThis;
      try {
        expect(getBaseUrl()).toBe("");
      } finally {
        delete (globalThis as unknown as { window?: unknown }).window;
      }
    });

    it("should return default localhost on server environment when env vars are missing", () => {
      const origAppUrl = process.env.NEXT_PUBLIC_APP_URL;
      const origAuthUrl = process.env.BETTER_AUTH_URL;
      delete process.env.NEXT_PUBLIC_APP_URL;
      delete process.env.BETTER_AUTH_URL;

      try {
        expect(getBaseUrl()).toBe("http://localhost:3000");
      } finally {
        process.env.NEXT_PUBLIC_APP_URL = origAppUrl;
        process.env.BETTER_AUTH_URL = origAuthUrl;
      }
    });

    it("should strip trailing slash from base URL", () => {
      const origAppUrl = process.env.NEXT_PUBLIC_APP_URL;
      process.env.NEXT_PUBLIC_APP_URL = "https://example.com/";

      try {
        expect(getBaseUrl()).toBe("https://example.com");
      } finally {
        process.env.NEXT_PUBLIC_APP_URL = origAppUrl;
      }
    });
  });

  describe("fetchHealth", () => {
    it("should fetch health status successfully on server with absolute URL", async () => {
      const mockData = { status: "ok", timestamp: "2026-09-11T20:00:00.000Z" };
      const originalFetch = globalThis.fetch;

      globalThis.fetch = mock(async () => {
        return new Response(JSON.stringify(mockData), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }) as unknown as typeof fetch;

      try {
        const data = await fetchHealth();
        expect(data).toEqual(mockData);
        expect(globalThis.fetch).toHaveBeenCalledWith(`${getBaseUrl()}/api/health`);
      } finally {
        globalThis.fetch = originalFetch;
      }
    });

    it("should fetch health status with relative URL when window is defined", async () => {
      const mockData = { status: "ok", timestamp: "2026-09-11T20:30:00.000Z" };
      const originalFetch = globalThis.fetch;

      (globalThis as unknown as { window?: unknown }).window = {} as unknown as Window &
        typeof globalThis;
      globalThis.fetch = mock(async () => {
        return new Response(JSON.stringify(mockData), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }) as unknown as typeof fetch;

      try {
        const data = await fetchHealth();
        expect(data).toEqual(mockData);
        expect(globalThis.fetch).toHaveBeenCalledWith("/api/health");
      } finally {
        delete (globalThis as unknown as { window?: unknown }).window;
        globalThis.fetch = originalFetch;
      }
    });

    it("should throw error when health check API returns non-200 status", async () => {
      const originalFetch = globalThis.fetch;

      globalThis.fetch = mock(async () => {
        return new Response("Internal Server Error", {
          status: 500,
          headers: { "Content-Type": "text/plain" },
        });
      }) as unknown as typeof fetch;

      try {
        await expect(fetchHealth()).rejects.toThrow("Sağlık kontrolü başarısız oldu: HTTP 500");
      } finally {
        globalThis.fetch = originalFetch;
      }
    });

    it("should integrate seamlessly with QueryClient using healthQueryOptions", async () => {
      const mockData = { status: "ok", timestamp: "2026-09-11T21:00:00.000Z" };
      const originalFetch = globalThis.fetch;

      globalThis.fetch = mock(async () => {
        return new Response(JSON.stringify(mockData), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }) as unknown as typeof fetch;

      try {
        const queryClient = makeQueryClient();
        expect([...healthQueryOptions.queryKey]).toEqual(["health"]);

        const result = await queryClient.fetchQuery(healthQueryOptions);
        expect(result).toEqual(mockData);

        // Verify cached in client
        const cached = queryClient.getQueryData(["health"]);
        expect(cached).toEqual(mockData);
      } finally {
        globalThis.fetch = originalFetch;
      }
    });
  });
});
