import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { parseArgs } from "node:util";
import { getCurriculumEntriesFromDb } from "@/lib/curriculum-db";
import { closeDatabase, transaction } from "@/lib/db";
import { narrationCuesSchema, saveKonuNarration } from "@/lib/curriculum/narration";
import {
  NARRATION_ID,
  NARRATION_VERSION,
  NARRATION_VOICES,
  narrationBodyHash,
} from "@/lib/konu-narration";
import { weekNumberToSlot } from "@/lib/validations/curriculum-entry";
import { lessonNarrationParagraphs } from "./konu-narration-text";

interface NarrationJob {
  voice: (typeof NARRATION_VOICES)[number];
  paragraphs: string[];
  bodyHash: string;
  entryId: string;
  output: string;
}

function integerOption(raw: string | undefined, label: string, max: number) {
  const value = Number(raw);
  if (!Number.isInteger(value) || value < 1 || value > max) {
    throw new Error(`${label}: 1–${max} arasında bir tam sayı girin.`);
  }
  return value;
}

async function main() {
  const { values } = parseArgs({
    options: {
      week: { type: "string" },
      through: { type: "string" },
      grade: { type: "string" },
      voice: { type: "string" },
      samples: { type: "boolean" },
      engine: { type: "string", default: "onnx" },
      install: { type: "boolean" },
      output: { type: "string", default: "exports/konu-ses" },
    },
  });
  if (!["onnx", "mlx"].includes(values.engine))
    throw new Error("--engine onnx veya mlx olmalıdır.");
  if (Boolean(values.week) === Boolean(values.through)) {
    throw new Error("--week N veya --through N seçeneklerinden birini kullanın.");
  }
  if (values.samples && (values.voice || values.install || !values.week || !values.grade)) {
    throw new Error("Örnekler için yalnız --samples --week N --grade N kullanın.");
  }
  const selected = NARRATION_VOICES.find((voice) => voice === values.voice);
  if (!values.samples && !selected) throw new Error("--voice ile M1–M5 arasından bir ses seçin.");
  const voices = selected ? [selected] : NARRATION_VOICES;
  const grade = values.grade === undefined ? undefined : integerOption(values.grade, "--grade", 6);
  const weeks = values.week
    ? [integerOption(values.week, "--week", 36)]
    : Array.from({ length: integerOption(values.through, "--through", 36) }, (_, i) => i + 1);
  const catalog = await getCurriculumEntriesFromDb(grade);
  const jobs: NarrationJob[] = [];

  for (const week of weeks) {
    const slot = weekNumberToSlot(week);
    const lessons = catalog.filter(
      (entry) =>
        entry.categoryId === "konu" &&
        !entry.isExtra &&
        !entry.isDraft &&
        entry.month === slot.month &&
        entry.week === slot.week &&
        entry.year === slot.year
    );
    if (lessons.length !== (grade ? 1 : 6)) {
      throw new Error(`Hafta ${week}: yayındaki Konu kayıtları eksik (${lessons.length}).`);
    }
    for (const lesson of lessons) {
      if (!lesson.body || !NARRATION_ID.test(lesson.id)) {
        throw new Error(`Seslendirilecek içerik bulunamadı: ${lesson.id}`);
      }
      const paragraphs = lessonNarrationParagraphs(lesson.body);
      if (!paragraphs.length) throw new Error(`Okunacak paragraf yok: ${lesson.id}`);
      const bodyHash = await narrationBodyHash(lesson.body);
      for (const voice of voices) {
        jobs.push({
          voice,
          paragraphs,
          bodyHash,
          entryId: lesson.id,
          output: resolve(
            values.output,
            lesson.id,
            bodyHash,
            `${voice}-${values.engine}-v${NARRATION_VERSION}.mp3`
          ),
        });
      }
    }
  }

  async function readJob(job: NarrationJob) {
    const audioFile = Bun.file(job.output);
    const cuesFile = Bun.file(job.output.replace(/\.mp3$/, ".json"));
    if (!(await audioFile.exists()) || !(await cuesFile.exists())) return null;
    const cues = narrationCuesSchema.parse(await cuesFile.json());
    if (cues.length !== job.paragraphs.length || !(await audioFile.stat()).size) {
      throw new Error(`Ses ve paragraf zamanları uyuşmuyor: ${job.output}`);
    }
    return { cues, audioFile };
  }

  if (values.install) {
    const recordings = await Promise.all(
      jobs.map(async (job) => {
        const recording = await readJob(job);
        if (!recording) throw new Error(`İncelenmiş dosya bulunamadı: ${job.output}`);
        return { job, ...recording };
      })
    );
    await transaction(async () => {
      for (const { job, cues, audioFile } of recordings) {
        await saveKonuNarration({
          ...job,
          cues,
          audio: Buffer.from(await audioFile.arrayBuffer()),
        });
      }
    });
    console.log(`${recordings.length} Konu seslendirmesi veritabanına kaydedildi.`);
    return;
  }

  const missing = [];
  for (const job of jobs) {
    if (!(await readJob(job))) missing.push(job);
  }
  if (missing.length) {
    const temporary = await mkdtemp(join(tmpdir(), "jetacademie-konu-ses-"));
    try {
      const input = join(temporary, "jobs.json");
      await Bun.write(input, JSON.stringify(missing));
      const process = Bun.spawn(
        [
          Bun.env.SUPERTONIC_PYTHON ?? "python3",
          "scripts/render-konu-narration.py",
          input,
          values.engine,
        ],
        { stdout: "inherit", stderr: "inherit" }
      );
      if (await process.exited) throw new Error("Supertonic 3 ses üretimini tamamlayamadı.");
    } finally {
      await rm(temporary, { recursive: true, force: true });
    }
  }
  for (const job of jobs) {
    if (!(await readJob(job))) throw new Error(`Ses dosyası eksik: ${job.output}`);
  }
  console.log(`${jobs.length} seslendirme incelemeye hazır: ${resolve(values.output)}`);
}

try {
  await main();
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
} finally {
  await closeDatabase();
}
