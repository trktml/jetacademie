import { describe, expect, it } from "bun:test";
import React from "react";
import { renderToString } from "react-dom/server";
import { HeroTree } from "./hero-tree";

describe("HeroTree Component", () => {
  it("should render accessible heading and tree image", () => {
    const html = renderToString(<HeroTree />);

    expect(html).toContain("Jet Academie — Müfredat ve hedef takip sistemi");
    expect(html).toContain("Jet Academie kırmızı ilim ağacı");
    expect(html).toContain("bell-scene");
    expect(html).toContain("bell-container");
  });

  it("should render all 4 core navigation links with correct hrefs", () => {
    const html = renderToString(<HeroTree />);

    expect(html).toContain('href="/mufredat"');
    expect(html).toContain('href="/mufredat-kitaplari"');
    expect(html).toContain('href="/hedefler"');
    expect(html).toContain('href="/kampanyalar"');
  });

  it("should render the titles including responsive multi-line for Müfredat Kitapları", () => {
    const html = renderToString(<HeroTree />);

    expect(html).toContain("Müfredat");
    expect(html).toContain("Kitapları");
    expect(html).toContain("Hedefler");
    expect(html).toContain("Kampanyalar");
  });

  it("should keep the landing navigation free of redundant supporting copy", () => {
    const html = renderToString(<HeroTree />);

    expect(html).not.toContain("Haftalık ders akışı");
    expect(html).not.toContain("Kaynaklara hızlı erişim");
    expect(html).not.toContain("İlerlemeni planla");
    expect(html).not.toContain("Birlikte harekete geç");
    expect(html).not.toContain("Bilgiden hikmete uzanan yolculuk");
    expect(html).not.toContain("Dört bölüm, tek öğrenme düzeni");
  });

  it("should render responsive navigation without fixed-coordinate telemetry", () => {
    const html = renderToString(<HeroTree />);

    expect(html).toContain("hero-desktop-layout");
    expect(html).toContain("hero-mobile-nav");
    expect(html).toContain("hero-nav-card__port");
    expect(html).not.toContain("telemetry-flow");
    expect(html).not.toContain('viewBox="0 0 460 613.33"');
  });
});
