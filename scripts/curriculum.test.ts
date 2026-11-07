import { join, resolve } from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "bun:test";
import { parseArgs } from "./curriculum";
import { execute, queryOne } from "../src/lib/db";
import { ensureCurriculumEntriesTable } from "../src/lib/curriculum/schema";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";

describe("curriculum CLI parseArgs", () => {
  it("returns help when no args or --help is passed", () => {
    expect(parseArgs([])).toEqual({ command: "help", options: { help: true } });
    expect(parseArgs(["--help"])).toEqual({ command: "help", options: { help: true } });
    expect(parseArgs(["-h"])).toEqual({ command: "help", options: { help: true } });
  });

  it("parses list command without options", () => {
    const { command, options } = parseArgs(["list"]);
    expect(command).toBe("list");
    expect(options).toEqual({});
  });

  it("parses save command with --week and --file", () => {
    const { command, options } = parseArgs(["save", "--week", "3", "--file", "sample.json"]);
    expect(command).toBe("save");
    expect(options.week).toBe("3");
    expect(options.file).toBe("sample.json");
  });

  it("parses short options -w and -f", () => {
    const { command, options } = parseArgs(["save", "-w", "5", "-f", "test.json"]);
    expect(command).toBe("save");
    expect(options.w).toBe("5");
    expect(options.f).toBe("test.json");
  });

  it("parses --publish boolean flag", () => {
    const { command, options } = parseArgs(["save", "--week", "2", "--publish"]);
    expect(command).toBe("save");
    expect(options.week).toBe("2");
    expect(options.publish).toBe(true);
  });

  it("parses publish command with week", () => {
    const { command, options } = parseArgs(["publish", "--week", "1"]);
    expect(command).toBe("publish");
    expect(options.week).toBe("1");
  });

  it("parses delete command with week", () => {
    const { command, options } = parseArgs(["delete", "-w", "12"]);
    expect(command).toBe("delete");
    expect(options.w).toBe("12");
  });

  it("parses export command with week and custom out dir", () => {
    const { command, options } = parseArgs(["export", "--week", "4", "--out", "./my-exports"]);
    expect(command).toBe("export");
    expect(options.week).toBe("4");
    expect(options.out).toBe("./my-exports");
  });

  it("parses backup command with out dir", () => {
    const { command, options } = parseArgs(["backup", "--out", "./my-backups"]);
    expect(command).toBe("backup");
    expect(options.out).toBe("./my-backups");
  });

  it("parses restore command with options", () => {
    const { command, options } = parseArgs([
      "restore",
      "--dir",
      "./backups/test",
      "--week",
      "2",
      "--dry-run",
    ]);
    expect(command).toBe("restore");
    expect(options.dir).toBe("./backups/test");
    expect(options.week).toBe("2");
    expect(options["dry-run"]).toBe(true);
  });
});

describe("curriculum category draft CLI", () => {
  it("saves six validated topic drafts and rejects publishing them through save", async () => {
    const pkg = {
      weekNumber: 5,
      entries: Array.from({ length: 6 }, (_, index) => ({
        id: `g${index + 1}-konu-ekim-1`,
        grade: index + 1,
        categoryId: "konu",
        month: 10,
        week: 1,
        year: 2026,
        title: "Kategori taslağı",
        body: "# Başlık\n\n# Bana Ne Söylüyor?\n\n# Bu Hafta Tanıştığımız Kelimeler",
      })),
    };
    for (const publish of [false, true]) {
      const child = Bun.spawn(
        [
          process.execPath,
          "scripts/curriculum.ts",
          "save",
          "--week",
          "5",
          "--category",
          "konu",
          ...(publish ? ["--publish"] : []),
        ],
        {
          cwd: resolve(import.meta.dir, ".."),
          env: { ...process.env, DATABASE_URL: ":memory:" },
          stdin: new Blob([JSON.stringify(pkg)]),
          stdout: "pipe",
          stderr: "pipe",
        }
      );
      const [stdout, stderr, code] = await Promise.all([
        new Response(child.stdout).text(),
        new Response(child.stderr).text(),
        child.exited,
      ]);
      if (publish) {
        expect(code).toBe(1);
        expect(stderr).toContain("Tek kategori yalnız taslak kaydedilebilir");
      } else {
        expect(code).toBe(0);
        expect(stdout).toContain("6 kayıt, Statü: Taslak");
      }
    }
  });
});

