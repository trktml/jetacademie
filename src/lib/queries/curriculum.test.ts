import { describe, expect, it, mock } from "bun:test";
import {
  curriculumGradeQueryOptions,
  curriculumProgressQueryOptions,
  fetchCurriculumGrade,
  fetchCurriculumProgress,
} from "./curriculum";

describe("curriculum grade query", () => {
  it("requests only the selected grade and caches each grade separately", async () => {
    const originalFetch = globalThis.fetch;
    const fetchMock = mock(async () =>
      Response.json([
        {
          id: "g4-konu-eylul-1",
          grade: 4,
          categoryId: "konu",
          title: "Test",
          month: 9,
          week: 1,
          year: 2026,
        },
      ])
    );
    globalThis.fetch = fetchMock as unknown as typeof fetch;

    try {
      const entries = await fetchCurriculumGrade(4);
      expect(fetchMock).toHaveBeenCalledWith("/api/curriculum?sinif=4", {
        signal: undefined,
        credentials: "same-origin",
        cache: "no-store",
      });
      expect(entries).toHaveLength(1);
      expect(curriculumGradeQueryOptions(4).queryKey).not.toEqual(
        curriculumGradeQueryOptions(5).queryKey
      );
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("reports failed requests", async () => {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = mock(
      async () => new Response(null, { status: 503 })
    ) as unknown as typeof fetch;

    try {
      await expect(fetchCurriculumGrade(2)).rejects.toThrow("Müfredat yüklenemedi.");
    } finally {
      globalThis.fetch = originalFetch;
    }
  });
});

describe("curriculum progress query", () => {
  it("isolates users and rejects responses belonging to another session", async () => {
    expect(curriculumProgressQueryOptions("user-a").queryKey).not.toEqual(
      curriculumProgressQueryOptions("user-b").queryKey
    );
    const originalFetch = globalThis.fetch;
    globalThis.fetch = mock(async () =>
      Response.json({
        userId: "user-b",
        isSignedIn: true,
        completedEntryIds: ["private-progress"],
        gender: null,
      })
    ) as unknown as typeof fetch;
    try {
      await expect(fetchCurriculumProgress("user-a")).rejects.toThrow("Oturum değişti.");
    } finally {
      globalThis.fetch = originalFetch;
    }
  });
  it("fetches progress from /api/curriculum/progress", async () => {
    const originalFetch = globalThis.fetch;
    const mockData = {
      userId: "user-test",
      isSignedIn: true,
      completedEntryIds: ["g1-m1-konu-eylul-1"],
      gender: "erkek" as const,
    };
    const fetchMock = mock(async () => Response.json(mockData));
    globalThis.fetch = fetchMock as unknown as typeof fetch;

    try {
      const data = await fetchCurriculumProgress();
      expect(fetchMock).toHaveBeenCalledWith("/api/curriculum/progress", {
        cache: "no-store",
        credentials: "same-origin",
        signal: undefined,
      });
      expect(data).toEqual(mockData);
      expect([...curriculumProgressQueryOptions().queryKey]).toEqual(["curriculum-progress", null]);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("reports failed progress requests", async () => {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = mock(
      async () => new Response(null, { status: 500 })
    ) as unknown as typeof fetch;

    try {
      await expect(fetchCurriculumProgress()).rejects.toThrow("İlerleme bilgisi yüklenemedi.");
    } finally {
      globalThis.fetch = originalFetch;
    }
  });
});
