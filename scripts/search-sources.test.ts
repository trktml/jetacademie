import { describe, expect, it } from "bun:test";
import { Database } from "bun:sqlite";
import path from "node:path";
import fs from "node:fs";
import { foldTurkish, sanitizeFtsQuery, resolveBookTitle } from "./search-sources";

describe("search-sources unit tests", () => {
  describe("foldTurkish", () => {
    it("normalizes uppercase and lowercase Turkish characters", () => {
      expect(foldTurkish("İHLAS")).toBe("ihlas");
      expect(foldTurkish("şems")).toBe("sems");
      expect(foldTurkish("göz")).toBe("goz");
      expect(foldTurkish("ağaç")).toBe("agac");
      expect(foldTurkish("ümit")).toBe("umit");
      expect(foldTurkish("ışık")).toBe("isik");
    });

    it("strips circumflex accents and symbols", () => {
      expect(foldTurkish("LEM'ALAR")).toBe("lemalar");
      expect(foldTurkish("mârifetullah")).toBe("marifetullah");
      expect(foldTurkish("hâl-i pür-melâl")).toBe("halipurmelal");
    });
  });

  describe("sanitizeFtsQuery", () => {
    it("returns empty string for empty input", () => {
      expect(sanitizeFtsQuery("")).toBe("");
      expect(sanitizeFtsQuery("   ")).toBe("");
    });

    it("removes common Turkish stop words when multiple words are provided", () => {
      const sanitized = sanitizeFtsQuery("namaz ve dua nedir");
      expect(sanitized).not.toContain('"ve"');
      expect(sanitized).not.toContain('"nedir"');
      expect(sanitized).toContain('"namaz"*');
      expect(sanitized).toContain('"dua"*');
    });

    it("creates stem variants for Turkish words", () => {
      const sanitized = sanitizeFtsQuery("insanların");
      // Should generate stem variants like insan
      expect(sanitized).toContain("insan");
    });
  });

  describe("resolveBookTitle with Database", () => {
    const dbPath = path.join(process.cwd(), "data", "sources-search.sqlite");
    if (!fs.existsSync(dbPath)) {
      it.skip("SQLite sources database not found", () => {});
      return;
    }

    const db = new Database(dbPath);

    it("resolves book title ignoring case and diacritics", () => {
      const matched = resolveBookTitle(db, "sözler");
      expect(matched).toBe("SOZLER");
    });

    it("resolves book title with partial substring", () => {
      const matched = resolveBookTitle(db, "irşad ekseni");
      expect(matched).toBe("İrsad Ekseni");
    });

    it("returns null for non-existent book", () => {
      const matched = resolveBookTitle(db, "nonexistentxyz12345");
      expect(matched).toBeNull();
    });
  });

  describe("CLI integration tests", () => {
    const scriptPath = path.join(process.cwd(), "scripts", "search-sources.ts");
    const dbPath = path.join(process.cwd(), "data", "sources-search.sqlite");

    if (!fs.existsSync(dbPath)) {
      it.skip("SQLite sources database not found for CLI tests", () => {});
      return;
    }

    it("executes --stats and prints total book count", async () => {
      const proc = Bun.spawn(["bun", scriptPath, "--stats"], {
        stdout: "pipe",
        stderr: "pipe",
      });
      const stdout = await new Response(proc.stdout).text();
      const exitCode = await proc.exited;

      expect(exitCode).toBe(0);
      expect(stdout).toContain("📊 Kaynak İndeks İstatistikleri");
      expect(stdout).toContain("Toplam Kitap:");
      expect(stdout).toContain("Toplam Pasaj/Chunk:");
    });

    it("executes search query in JSON format", async () => {
      const proc = Bun.spawn(
        ["bun", scriptPath, "-q", "bismillah", "-b", "Sözler", "-n", "1", "--json"],
        {
          stdout: "pipe",
          stderr: "pipe",
        }
      );
      const stdout = await new Response(proc.stdout).text();
      const exitCode = await proc.exited;

      expect(exitCode).toBe(0);
      const parsed = JSON.parse(stdout);
      expect(parsed.query).toBe("bismillah");
      expect(parsed.total).toBeGreaterThan(0);
      expect(parsed.results.length).toBe(1);
      expect(parsed.results[0].bookTitle).toBe("SOZLER");
    });

    it("reads a full page accurately", async () => {
      const proc = Bun.spawn(["bun", scriptPath, "--read", "SOZLER", "--page", "26"], {
        stdout: "pipe",
        stderr: "pipe",
      });
      const stdout = await new Response(proc.stdout).text();
      const exitCode = await proc.exited;

      expect(exitCode).toBe(0);
      expect(stdout).toContain("Birinci Söz");
      expect(stdout).toContain("Bismillâh");
      expect(stdout).toContain("Chunk ID: risale_sozler_p26_c0");
    });

    it("filters results by category", async () => {
      const proc = Bun.spawn(
        ["bun", scriptPath, "-q", "namaz", "-c", "risale", "-n", "3", "--json"],
        {
          stdout: "pipe",
          stderr: "pipe",
        }
      );
      const stdout = await new Response(proc.stdout).text();
      const exitCode = await proc.exited;

      expect(exitCode).toBe(0);
      const parsed = JSON.parse(stdout);
      expect(parsed.results.length).toBeGreaterThan(0);
      for (const item of parsed.results) {
        expect(item.category).toBe("risale");
      }
    });
  });
});
