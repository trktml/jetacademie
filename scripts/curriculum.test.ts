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
});
