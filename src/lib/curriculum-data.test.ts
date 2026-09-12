import { describe, expect, it } from "bun:test";
import { curriculumModules, getModuleBySlug } from "./curriculum-data";

describe("Curriculum Data", () => {
  it("should have 6 curriculum modules", () => {
    expect(curriculumModules).toHaveLength(6);
  });

  it("should have unique slugs", () => {
    const slugs = curriculumModules.map((m) => m.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("should have unique ids", () => {
    const ids = curriculumModules.map((m) => m.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("should have all expected modules", () => {
    const slugs = curriculumModules.map((m) => m.slug);
    expect(slugs).toContain("akaid");
    expect(slugs).toContain("ibadet");
    expect(slugs).toContain("ahlak");
    expect(slugs).toContain("siyer");
    expect(slugs).toContain("tefsir");
    expect(slugs).toContain("tasavvuf");
  });

  it("should have at least 4 topics per module", () => {
    for (const mod of curriculumModules) {
      expect(mod.topics.length).toBeGreaterThanOrEqual(4);
    }
  });

  it("should have positive weeks and hours", () => {
    for (const mod of curriculumModules) {
      expect(mod.weeks).toBeGreaterThan(0);
      expect(mod.hours).toBeGreaterThan(0);
    }
  });

  describe("getModuleBySlug", () => {
    it("should return the correct module for a valid slug", () => {
      const mod = getModuleBySlug("akaid");
      expect(mod).toBeDefined();
      expect(mod!.title).toContain("Akaid");
    });

    it("should return undefined for an invalid slug", () => {
      const mod = getModuleBySlug("nonexistent");
      expect(mod).toBeUndefined();
    });
  });
});
