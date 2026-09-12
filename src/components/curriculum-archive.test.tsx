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

  it("should render active category archive folder deck directly without endless vertical feed", () => {
    const html = renderToString(
      <CurriculumArchive initialCompletedEntryIds={[]} isSignedIn={false} />
    );

    // Active category deck is rendered directly
    expect(html).toContain('id="ayet"');
    expect(html).toContain(">Ayet</h2>");

    // Other categories are NOT stacked vertically down the DOM ("alt alta olmayacak")
    expect(html).not.toContain('id="hadis"');
    expect(html).not.toContain('id="siyer"');
    expect(html).not.toContain('id="risale"');
  });

  it("should render resource badges for PDF and Audio categories when active", () => {
    const risaleHtml = renderToString(
      <CurriculumArchive
        initialCompletedEntryIds={[]}
        isSignedIn={false}
        initialCategoryId="risale"
      />
    );
    expect(risaleHtml).toContain('<span class="archive-resource-badge">PDF</span>');

    const audioHtml = renderToString(
      <CurriculumArchive
        initialCompletedEntryIds={[]}
        isSignedIn={false}
        initialCategoryId="hocaefendi-dinleme"
      />
    );
    expect(audioHtml).toContain('<span class="archive-resource-badge">AUDIO</span>');
  });

  it("should render sample entries with Eylül-N timing format", () => {
    const html = renderToString(
      <CurriculumArchive initialCompletedEntryIds={[]} isSignedIn={false} />
    );

    // Verify timing format: "Eylül-1", "Eylül-2"
    expect(html).toContain("Eylül-1");
    expect(html).toContain("Eylül-2");

    // Active category should show "0 / 2 tamamlandı"
    expect(html).toContain("0 / 2 tamamlandı");
  });

  it("should render real sample entries with correct titles for active category", () => {
    const ayetHtml = renderToString(
      <CurriculumArchive initialCompletedEntryIds={[]} isSignedIn={false} />
    );
    expect(ayetHtml).toContain("Bakara Suresi 2:152");
    expect(ayetHtml).toContain("Âl-i İmran 3:159");

    const hadisHtml = renderToString(
      <CurriculumArchive
        initialCompletedEntryIds={[]}
        isSignedIn={false}
        initialCategoryId="hadis"
      />
    );
    expect(hadisHtml).toContain("Niyet Hadisi");
    expect(hadisHtml).toContain("Kolaylaştırın Hadisi");
  });

  it("should track completion independently per category", () => {
    // Complete hadis-eylul-1: Ayet should still be 0/2 completed with first entry as Sıradaki
    const ayetHtml = renderToString(
      <CurriculumArchive
        initialCompletedEntryIds={["hadis-eylul-1"]}
        isSignedIn={true}
        initialCategoryId="ayet"
      />
    );
    expect(ayetHtml).toContain("0 / 2 tamamlandı");
    expect(ayetHtml).toContain("Sıradaki");

    // Hadis category should show 1/2 completed
    const hadisHtml = renderToString(
      <CurriculumArchive
        initialCompletedEntryIds={["hadis-eylul-1"]}
        isSignedIn={true}
        initialCategoryId="hadis"
      />
    );
    expect(hadisHtml).toContain("1 / 2 tamamlandı");
  });

  it("should render entries with proper status when some are completed", () => {
    const html = renderToString(
      <CurriculumArchive
        initialCompletedEntryIds={["ayet-eylul-1"]}
        isSignedIn={true}
        initialCategoryId="ayet"
      />
    );

    // Ayet should be 1/2 completed
    expect(html).toContain("1 / 2 tamamlandı");
    // Past shelf indicates completed entry archived
    expect(html).toContain("1 dosya tamamlandı ve arşive kaldırıldı");
    // Second entry is now active (Sıradaki)
    expect(html).toContain("Sıradaki");
  });

  it("should render clean editorial archive folder classification header without fake serials or barcodes", () => {
    const html = renderToString(
      <CurriculumArchive initialCompletedEntryIds={[]} isSignedIn={false} />
    );

    // Archive folder casing and classification header
    expect(html).toContain("archive-drawer");
    expect(html).toContain("archive-folder-header");
    expect(html).toContain("archive-folder-code");
    expect(html).toContain("KLASÖR #01 · AYET ARŞİVİ");
    expect(html).toContain("KLASÖR 01 / 09");

    // No fake barcodes or fake AI serial numbers
    expect(html).not.toContain("||| | ||||");
    expect(html).not.toContain("REF: JET-01 // 2026");
    expect(html).not.toContain("FILE_01 //");
  });

  it("should render physical folder tabs with active and locked stack states", () => {
    const html = renderToString(
      <CurriculumArchive initialCompletedEntryIds={[]} isSignedIn={false} />
    );

    // Active folder tab
    expect(html).toContain("archive-folder-tab--active");
    expect(html).toContain("Eylül-1 · 1. Hafta");

    // Locked behind folder tab
    expect(html).toContain("archive-folder-tab--locked");
    expect(html).toContain("Eylül-2 · 2. Hafta");
    expect(html).not.toContain("(Kilitli Yığın)");
  });

  it("should render locked stack notice enforcing sequential unlock", () => {
    const html = renderToString(
      <CurriculumArchive initialCompletedEntryIds={[]} isSignedIn={false} />
    );

    expect(html).toContain("archive-locked-stack-notice");
    expect(html).toContain(
      "Bu dosya yığının arkasında kilitli bekliyor. Açmak için önce sıradaki içeriği tamamlamalısınız."
    );
  });

  it("should render drawer controls with Geçmiş (History) button and completion count", () => {
    const zeroHtml = renderToString(
      <CurriculumArchive initialCompletedEntryIds={[]} isSignedIn={true} initialCategoryId="ayet" />
    );
    expect(zeroHtml).toContain("archive-drawer-history-btn");
    expect(zeroHtml).toContain("Geçmiş (0)");

    const oneHtml = renderToString(
      <CurriculumArchive
        initialCompletedEntryIds={["ayet-eylul-1"]}
        isSignedIn={true}
        initialCategoryId="ayet"
      />
    );
    expect(oneHtml).toContain("Geçmiş (1)");
  });

  it("should render past shelf when category has partially completed entries", () => {
    const html = renderToString(
      <CurriculumArchive
        initialCompletedEntryIds={["ayet-eylul-1"]}
        isSignedIn={true}
        initialCategoryId="ayet"
      />
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
        initialCategoryId="ayet"
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

  it("should omit redundant horizontal rack bar in favor of clean capsule navigation", () => {
    const html = renderToString(
      <CurriculumArchive initialCompletedEntryIds={[]} isSignedIn={false} />
    );

    // Redundant horizontal rack bar is completely removed
    expect(html).not.toContain('class="archive-rack-container"');
    expect(html).not.toContain("ARŞİV DİZİNİ // JETACADEMIE DOSYA DOLABI");
  });

  it("should render drawer footer navigation controls between categories", () => {
    const html = renderToString(
      <CurriculumArchive initialCompletedEntryIds={[]} isSignedIn={false} />
    );

    expect(html).toContain('class="archive-drawer-footer"');
    expect(html).toContain('class="archive-folder-nav-btn archive-folder-nav-btn--prev"');
    expect(html).toContain('class="archive-folder-nav-btn archive-folder-nav-btn--next"');
    expect(html).toContain("KLASÖR 01 / 09");
  });

  it("should handle multi-depth stack with 4 or more items gracefully", () => {
    const fourEntries = [
      { id: "a1", categoryId: "ayet" as const, month: 9, week: 1, year: 2026, title: "Ayet 1" },
      { id: "a2", categoryId: "ayet" as const, month: 9, week: 2, year: 2026, title: "Ayet 2" },
      { id: "a3", categoryId: "ayet" as const, month: 9, week: 3, year: 2026, title: "Ayet 3" },
      { id: "a4", categoryId: "ayet" as const, month: 9, week: 4, year: 2026, title: "Ayet 4" },
    ];

    const html = renderToString(
      <CurriculumArchive
        initialCompletedEntryIds={[]}
        isSignedIn={false}
        customEntries={fourEntries}
      />
    );

    expect(html).toContain('data-depth="1"');
    expect(html).toContain('data-depth="2"');
    expect(html).toContain('data-depth="3"');
    expect(html).toContain('aria-label="Ayet 4 (Kilitli klasör)"');
  });

  it("should not render duplicate category eyebrow in drawer header", () => {
    const html = renderToString(
      <CurriculumArchive initialCompletedEntryIds={[]} isSignedIn={false} />
    );

    expect(html).not.toContain("archive-category-eyebrow");
    expect(html).not.toContain("KATEGORİ 01");
  });

  it("should render front active card and behind card in physical stack with matching dimension structure", async () => {
    const html = renderToString(
      <CurriculumArchive
        initialCompletedEntryIds={[]}
        isSignedIn={false}
        initialCategoryId="hadis"
      />
    );

    expect(html).toContain("archive-folder-card--active");
    expect(html).toContain("archive-stack-behind");
    expect(html).toContain('data-depth="1"');

    // Verify globals.css rules enforce identical dimensions and no awkward protrusion
    const fs = await import("fs/promises");
    const css = await fs.readFile("src/app/globals.css", "utf-8");

    // Container should not have artificial fixed min-height forcing protrusion
    expect(css).not.toContain("min-height: 420px;");
    expect(css).not.toContain("min-height: 440px;");

    // .archive-stack-behind should have height: 100% and width: 100% to match front card
    expect(css).toContain("height: 100%;");
    expect(css).toContain("width: 100%;");
  });
});
