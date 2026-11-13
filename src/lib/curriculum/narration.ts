import { createHash } from "node:crypto";
import { z } from "zod";
import { execute, queryOne } from "@/lib/db";
import { NARRATION_VERSION, NARRATION_VOICES } from "@/lib/konu-narration";

export const narrationCuesSchema = z
  .array(
    z.object({
      start: z.number().nonnegative(),
      end: z.number().positive(),
    })
  )
  .min(1)
  .refine(
    (cues) =>
      cues.every(
        (cue, i) =>
          cue.end > cue.start && (i === 0 ? cue.start === 0 : cue.start >= cues[i - 1].end)
      ),
    "Paragraf zamanları art arda gelmeli ve çakışmamalıdır."
  );

type Voice = (typeof NARRATION_VOICES)[number];

export async function saveKonuNarration({
  entryId,
  bodyHash,
  voice,
  cues,
  audio,
}: {
  entryId: string;
  bodyHash: string;
  voice: Voice;
  cues: z.infer<typeof narrationCuesSchema>;
  audio: Buffer;
}) {
  const audioHash = createHash("sha256").update(audio).digest("hex");
  await execute(
    `
    INSERT INTO "curriculum_konu_narration" ("entryId", "bodyHash", "audioHash", "version", "voice", "cues", "audio")
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    ON CONFLICT ("entryId") DO UPDATE SET
      "bodyHash" = excluded."bodyHash",
      "audioHash" = excluded."audioHash",
      "version" = excluded."version",
      "voice" = excluded."voice",
      "cues" = excluded."cues",
      "audio" = excluded."audio"
    WHERE "curriculum_konu_narration"."audioHash" <> excluded."audioHash"
       OR "curriculum_konu_narration"."bodyHash" <> excluded."bodyHash"
       OR "curriculum_konu_narration"."version" <> excluded."version"
  `,
    [entryId, bodyHash, audioHash, NARRATION_VERSION, voice, JSON.stringify(cues), audio]
  );
}

export async function readKonuNarration(entryId: string, bodyHash: string) {
  return queryOne<{ audioHash: string; cues: string }>(
    `
    SELECT "audioHash", "cues"
    FROM "curriculum_konu_narration"
    WHERE "entryId" = $1 AND "bodyHash" = $2 AND "version" = $3
  `,
    [entryId, bodyHash, NARRATION_VERSION]
  );
}

export async function readKonuAudioLength(entryId: string, bodyHash: string, audioHash: string) {
  return queryOne<{ length: number }>(
    `
    SELECT length("audio") AS "length"
    FROM "curriculum_konu_narration"
    WHERE "entryId" = $1 AND "bodyHash" = $2 AND "audioHash" = $3 AND "version" = $4
  `,
    [entryId, bodyHash, audioHash, NARRATION_VERSION]
  );
}

export async function readKonuAudio(
  entryId: string,
  bodyHash: string,
  audioHash: string,
  offset: number,
  length: number
) {
  return queryOne<{ audio: Uint8Array }>(
    `
    SELECT substr("audio", $5, $6) AS "audio"
    FROM "curriculum_konu_narration"
    WHERE "entryId" = $1 AND "bodyHash" = $2 AND "audioHash" = $3 AND "version" = $4
  `,
    [entryId, bodyHash, audioHash, NARRATION_VERSION, offset + 1, length]
  );
}

export function narrationByteRange(value: string, length: number) {
  const match = /^bytes=(\d*)-(\d*)$/.exec(value);
  if (!match || (!match[1] && !match[2])) return null;
  const first = match[1] ? Number(match[1]) : null;
  const last = match[2] ? Number(match[2]) : null;
  const start = first ?? Math.max(0, length - (last ?? 0));
  const end = first === null ? length - 1 : Math.min(last ?? length - 1, length - 1);
  return start <= end ? { start, end } : null;
}
