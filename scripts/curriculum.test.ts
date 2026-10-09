import { resolve } from "node:path";
import { describe, expect, it } from "bun:test";
import { parseArgs } from "./curriculum";

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

describe("curriculum backup and restore operations", () => {
  const tmpBackupDir = `./tmp-test-backup-${Date.now()}`;

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

  it("cleans up temporary test backup folder", async () => {
    const { rm } = await import("node:fs/promises");
    await rm(tmpBackupDir, { recursive: true, force: true });
    expect(await Bun.file(`${tmpBackupDir}/manifest.json`).exists()).toBe(false);
  });
});
