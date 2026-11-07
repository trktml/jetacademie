import { configuredAppOrigins } from "@/lib/auth-configuration";

/** Reverse-proxy headers do not grant an origin permission to mutate state. */
export function hasTrustedRequestOrigin(request: Request): boolean {
  return hasTrustedOriginHeaders(request.headers);
}

export function hasTrustedOriginHeaders(headers: Pick<Headers, "get">): boolean {
  const origin = headers.get("origin");
  return (
    headers.get("sec-fetch-site") !== "cross-site" &&
    origin !== null &&
    configuredAppOrigins().includes(origin)
  );
}
