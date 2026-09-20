import { beforeEach, describe, expect, it, mock } from "bun:test";

let mockUser: { id: string; email: string; name: string } | null = null;
let userPreferences: Record<string, string> = {};

mock.module("next/headers", () => ({
  headers: async () => new Headers(),
}));

mock.module("next/cache", () => ({
  revalidatePath: mock(() => {}),
}));

mock.module("@/lib/curriculum-db", () => ({
  getUserGenderFromDb: (userId: string) => userPreferences[userId] ?? null,
  setUserGenderInDb: (userId: string, gender: string) => {
    userPreferences[userId] = gender;
  },
}));

mock.module("@/lib/auth", () => ({
  auth: {
    api: {
      getSession: async () => (mockUser ? { user: mockUser } : null),
    },
  },
}));

import { getUserGender, updateUserGender } from "./gender-actions";

describe("gender server actions", () => {
  beforeEach(() => {
    mockUser = { id: "user_test_1", email: "test@example.com", name: "Test" };
    userPreferences = {};
  });

  describe("updateUserGender", () => {
    it("fails when user is not authenticated", async () => {
      mockUser = null;
      expect(updateUserGender("erkek")).rejects.toThrow("Tercihinizi kaydetmek için giriş yapın.");
    });

    it("fails when gender is invalid", async () => {
      // @ts-expect-error - testing invalid input
      expect(updateUserGender("invalid")).rejects.toThrow("Geçersiz cinsiyet tercihi.");
    });

    it("successfully sets gender to erkek", async () => {
      const result = await updateUserGender("erkek");
      expect(result).toEqual({ success: true, gender: "erkek" });
      expect(userPreferences["user_test_1"]).toBe("erkek");
    });

    it("successfully sets gender to bayan", async () => {
      const result = await updateUserGender("bayan");
      expect(result).toEqual({ success: true, gender: "bayan" });
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
