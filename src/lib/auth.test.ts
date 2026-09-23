import { describe, expect, it } from "bun:test";
import { activeDbPath, auth, db, dbPath, initializeDatabase, resolveDatabasePath } from "./auth";
import { GET, POST } from "@/app/api/auth/[...all]/route";
import { GET as healthGET } from "@/app/api/health/route";

describe("Better Auth Server Setup", () => {
  it("should have auth instance initialized with handler and api", () => {
    expect(auth).toBeDefined();
    expect(typeof auth.handler).toBe("function");
    expect(auth.api).toBeDefined();
    expect(auth.options).toBeDefined();
    expect(auth.options.emailAndPassword?.enabled).toBe(true);
  });

  it("should initialize user-scoped curriculum progress storage", () => {
    const table = db
      .query<{ name: string }, []>(
        `SELECT name FROM sqlite_schema WHERE type = 'table' AND name = 'curriculum_progress'`
      )
      .get();

    expect(table?.name).toBe("curriculum_progress");
  });

  it("should initialize curriculum entries storage", () => {
    const table = db
      .query<{ name: string }, []>(
        `SELECT name FROM sqlite_schema WHERE type = 'table' AND name = 'curriculum_entries'`
      )
      .get();

    expect(table?.name).toBe("curriculum_entries");
  });

  it("should successfully sign up a new user and persist in sqlite", async () => {
    const email = `user_${Date.now()}@example.com`;
    const res = await auth.api.signUpEmail({
      body: {
        name: "Test User",
        email,
        password: "securepassword123",
      },
    });

    expect(res).toBeDefined();
    expect(res.user).toBeDefined();
    expect(res.user.email).toBe(email);
    expect(res.user.name).toBe("Test User");
    expect(res.token).toBeDefined();
  });

  it("should successfully sign in an existing user", async () => {
    const email = `signin_${Date.now()}@example.com`;
    await auth.api.signUpEmail({
      body: {
        name: "Sign In User",
        email,
        password: "securepassword123",
      },
    });

    const signInRes = await auth.api.signInEmail({
      body: {
        email,
        password: "securepassword123",
      },
    });

    expect(signInRes).toBeDefined();
    expect(signInRes.user.email).toBe(email);
    expect(signInRes.token).toBeDefined();
  });

  it("should reject sign in with invalid password", async () => {
    const email = `fail_${Date.now()}@example.com`;
    await auth.api.signUpEmail({
      body: {
        name: "Fail User",
        email,
        password: "securepassword123",
      },
    });

    try {
      await auth.api.signInEmail({
        body: {
          email,
          password: "wrongpassword",
        },
      });
      expect(true).toBe(false); // Should not reach here
    } catch (err: unknown) {
      expect(err).toBeDefined();
    }
  });

  it("should handle GET and POST through the Next.js auth route handler", async () => {
    const getReq = new Request("http://localhost:3000/api/auth/get-session");
    const getRes = await GET(getReq);
    expect(getRes.status).toBe(200);

    const email = `route_${Date.now()}@example.com`;
    const postReq = new Request("http://localhost:3000/api/auth/sign-up/email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Route User",
        email,
        password: "securepassword123",
      }),
    });
    const postRes = await POST(postReq);
    expect(postRes.status).toBe(200);
    const postData = (await postRes.json()) as { user?: { email: string } };
    expect(postData.user?.email).toBe(email);
  });

  it("should return ok status from the health check endpoint", async () => {
    const res = await healthGET();
    expect(res.status).toBe(200);
    const data = (await res.json()) as { status: string; timestamp: string };
    expect(data.status).toBe("ok");
    expect(data.timestamp).toBeDefined();
  });

  describe("resolveDatabasePath & test database isolation", () => {
    it("should default to :memory: in test mode when DATABASE_URL is unset", () => {
      expect(resolveDatabasePath(undefined, "test")).toBe(":memory:");
    });

    it("should safely redirect auth.sqlite to :memory: in test mode", () => {
      expect(resolveDatabasePath("auth.sqlite", "test")).toBe(":memory:");
    });

    it("should preserve custom sqlite path when explicitly provided in test mode", () => {
      expect(resolveDatabasePath("custom-test.sqlite", "test")).toBe("custom-test.sqlite");
    });

    it("should default to PostgreSQL URL in development or production mode when unset", () => {
      const expected =
        process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/jetacademie";
      expect(resolveDatabasePath(undefined, "development", undefined)).toBe(expected);
      expect(resolveDatabasePath(undefined, "production", undefined)).toBe(expected);
    });

    it("should honor production DATABASE_URL", () => {
      expect(resolveDatabasePath("/app/data/auth.sqlite", "production", undefined)).toBe(
        "/app/data/auth.sqlite"
      );
    });

    it("should initialize test db with :memory:", () => {
      expect(dbPath).toBe(":memory:");
      expect(activeDbPath).toBe(":memory:");
    });

    it("should initialize Database and apply pragmas", () => {
      const result = initializeDatabase(":memory:");
      expect(result.db).toBeDefined();
      expect(result.activePath).toBe(":memory:");
      result.db.close();
    });

    it("should fallback to /tmp/auth.sqlite when primary path is invalid/unwritable", () => {
      // /proc/cannot-write-here/db.sqlite or /dev/null/invalid-dir/db.sqlite will fail
      const result = initializeDatabase("/proc/cannot-write-here/invalid.sqlite");
      expect(result.db).toBeDefined();
      expect(result.activePath).toBe("/tmp/auth.sqlite");
      result.db.close();
    });
  });
});
