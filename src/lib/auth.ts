import { betterAuth } from "better-auth";
import { Database } from "bun:sqlite";

export const auth = betterAuth({
  database: new Database(process.env.DATABASE_URL || "auth.sqlite"),
  secret:
    process.env.BETTER_AUTH_SECRET || "development-secret-must-be-at-least-32-characters-long",
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  emailAndPassword: {
    enabled: true,
  },
});
