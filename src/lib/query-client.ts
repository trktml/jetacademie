import { defaultShouldDehydrateQuery, QueryClient } from "@tanstack/react-query";

export function makeQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, set staleTime > 0 to prevent immediate refetch on client hydration
        staleTime: 60 * 1000,
        // Cache retention time before unused data is garbage collected
        gcTime: 5 * 60 * 1000,
        retry: 1,
        refetchOnWindowFocus: false,
      },
      dehydrate: {
        // Dehydrate queries that succeed or are in pending state
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) || query.state.status === "pending",
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient(): QueryClient {
  if (typeof window === "undefined") {
    // Server: always create a fresh query client per request to avoid cross-request data leaks
    return makeQueryClient();
  }
  // Browser: keep a single instance across re-renders and React Suspense boundaries
  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }
  return browserQueryClient;
}

/**
 * Resets the browser query client singleton.
 * Useful in unit testing environments to ensure test isolation.
 */
export function resetBrowserQueryClient(): void {
  browserQueryClient = undefined;
}
