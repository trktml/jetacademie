import { beforeEach, describe, expect, it } from "bun:test";
import { Database } from "bun:sqlite";
import { hashPassword } from "better-auth/crypto";
import {
  getNextAvailableUsername,
  normalizeUsername,
  syntheticEmailToUsername,
  usernameToSyntheticEmail,
} from "./auth-anonymous";
import { getSqlite } from "./db";
import { ensureDatabaseSchema } from "./database-schema";
import { POST as registerPOST } from "@/app/api/auth/register-anonymous/route";
import { POST as signInPOST } from "@/app/api/auth/sign-in-anonymous/route";
import { POST as changePasswordPOST } from "@/app/api/account/change-password/route";
import { POST as deleteAccountPOST } from "@/app/api/account/delete/route";
import { POST as nativeAuthPOST } from "@/app/api/auth/[...all]/route";

const db = getSqlite()!;

describe("Anonymous Auth & Slot Assignment", () => {
  beforeEach(async () => {
    await ensureDatabaseSchema();
    // Clear test state before each test
    db.exec(`
      DELETE FROM "auth_request_attempts";
      DELETE FROM "curriculum_progress";
      DELETE FROM "session";
      DELETE FROM "account";
      DELETE FROM "verification";
      DELETE FROM "user";
    `);
  });

  describe("Utility & Slot Helpers", () => {
    it("should normalize username correctly", () => {
      expect(normalizeUsername("  User1 ")).toBe("user1");
      expect(normalizeUsername("USER42")).toBe("user42");
    });

    it("should convert username to synthetic email and back", () => {
      const email = usernameToSyntheticEmail("user1");
      expect(email).toBe("user1@anon.jetacademie.local");
      expect(syntheticEmailToUsername(email)).toBe("user1");
    });

    it("should assign user1 when database is empty", async () => {
      const nextUsername = await getNextAvailableUsername(db);
      expect(nextUsername).toBe("user1");
    });

    it("should perform gap-filling when middle accounts are deleted", async () => {
      // In-memory test DB
      const testDb = new Database(":memory:");
      testDb.exec(`
        CREATE TABLE "user" (
          "id" text primary key,
          "name" text not null
        );
      `);

      expect(await getNextAvailableUsername(testDb)).toBe("user1");

      testDb
        .query(
          `INSERT INTO "user" (id, name) VALUES ('1', 'user1'), ('2', 'user2'), ('3', 'user3')`
        )
        .run();
      expect(await getNextAvailableUsername(testDb)).toBe("user4");

      // Delete user2 -> Gap filling must return user2
      testDb.query(`DELETE FROM "user" WHERE name = 'user2'`).run();
      expect(await getNextAvailableUsername(testDb)).toBe("user2");

      // Delete user1 -> Gap filling must return user1
      testDb.query(`DELETE FROM "user" WHERE name = 'user1'`).run();
      expect(await getNextAvailableUsername(testDb)).toBe("user1");

      testDb.close();
    });
  });

  describe("API Endpoints & Lifecycle", () => {
    it("allocates distinct usernames for simultaneous registrations", async () => {
      const results = await Promise.all(
        Array.from({ length: 4 }, () =>
          registerPOST(
            new Request("http://localhost:3000/api/auth/register-anonymous", {
              method: "POST",
              headers: { "Content-Type": "application/json", Origin: "http://localhost:3000" },
              body: JSON.stringify({ password: "concurrent-password-123" }),
            })
          )
        )
      );
      expect(results.every((response) => response.ok)).toBe(true);
      const users = await Promise.all(
        results.map((response) => response.json() as Promise<{ username: string }>)
      );
      expect(new Set(users.map((user) => user.username)).size).toBe(4);
    });

    it("limits nonexistent accounts without relying on forwarded IP headers", async () => {
      const attempt = (ip: string) =>
        signInPOST(
          new Request("http://localhost:3000/api/auth/sign-in-anonymous", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Origin: "http://localhost:3000",
              "X-Forwarded-For": ip,
            },
            body: JSON.stringify({ username: "user999999", password: "wrong" }),
          })
        );
      for (let i = 0; i < 5; i++) expect((await attempt(`192.0.2.${i}`)).status).toBe(401);
      expect((await attempt("192.0.2.99")).status).toBe(429);
    });

    it("keeps unrelated accounts available after a burst against one username", async () => {
      const origin = "http://localhost:3000";
      const password = "unrelated-account-password";
      const request = (path: string, body: object) =>
        new Request(`${origin}/api/auth/${path}`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Origin: origin },
          body: JSON.stringify(body),
        });
      const registration = await registerPOST(request("register-anonymous", { password }));
      expect(registration.status).toBe(200);
      const user = db
        .query<{ id: string; name: string }, []>('SELECT "id", "name" FROM "user"')
        .get()!;
      expect(await registration.json()).toEqual({
        success: true,
        username: user.name,
        userId: user.id,
      });
      for (let index = 0; index < 300; index++) {
        const denied = await signInPOST(
          request("sign-in-anonymous", { username: "user999999", password: "wrong" })
        );
        expect(denied.status).toBe(index < 5 ? 401 : 429);
      }
      const attempts = Array.from({ length: 16 }, () =>
        signInPOST(request("sign-in-anonymous", { username: "user999999", password: "wrong" }))
      );
      const [login, ...denied] = await Promise.all([
        signInPOST(request("sign-in-anonymous", { username: user.name, password })),
        ...attempts,
      ]);
      expect(denied.every((response) => [429, 503].includes(response.status))).toBe(true);
      expect(login.status).toBe(200);
      expect(await login.json()).toEqual({ success: true, username: user.name, userId: user.id });
    });

    it("clears only the assigned username's login attempts after registration", async () => {
      const signIn = (username: string, password: string) =>
        signInPOST(
          new Request("http://localhost:3000/api/auth/sign-in-anonymous", {
            method: "POST",
            headers: { "Content-Type": "application/json", Origin: "http://localhost:3000" },
            body: JSON.stringify({ username, password }),
          })
        );
      for (const username of ["user1", "user2"]) {
        for (let attempt = 0; attempt < 5; attempt++)
          expect((await signIn(username, "wrong")).status).toBe(401);
        expect((await signIn(username, "wrong")).status).toBe(429);
      }

      const registration = await registerPOST(
        new Request("http://localhost:3000/api/auth/register-anonymous", {
          method: "POST",
          headers: { "Content-Type": "application/json", Origin: "http://localhost:3000" },
          body: JSON.stringify({ password: "new-account-password-123" }),
        })
      );
      expect(registration.status).toBe(200);
      expect((await registration.json()).username).toBe("user1");
      expect((await signIn("user1", "new-account-password-123")).status).toBe(200);
      expect((await signIn("user2", "wrong")).status).toBe(429);
    });

    it("shares a reauthentication budget across password changes and account deletion", async () => {
      const registration = await registerPOST(
        new Request("http://localhost:3000/api/auth/register-anonymous", {
          method: "POST",
          headers: { "Content-Type": "application/json", Origin: "http://localhost:3000" },
          body: JSON.stringify({ password: "account-password-123" }),
        })
      );
      const headers = {
        "Content-Type": "application/json",
        Origin: "http://localhost:3000",
        Cookie: registration.headers.get("set-cookie")!,
      };
      for (let i = 0; i < 5; i++) {
        const response =
          i % 2 === 0
            ? await changePasswordPOST(
                new Request("http://localhost:3000/api/account/change-password", {
                  method: "POST",
                  headers,
                  body: JSON.stringify({
                    currentPassword: "wrong",
                    newPassword: "new-account-password-123",
                  }),
                })
              )
            : await deleteAccountPOST(
                new Request("http://localhost:3000/api/account/delete", {
                  method: "POST",
                  headers,
                  body: JSON.stringify({ password: "wrong" }),
                })
              );
        expect(response.status).toBe(400);
      }
      const limited = await deleteAccountPOST(
        new Request("http://localhost:3000/api/account/delete", {
          method: "POST",
          headers,
          body: JSON.stringify({ password: "account-password-123" }),
        })
      );
      expect(limited.status).toBe(429);
      expect(limited.headers.get("Retry-After")).toBe("900");
    });
    it("does not apply the new-password minimum to an existing credential", async () => {
      const headers = { "Content-Type": "application/json", Origin: "http://localhost:3000" };
      const registration = await registerPOST(
        new Request("http://localhost:3000/api/auth/register-anonymous", {
          method: "POST",
          headers,
          body: JSON.stringify({ password: "legacy-account-initial-password" }),
        })
      );
      expect(registration.status).toBe(200);
      db.query('UPDATE "account" SET "password" = ? WHERE "providerId" = ?').run(
        await hashPassword("123"),
        "credential"
      );
      const signedIn = await signInPOST(
        new Request("http://localhost:3000/api/auth/sign-in-anonymous", {
          method: "POST",
          headers,
          body: JSON.stringify({ username: "user1", password: "123" }),
        })
      );
      expect(signedIn.status).toBe(200);
      const weakRegistration = await registerPOST(
        new Request("http://localhost:3000/api/auth/register-anonymous", {
          method: "POST",
          headers,
          body: JSON.stringify({ password: "123" }),
        })
      );
      expect(weakRegistration.status).toBe(400);
    });

    it("should reject cross-origin account mutations and direct email registration", async () => {
      const foreignRequest = new Request("http://localhost:3000/api/auth/register-anonymous", {
        method: "POST",
        headers: { "Content-Type": "application/json", Origin: "https://evil.example" },
        body: JSON.stringify({ password: "test-password-1234" }),
      });
      expect((await registerPOST(foreignRequest)).status).toBe(403);

      const nativeRequest = new Request("http://localhost:3000/api/auth/sign-up/email", {
        method: "POST",
        headers: { "Content-Type": "application/json", Origin: "http://localhost:3000" },
        body: JSON.stringify({
          name: "Admin",
          email: "admin@example.com",
          password: "test-password-1234",
        }),
      });
      expect((await nativeAuthPOST(nativeRequest)).status).toBe(404);
    });

    it("accepts the configured origin behind a proxy and rejects spoofed forwarded origins", async () => {
      const headers = {
        "Content-Type": "application/json",
        Origin: "http://localhost:3000",
        Host: "localhost:3000",
        "X-Forwarded-Host": "evil.example",
        "X-Forwarded-Proto": "https",
        "Sec-Fetch-Site": "same-origin",
      };

      const response = await registerPOST(
        new Request("http://localhost:3000/api/auth/register-anonymous", {
          method: "POST",
          headers,
          body: JSON.stringify({ password: "test-password-1234" }),
        })
      );
      expect(response.status).toBe(200);
      expect(((await response.json()) as { username: string }).username).toBe("user1");

      const signInResponse = await signInPOST(
        new Request("http://localhost:3000/api/auth/sign-in-anonymous", {
          method: "POST",
          headers,
          body: JSON.stringify({ username: "user1", password: "test-password-1234" }),
        })
      );
      expect(signInResponse.status).toBe(200);

      const foreignResponse = await registerPOST(
        new Request("http://localhost:3000/api/auth/register-anonymous", {
          method: "POST",
          headers: {
            ...headers,
            Origin: "https://evil.example",
            "X-Forwarded-Host": "evil.example",
          },
          body: JSON.stringify({ password: "test-password-1234" }),
        })
      );
      expect(foreignResponse.status).toBe(403);
    });

    it("should register anonymous user without asking for email or name", async () => {
      const req = new Request("http://localhost:3000/api/auth/register-anonymous", {
        method: "POST",
        headers: { "Content-Type": "application/json", Origin: "http://localhost:3000" },
        body: JSON.stringify({ password: "test-password-1234" }),
      });

      const res = await registerPOST(req);
      expect(res.status).toBe(200);

      const data = (await res.json()) as { success: boolean; username: string };
      expect(data.success).toBe(true);
      expect(data.username).toBe("user1");
      expect(res.headers.get("set-cookie")).toContain("better-auth.session_token");
    });

    it("registers and signs in with four characters and a case-insensitive username", async () => {
      // Register user1
      const regReq = new Request("http://localhost:3000/api/auth/register-anonymous", {
        method: "POST",
        headers: { "Content-Type": "application/json", Origin: "http://localhost:3000" },
        body: JSON.stringify({ password: "1234" }),
      });
      expect((await registerPOST(regReq)).status).toBe(200);

      // Sign in with uppercase 'USER1'
      const signInReq = new Request("http://localhost:3000/api/auth/sign-in-anonymous", {
        method: "POST",
        headers: { "Content-Type": "application/json", Origin: "http://localhost:3000" },
        body: JSON.stringify({ username: "USER1", password: "1234" }),
      });

      const signInRes = await signInPOST(signInReq);
      expect(signInRes.status).toBe(200);

      const data = (await signInRes.json()) as { success: boolean; username: string };
      expect(data.success).toBe(true);
      expect(data.username).toBe("user1");
      expect(signInRes.headers.get("set-cookie")).toContain("better-auth.session_token");
    });

    it("should register and sign in with a longer nonnumeric password", async () => {
      const registration = await registerPOST(
        new Request("http://localhost:3000/api/auth/register-anonymous", {
          method: "POST",
          headers: { "Content-Type": "application/json", Origin: "http://localhost:3000" },
          body: JSON.stringify({ password: "long-password-123" }),
        })
      );
      expect(registration.status).toBe(200);

      const response = await signInPOST(
        new Request("http://localhost:3000/api/auth/sign-in-anonymous", {
          method: "POST",
          headers: { "Content-Type": "application/json", Origin: "http://localhost:3000" },
          body: JSON.stringify({ username: "user1", password: "long-password-123" }),
        })
      );
      expect(response.status).toBe(200);
    });

    it("should lock an account after five attempts and reset after the window", async () => {
      await registerPOST(
        new Request("http://localhost:3000/api/auth/register-anonymous", {
          method: "POST",
          headers: { "Content-Type": "application/json", Origin: "http://localhost:3000" },
          body: JSON.stringify({ password: "test-password-1234" }),
        })
      );
      const signIn = (password: string) =>
        signInPOST(
          new Request("http://localhost:3000/api/auth/sign-in-anonymous", {
            method: "POST",
            headers: { "Content-Type": "application/json", Origin: "http://localhost:3000" },
            body: JSON.stringify({ username: "user1", password }),
          })
        );

      for (let attempt = 0; attempt < 5; attempt++) {
        expect((await signIn("9999")).status).toBe(401);
      }
      expect((await signIn("test-password-1234")).status).toBe(429);

      db.query(`UPDATE "auth_request_attempts" SET "startedAt" = ?`).run(
        Date.now() - 16 * 60 * 1000
      );
      expect((await signIn("test-password-1234")).status).toBe(200);
      const remaining = db
        .query<{ count: number }, []>(
          `SELECT COUNT(*) as count FROM "auth_request_attempts" WHERE "attempts" > 1`
        )
        .get();
      expect(remaining?.count).toBe(0);
    });

    it("should require the current password and revoke other sessions", async () => {
      // Register user
      const regReq = new Request("http://localhost:3000/api/auth/register-anonymous", {
        method: "POST",
        headers: { "Content-Type": "application/json", Origin: "http://localhost:3000" },
        body: JSON.stringify({ password: "test-password-2468" }),
      });
      const regRes = await registerPOST(regReq);
      const cookie = regRes.headers.get("set-cookie") || "";

      // Change password
      const changeReq = new Request("http://localhost:3000/api/account/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Origin: "http://localhost:3000",
          cookie,
        },
        body: JSON.stringify({
          currentPassword: "9999",
          newPassword: "test-password-1357",
        }),
      });

      const rejectedChange = await changePasswordPOST(changeReq);
      expect(rejectedChange.status).toBe(400);

      const changeRes = await changePasswordPOST(
        new Request("http://localhost:3000/api/account/change-password", {
          method: "POST",
          headers: { "Content-Type": "application/json", Origin: "http://localhost:3000", cookie },
          body: JSON.stringify({
            currentPassword: "test-password-2468",
            newPassword: "1357",
          }),
        })
      );
      expect(changeRes.status).toBe(200);
      expect(changeRes.headers.get("set-cookie")).toContain("better-auth.session_token");
      const changeData = (await changeRes.json()) as { success: boolean };
      expect(changeData.success).toBe(true);

      // Verify sign in with new password works
      const signInReq = new Request("http://localhost:3000/api/auth/sign-in-anonymous", {
        method: "POST",
        headers: { "Content-Type": "application/json", Origin: "http://localhost:3000" },
        body: JSON.stringify({ username: "user1", password: "1357" }),
      });
      const signInRes = await signInPOST(signInReq);
      expect(signInRes.status).toBe(200);
    });

    it("should allow account deletion and immediately reuse the freed username slot", async () => {
      // 1. Register user1
      const reg1 = await registerPOST(
        new Request("http://localhost:3000/api/auth/register-anonymous", {
          method: "POST",
          headers: { "Content-Type": "application/json", Origin: "http://localhost:3000" },
          body: JSON.stringify({ password: "test-password-1234" }),
        })
      );
      const data1 = (await reg1.json()) as { username: string };
      expect(data1.username).toBe("user1");
      const cookie1 = reg1.headers.get("set-cookie") || "";

      // 2. Register user2
      const reg2 = await registerPOST(
        new Request("http://localhost:3000/api/auth/register-anonymous", {
          method: "POST",
          headers: { "Content-Type": "application/json", Origin: "http://localhost:3000" },
          body: JSON.stringify({ password: "test-password-2345" }),
        })
      );
      const data2 = (await reg2.json()) as { username: string };
      expect(data2.username).toBe("user2");

      // The deleted owner's login lock must not carry over to the next owner of user1.
      for (let attempt = 0; attempt < 5; attempt++) {
        const failedSignIn = await signInPOST(
          new Request("http://localhost:3000/api/auth/sign-in-anonymous", {
            method: "POST",
            headers: { "Content-Type": "application/json", Origin: "http://localhost:3000" },
            body: JSON.stringify({ username: "user1", password: "wrong" }),
          })
        );
        expect(failedSignIn.status).toBe(401);
      }

      // 3. user1 deletes account
      const delReq = new Request("http://localhost:3000/api/account/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Origin: "http://localhost:3000",
          cookie: cookie1,
        },
        body: JSON.stringify({ password: "9999" }),
      });
      expect((await deleteAccountPOST(delReq)).status).toBe(400);
      const validDelReq = new Request("http://localhost:3000/api/account/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Origin: "http://localhost:3000",
          cookie: cookie1,
        },
        body: JSON.stringify({ password: "test-password-1234" }),
      });
      const delRes = await deleteAccountPOST(validDelReq);
      expect(delRes.status).toBe(200);

      // 4. Register new user -> Gap filling MUST allocate user1 again!
      const reg3 = await registerPOST(
        new Request("http://localhost:3000/api/auth/register-anonymous", {
          method: "POST",
          headers: { "Content-Type": "application/json", Origin: "http://localhost:3000" },
          body: JSON.stringify({ password: "test-password-3456" }),
        })
      );
      const data3 = (await reg3.json()) as { username: string };
      expect(data3.username).toBe("user1");
      const newOwnerSignIn = await signInPOST(
        new Request("http://localhost:3000/api/auth/sign-in-anonymous", {
          method: "POST",
          headers: { "Content-Type": "application/json", Origin: "http://localhost:3000" },
          body: JSON.stringify({ username: "user1", password: "test-password-3456" }),
        })
      );
      expect(newOwnerSignIn.status).toBe(200);
    });
  });
});
