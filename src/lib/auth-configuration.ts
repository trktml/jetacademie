type Environment = Record<string, string | undefined>;
const DEVELOPMENT_SECRET = "development-secret-must-be-at-least-32-characters-long";
const BUILD_SECRET = "build-only-placeholder-never-use-for-sessions";

function parseAppOrigin(value: string, production: boolean): string {
  const url = new URL(value);
  if (
    !["http:", "https:"].includes(url.protocol) ||
    url.hostname.includes("*") ||
    url.username ||
    url.password ||
    url.pathname !== "/" ||
    url.search ||
    url.hash ||
    (production && url.protocol !== "https:")
  )
    throw new Error("Configure an exact application origin without a path or credentials.");
  return url.origin;
}

/** Trust deployment configuration, never a caller's Host or forwarded headers. */
export function configuredAppOrigin(env: Environment = process.env): string {
  const value = env.BETTER_AUTH_URL || env.NEXT_PUBLIC_APP_URL;
  const production = env.NODE_ENV === "production";
  if (!value && production) {
    throw new Error("Production requires BETTER_AUTH_URL.");
  }
  const origin = parseAppOrigin(value || "http://localhost:3000", production);
  if (
    env.BETTER_AUTH_URL &&
    env.NEXT_PUBLIC_APP_URL &&
    parseAppOrigin(env.NEXT_PUBLIC_APP_URL, production) !== origin
  ) {
    throw new Error("BETTER_AUTH_URL and NEXT_PUBLIC_APP_URL must match.");
  }
  return origin;
}

export function configuredAppOrigins(env: Environment = process.env): [string, ...string[]] {
  const primary = configuredAppOrigin(env);
  const aliases = (env.AUTH_TRUSTED_ORIGINS ?? "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean)
    .map((value) => parseAppOrigin(value, env.NODE_ENV === "production"));
  return [primary, ...new Set(aliases.filter((origin) => origin !== primary))];
}

export function authConfiguration(env: Environment = process.env) {
  const secret = env.BETTER_AUTH_SECRET;
  if (
    env.NODE_ENV === "production" &&
    (!secret || secret.length < 32 || secret === DEVELOPMENT_SECRET || secret === BUILD_SECRET)
  ) {
    throw new Error("Production requires a unique BETTER_AUTH_SECRET of at least 32 characters.");
  }
  const trustedOrigins = configuredAppOrigins(env);
  return {
    baseURL: trustedOrigins[0],
    trustedOrigins,
    secret: secret || DEVELOPMENT_SECRET,
  };
}
