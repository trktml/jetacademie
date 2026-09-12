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

  it("should render physical archive drawer elements (casing, top trim, labelplates, handles, rails)", () => {
    const html = renderToString(
      <CurriculumArchive initialCompletedEntryIds={[]} isSignedIn={false} />
    );

    // Archive drawer casing
    expect(html).toContain("archive-drawer");
    expect(html).toContain("archive-drawer-top-trim");
    expect(html).toContain("archive-drawer-labelplate");
    expect(html).toContain("archive-drawer-handle");
    expect(html).toContain("archive-drawer-rails");

    // Drawer index codes
    expect(html).toContain("ÇEKMECE #01 · AYET ARŞİVİ");
    expect(html).toContain("ÇEKMECE #02 · HADİS ARŞİVİ");
  });

  it("should render physical folder tabs with active and locked stack states", () => {
    const html = renderToString(
      <CurriculumArchive initialCompletedEntryIds={[]} isSignedIn={false} />
    );

    // Active folder tab
    expect(html).toContain("archive-folder-tab--active");
    expect(html).toContain("Eylül-1 · 1. Hafta Dosyası");

    // Locked behind folder tab
    expect(html).toContain("archive-folder-tab--locked");
    expect(html).toContain("Eylül-2 · 2. Hafta (Kilitli Yığın)");
  });

  it("should render locked stack notice enforcing sequential unlock", () => {
    const html = renderToString(
      <CurriculumArchive initialCompletedEntryIds={[]} isSignedIn={false} />
    );

    expect(html).toContain("archive-locked-stack-notice");
    expect(html).toContain(
      "Bu dosya yığının arkasında kilitli bekliyor. Açmak için önce sıradaki içeriği tamamlamalısınız."
    );
    expect(html).toContain("Okuyunca bir sonraki haftaya / alttaki klasöre geçebilirsiniz.");
  });

  it("should render drawer controls with Geçmiş (History) button and completion count", () => {
    const html = renderToString(
      <CurriculumArchive initialCompletedEntryIds={["hadis-eylul-1"]} isSignedIn={true} />
    );

    expect(html).toContain("archive-drawer-history-btn");
    // Hadis should have Geçmiş (1)
    expect(html).toContain("Geçmiş (1)");
    // Ayet should have Geçmiş (0)
    expect(html).toContain("Geçmiş (0)");
  });

  it("should render past shelf when category has partially completed entries", () => {
    const html = renderToString(
      <CurriculumArchive initialCompletedEntryIds={["hadis-eylul-1"]} isSignedIn={true} />
    );

    expect(html).toContain("archive-past-shelf");
    expect(html).toContain("1 dosya tamamlandı ve arşive kaldırıldı");
    expect(html).toContain("Geçmişi İncele →");
  });

  it("should render all-completed celebratory state when all entries in a drawer are completed", () => {
    const html = renderToString(
      <CurriculumArchive
        initialCompletedEntryIds={["ayet-eylul-1", "ayet-eylul-2"]}
        isSignedIn={true}
      />
    );

    expect(html).toContain("archive-all-completed");
    expect(html).toContain("Tüm Ayet Dosyaları Tamamlandı!");
    expect(html).toContain("Geçmiş Arşiv");
  });

  it("should assign sequential data-depth attributes to locked folders in multi-item stack", () => {
    const multiEntries = [
      {
        id: "ayet-eylul-1",
        categoryId: "ayet" as const,
        month: 9,
        week: 1,
        year: 2026,
        title: "Ayet 1",
      },
      {
        id: "ayet-eylul-2",
        categoryId: "ayet" as const,
        month: 9,
        week: 2,
        year: 2026,
        title: "Ayet 2",
      },
      {
        id: "ayet-eylul-3",
        categoryId: "ayet" as const,
        month: 9,
        week: 3,
        year: 2026,
        title: "Ayet 3",
      },
    ];

    const html = renderToString(
      <CurriculumArchive
        initialCompletedEntryIds={[]}
        isSignedIn={false}
        customEntries={multiEntries}
      />
    );

    // First entry is active (front)
    expect(html).toContain('data-status="current"');
    // Behind entries should have sequential data-depth 1 and 2
    expect(html).toContain('data-depth="1"');
    expect(html).toContain('data-depth="2"');
    expect(html).toContain('role="button"');
    expect(html).toContain('tabindex="0"');
    expect(html).toContain('aria-label="Ayet 2 (Kilitli klasör)"');
    expect(html).toContain('aria-label="Ayet 3 (Kilitli klasör)"');
  });
});
