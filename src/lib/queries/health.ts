import { queryOptions } from "@tanstack/react-query";

export interface HealthResponse {
  status: "ok" | string;
  timestamp: string;
}

/**
 * Resolves the base URL depending on whether the code runs on the server or in the browser.
 * On the client, returns an empty string so relative URLs like '/api/health' work seamlessly.
 * On the server, uses NEXT_PUBLIC_APP_URL, BETTER_AUTH_URL, or defaults to http://localhost:3000.
 */
export function getBaseUrl(): string {
  if (typeof window !== "undefined") {
    return "";
  }
  const url =
    process.env.NEXT_PUBLIC_APP_URL || process.env.BETTER_AUTH_URL || "http://localhost:3000";
  return url.replace(/\/$/, "");
}

export async function fetchHealth(): Promise<HealthResponse> {
  const baseUrl = getBaseUrl();
  const url = baseUrl ? `${baseUrl}/api/health` : "/api/health";
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Sağlık kontrolü başarısız oldu: HTTP ${response.status}`);
  }
  return response.json();
}

export const healthQueryOptions = queryOptions({
  queryKey: ["health"],
  queryFn: fetchHealth,
});