describe("curriculum backup and restore operations", () => {
  let tmpBackupDir: string;
  const weeklyId = "g6-konu-mayis-4";
  const protectedId = "g6-esma-mayis-4";
  const weeklySlot = "6:konu:all:5-4";
  const protectedSlot = "6:esma:all:5-4";

  function insertEditor(slot: string, id: string, categoryId: string, title: string) {
    return execute(
      `INSERT INTO "curriculum_editor_content" ("slot", "grade", "entryId", "entry", "revision", "updatedAt")
       VALUES ($1, 6, $2, $3, 1, '2026-01-01')`,
      [slot, id, JSON.stringify({ id, categoryId, grade: 6, month: 5, week: 4, year: 2027, title })]
    );
  }

  beforeAll(async () => {
    tmpBackupDir = await mkdtemp(join(tmpdir(), "jet-restore-test-"));
    await ensureCurriculumEntriesTable();
    await execute(
      `INSERT INTO "curriculum_entries" ("id", "grade", "categoryId", "month", "week", "year", "title", "isDraft")
       VALUES ($1, 6, 'konu', 5, 4, 2027, 'Saved draft', 1)`,
      [weeklyId]
    );
    await insertEditor(weeklySlot, weeklyId, "konu", "Saved editor draft");
    await insertEditor(protectedSlot, protectedId, "esma", "Protected snapshot");
  });

  afterAll(async () => {
    await execute('DELETE FROM "curriculum_entries" WHERE "id" = $1', [weeklyId]);
    await execute('DELETE FROM "curriculum_editor_content" WHERE "slot" IN ($1, $2)', [
      weeklySlot,
      protectedSlot,
    ]);
    await rm(tmpBackupDir, { recursive: true, force: true });
  });

  it("creates a complete backup package in custom outDir", async () => {
    const { createCurriculumBackup } = await import("./curriculum-backup");
    const { backupDir, manifest } = await createCurriculumBackup({ outDir: tmpBackupDir });

    expect(backupDir).toBe(resolve(tmpBackupDir));
    expect(manifest.version).toBe(1);
    expect(Array.isArray(manifest.files)).toBe(true);
    expect(manifest.files.length).toBeGreaterThan(0);

    const manifestFile = Bun.file(`${tmpBackupDir}/manifest.json`);
    expect(await manifestFile.exists()).toBe(true);

    const restoreSql = Bun.file(`${tmpBackupDir}/database/restore.sql`);
    expect(await restoreSql.exists()).toBe(true);

    const weeklyDbJson = Bun.file(`${tmpBackupDir}/database/curriculum_entries_weekly.json`);
    expect(await weeklyDbJson.exists()).toBe(true);
  });

  it("performs dry-run restore successfully from backup directory", async () => {
    const { restoreCurriculumBackup } = await import("./curriculum-backup");
    const result = await restoreCurriculumBackup({
      backupDir: tmpBackupDir,
      dryRun: true,
    });

    expect(Array.isArray(result.restoredWeeks)).toBe(true);
    expect(typeof result.entriesCount).toBe("number");
    expect(typeof result.editorCount).toBe("number");
  });

  it("throws descriptive error when restoring non-existent week", async () => {
    const { restoreCurriculumBackup } = await import("./curriculum-backup");
    expect(
      restoreCurriculumBackup({
        backupDir: tmpBackupDir,
        weekNumber: 99,
        dryRun: true,
      })
    ).rejects.toThrow("Hafta 99 bu yedekte mevcut değil");
  });

  it("throws descriptive error when manifest is missing", async () => {
    const { restoreCurriculumBackup } = await import("./curriculum-backup");
    expect(
      restoreCurriculumBackup({
        backupDir: "./non-existent-backup-dir",
        dryRun: true,
      })
    ).rejects.toThrow("manifest.json bulunamadı");
  });

  it("restores draft and editor revision together without touching the protected track", async () => {
    const { restoreCurriculumBackup } = await import("./curriculum-backup");
    await execute('UPDATE "curriculum_entries" SET "title" = $1, "isDraft" = 0 WHERE "id" = $2', [
      "Changed draft",
      weeklyId,
    ]);
    await execute(
      'UPDATE "curriculum_editor_content" SET "revision" = 7 WHERE "slot" IN ($1, $2)',
      [weeklySlot, protectedSlot]
    );

    const result = await restoreCurriculumBackup({ backupDir: tmpBackupDir, weekNumber: 36 });

    expect(result).toEqual({ restoredWeeks: [36], entriesCount: 1, editorCount: 1 });
    expect(
      await queryOne('SELECT "title", "isDraft" FROM "curriculum_entries" WHERE "id" = $1', [
        weeklyId,
      ])
    ).toEqual({ title: "Saved draft", isDraft: 1 });
    expect(
      await queryOne('SELECT "revision" FROM "curriculum_editor_content" WHERE "slot" = $1', [
        weeklySlot,
      ])
    ).toEqual({ revision: 8 });
    expect(
      await queryOne('SELECT "revision" FROM "curriculum_editor_content" WHERE "slot" = $1', [
        protectedSlot,
      ])
    ).toEqual({ revision: 7 });
  });

  it("rejects changed backup files before any write", async () => {
    const { restoreCurriculumBackup } = await import("./curriculum-backup");
    const path = join(tmpBackupDir, "database/curriculum_entries_weekly.json");
    const before = await Bun.file(path).text();
    await Bun.write(path, before.replace("Saved draft", "Other draft"));
    try {
      await expect(
        restoreCurriculumBackup({ backupDir: tmpBackupDir, weekNumber: 36 })
      ).rejects.toThrow("bütünlük kontrolünü geçemedi");
      expect(
        await queryOne('SELECT "title" FROM "curriculum_entries" WHERE "id" = $1', [weeklyId])
      ).toEqual({ title: "Saved draft" });
    } finally {
      await Bun.write(path, before);
    }
  });
});
