import { describe, expect, it } from "bun:test";
import { makeQueryClient, getQueryClient, resetBrowserQueryClient } from "./query-client";
import { QueryClient } from "@tanstack/react-query";

describe("query-client", () => {
  describe("makeQueryClient", () => {
    it("should instantiate a valid QueryClient with customized defaults", () => {
      const client = makeQueryClient();
      expect(client).toBeInstanceOf(QueryClient);

      const defaultOptions = client.getDefaultOptions();
      expect(defaultOptions.queries?.staleTime).toBe(60 * 1000);
      expect(defaultOptions.queries?.gcTime).toBe(5 * 60 * 1000);
      expect(defaultOptions.queries?.retry).toBe(1);
      expect(defaultOptions.queries?.refetchOnWindowFocus).toBe(false);
    });

    it("should configure shouldDehydrateQuery to include success and pending queries", () => {
      const client = makeQueryClient();
      const shouldDehydrate = client.getDefaultOptions().dehydrate?.shouldDehydrateQuery;
      expect(shouldDehydrate).toBeDefined();

      if (shouldDehydrate) {
        // @ts-expect-error partial mock of Query object
        expect(shouldDehydrate({ state: { status: "success" } })).toBe(true);
        // @ts-expect-error partial mock of Query object
        expect(shouldDehydrate({ state: { status: "pending" } })).toBe(true);
        // @ts-expect-error partial mock of Query object
        expect(shouldDehydrate({ state: { status: "error" } })).toBe(false);
      }
    });

    it("should cache and retrieve query data", async () => {
      const client = makeQueryClient();
      const testData = { message: "query-data-cached" };

      await client.prefetchQuery({
        queryKey: ["test-query"],
        queryFn: async () => testData,
      });

      const cached = client.getQueryData(["test-query"]);
      expect(cached).toEqual(testData);
    });

    it("should allow query invalidation", async () => {
      const client = makeQueryClient();
      await client.prefetchQuery({
        queryKey: ["test-invalidation"],
        queryFn: async () => "initial",
      });

      const stateBefore = client.getQueryState(["test-invalidation"]);
      expect(stateBefore?.isInvalidated).toBe(false);

      await client.invalidateQueries({ queryKey: ["test-invalidation"] });

      const stateAfter = client.getQueryState(["test-invalidation"]);
      expect(stateAfter?.isInvalidated).toBe(true);
    });
  });

  describe("getQueryClient", () => {
    it("should return a QueryClient instance", () => {
      const client = getQueryClient();
      expect(client).toBeInstanceOf(QueryClient);
    });

    it("should return fresh instances on server environment", () => {
      // In bun runtime (node/server-like), typeof window is "undefined"
      const clientA = getQueryClient();
      const clientB = getQueryClient();
      expect(clientA).not.toBe(clientB);
    });

    it("should return singleton instance in browser environment and allow reset", () => {
      resetBrowserQueryClient();

      // Simulate browser environment
      (globalThis as unknown as { window?: unknown }).window = {} as unknown as Window &
        typeof globalThis;

      try {
        const browserA = getQueryClient();
        const browserB = getQueryClient();
        expect(browserA).toBe(browserB);

        // Reset singleton
        resetBrowserQueryClient();
        const browserC = getQueryClient();
        expect(browserC).not.toBe(browserA);
      } finally {
        delete (globalThis as unknown as { window?: unknown }).window;
        resetBrowserQueryClient();
      }
    });
  });
});
