import { describe, expect, it } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { MarkdownContent } from "./markdown-content";

describe("Safe shared Markdown rendering", () => {
  it("renders headings, lists, tables, Arabic and strong text", () => {
    const html = renderToStaticMarkup(
      <MarkdownContent>
        {"## Başlık\n\n**Kalın**\n\n- Madde\n\nبِسْمِ اللَّهِ\n\n| A | B |\n| - | - |\n| 1 | 2 |"}
      </MarkdownContent>
    );
    expect(html).toContain("<h2>Başlık</h2>");
    expect(html).toContain("<strong>Kalın</strong>");
    expect(html).toContain("<li>Madde</li>");
    expect(html).toContain("<table>");
    expect(html).toContain('dir="auto"');
  });
  it("removes raw HTML, images and executable link protocols", () => {
    const html = renderToStaticMarkup(
      <MarkdownContent>
        {
          "<script>alert(1)</script>\n\n<img src=x onerror=alert(1)>\n\n![track](https://attacker.test/pixel)\n\n[unsafe](javascript:alert%281%29)\n\n[safe](https://example.com)"
        }
      </MarkdownContent>
    );
    expect(html).not.toContain("<script");
    expect(html).not.toContain("<img");
    expect(html).not.toContain("onerror");
    expect(html).not.toContain("javascript:");
    expect(html).toContain('rel="noopener noreferrer"');
    expect(html).toContain('href="https://example.com"');
  });

  it("normalizes unicode bullet characters into proper Markdown lists", () => {
    const html = renderToStaticMarkup(
      <MarkdownContent>
        {
          "• Sohbet yerini düzenlemek; konuşmacı için sehpa ve su hazırlamak.\n• Sohbetten önce zihnen ve manen hazırlanmak.\n• Esneme, hapşırma veya zorunlu konuşmayı edep içinde yapmak; sohbetin havasını bozmamak.\n• Düzgün ve saygılı oturmak."
        }
      </MarkdownContent>
    );
    expect(html).toContain("<ul>");
    expect(html).toContain(
      "<li>Sohbet yerini düzenlemek; konuşmacı için sehpa ve su hazırlamak.</li>"
    );
    expect(html).toContain("<li>Sohbetten önce zihnen ve manen hazırlanmak.</li>");
    expect(html).toContain(
      "<li>Esneme, hapşırma veya zorunlu konuşmayı edep içinde yapmak; sohbetin havasını bozmamak.</li>"
    );
    expect(html).toContain("<li>Düzgün ve saygılı oturmak.</li>");
    // Verify it is NOT collapsed into a single paragraph with dots
    expect(html).not.toContain('<p dir="auto">•');
  });

  it("handles introductory text before bullet list correctly", () => {
    const html = renderToStaticMarkup(
      <MarkdownContent>{"Adab Kuralları:\n• Birinci kural\n• İkinci kural"}</MarkdownContent>
    );
    expect(html).toContain('<p dir="auto">Adab Kuralları:</p>');
    expect(html).toContain("<ul>");
    expect(html).toContain("<li>Birinci kural</li>");
    expect(html).toContain("<li>İkinci kural</li>");
  });

  it("handles null or undefined gracefully without crashing", () => {
    const htmlNull = renderToStaticMarkup(<MarkdownContent>{null}</MarkdownContent>);
    expect(htmlNull).toBe('<div class="curriculum-markdown" dir="auto"></div>');

    const htmlUndefined = renderToStaticMarkup(<MarkdownContent>{undefined}</MarkdownContent>);
    expect(htmlUndefined).toBe('<div class="curriculum-markdown" dir="auto"></div>');
  });

  it("strips redundant leading title matching stripTitle to avoid duplicate card headers", () => {
    const markdown = `# Abdullah b. Abbas: İlimde Derinleşen Genç Sahabi\n\nAbdullah b. Abbas (r.a.), genç yaşta Peygamber Efendimiz'in hususi duasına mazhar olmuştur.\n\n# Bana Ne Söylüyor?\n\n- Genç yaşta ilim`;
    const title = "Abdullah b. Abbas: İlimde Derinleşen Genç Sahabi";

    const html = renderToStaticMarkup(
      <MarkdownContent stripTitle={title}>{markdown}</MarkdownContent>
    );

    // Should NOT contain the duplicated main title in h1
    expect(html).not.toContain("<h1>Abdullah b. Abbas");
    // Should start directly with the lesson paragraph
    expect(html).toContain("Abdullah b. Abbas (r.a.), genç yaşta");
    // Should preserve subsequent section headings like "Bana Ne Söylüyor?"
    expect(html).toContain("<h1>Bana Ne Söylüyor?</h1>");
    expect(html).toContain("<li>Genç yaşta ilim</li>");
  });

  it("does not strip leading heading when stripTitle does not match", () => {
    const markdown = `# Önemli Giriş\n\nBu bir giriş yazısıdır.`;
    const title = "Farklı Bir Başlık";

    const html = renderToStaticMarkup(
      <MarkdownContent stripTitle={title}>{markdown}</MarkdownContent>
    );

    expect(html).toContain("<h1>Önemli Giriş</h1>");
    expect(html).toContain("Bu bir giriş yazısıdır.");
  });
});
