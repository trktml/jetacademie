import { describe, expect, it } from "bun:test";
import React from "react";
import { renderToString } from "react-dom/server";
import { BellLamp } from "./bell-lamp";

describe("BellLamp Component", () => {
  it("should render all structural bell elements required by specification", () => {
    const html = renderToString(<BellLamp isOn={true} onToggle={() => {}} />);

    expect(html).toContain("bell-lamp-scope");
    expect(html).toContain("ceiling-mount");
    expect(html).toContain("bell-container");
    expect(html).toContain("rope");
    expect(html).toContain("bell-top");
    expect(html).toContain("bell-base");
    expect(html).toContain("shadow-l1");
    expect(html).toContain("shadow-l2");
    expect(html).toContain("left-glow");
    expect(html).toContain("left-glow2");
    expect(html).toContain("r-glow");
    expect(html).toContain("r-glow2");
    expect(html).toContain("mid-ring");
    expect(html).toContain("glow");
    expect(html).toContain("glow2");
    expect(html).toContain("bell-buff");
    expect(html).toContain("bell-btm");
    expect(html).toContain("bell-ring-container");
    expect(html).toContain("bell-ring");
    expect(html).toContain("bell-rays");
    expect(html).toContain("volumetric");
    expect(html).toContain("vl");
    expect(html).toContain("vr");
  });

  it("should omit 'off' class when isOn is true", () => {
    const html = renderToString(<BellLamp isOn={true} onToggle={() => {}} />);
    expect(html).toContain('class="bell-container "');
    expect(html).toContain('aria-pressed="true"');
    expect(html).toContain('aria-label="Lambayı Kapat"');
  });

  it("should append 'off' class when isOn is false", () => {
    const html = renderToString(<BellLamp isOn={false} onToggle={() => {}} />);
    expect(html).toContain("bell-container off");
    expect(html).toContain('aria-pressed="false"');
    expect(html).toContain('aria-label="Lambayı Aç"');
  });

  it("should pass custom className to outer wrapper", () => {
    const html = renderToString(
      <BellLamp isOn={true} onToggle={() => {}} className="custom-lamp" />
    );
    expect(html).toContain("custom-lamp");
    expect(html).toContain("bell-lamp-scope");
  });
});
