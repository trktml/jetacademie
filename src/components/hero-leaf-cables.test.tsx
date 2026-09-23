import { describe, expect, it } from "bun:test";
import React from "react";
import { renderToString } from "react-dom/server";
import { HeroLeafCables } from "./hero-leaf-cables";

describe("HeroLeafCables Component", () => {
  const mockItems = [
    { id: "mufredat", side: "left" as const },
    { id: "mufredat-kitaplari", side: "left" as const },
    { id: "hedefler", side: "right" as const },
    { id: "kampanyalar", side: "right" as const },
  ];

  const dummyLayoutRef = { current: null };
  const dummyTreeRef = { current: null };

  it("should render SVG container and filter definitions in SSR", () => {
    const html = renderToString(
      <HeroLeafCables
        isLampOn={true}
        hoveredId={null}
        items={mockItems}
        layoutRef={dummyLayoutRef}
        treeArtRef={dummyTreeRef}
      />
    );

    expect(html).toContain("hero-leaf-cables");
    expect(html).toContain('id="hero-cable-glow"');
    expect(html).toContain('id="hero-cable-glow-active"');
    expect(html).toContain('id="hero-leaf-aura"');
    expect(html).toContain('aria-hidden="true"');
  });

  it("should not contain legacy fixed-coordinate telemetry classes or viewBox", () => {
    const html = renderToString(
      <HeroLeafCables
        isLampOn={true}
        hoveredId={null}
        items={mockItems}
        layoutRef={dummyLayoutRef}
        treeArtRef={dummyTreeRef}
      />
    );

    expect(html).not.toContain("telemetry-flow");
    expect(html).not.toContain('viewBox="0 0 460 613.33"');
  });

  it("should support off-state styling when lamp is toggled off", () => {
    const html = renderToString(
      <HeroLeafCables
        isLampOn={false}
        hoveredId={null}
        items={mockItems}
        layoutRef={dummyLayoutRef}
        treeArtRef={dummyTreeRef}
      />
    );

    expect(html).toContain("hero-leaf-cables");
  });
});
