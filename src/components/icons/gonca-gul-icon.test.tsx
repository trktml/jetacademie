import { describe, expect, it } from "bun:test";
import React from "react";
import { renderToString } from "react-dom/server";
import { GoncaGulIcon } from "./gonca-gul-icon";

describe("GoncaGulIcon", () => {
  it("renders as an SVG element with Lucide attributes", () => {
    const html = renderToString(<GoncaGulIcon />);
    expect(html).toContain("<svg");
    expect(html).toContain('viewBox="0 0 24 24"');
    expect(html).toContain('stroke="currentColor"');
    expect(html).toContain("lucide-gonca-gul");
  });

  it("supports custom className and size", () => {
    const html = renderToString(<GoncaGulIcon className="h-5 w-5 text-blue-500" size={20} />);
    expect(html).toContain('width="20"');
    expect(html).toContain('height="20"');
    expect(html).toContain("h-5 w-5 text-blue-500");
  });

  it("preserves distinctive rose and green colors for Efendimiz", () => {
    const html = renderToString(<GoncaGulIcon />);
    expect(html).toContain('fill="#dd6472"');
    expect(html).toContain('fill="#d1525c"');
    expect(html).toContain('fill="#1daa6a"');
  });
});
