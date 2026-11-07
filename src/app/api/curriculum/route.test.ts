import { describe, expect, it } from "bun:test";
import { z } from "zod";
import { ensureCurriculumEntriesTable } from "@/lib/curriculum-db";
import { execute } from "@/lib/db";
import { curriculumEntryResponseSchema } from "@/lib/validations/curriculum-response";
import { GET } from "./route";

describe("curriculum API", () => {
  it("returns only the requested grade", async () => {
    const response = await GET(new Request("http://localhost/api/curriculum?sinif=4"));
    const entries = (await response.json()) as Array<{ grade: number }>;

    expect(response.status).toBe(200);
    expect(entries.length).toBeGreaterThan(0);
    expect(entries.every((entry) => entry.grade === 4)).toBe(true);
  });

  it("returns a valid grade response when legacy base and editor records have no year", async () => {
    await ensureCurriculumEntriesTable();
    const baseId = "g4-konu-legacy-eylul-year";
    const editedId = "g4-konu-legacy-ocak-year";
    const editorSlot = "4:konu:all:1-1";
    try {
      await execute(
        `INSERT INTO "curriculum_entries" ("id", "grade", "categoryId", "month", "week", "year", "title")
         VALUES ($1, 4, 'konu', 9, 1, NULL, 'Legacy fixture'), ($2, 4, 'konu', 1, 1, NULL, 'Legacy fixture')`,
        [baseId, editedId]
      );
      await execute(
        `INSERT INTO "curriculum_editor_content" ("slot", "grade", "entryId", "entry", "revision", "updatedAt")
         VALUES ($1, 4, $2, $3, 1, $4)`,
        [
          editorSlot,
          editedId,
          JSON.stringify({
            id: editedId,
            grade: 4,
            categoryId: "konu",
            month: 1,
            week: 1,
            year: null,
            title: "Edited legacy fixture",
          }),
          new Date().toISOString(),
        ]
      );
      const response = await GET(new Request("http://localhost/api/curriculum?sinif=4"));
      expect(response.status).toBe(200);
      const entries = z.array(curriculumEntryResponseSchema).parse(await response.json());
      expect(entries.find((entry) => entry.id === baseId)?.year).toBe(2026);
      expect(entries.find((entry) => entry.id === editedId)).toMatchObject({
        year: 2027,
        title: "Edited legacy fixture",
      });
    } finally {
      await execute('DELETE FROM "curriculum_editor_content" WHERE "entryId" = $1', [editedId]);
      await execute('DELETE FROM "curriculum_entries" WHERE "id" IN ($1, $2)', [baseId, editedId]);
    }
  });

  it("rejects missing and invalid grades before querying", async () => {
    for (const query of ["", "?sinif=0", "?sinif=7", "?sinif=2.5", "?sinif=abc"]) {
      const response = await GET(new Request(`http://localhost/api/curriculum${query}`));
      expect(response.status).toBe(400);
    }
  });
});
