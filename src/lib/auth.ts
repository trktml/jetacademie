import { betterAuth } from "better-auth";
import { authConfiguration } from "@/lib/auth-configuration";
import { MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH } from "@/lib/validations/auth";
import { getPool, getSqlite } from "./db";

function createAuth() {
  const configuration = authConfiguration();
  const database = getPool() ?? getSqlite();
  if (!database) throw new Error("Missing database driver.");
  return betterAuth({
    database,
    ...configuration,
    // The public routes reserve their own shared budgets; proxy IP headers are not trusted.
    advanced: { ipAddress: { disableIpTracking: true } },
    session: { deferSessionRefresh: true },
    emailAndPassword: {
      enabled: true,
      minPasswordLength: MIN_PASSWORD_LENGTH,
      maxPasswordLength: MAX_PASSWORD_LENGTH,
    },
    user: {
      deleteUser: {
        enabled: true,
      },
    },
  });
}

let auth: ReturnType<typeof createAuth> | undefined;

export function getAuth() {
  return (auth ??= createAuth());
}
