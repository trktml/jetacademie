import { describe, expect, it, mock } from "bun:test";
import React from "react";

mock.module("@/app/mufredat/actions", () => ({
  markEntryAsRead: mock(async () => ({ entryId: "test" })),
}));

import { renderToString } from "react-dom/server";
import { CurriculumArchive } from "./curriculum-archive";

describe("CurriculumArchive Component", () => {
  it("should render fixed capsule navigation with 9 category items", () => {
    const html = renderToString(
      <CurriculumArchive initialCompletedEntryIds={[]} isSignedIn={false} />
    );

    expect(html).toContain('class="archive-fixed-capsule"');
    expect(html).toContain('aria-label="Müfredat Hızlı Menü"');

    // Verify all 9 short labels are present in the capsule navigation
    expect(html).toContain('<span class="archive-capsule-label">Ayet</span>');
    expect(html).toContain('<span class="archive-capsule-label">Hadis</span>');
    expect(html).toContain('<span class="archive-capsule-label">Siyer</span>');
    expect(html).toContain('<span class="archive-capsule-label">Sahabe</span>');
    expect(html).toContain('<span class="archive-capsule-label">Risale</span>');
    expect(html).toContain('<span class="archive-capsule-label">Dinleme</span>');
    expect(html).toContain('<span class="archive-capsule-label">Pırlanta</span>');
    expect(html).toContain('<span class="archive-capsule-label">İlmihal</span>');
    expect(html).toContain('<span class="archive-capsule-label">Adab</span>');
  });

  it("should highlight the default active category in capsule navigation", () => {
    const html = renderToString(
      <CurriculumArchive initialCompletedEntryIds={[]} isSignedIn={false} />
    );

    expect(html).toContain(
      'class="archive-capsule-item" data-active="true" aria-current="true" aria-label="Ayet"'
    );
  });

  it("should render all 9 category sections vertically in the feed", () => {
    const html = renderToString(
      <CurriculumArchive initialCompletedEntryIds={[]} isSignedIn={false} />
    );

    expect(html).toContain('class="archive-feed"');
    expect(html).toContain('id="ayet"');
    expect(html).toContain('id="hadis"');
    expect(html).toContain('id="siyer"');
    expect(html).toContain('id="sahabe-kissalari"');
    expect(html).toContain('id="risale"');
    expect(html).toContain('id="hocaefendi-dinleme"');
    expect(html).toContain('id="pirlanta"');
    expect(html).toContain('id="ilmihal"');
    expect(html).toContain('id="adab-i-muaseret"');

    // Check headings
    expect(html).toContain(">Ayet</h2>");
    expect(html).toContain(">Hadis</h2>");
    expect(html).toContain(">Siyer</h2>");
    expect(html).toContain(">Sahabe kıssaları</h2>");
    expect(html).toContain(">Risale</h2>");
    expect(html).toContain(">Hocaefendi dinleme</h2>");
    expect(html).toContain(">Pırlanta</h2>");
    expect(html).toContain(">İlmihal</h2>");
    expect(html).toContain(">Adab-ı Muaşeret</h2>");
  });

  it("should render resource badges for PDF and Audio categories", () => {
    const html = renderToString(
      <CurriculumArchive initialCompletedEntryIds={[]} isSignedIn={false} />
    );

    expect(html).toContain('<span class="archive-resource-badge">PDF</span>');
    expect(html).toContain('<span class="archive-resource-badge">AUDIO</span>');
  });

  it("should render entries vertically with proper status indicators", () => {
    const sampleEntries = [
      {
        id: "hadis-1",
        categoryId: "hadis" as const,
        month: 1,
        week: 1,
        year: 2026,
        title: "Niyet ve İhlas Hadisi",
        body: "Ameller niyetlere göredir...",
      },
      {
        id: "hadis-2",
        categoryId: "hadis" as const,
        month: 1,
        week: 2,
        year: 2026,
        title: "İman ve İslam Hadisi",
        body: "Cibril hadisi açıklaması...",
      },
    ];

    // First entry completed, second entry is current
    const html = renderToString(
      <CurriculumArchive
        initialCompletedEntryIds={["hadis-1"]}
        isSignedIn={true}
        customEntries={sampleEntries}
      />
    );

    expect(html).toContain("Niyet ve İhlas Hadisi");
    expect(html).toContain("İman ve İslam Hadisi");
    expect(html).toContain("Okundu");
    expect(html).toContain("Sıradaki");
    expect(html).toContain("Okundu işaretle");
    expect(html).toContain("1 / 2 tamamlandı");
  });
});
