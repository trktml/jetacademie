import { describe, expect, it } from "bun:test";
import React from "react";
import { renderToString } from "react-dom/server";
import { HeroTree } from "./hero-tree";

describe("HeroTree Component", () => {
  it("should render Jet Academie brand typography and logo", () => {
    const html = renderToString(<HeroTree />);

    expect(html).toContain("Jet Academie");
    expect(html).toContain("logoBg");
    expect(html).toContain("jetMark");
  });

  it("should render the crimson red tree image and bell lamp", () => {
    const html = renderToString(<HeroTree />);

    expect(html).toContain("red-tree.jpg");
    expect(html).toContain("bell-container");
    expect(html).toContain("rope");
    expect(html).toContain("volumetric");
  });

  it("should render spiritual curriculum subtitle", () => {
    const html = renderToString(<HeroTree />);

    expect(html).toContain("Manevi Gelişim");
    expect(html).toContain("İslami İlimler");
  });

  it("should render navigation links to curriculum module pages", () => {
    const html = renderToString(<HeroTree />);

    expect(html).toContain("/mufredat/akaid");
    expect(html).toContain("/mufredat/ibadet");
    expect(html).toContain("/mufredat/ahlak");
    expect(html).toContain("/mufredat/siyer");
    expect(html).toContain("Akaid");
    expect(html).toContain("İbadet");
  });

  it("should render noise grain layer and bell-scene container", () => {
    const html = renderToString(<HeroTree />);

    expect(html).toContain("grain");
    expect(html).toContain("bell-scene");
  });

  it("should render interactive bell lamp with accessibility", () => {
    const html = renderToString(<HeroTree />);

    expect(html).toContain('role="button"');
    expect(html).toContain("aria-label=");
    expect(html).toContain("Lambayı Kapat");
    expect(html).toContain('aria-pressed="true"');
  });

  it("should render SVG telemetry connectors on desktop", () => {
    const html = renderToString(<HeroTree />);

    expect(html).toContain('viewBox="0 0 460 613.33"');
    expect(html).toContain('overflow="visible"');
    expect(html).toContain('id="telemetry-glow"');

    // Connector paths
    expect(html).toContain('d="M -20 180 L 76 180 L 144 210"');
    expect(html).toContain('d="M -20 351 L 48 351 L 118 265"');
    expect(html).toContain('d="M 480 180 L 384 180 L 318 224"');
    expect(html).toContain('d="M 480 351 L 412 351 L 338 266"');

    // Branch terminal positions
    expect(html).toContain("left:31.3%;top:34.2%");
    expect(html).toContain("left:25.6%;top:43.2%");
    expect(html).toContain("left:69.1%;top:36.5%");
    expect(html).toContain("left:73.5%;top:43.4%");
    expect(html).toContain("animate-ping");
  });

  it("should render mobile grid with all 6 curriculum modules", () => {
    const html = renderToString(<HeroTree />);

    // All 6 modules should appear
    expect(html).toContain("/mufredat/akaid");
    expect(html).toContain("/mufredat/ibadet");
    expect(html).toContain("/mufredat/ahlak");
    expect(html).toContain("/mufredat/siyer");
    expect(html).toContain("/mufredat/tefsir");
    expect(html).toContain("/mufredat/tasavvuf");
  });
});
