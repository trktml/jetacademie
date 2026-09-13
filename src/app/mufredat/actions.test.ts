import { beforeEach, describe, expect, it, mock } from "bun:test";

let mockUser: { id: string; email: string; name: string } | null = null;

mock.module("next/headers", () => ({
  headers: async () => new Headers(),
}));

mock.module("next/cache", () => ({
  revalidatePath: mock(() => {}),
}));

mock.module("@/lib/auth", () => ({
  auth: {
    api: {
      getSession: async () => (mockUser ? { user: mockUser } : null),
    },
  },
  db: {
    query: () => ({
      all: () => [],
      run: () => {},
      get: () => null,
    }),
  },
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

describe("mufredat server actions", () => {
  beforeEach(() => {
    mockUser = { id: "user_test_1", email: "test@example.com", name: "Test" };
    completedStore = new Set<string>();
  });

  describe("markEntryAsRead", () => {
    it("fails when user is not authenticated", async () => {
      mockUser = null;
      expect(markEntryAsRead("hadis-eylul-1")).rejects.toThrow(
        "İlerlemenizi kaydetmek için giriş yapın."
      );
    });

    it("fails when entry ID is invalid or empty", async () => {
      expect(markEntryAsRead("")).rejects.toThrow("Geçersiz dosya.");
    });

    it("fails when entry is not found", async () => {
      expect(markEntryAsRead("invalid-category-entry-999")).rejects.toThrow("Dosya bulunamadı.");
    });

    it("fails when trying to complete out of order", async () => {
      // Trying to complete week 2 before week 1
      expect(markEntryAsRead("hadis-eylul-2")).rejects.toThrow("Önce sıradaki dosyayı tamamlayın.");
    });

    it("successfully marks the first entry as read", async () => {
      const res = await markEntryAsRead("hadis-eylul-1");
      expect(res).toEqual({ entryId: "hadis-eylul-1" });
      expect(completedStore.has("hadis-eylul-1")).toBe(true);
    });
  });

  describe("unmarkEntryAsRead", () => {
    it("fails when user is not authenticated", async () => {
      mockUser = null;
      expect(unmarkEntryAsRead("hadis-eylul-1")).rejects.toThrow(
        "İlerlemenizi güncellemek için giriş yapın."
      );
    });

    it("fails when entry ID is invalid", async () => {
      expect(unmarkEntryAsRead("")).rejects.toThrow("Geçersiz dosya.");
    });

    it("fails when entry is not found", async () => {
      expect(unmarkEntryAsRead("invalid-entry-xyz")).rejects.toThrow("Dosya bulunamadı.");
    });

    it("fails when entry is not completed", async () => {
      expect(unmarkEntryAsRead("hadis-eylul-1")).rejects.toThrow(
        "Yalnızca en son tamamlanan dosya geri alınabilir."
      );
    });

    it("fails when trying to unmark an earlier entry while a later entry is completed", async () => {
      completedStore.add("hadis-eylul-1");
      completedStore.add("hadis-eylul-2");

      // Cannot unmark week 1 because week 2 is also completed
      expect(unmarkEntryAsRead("hadis-eylul-1")).rejects.toThrow(
        "Yalnızca en son tamamlanan dosya geri alınabilir."
      );
    });

    it("successfully unmarks the latest completed entry", async () => {
      completedStore.add("hadis-eylul-1");
      completedStore.add("hadis-eylul-2");

      const res = await unmarkEntryAsRead("hadis-eylul-2");
      expect(res).toEqual({ entryId: "hadis-eylul-2" });
      expect(completedStore.has("hadis-eylul-2")).toBe(false);
      expect(completedStore.has("hadis-eylul-1")).toBe(true);

      // Now week 1 can be unmarked
      const res2 = await unmarkEntryAsRead("hadis-eylul-1");
      expect(res2).toEqual({ entryId: "hadis-eylul-1" });
      expect(completedStore.has("hadis-eylul-1")).toBe(false);
    });
  });
});
