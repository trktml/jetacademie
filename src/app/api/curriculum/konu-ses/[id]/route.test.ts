import { expect, it } from "bun:test";
import { bulkUpsertCurriculumEntries, ensureCurriculumEntriesTable } from "@/lib/curriculum-db";
import { saveKonuNarration } from "@/lib/curriculum/narration";
import { execute } from "@/lib/db";
import { narrationBodyHash, type NarrationManifest } from "@/lib/konu-narration";
import { GET } from "./route";

it("serves seekable audio only for the current published lesson body", async () => {
  const entryId = "g6-konu-mayis-4";
  const body = "# Dinleme denemesi\n\nBir cümle.";
  const entry = {
    id: entryId,
    categoryId: "konu",
    grade: 6,
    month: 5,
    week: 4,
    year: 2027,
    title: "Dinleme denemesi",
    body,
    isDraft: 0,
  } as const;
  const audio = Buffer.from([12, 24, 36, 48, 60]);
  const cues = [
    { start: 0, end: 1 },
    { start: 1.1, end: 2 },
  ];
  const context = { params: Promise.resolve({ id: entryId }) };
  const base = "http://localhost/api/curriculum/konu-ses";
  await ensureCurriculumEntriesTable();
  try {
    await bulkUpsertCurriculumEntries([entry]);
    expect((await GET(new Request(`${base}/${entryId}`), context)).status).toBe(404);
    await saveKonuNarration({
      entryId,
      bodyHash: await narrationBodyHash(body),
      voice: "M1",
      audio,
      cues,
    });

    const metadata = await GET(new Request(`${base}/${entryId}`), context);
    expect(metadata.status).toBe(200);
    const manifest: NarrationManifest = await metadata.json();
    expect(manifest.cues).toEqual(cues);
    const audioUrl = new URL(manifest.audioUrl, base);
    const partial = await GET(new Request(audioUrl, { headers: { Range: "bytes=1-3" } }), context);
    expect(partial.status).toBe(206);
    expect(partial.headers.get("Content-Range")).toBe("bytes 1-3/5");
    expect(Array.from(new Uint8Array(await partial.arrayBuffer()))).toEqual([24, 36, 48]);
    const outOfBounds = await GET(
      new Request(audioUrl, { headers: { Range: "bytes=5-" } }),
      context
    );
    expect(outOfBounds.status).toBe(416);
    expect(outOfBounds.headers.get("Content-Range")).toBe("bytes */5");

    await bulkUpsertCurriculumEntries([{ ...entry, body: `${body} Yeni sürüm.` }]);
    expect((await GET(new Request(audioUrl), context)).status).toBe(404);
    expect((await GET(new Request(`${base}/${entryId}`), context)).status).toBe(404);
    await bulkUpsertCurriculumEntries([{ ...entry, isDraft: 1 }]);
    expect((await GET(new Request(audioUrl), context)).status).toBe(404);
  } finally {
    await execute('DELETE FROM "curriculum_konu_narration" WHERE "entryId" = $1', [entryId]);
    await execute('DELETE FROM "curriculum_entries" WHERE "id" = $1', [entryId]);
  }
});
