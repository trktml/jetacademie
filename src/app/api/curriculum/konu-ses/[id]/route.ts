import { getCurriculumEntryByIdFromDb } from "@/lib/curriculum-db";
import {
  narrationByteRange,
  narrationCuesSchema,
  readKonuAudio,
  readKonuAudioLength,
  readKonuNarration,
} from "@/lib/curriculum/narration";
import {
  NARRATION_ID,
  NARRATION_VERSION,
  narrationBodyHash,
  type NarrationManifest,
} from "@/lib/konu-narration";

const noCache = { "Cache-Control": "private, no-store" };
const notFound = () => new Response(null, { status: 404, headers: noCache });

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const entryId = id.startsWith("konu-") ? `g1-${id}` : id;
  if (!NARRATION_ID.test(entryId)) return notFound();

  const audioHash = new URL(request.url).searchParams.get("audio");
  if (audioHash !== null && !/^[a-f0-9]{64}$/.test(audioHash)) return notFound();

  const entry = await getCurriculumEntryByIdFromDb(entryId);
  if (entry?.categoryId !== "konu" || !entry.body) return notFound();
  const bodyHash = await narrationBodyHash(entry.body);

  if (audioHash === null) {
    const recording = await readKonuNarration(entryId, bodyHash);
    if (!recording) return notFound();
    const cues = narrationCuesSchema.parse(JSON.parse(recording.cues));
    return Response.json(
      {
        bodyHash,
        version: NARRATION_VERSION,
        cues,
        audioUrl: `/api/curriculum/konu-ses/${entryId}?audio=${recording.audioHash}`,
      } satisfies NarrationManifest,
      { headers: noCache }
    );
  }

  const metadata = await readKonuAudioLength(entryId, bodyHash, audioHash);
  if (!metadata?.length) return notFound();

  const { length } = metadata;
  const headers = new Headers({
    ...noCache,
    "Accept-Ranges": "bytes",
    "Content-Type": "audio/mpeg",
  });
  const range = request.headers.get("range");
  const bytes = range ? narrationByteRange(range, length) : { start: 0, end: length - 1 };
  if (!bytes) {
    headers.set("Content-Range", `bytes */${length}`);
    return new Response(null, { status: 416, headers });
  }
  const size = bytes.end - bytes.start + 1;
  const row = await readKonuAudio(entryId, bodyHash, audioHash, bytes.start, size);
  if (!row) return notFound();

  headers.set("Content-Length", String(size));
  if (range) headers.set("Content-Range", `bytes ${bytes.start}-${bytes.end}/${length}`);
  return new Response(new Uint8Array(row.audio), { status: range ? 206 : 200, headers });
}
