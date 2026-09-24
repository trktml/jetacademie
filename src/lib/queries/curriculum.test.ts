import { describe, expect, it, mock } from "bun:test";
import { curriculumGradeQueryOptions, fetchCurriculumGrade } from "./curriculum";

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
