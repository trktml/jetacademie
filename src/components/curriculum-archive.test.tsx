import { describe, expect, it } from "bun:test";
import React from "react";
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

  it("should render horizontal scroll hint buttons for mobile overflow affordance", () => {
    const html = renderToString(
      <CurriculumArchive initialCompletedEntryIds={[]} isSignedIn={false} />
    );

    expect(html).toContain('class="archive-capsule-scroll-hint archive-capsule-scroll-hint--left"');
    expect(html).toContain('aria-label="Önceki kategoriler"');
    expect(html).toContain(
      'class="archive-capsule-scroll-hint archive-capsule-scroll-hint--right"'
    );
    expect(html).toContain('aria-label="Daha fazla kategori"');
  });

  it("should highlight the default active category in capsule navigation", () => {
    const html = renderToString(
      <CurriculumArchive initialCompletedEntryIds={[]} isSignedIn={false} />
    );

    expect(html).toContain(
      'class="archive-capsule-item" data-active="true" aria-current="true" aria-label="Ayet"'
    );
  });

  it("should render every category as a vertically scrollable feed", () => {
    const html = renderToString(
      <CurriculumArchive initialCompletedEntryIds={[]} isSignedIn={false} />
    );

    // Every category remains in the document instead of being hidden by the navigation.
    expect(html).toContain('id="ayet"');
    expect(html).toContain(">Ayet</h2>");
    expect(html).toContain('id="hadis"');
    expect(html).toContain('id="siyer"');
    expect(html).toContain('id="risale"');
  });

  it("should render elegant dividers between categories to separate them clearly", () => {
    const html = renderToString(
      <CurriculumArchive initialCompletedEntryIds={[]} isSignedIn={false} />
    );

    // Separators between 9 categories should be exactly 8
    const separatorCount = (html.match(/class="archive-category-separator"/g) || []).length;
    expect(separatorCount).toBe(8);

    expect(html).toContain(
      'class="archive-category-separator" role="separator" aria-hidden="true"'
    );
    expect(html).toContain('class="archive-category-divider-line"');
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
    // Complete hadis-eylul-1: Ayet should still be 0/16 completed with first entry as Sıradaki
    const ayetHtml = renderToString(
      <CurriculumArchive
        initialCompletedEntryIds={["hadis-eylul-1"]}
        isSignedIn={true}
        initialCategoryId="ayet"
      />
    );
    expect(ayetHtml).toContain("0 / 16 tamamlandı");
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

    // Ayet should be 1/16 completed
    expect(html).toContain("1 / 16 tamamlandı");
    // Past shelf is omitted in favor of clean header button
    expect(html).not.toContain("archive-past-shelf");
    expect(html).toContain("Geçmiş (1)");
    // Second entry is now active (Sıradaki)
    expect(html).toContain("Sıradaki");
  });

  it("should omit the decorative outer archive casing", () => {
    const html = renderToString(
      <CurriculumArchive initialCompletedEntryIds={[]} isSignedIn={false} />
    );

    expect(html).not.toContain('class="archive-drawer"');
    expect(html).not.toContain('class="archive-folder-header archive-drawer-top-trim"');
    expect(html).not.toContain('class="archive-folder-code"');
    expect(html).not.toContain("KLASÖR #01 · AYET ARŞİVİ");

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

  it("should render locked behind card with locked status without verbose clutter", () => {
    const html = renderToString(
      <CurriculumArchive initialCompletedEntryIds={[]} isSignedIn={false} />
    );

    expect(html).toContain("archive-folder-card--locked");
    expect(html).toContain("Kilitli");
    expect(html).not.toContain(
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

  it("should omit past shelf and rely on header history button when category has partially completed entries", () => {
    const html = renderToString(
      <CurriculumArchive
        initialCompletedEntryIds={["ayet-eylul-1"]}
        isSignedIn={true}
        initialCategoryId="ayet"
      />
    );

    expect(html).not.toContain("archive-past-shelf");
    expect(html).not.toContain("Geçmişi İncele →");
    expect(html).toContain("Geçmiş (1)");
  });

  it("should render all-completed celebratory state when all entries in a drawer are completed", () => {
    const html = renderToString(
      <CurriculumArchive
        initialCompletedEntryIds={["hadis-eylul-1", "hadis-eylul-2"]}
        isSignedIn={true}
        initialCategoryId="hadis"
      />
    );

    expect(html).toContain("archive-all-completed");
    expect(html).toContain("Tüm Hadis Dosyaları Tamamlandı!");
    expect(html).not.toContain("archive-all-completed__desc");
    expect(html).not.toContain("Bu çekmecedeki tüm haftalık okumaları başarıyla tamamladınız.");
    expect(html).toContain("Geçmiş (2)");
    // No duplicate read-status badge inside completed cards
    expect(html).not.toContain("read-status--complete");
  });

  it("should render queue note with natural Turkish phrasing without drawer metaphor", () => {
    const html = renderToString(
      <CurriculumArchive
        initialCompletedEntryIds={[]}
        isSignedIn={false}
        initialCategoryId="ayet"
      />
    );

    // Ayet has 16 items; 4 are in immediate stack, remaining 12 are queued
    expect(html).toContain("Sırada bekleyen 12 dosya daha var");
    expect(html).not.toContain("Bu çekmecede");
  });

  it("should render completed entries in reverse chronological order (latest completed first)", () => {
    const html = renderToString(
      <CurriculumArchive
        initialCompletedEntryIds={["ayet-eylul-1", "ayet-eylul-2", "ayet-eylul-3"]}
        isSignedIn={true}
        initialCategoryId="ayet"
        initialHistoryViewCategoryIds={{ ayet: true }}
      />
    );

    expect(html).toContain("Tamamlanan Dosyalar");
    expect(html).toContain("Geri Dön");
    // Verify there is only one "Geri Dön" button (the top header button), avoiding duplicate buttons
    const geriDonMatches = (html.match(/Geri Dön/g) || []).length;
    expect(geriDonMatches).toBe(1);
    expect(html).not.toContain("Geçmiş Arşiv Dosyaları");
    expect(html).not.toContain("arşive kaldırıldı");
    expect(html).not.toContain("archive-history-ledger__desc");
    expect(html).not.toContain("read-status--complete");
    // eylul-3 title appears before eylul-1 in reverse order
    const idx3 = html.indexOf("Bakara Suresi 2:286 — Sorumluluk ve Dua");
    const idx1 = html.indexOf("Bakara Suresi 2:152 — Beni Anın");
    expect(idx3).toBeGreaterThan(-1);
    expect(idx1).toBeGreaterThan(-1);
    expect(idx3).toBeLessThan(idx1);
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

  it("should omit previous and next drawer navigation controls", () => {
    const html = renderToString(
      <CurriculumArchive initialCompletedEntryIds={[]} isSignedIn={false} />
    );

    expect(html).not.toContain('class="archive-drawer-footer"');
    expect(html).not.toContain("Önceki:");
    expect(html).not.toContain("Sonraki:");
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

    // Children of behind card should be display: none to avoid any scrollable layout overflow
    expect(css).toContain(
      ".archive-folder-stack .archive-stack-behind > :not(.archive-folder-tab) {\n  display: none;\n}"
    );
  });

  it("should assign relative depth 1 to behind card in all-completed view and preserve completed tab styling", () => {
    const html = renderToString(
      <CurriculumArchive
        initialCompletedEntryIds={["hadis-eylul-1", "hadis-eylul-2"]}
        isSignedIn={true}
        initialCategoryId="hadis"
      />
    );

    // One card is front active, other is stacked behind with relative depth 1
    expect(html).toContain("archive-folder-card--active");
    expect(html).toContain("archive-stack-behind");
    expect(html).toContain('data-depth="1"');
    // Both tabs retain completed styling
    expect(html).toContain("archive-folder-tab--completed");
  });

  it("should render 'Okunmadı Olarak İşaretle' button on the latest completed entry in history view", () => {
    const html = renderToString(
      <CurriculumArchive
        initialCompletedEntryIds={["ayet-eylul-1"]}
        isSignedIn={true}
        initialCategoryId="ayet"
        initialHistoryViewCategoryIds={{ ayet: true }}
      />
    );

    expect(html).toContain("archive-undo-button");
    expect(html).toContain("Okunmadı Olarak İşaretle");
    expect(html).toContain(
      'aria-label="Bakara Suresi 2:152 — Beni Anın dosyasını okunmadı olarak işaretle"'
    );
  });

  it("should render 'Okunmadı Olarak İşaretle' button only on the first (latest) completed entry when multiple exist", () => {
    const html = renderToString(
      <CurriculumArchive
        initialCompletedEntryIds={["ayet-eylul-1", "ayet-eylul-2"]}
        isSignedIn={true}
        initialCategoryId="ayet"
        initialHistoryViewCategoryIds={{ ayet: true }}
      />
    );

    // Ayet 2 is latest (rendered first in reverse order)
    expect(html).toContain(
      'aria-label="Âl-i İmran 3:159 — Şûrâ ve Tevekkül dosyasını okunmadı olarak işaretle"'
    );
    // Ayet 1 is not latest -> should not have an undo button
    expect(html).not.toContain(
      'aria-label="Bakara Suresi 2:152 — Beni Anın dosyasını okunmadı olarak işaretle"'
    );

    // Only one undo button should exist in this category's history view
    const undoBtnCount = (html.match(/class="secondary-button archive-undo-button"/g) || []).length;
    expect(undoBtnCount).toBe(1);
  });

  it("should render dedicated history screen without other categories underneath when history view is open", () => {
    const html = renderToString(
      <CurriculumArchive
        initialCompletedEntryIds={["ayet-eylul-1"]}
        isSignedIn={true}
        initialCategoryId="ayet"
        initialHistoryViewCategoryIds={{ ayet: true }}
      />
    );

    // Dedicated history screen should be rendered
    expect(html).toContain('class="archive-main-column archive-main-column--history"');
    expect(html).toContain('class="archive-history-screen"');
    expect(html).toContain('class="archive-history-header"');

    // Other categories must NOT be present in history mode to prevent mixing/confusion
    expect(html).not.toContain('id="hadis"');
    expect(html).not.toContain('id="siyer"');
    expect(html).not.toContain('id="risale"');
    expect(html).not.toContain('class="archive-category-separator"');
  });

  it("should render 'Git' button and quick selection dropdown with completed entries in history toolbar", () => {
    const html = renderToString(
      <CurriculumArchive
        initialCompletedEntryIds={["ayet-eylul-1", "ayet-eylul-2"]}
        isSignedIn={true}
        initialCategoryId="ayet"
        initialHistoryViewCategoryIds={{ ayet: true }}
      />
    );

    // History jump toolbar
    expect(html).toContain('class="archive-history-toolbar"');
    expect(html).toContain("Hızlı Seçim:");

    // Select dropdown with options
    expect(html).toContain('id="history-jump-select"');
    expect(html).toContain('value="ayet-eylul-1"');
    expect(html).toContain('value="ayet-eylul-2"');
    expect(html).toContain("Bakara Suresi 2:152 — Beni Anın");
    expect(html).toContain("Âl-i İmran 3:159 — Şûrâ ve Tevekkül");

    // The prominent "Git" button
    expect(html).toContain('class="archive-history-jump__btn"');
    expect(html).toContain("<span>Git</span>");
    expect(html).toContain('aria-label="Seçilen geçmiş dosyasına git"');
  });

  it("should render quick jump chips for En Yeni, En Eski and month pills when multiple entries exist", () => {
    const html = renderToString(
      <CurriculumArchive
        initialCompletedEntryIds={["ayet-eylul-1", "ayet-eylul-2"]}
        isSignedIn={true}
        initialCategoryId="ayet"
        initialHistoryViewCategoryIds={{ ayet: true }}
      />
    );

    expect(html).toContain('class="archive-history-chips"');
    expect(html).toContain("En Yeni");
    expect(html).toContain("En Eski");
    expect(html).toContain("Eylül (2)");
  });

  it("should assign id='history-card-[id]' to completed cards for jump targeting", () => {
    const html = renderToString(
      <CurriculumArchive
        initialCompletedEntryIds={["ayet-eylul-1"]}
        isSignedIn={true}
        initialCategoryId="ayet"
        initialHistoryViewCategoryIds={{ ayet: true }}
      />
    );

    expect(html).toContain('id="history-card-ayet-eylul-1"');
  });
});
