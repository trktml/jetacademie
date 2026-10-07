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
    const fetchMock = mock(async () => Response.json([{ id: "g4-ayet-eylul-1", grade: 4 }]));
    globalThis.fetch = fetchMock as unknown as typeof fetch;

    try {
      const entries = await fetchCurriculumGrade(4);
      expect(fetchMock).toHaveBeenCalledWith("/api/curriculum?sinif=4");
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
  it("fetches progress from /api/curriculum/progress", async () => {
    const originalFetch = globalThis.fetch;
    const mockData = {
      isSignedIn: true,
      completedEntryIds: ["g1-m1-konu-eylul-1"],
      gender: "erkek" as const,
    };
    const fetchMock = mock(async () => Response.json(mockData));
    globalThis.fetch = fetchMock as unknown as typeof fetch;

    try {
      const data = await fetchCurriculumProgress();
      expect(fetchMock).toHaveBeenCalledWith("/api/curriculum/progress");
      expect(data).toEqual(mockData);
      expect([...curriculumProgressQueryOptions().queryKey]).toEqual(["curriculum-progress"]);
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
