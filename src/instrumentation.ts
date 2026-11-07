/** Complete schema initialization before Better Auth accepts the first request. */
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { authConfiguration } = await import("@/lib/auth-configuration");
    authConfiguration();
    const { ensureDatabaseSchema } = await import("@/lib/database-schema");
    const { ensureEditorSchema } = await import("@/lib/editor/schema");
    await ensureDatabaseSchema();
    await ensureEditorSchema();
  }
}
