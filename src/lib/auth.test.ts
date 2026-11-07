import { beforeAll, describe, expect, it } from "bun:test";
import { getAuth } from "./auth";
import { getSqlite, resolveDatabaseUrl } from "./db";
import { ensureDatabaseSchema } from "./database-schema";
import { GET, POST } from "@/app/api/auth/[...all]/route";
import { GET as healthGET } from "@/app/api/health/route";

const db = getSqlite()!;
beforeAll(ensureDatabaseSchema);

describe("Better Auth Server Setup", () => {
  it("should have auth instance initialized with handler and api", () => {
    const auth = getAuth();
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
    const res = await getAuth().api.signUpEmail({
      body: {
        name: "Test User",
        email,
        password: "test-password-1234",
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
    await getAuth().api.signUpEmail({
      body: {
        name: "Sign In User",
        email,
        password: "test-password-1234",
      },
    });

    const signInRes = await getAuth().api.signInEmail({
      body: {
        email,
        password: "test-password-1234",
      },
    });

    expect(signInRes).toBeDefined();
    expect(signInRes.user.email).toBe(email);
    expect(signInRes.token).toBeDefined();
  });

  it("should reject sign in with invalid password", async () => {
    const email = `fail_${Date.now()}@example.com`;
    await getAuth().api.signUpEmail({
      body: {
        name: "Fail User",
        email,
        password: "test-password-1234",
      },
    });

    try {
      await getAuth().api.signInEmail({
        body: {
          email,
          password: "0000",
        },
      });
      expect(true).toBe(false); // Should not reach here
    } catch (err: unknown) {
      expect(err).toBeDefined();
    }
  });

  it("should expose session reads but block direct email registration", async () => {
    const getReq = new Request("http://localhost:3000/api/auth/get-session");
    const getRes = await GET(getReq);
    expect(getRes.status).toBe(200);

    const postReq = new Request("http://localhost:3000/api/auth/sign-up/email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Route User",
        email: "route@example.com",
        password: "test-password-1234",
      }),
    });
    const postRes = await POST(postReq);
    expect(postRes.status).toBe(404);
  });

  it("exposes only the public session shape and renews it only through a same-origin POST", async () => {
    const signup = await getAuth().api.signUpEmail({
      body: {
        name: "Session Test",
        email: "session-minimal@example.com",
        password: "test-password-1234",
      },
      asResponse: true,
    });
    const cookies = signup.headers
      .getSetCookie()
      .map((cookie) => cookie.split(";", 1)[0])
      .join("; ");
    const { token } = (await signup.json()) as { token: string };
    const expiresAt = new Date(Date.now() + 60_000).toISOString();
    db.query('UPDATE "session" SET "expiresAt" = ? WHERE "token" = ?').run(expiresAt, token);
    const url = "http://localhost:3000/api/auth/get-session";
    const response = await GET(new Request(url, { headers: { Cookie: cookies } }));
    expect(response.headers.get("Cache-Control")).toContain("no-store");
    const data = await response.json();
    expect(data).toEqual({
      user: { id: expect.any(String), name: "Session Test" },
      session: { expiresAt },
      needsRefresh: true,
    });
    expect(response.headers.getSetCookie()).toEqual([]);
    expect(
      (await POST(new Request(url, { method: "POST", headers: { Cookie: cookies } }))).status
    ).toBe(403);
    const refreshed = await POST(
      new Request(url, {
        method: "POST",
        headers: { Cookie: cookies, Origin: "http://localhost:3000" },
      })
    );
    expect(refreshed.status).toBe(200);
    expect(refreshed.headers.getSetCookie().length).toBeGreaterThan(0);
    const refreshedData = await refreshed.json();
    expect(refreshedData).toEqual({
      user: data.user,
      session: { expiresAt: expect.any(String) },
    });
    expect(Date.parse(refreshedData.session.expiresAt)).toBeGreaterThan(Date.parse(expiresAt));
  });

  it("should return ok status from the health check endpoint", async () => {
    const res = await healthGET();
    expect(res.status).toBe(200);
    const data = (await res.json()) as { status: string; timestamp: string };
    expect(data.status).toBe("ok");
    expect(data.timestamp).toBeDefined();
  });

  describe("resolveDatabaseUrl & test database isolation", () => {
    it("should default to :memory: in test mode when DATABASE_URL is unset", () => {
      expect(resolveDatabaseUrl(undefined, "test")).toBe(":memory:");
    });

    it("should safely redirect auth.sqlite to :memory: in test mode", () => {
      expect(resolveDatabaseUrl("auth.sqlite", "test")).toBe(":memory:");
    });

    it("should preserve custom sqlite path when explicitly provided in test mode", () => {
      expect(resolveDatabaseUrl("custom-test.sqlite", "test")).toBe("custom-test.sqlite");
    });

    it("should default to PostgreSQL URL in development mode when unset", () => {
      const expected =
        process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/jetacademie";
      expect(resolveDatabaseUrl(undefined, "development", undefined)).toBe(expected);
    });

    it("should reject production database URLs with default credentials", () => {
      expect(() =>
        resolveDatabaseUrl("postgres://postgres:postgres@localhost:5432/jetacademie", "production")
      ).toThrow();
      expect(() =>
        resolveDatabaseUrl(
          "postgres://jetacademie:change-me-in-production@db:5432/jetacademie",
          "production"
        )
      ).toThrow();
    });

    it("requires PostgreSQL in production and rejects local fallback storage", () => {
      expect(() => resolveDatabaseUrl("/app/data/auth.sqlite", "production", undefined)).toThrow();
      expect(
        resolveDatabaseUrl(
          "postgres://jet:strong-test-password@db:5432/jet",
          "production",
          undefined
        )
      ).toBe("postgres://jet:strong-test-password@db:5432/jet");
    });

    it("enables foreign keys on the in-memory SQLite driver", () => {
      expect(resolveDatabaseUrl()).toBe(":memory:");
      expect(db.query("PRAGMA foreign_keys").get()).toEqual({ foreign_keys: 1 });
    });
  });
});
