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
});
