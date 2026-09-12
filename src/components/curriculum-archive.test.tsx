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

  it("should render sample entries with Eylül-N timing format", () => {
    const html = renderToString(
      <CurriculumArchive initialCompletedEntryIds={[]} isSignedIn={false} />
    );

    // Verify timing format: "Eylül-1", "Eylül-2"
    expect(html).toContain("Eylül-1");
    expect(html).toContain("Eylül-2");

    // Each category should show "0 / 2 tamamlandı"
    expect(html).toContain("0 / 2 tamamlandı");
  });

  it("should render real sample entries with correct titles", () => {
    const html = renderToString(
      <CurriculumArchive initialCompletedEntryIds={[]} isSignedIn={false} />
    );

    // Ayet
    expect(html).toContain("Bakara Suresi 2:152");
    expect(html).toContain("Âl-i İmran 3:159");

    // Hadis
    expect(html).toContain("Niyet Hadisi");
    expect(html).toContain("Kolaylaştırın Hadisi");

    // Siyer
    expect(html).toContain("İlk Vahiy ve Gizli Davet");

    // Sahabe (apostrophe is HTML-escaped by React's renderToString)
    expect(html).toContain("Sıddîk&#x27;ın Sadakati");

    // Risale
    expect(html).toContain("Birinci Söz");
    expect(html).toContain("İkinci Söz");
  });

  it("should track completion independently per category", () => {
    // Complete hadis-eylul-1, but ayet should remain independent
    const html = renderToString(
      <CurriculumArchive initialCompletedEntryIds={["hadis-eylul-1"]} isSignedIn={true} />
    );

    // Hadis should show 1 completed
    expect(html).toContain("1 / 2 tamamlandı");

    // The first ayet entry (ayet-eylul-1) should still be "current" (Sıradaki)
    expect(html).toContain("Sıradaki");
  });

  it("should render entries with proper status when some are completed", () => {
    const html = renderToString(
      <CurriculumArchive
        initialCompletedEntryIds={["ayet-eylul-1", "hadis-eylul-1", "hadis-eylul-2"]}
        isSignedIn={true}
      />
    );

    // Hadis should be 2/2
    expect(html).toContain("2 / 2 tamamlandı");
    // Ayet should be 1/2
    expect(html).toContain("1 / 2 tamamlandı");
    // Should have "Okundu" labels
    expect(html).toContain("Okundu");
  });
});
