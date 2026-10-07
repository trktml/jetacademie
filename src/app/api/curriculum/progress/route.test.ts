import { beforeEach, describe, expect, it, mock } from "bun:test";

let mockSessionUser: { id: string; email: string; name: string } | null = null;
let mockCompletedIds: string[] = [];
let mockUserGender: "erkek" | "bayan" | null = null;

mock.module("next/headers", () => ({
  headers: async () => new Headers(),
}));

mock.module("@/lib/auth", () => ({
  auth: {
    api: {
      getSession: async () => (mockSessionUser ? { user: mockSessionUser } : null),
    },
  },
}));

mock.module("@/lib/curriculum-progress", () => ({
  getCompletedEntryIds: async () => mockCompletedIds,
}));

mock.module("@/lib/curriculum-db", () => ({
  getUserGenderFromDb: async () => mockUserGender,
}));

import { GET } from "./route";

describe("curriculum progress API", () => {
  beforeEach(() => {
    mockSessionUser = null;
    mockCompletedIds = [];
    mockUserGender = null;
  });

  it("returns guest/empty state when unauthenticated", async () => {
    const response = await GET();
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data).toEqual({
      isSignedIn: false,
      completedEntryIds: [],
      gender: null,
    });
  });

  it("returns completed entries and gender when authenticated", async () => {
    mockSessionUser = { id: "user_test", email: "test@example.com", name: "Test" };
    mockCompletedIds = ["g1-m1-konu-eylul-1", "g1-m1-konu-eylul-2"];
    mockUserGender = "bayan";

    const response = await GET();
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data).toEqual({
      isSignedIn: true,
      completedEntryIds: ["g1-m1-konu-eylul-1", "g1-m1-konu-eylul-2"],
      gender: "bayan",
    });
  });
});
