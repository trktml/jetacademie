import { beforeEach, describe, expect, it, mock } from "bun:test";

let mockUser: { id: string; email: string; name: string } | null = null;
let actionHeaders = new Headers();

mock.module("next/headers", () => ({
  headers: async () => actionHeaders,
}));

mock.module("next/cache", () => ({
  revalidatePath: mock(() => {}),
}));

mock.module("@/lib/auth", () => ({
  getAuth: () => ({
    api: {
      getSession: async () => (mockUser ? { user: mockUser } : null),
    },
  }),
}));

let completedStore = new Set<string>();
mock.module("@/lib/curriculum-progress", () => ({
  getCompletedEntryIds: () => Array.from(completedStore),
  saveCompletedEntry: (_userId: string, entryId: string) => {
    completedStore.add(entryId);
  },
  removeCompletedEntry: (_userId: string, entryId: string) => {
    completedStore.delete(entryId);
  },
}));

import { markEntryAsRead, unmarkEntryAsRead } from "./actions";
import { migrateGuestProgress } from "./migrate-guest-progress";
import { execute, query } from "@/lib/db";
import { ensureDatabaseSchema } from "@/lib/database-schema";

describe("mufredat server actions", () => {
  beforeEach(() => {
    mockUser = { id: "user_test_1", email: "test@example.com", name: "Test" };
    completedStore = new Set<string>();
    actionHeaders = new Headers({ Origin: "http://localhost:3000" });
  });

  it("imports guest progress only into the account that initiated the transfer", async () => {
    await ensureDatabaseSchema();
    const userId = mockUser!.id;
    const entryId = "g1-esma-eylul-1";
    await execute('INSERT INTO "user" ("id", "name", "email") VALUES ($1, $2, $3)', [
      userId,
      mockUser!.name,
      mockUser!.email,
    ]);
    const progress = () =>
      query('SELECT "entryId" FROM "curriculum_progress" WHERE "userId" = $1', [userId]);
    try {
      expect(await migrateGuestProgress("", [entryId])).toEqual({
        ok: false,
        error: "Geçersiz ilerleme verisi.",
      });
      expect(await migrateGuestProgress("previous-account", [entryId])).toEqual({
        ok: false,
        error: "Oturum değişti. İşlemi yeniden deneyin.",
      });
      expect(await progress()).toEqual([]);
      expect(await migrateGuestProgress(userId, [entryId])).toEqual({
        ok: true,
        value: { migratedCount: 1, userId },
      });
      expect(await progress()).toEqual([{ entryId }]);
    } finally {
      await execute('DELETE FROM "user" WHERE "id" = $1', [userId]);
    }
  });

  describe("markEntryAsRead", () => {
    it("rejects missing and forged origins before writing user progress", async () => {
      for (const headers of [
        new Headers(),
        new Headers({ Origin: "https://attacker.example", "X-Forwarded-Host": "attacker.example" }),
      ]) {
        actionHeaders = headers;
        expect(await markEntryAsRead("g1-esma-eylul-1")).toEqual({
          ok: false,
          error: "İstek reddedildi.",
        });
      }
      expect(completedStore.size).toBe(0);
    });
    it("rejects a queued operation after the active account changes", async () => {
      const result = await markEntryAsRead("g1-esma-eylul-1", "previous-user");
      expect(result).toEqual({ ok: false, error: "Oturum değişti. İşlemi yeniden deneyin." });
      expect(completedStore.size).toBe(0);
    });
    it("fails when user is not authenticated", async () => {
      mockUser = null;
      expect(await markEntryAsRead("esma-eylul-1")).toEqual({
        ok: false,
        error: "İlerlemenizi kaydetmek için giriş yapın.",
      });
    });

    it("fails when entry ID is invalid or empty", async () => {
      expect(await markEntryAsRead("")).toEqual({ ok: false, error: "Geçersiz dosya." });
    });

    it("fails when entry is not found", async () => {
      expect(await markEntryAsRead("invalid-category-entry-999")).toEqual({
        ok: false,
        error: "Dosya bulunamadı.",
      });
    });

    it("fails when trying to complete out of order", async () => {
      // Trying to complete week 2 before week 1
      expect(await markEntryAsRead("g1-esma-eylul-2")).toEqual({
        ok: false,
        error: "Önce mevcut dersi tamamlayın.",
      });
    });

    it("successfully marks the first entry as read", async () => {
      const res = await markEntryAsRead("g1-esma-eylul-1");
      expect(res).toEqual({
        ok: true,
        value: { entryId: "g1-esma-eylul-1", userId: "user_test_1" },
      });
      expect(completedStore.has("g1-esma-eylul-1")).toBe(true);
    });

    it("returns the grade-scoped ID when given a legacy grade-one ID", async () => {
      const res = await markEntryAsRead("esma-eylul-1");
      expect(res).toEqual({
        ok: true,
        value: { entryId: "g1-esma-eylul-1", userId: "user_test_1" },
      });
      expect(completedStore.has("g1-esma-eylul-1")).toBe(true);
    });
  });

  describe("unmarkEntryAsRead", () => {
    it("fails when user is not authenticated", async () => {
      mockUser = null;
      expect(await unmarkEntryAsRead("g1-esma-eylul-1")).toEqual({
        ok: false,
        error: "İlerlemenizi güncellemek için giriş yapın.",
      });
    });

    it("fails when entry ID is invalid", async () => {
      expect(await unmarkEntryAsRead("")).toEqual({ ok: false, error: "Geçersiz dosya." });
    });

    it("fails when entry is not found", async () => {
      expect(await unmarkEntryAsRead("invalid-entry-xyz")).toEqual({
        ok: false,
        error: "Dosya bulunamadı.",
      });
    });

    it("fails when entry is not completed", async () => {
      expect(await unmarkEntryAsRead("esma-eylul-1")).toEqual({
        ok: false,
        error: "Yalnızca en son tamamlanan dosya geri alınabilir.",
      });
    });

    it("fails when trying to unmark an earlier entry while a later entry is completed", async () => {
      completedStore.add("g1-esma-eylul-1");
      completedStore.add("g1-esma-eylul-2");

      // Cannot unmark week 1 because week 2 is also completed
      expect(await unmarkEntryAsRead("g1-esma-eylul-1")).toEqual({
        ok: false,
        error: "Yalnızca en son tamamlanan dosya geri alınabilir.",
      });
    });

    it("successfully unmarks the latest completed entry", async () => {
      completedStore.add("g1-esma-eylul-1");
      completedStore.add("g1-esma-eylul-2");

      const res = await unmarkEntryAsRead("g1-esma-eylul-2");
      expect(res).toEqual({
        ok: true,
        value: { entryId: "g1-esma-eylul-2", userId: "user_test_1" },
      });
      expect(completedStore.has("g1-esma-eylul-2")).toBe(false);
      expect(completedStore.has("g1-esma-eylul-1")).toBe(true);

      // Now week 1 can be unmarked
      const res2 = await unmarkEntryAsRead("g1-esma-eylul-1");
      expect(res2).toEqual({
        ok: true,
        value: { entryId: "g1-esma-eylul-1", userId: "user_test_1" },
      });
      expect(completedStore.has("g1-esma-eylul-1")).toBe(false);
    });
  });
});
