import { describe, expect, it } from "bun:test";
import React from "react";
import { renderToString } from "react-dom/server";
import { EsmaIcon } from "./esma-icon";

describe("EsmaIcon", () => {
  it("renders as an SVG element with Lucide attributes", () => {
    const html = renderToString(<EsmaIcon />);
    expect(html).toContain("<svg");
    expect(html).toContain('viewBox="0 0 24 24"');
    expect(html).toContain('stroke="currentColor"');
    expect(html).toContain("lucide-esma");
  });

  it("supports custom className and size", () => {
    const html = renderToString(<EsmaIcon className="h-5 w-5 text-emerald-500" size={20} />);
    expect(html).toContain('width="20"');
    expect(html).toContain('height="20"');
    expect(html).toContain("h-5 w-5 text-emerald-500");
  });

  it("renders the red filled heart with separation from the infinity ribbon", () => {
    const html = renderToString(<EsmaIcon />);
    expect(html).toContain('fill="#ef4444"');
    expect(html).toContain('stroke="#dc2626"');
    expect(html).toContain("M 12 2.6");
    expect(html).toContain("M 10.4 14");
  });
});
