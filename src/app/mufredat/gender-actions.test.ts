import { beforeEach, describe, expect, it, mock } from "bun:test";

let mockUser: { id: string; email: string; name: string } | null = null;
let userPreferences: Record<string, string> = {};

mock.module("next/headers", () => ({
  headers: async () => new Headers({ Origin: "http://localhost:3000" }),
}));

mock.module("next/cache", () => ({
  revalidatePath: mock(() => {}),
}));

mock.module("@/lib/user-preferences", () => ({
  getUserGenderFromDb: (userId: string) => userPreferences[userId] ?? null,
  setUserGenderInDb: (userId: string, gender: string) => {
    userPreferences[userId] = gender;
  },
}));

mock.module("@/lib/auth", () => ({
  getAuth: () => ({
    api: {
      getSession: async () => (mockUser ? { user: mockUser } : null),
    },
  }),
}));

import { getUserGender, updateUserGender } from "./gender-actions";

describe("gender server actions", () => {
  beforeEach(() => {
    mockUser = { id: "user_test_1", email: "test@example.com", name: "Test" };
    userPreferences = {};
  });

  describe("updateUserGender", () => {
    it("does not update a different account after a session change", async () => {
      expect(await updateUserGender("bayan", "previous-user")).toEqual({
        ok: false,
        error: "Oturum değişti. İşlemi yeniden deneyin.",
      });
      expect(userPreferences).toEqual({});
    });
    it("fails when user is not authenticated", async () => {
      mockUser = null;
      expect(await updateUserGender("erkek")).toEqual({
        ok: false,
        error: "Tercihinizi kaydetmek için giriş yapın.",
      });
    });

    it("fails when gender is invalid", async () => {
      // @ts-expect-error - testing invalid input
      expect(await updateUserGender("invalid")).toEqual({
        ok: false,
        error: "Geçersiz cinsiyet tercihi.",
      });
    });

    it("successfully sets gender to erkek", async () => {
      const result = await updateUserGender("erkek");
      expect(result).toEqual({
        ok: true,
        value: { success: true, gender: "erkek", userId: "user_test_1" },
      });
      expect(userPreferences["user_test_1"]).toBe("erkek");
    });

    it("successfully sets gender to bayan", async () => {
      const result = await updateUserGender("bayan");
      expect(result).toEqual({
        ok: true,
        value: { success: true, gender: "bayan", userId: "user_test_1" },
      });
      expect(userPreferences["user_test_1"]).toBe("bayan");
    });
  });

  describe("getUserGender", () => {
    it("returns null when user is not authenticated", async () => {
      mockUser = null;
      const gender = await getUserGender();
      expect(gender).toBeNull();
    });

    it("returns null when user has not chosen a gender yet", async () => {
      const gender = await getUserGender();
      expect(gender).toBeNull();
    });

    it("returns the stored gender when set", async () => {
      userPreferences["user_test_1"] = "bayan";
      const gender = await getUserGender();
      expect(gender).toBe("bayan");
    });
  });
});
