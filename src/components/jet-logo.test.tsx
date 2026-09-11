import { describe, expect, it } from "bun:test";
import React from "react";
import { renderToString } from "react-dom/server";
import { JetLogo, JetLogoIcon } from "./jet-logo";

describe("JetLogo & JetLogoIcon Components", () => {
  it("should render JetLogoIcon as an SVG with appropriate attributes", () => {
    const html = renderToString(<JetLogoIcon className="custom-class h-10 w-10" />);

    expect(html).toContain("<svg");
    expect(html).toContain('viewBox="0 0 512 512"');
    expect(html).toContain("custom-class");
    expect(html).toContain("logoBg");
    expect(html).toContain("jetLeft");
    expect(html).toContain("logoGold");
  });

  it("should render JetLogo with brand typography and default tagline", () => {
    const html = renderToString(<JetLogo size="md" />);

    expect(html).toContain("Jet");
    expect(html).toContain("Academie");
    expect(html).toContain("PWA Mobile-First");
  });

  it("should support hiding the tagline via showTagline prop", () => {
    const html = renderToString(<JetLogo size="sm" showTagline={false} />);

    expect(html).toContain("Jet");
    expect(html).toContain("Academie");
    expect(html).not.toContain("PWA Mobile-First");
  });

  it("should apply correct sizing classes for sm, md, and lg", () => {
    const smHtml = renderToString(<JetLogo size="sm" />);
    const mdHtml = renderToString(<JetLogo size="md" />);
    const lgHtml = renderToString(<JetLogo size="lg" />);

    expect(smHtml).toContain("h-7 w-7");
    expect(mdHtml).toContain("h-9 w-9");
    expect(lgHtml).toContain("h-12 w-12");
  });
});
