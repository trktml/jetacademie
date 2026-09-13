import { beforeEach, describe, expect, it } from "bun:test";
import { Database } from "bun:sqlite";
import {
  deleteUserAccount,
  getNextAvailableUsername,
  normalizeUsername,
  syntheticEmailToUsername,
  updateUserPassword,
  usernameToSyntheticEmail,
} from "./auth-anonymous";
import { db } from "./auth";
import { POST as registerPOST } from "@/app/api/auth/register-anonymous/route";
import { POST as signInPOST } from "@/app/api/auth/sign-in-anonymous/route";
import { POST as changePasswordPOST } from "@/app/api/account/change-password/route";
import { POST as deleteAccountPOST } from "@/app/api/account/delete/route";

describe("Anonymous Auth & Slot Assignment", () => {
  beforeEach(() => {
    // Clear test state before each test
    db.exec(`
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

    it("should assign user1 when database is empty", () => {
      const nextUsername = getNextAvailableUsername(db);
      expect(nextUsername).toBe("user1");
    });

    it("should perform gap-filling when middle accounts are deleted", () => {
      // In-memory test DB
      const testDb = new Database(":memory:");
      testDb.exec(`
        CREATE TABLE "user" (
          "id" text primary key,
          "name" text not null
        );
      `);

      expect(getNextAvailableUsername(testDb)).toBe("user1");

      testDb
        .query(
          `INSERT INTO "user" (id, name) VALUES ('1', 'user1'), ('2', 'user2'), ('3', 'user3')`
        )
        .run();
      expect(getNextAvailableUsername(testDb)).toBe("user4");

      // Delete user2 -> Gap filling must return user2
      testDb.query(`DELETE FROM "user" WHERE name = 'user2'`).run();
      expect(getNextAvailableUsername(testDb)).toBe("user2");

      // Delete user1 -> Gap filling must return user1
      testDb.query(`DELETE FROM "user" WHERE name = 'user1'`).run();
      expect(getNextAvailableUsername(testDb)).toBe("user1");

      testDb.close();
    });
  });

  describe("API Endpoints & Lifecycle", () => {
    it("should register anonymous user without asking for email or name", async () => {
      const req = new Request("http://localhost:3000/api/auth/register-anonymous", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: "password123" }),
      });

      const res = await registerPOST(req);
      expect(res.status).toBe(200);

      const data = (await res.json()) as { success: boolean; username: string };
      expect(data.success).toBe(true);
      expect(data.username).toBe("user1");
      expect(res.headers.get("set-cookie")).toContain("better-auth.session_token");
    });

    it("should sign in using username and password with case insensitivity", async () => {
      // Register user1
      const regReq = new Request("http://localhost:3000/api/auth/register-anonymous", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: "securepassword123" }),
      });
      await registerPOST(regReq);

      // Sign in with uppercase 'USER1'
      const signInReq = new Request("http://localhost:3000/api/auth/sign-in-anonymous", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: "USER1", password: "securepassword123" }),
      });

      const signInRes = await signInPOST(signInReq);
      expect(signInRes.status).toBe(200);

      const data = (await signInRes.json()) as { success: boolean; username: string };
      expect(data.success).toBe(true);
      expect(data.username).toBe("user1");
      expect(signInRes.headers.get("set-cookie")).toContain("better-auth.session_token");
    });

    it("should allow changing password directly without current password", async () => {
      // Register user
      const regReq = new Request("http://localhost:3000/api/auth/register-anonymous", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: "originalpassword" }),
      });
      const regRes = await registerPOST(regReq);
      const cookie = regRes.headers.get("set-cookie") || "";

      // Change password
      const changeReq = new Request("http://localhost:3000/api/account/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          cookie,
        },
        body: JSON.stringify({ newPassword: "newsecretpassword" }),
      });

      const changeRes = await changePasswordPOST(changeReq);
      expect(changeRes.status).toBe(200);
      const changeData = (await changeRes.json()) as { success: boolean };
      expect(changeData.success).toBe(true);

      // Verify sign in with new password works
      const signInReq = new Request("http://localhost:3000/api/auth/sign-in-anonymous", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: "user1", password: "newsecretpassword" }),
      });
      const signInRes = await signInPOST(signInReq);
      expect(signInRes.status).toBe(200);
    });

    it("should allow account deletion and immediately reuse the freed username slot", async () => {
      // 1. Register user1
      const reg1 = await registerPOST(
        new Request("http://localhost:3000/api/auth/register-anonymous", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password: "password1" }),
        })
      );
      const data1 = (await reg1.json()) as { username: string };
      expect(data1.username).toBe("user1");
      const cookie1 = reg1.headers.get("set-cookie") || "";

      // 2. Register user2
      const reg2 = await registerPOST(
        new Request("http://localhost:3000/api/auth/register-anonymous", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password: "password2" }),
        })
      );
      const data2 = (await reg2.json()) as { username: string };
      expect(data2.username).toBe("user2");

      // 3. user1 deletes account
      const delReq = new Request("http://localhost:3000/api/account/delete", {
        method: "POST",
        headers: { cookie: cookie1 },
      });
      const delRes = await deleteAccountPOST(delReq);
      expect(delRes.status).toBe(200);

      // 4. Register new user -> Gap filling MUST allocate user1 again!
      const reg3 = await registerPOST(
        new Request("http://localhost:3000/api/auth/register-anonymous", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password: "password3" }),
        })
      );
      const data3 = (await reg3.json()) as { username: string };
      expect(data3.username).toBe("user1");
    });

    it("should directly execute updateUserPassword and deleteUserAccount functions", async () => {
      const reg = await registerPOST(
        new Request("http://localhost:3000/api/auth/register-anonymous", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password: "oldPassword123" }),
        })
      );
      expect(reg.status).toBe(200);

      const user = db.query<{ id: string }, []>(`SELECT id FROM "user" WHERE name = 'user1'`).get();
      expect(user?.id).toBeDefined();

      if (user) {
        await updateUserPassword(user.id, "newDirectPassword123", db);
        deleteUserAccount(user.id, db);

        const remaining = db.query<{ count: number }, []>(`SELECT COUNT(*) as count FROM "user"`).get();
        expect(remaining?.count).toBe(0);
      }
    });
  });
});
