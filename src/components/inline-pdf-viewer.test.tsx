import { describe, expect, it } from "bun:test";
import React from "react";
import { renderToString } from "react-dom/server";
import { InlinePdfViewer } from "./inline-pdf-viewer";

describe("InlinePdfViewer Component", () => {
  it("renders inline viewer structure with title, page indicator, and copy action", () => {
    const html = renderToString(
      <InlinePdfViewer
        pdfUrl="/curriculum/ilmihal/ortaokul/erkek/hafta-01.pdf"
        title="1. Sınıf İlmihal — 1. Hafta"
        entryId="g1-ilmihal-erkek-eylul-1"
        onClose={() => {}}
      />
    );

    expect(html).toContain("1. Sınıf İlmihal — 1. Hafta");
    expect(html).toContain("Sayfa");
    expect(html).toContain("Metni Kopyala");
    expect(html).toContain("Önceki");
    expect(html).toContain("Sonraki");
    expect(html).toContain("Kapat");
    expect(html).toContain('class="textLayer"');
    expect(html).toContain("pdf-page-container");
  });

  it("renders resumed page notification when initialPage > 1", () => {
    const html = renderToString(
      <InlinePdfViewer
        pdfUrl="/curriculum/ilmihal/ortaokul/erkek/hafta-01.pdf"
        title="1. Sınıf İlmihal — 1. Hafta"
        entryId="g1-ilmihal-erkek-eylul-1"
        initialPage={4}
      />
    );

    expect(html).toContain("4. sayfadan devam ediliyor");
  });
});
