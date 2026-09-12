import { describe, expect, it } from "bun:test";
import React from "react";
import { renderToString } from "react-dom/server";
import { resolveActiveSectionId, useActiveSection } from "./use-active-section";

function TestSectionComponent({
  sections,
  initial,
}: {
  sections: readonly string[];
  initial?: string;
}) {
  const [activeId] = useActiveSection(sections, initial);
  return <div data-active-section={activeId}>{`Current: ${activeId}`}</div>;
}

describe("useActiveSection & resolveActiveSectionId", () => {
  describe("useActiveSection SSR behavior", () => {
    it("initializes with initialSectionId when provided", () => {
      const html = renderToString(
        <TestSectionComponent sections={["ayet", "hadis", "siyer"]} initial="hadis" />
      );
      expect(html).toContain('data-active-section="hadis"');
      expect(html).toContain("Current: hadis");
    });

    it("defaults to the first section id when initial is not provided", () => {
      const html = renderToString(<TestSectionComponent sections={["ayet", "hadis", "siyer"]} />);
      expect(html).toContain('data-active-section="ayet"');
      expect(html).toContain("Current: ayet");
    });

    it("handles empty section list gracefully", () => {
      const html = renderToString(<TestSectionComponent sections={[]} />);
      expect(html).toContain('data-active-section=""');
    });
  });

  describe("resolveActiveSectionId scroll spy logic", () => {
    const sectionIds = ["ayet", "hadis", "siyer", "sahabe", "risale"];

    it("selects the reading section closest to the reading anchor from above (not lowest element)", () => {
      // 'ayet' is higher up (-200px), 'hadis' is in reading view (80px), 'siyer' is peeked at bottom (550px)
      const entries = [
        { id: "ayet", top: -200, isIntersecting: true },
        { id: "hadis", top: 80, isIntersecting: true },
        { id: "siyer", top: 550, isIntersecting: true },
      ];

      const active = resolveActiveSectionId({
        entries,
        sectionIds,
        readingOffsetPx: 140,
      });

      // Crucial: Must be 'hadis', NOT 'siyer' (which would be selected if comparing largest top unconditionally)
      expect(active).toBe("hadis");
    });

    it("switches to the top section when user scrolls back up", () => {
      // User scrolled up: 'ayet' re-enters at top (50px), 'hadis' is pushed down (280px)
      const entries = [
        { id: "ayet", top: 50, isIntersecting: true },
        { id: "hadis", top: 280, isIntersecting: true },
      ];

      const active = resolveActiveSectionId({
        entries,
        sectionIds,
        readingOffsetPx: 140,
      });

      expect(active).toBe("ayet");
    });

    it("selects top-most incoming section when all intersecting sections are below reading line", () => {
      // Above reading line (e.g. scroll is at page heading before first section reaches 140px)
      const entries = [
        { id: "ayet", top: 220, isIntersecting: true },
        { id: "hadis", top: 600, isIntersecting: true },
      ];

      const active = resolveActiveSectionId({
        entries,
        sectionIds,
        readingOffsetPx: 140,
      });

      // Must select incoming section closest to reading line (smallest top)
      expect(active).toBe("ayet");
    });

    it("activates the last section when user reaches the bottom of the page", () => {
      const entries = [
        { id: "sahabe", top: 50, isIntersecting: true },
        { id: "risale", top: 350, isIntersecting: true },
      ];

      const active = resolveActiveSectionId({
        entries,
        sectionIds,
        readingOffsetPx: 140,
        isAtBottom: true,
      });

      expect(active).toBe("risale");
    });

    it("ignores non-intersecting entries", () => {
      const entries = [
        { id: "ayet", top: -900, isIntersecting: false },
        { id: "hadis", top: 110, isIntersecting: true },
      ];

      const active = resolveActiveSectionId({
        entries,
        sectionIds,
        readingOffsetPx: 140,
      });

      expect(active).toBe("hadis");
    });

    it("returns null when no entries are intersecting", () => {
      const entries = [
        { id: "ayet", top: -900, isIntersecting: false },
        { id: "hadis", top: 1200, isIntersecting: false },
      ];

      const active = resolveActiveSectionId({
        entries,
        sectionIds,
      });

      expect(active).toBeNull();
    });

    it("returns null for empty sectionIds", () => {
      const active = resolveActiveSectionId({
        entries: [{ id: "test", top: 50, isIntersecting: true }],
        sectionIds: [],
      });

      expect(active).toBeNull();
    });
  });
});
