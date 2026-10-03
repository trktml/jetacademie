import { describe, expect, it } from "bun:test";
import { renderToString } from "react-dom/server";
import { CurriculumWeeklyView } from "./curriculum-weekly-view";
import type { CurriculumEntry } from "@/lib/curriculum";

describe("CurriculumWeeklyView", () => {
  it("renders full authored content, all five sections and no completion controls or eagerly loaded media", () => {
    const entry: CurriculumEntry = {
      id: "weekly",
      grade: 1,
      categoryId: "konu",
      year: 2026,
      month: 9,
      week: 2,
      title: "Başlık",
      body: "## Açık ders\n\n**Tam içerik**",
      contentFormat: "markdown",
    };
    const html = renderToString(
      <CurriculumWeeklyView
        entries={[
          entry,
          {
            ...entry,
            id: "video",
            categoryId: "hocaefendi-dinleme",
            resourceUrl: "https://www.youtube.com/watch?v=abcdefghijk",
          },
          { ...entry, id: "pdf", categoryId: "ilmihal", pdfUrl: "/lesson.pdf" },
        ]}
        period={{ year: 2026, month: 9, week: 2 }}
        onPeriodChange={() => {}}
        genderSelector={<span>Erkek / Bayan</span>}
      />
    );
    expect(html).toContain("<strong>Tam içerik</strong>");
    expect(html).toContain("Açık ders");
    expect(html).toContain("weekly-title-esma");
    expect(html).toContain("weekly-title-adab-i-muaseret");
    expect(html).toContain("Bu hafta için yayımlanmış içerik bulunmuyor.");
    expect(html).toContain("Erkek / Bayan");
    expect(html).toContain("Videoyu aç");
    expect(html).toContain("PDF’yi oku");
    expect(html).toContain('class="weekly-status-badge"');
    expect(html).toContain("Bu görünümde ilerlemeniz değişmez");
    expect(html).toContain('class="sr-only"');
    expect(html).not.toContain('<h2 class="weekly-heading');
    expect(html).not.toContain("<iframe");
    expect(html).not.toContain("<canvas");
    expect(html).not.toContain("Okundu işaretle");
    expect(html).not.toContain("Kilitli");
  });
  it("shows an empty grade without inventing content", () => {
    const html = renderToString(
      <CurriculumWeeklyView
        entries={[]}
        period={null}
        onPeriodChange={() => {}}
        genderSelector={null}
      />
    );
    expect(html).toContain("Bu sınıf için yayımlanmış içerik bulunmuyor.");
  });

  it("renders Markdown topic lessons inside the shared topic reader", () => {
    const html = renderToString(
      <CurriculumWeeklyView
        entries={[
          {
            id: "g1-konu-eylul-1",
            grade: 1,
            categoryId: "konu",
            year: 2026,
            month: 9,
            week: 1,
            title: "Bu Eser Neden Hâlâ Okunuyor?",
            contentFormat: "markdown",
            body: "# Bu Eser Neden Hâlâ Okunuyor?\n\nBir kitap düşünün; yıllar sonra bile okunmaya devam ediyor.",
          },
        ]}
        period={{ year: 2026, month: 9, week: 1 }}
        genderSelector={null}
      />
    );

    expect(html).toContain('class="konu-lesson-reader');
    expect(html).toContain("Bir kitap düşünün; yıllar sonra bile okunmaya devam ediyor.");
    expect(html).not.toContain('<h3 class="archive-entry-title">');
  });
});
