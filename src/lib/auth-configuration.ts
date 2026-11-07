type Environment = Record<string, string | undefined>;
const DEVELOPMENT_SECRET = "development-secret-must-be-at-least-32-characters-long";
const BUILD_SECRET = "build-only-placeholder-never-use-for-sessions";

/** Trust deployment configuration, never a caller's Host or forwarded headers. */
export function configuredAppOrigin(env: Environment = process.env): string {
  const value = env.BETTER_AUTH_URL || env.NEXT_PUBLIC_APP_URL;
  if (!value && env.NODE_ENV === "production") {
    throw new Error("Production requires BETTER_AUTH_URL.");
  }
  const url = new URL(value || "http://localhost:3000");
  if (
    !["http:", "https:"].includes(url.protocol) ||
    url.username ||
    url.password ||
    url.pathname !== "/" ||
    url.search ||
    url.hash ||
    (env.NODE_ENV === "production" && url.protocol !== "https:")
  )
    throw new Error("Configure an application origin without a path or credentials.");
  if (
    env.BETTER_AUTH_URL &&
    env.NEXT_PUBLIC_APP_URL &&
    new URL(env.NEXT_PUBLIC_APP_URL).origin !== url.origin
  ) {
    throw new Error("BETTER_AUTH_URL and NEXT_PUBLIC_APP_URL must match.");
  }
  return url.origin;
}

export function authConfiguration(env: Environment = process.env) {
  const secret = env.BETTER_AUTH_SECRET;
  if (
    env.NODE_ENV === "production" &&
    (!secret || secret.length < 32 || secret === DEVELOPMENT_SECRET || secret === BUILD_SECRET)
  ) {
    throw new Error("Production requires a unique BETTER_AUTH_SECRET of at least 32 characters.");
  }
  const origin = configuredAppOrigin(env);
  return { baseURL: origin, trustedOrigins: [origin], secret: secret || DEVELOPMENT_SECRET };
}
