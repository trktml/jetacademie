import { describe, expect, it } from "bun:test";
import React from "react";
import { renderToString } from "react-dom/server";
import { HeroShowcase } from "./hero-showcase";
import { CurriculumSection } from "./curriculum-section";
import { TargetsSection } from "./targets-section";

describe("HeroShowcase Component", () => {
  it("should render large Jet Academie brand typography and logo mark", () => {
    const html = renderToString(<HeroShowcase />);

    expect(html).toContain("Jet Academie");
    expect(html).toContain("Thinking in Systems");
    expect(html).toContain("logoBg");
    expect(html).toContain("jetMark");
  });

  it("should render the crimson red tree image reference and bell lamp", () => {
    const html = renderToString(<HeroShowcase />);

    expect(html).toContain("red-tree.jpg");
    expect(html).toContain("bell-container");
    expect(html).toContain("rope");
    expect(html).toContain("volumetric");
  });

  it("should render mandatory navigation boxes for Müfredat and Hedefler with semantic category icons", () => {
    const html = renderToString(<HeroShowcase />);

    expect(html).toContain("MÜFREDAT");
    expect(html).toContain('href="#mufredat"');
    expect(html).toContain("HEDEFLER");
    expect(html).toContain('href="#hedefler"');
    expect(html).toContain("AI AJANLARI");
    expect(html).toContain("MİMARİ &amp; DEPLOY");

    // Must not use generic CheckCircle2 for all cards; should use distinctive icons
    expect(html).not.toContain("lucide-check-circle-2");
  });

  it("should render technical metadata and noise grain layer", () => {
    const html = renderToString(<HeroShowcase />);

    expect(html).toContain("grain");
    expect(html).toContain("/JETACADEMIE");
    expect(html).toContain("AYDINLATMA: AKTİF");
  });

  it("should render tactile interactive toggle button with accessibility standards", () => {
    const html = renderToString(<HeroShowcase />);

    expect(html).toContain("button lamp-toggle-btn");
    expect(html).toContain("aria-label=");
    expect(html).toContain("Aydınlatma: Açık");
  });

  it("should apply lg responsive breakpoint for floating cards and lg:hidden for mobile/tablet grid", () => {
    const html = renderToString(<HeroShowcase />);

    // Floating cards must be hidden on mobile/tablet viewports (< 1024px) to prevent tree collision
    expect(html).toContain("hidden w-[190px] lg:block xl:w-[210px]");
    expect(html).toContain("grid-cols-1 gap-3 sm:grid-cols-2 lg:hidden");
  });

  it("should render SVG telemetry connector lines leading directly to branch coordinates with glowing nodes", () => {
    const html = renderToString(<HeroShowcase />);

    // SVG Telemetry connector overlay
    expect(html).toContain('viewBox="0 0 460 613.33"');
    expect(html).toContain('overflow="visible"');
    expect(html).toContain('id="telemetry-glow"');

    // Angled path connector segments leading from card boundaries to branch coordinates
    expect(html).toContain('d="M -20 180 L 76 180 L 144 210"');
    expect(html).toContain('d="M -20 351 L 48 351 L 118 265"');
    expect(html).toContain('d="M 480 180 L 384 180 L 318 224"');
    expect(html).toContain('d="M 480 351 L 412 351 L 338 266"');

    // Glowing branch terminal dots with radar pings
    expect(html).toContain("left:31.3%;top:34.2%");
    expect(html).toContain("left:25.6%;top:43.2%");
    expect(html).toContain("left:69.1%;top:36.5%");
    expect(html).toContain("left:73.5%;top:43.4%");
    expect(html).toContain("animate-ping");
  });
});

describe("CurriculumSection Component", () => {
  it("should render curriculum section with id mufredat and four modules", () => {
    const html = renderToString(<CurriculumSection />);

    expect(html).toContain('id="mufredat"');
    expect(html).toContain("MÜFREDAT");
    expect(html).toContain("MODÜL");
    expect(html).toContain("Next.js 16 &amp; React 19 Mimarisi");
    expect(html).toContain("Bun &amp; SQLite ile Ultra Hızlı Altyapı");
    expect(html).toContain("Yapay Zeka Ajanları &amp; LLM Mimarisi");
    expect(html).toContain("Dokploy, Docker &amp; Cloud Canlıya Alma");
  });
});

describe("TargetsSection Component", () => {
  it("should render targets section with id hedefler and learning milestones", () => {
    const html = renderToString(<TargetsSection />);

    expect(html).toContain('id="hedefler"');
    expect(html).toContain("HEDEFLER");
    expect(html).toContain("Üretim Seviyesinde Sistem Mimarisi");
    expect(html).toContain("Otonom AI Ajanları Entegrasyonu");
    expect(html).toContain("Mobil-Öncelikli PWA Standartları");
    expect(html).toContain("Bağımsız Hosting &amp; Dokploy Dağıtımı");
  });
});
