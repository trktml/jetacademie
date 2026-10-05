import { describe, expect, it } from "bun:test";
import { renderToString } from "react-dom/server";
import type { CurriculumEntry } from "@/lib/curriculum";
import { EntryContentRenderer, parseEntryContent } from "./curriculum-entry-content";

describe("listening vocabulary", () => {
  it("keeps translated words separate from their definitions", () => {
    expect(
      parseEntryContent(`Sohbet açıklaması.

## Kelimeler

- **Sabır**: Zorluk karşısında dayanma.
  - FR: **Patience**: Attendre avec calme.
  - NL: **Geduld**: Rustig kunnen wachten.
`).vocabList
    ).toEqual([
      {
        word: "Sabır",
        tr: "Zorluk karşısında dayanma.",
        frWord: "Patience",
        fr: "Attendre avec calme.",
        nlWord: "Geduld",
        nl: "Rustig kunnen wachten.",
      },
    ]);
  });
  it("continues to read legacy inline translations", () => {
    expect(
      parseEntryContent(
        "📚 **Kelimeler ve Anlamları**:\n• **Sabır**: Dayanma. (NL: Geduld / FR: Patience)"
      ).vocabList[0]
    ).toEqual({ word: "Sabır", tr: "Dayanma.", nl: "Geduld", fr: "Patience" });
  });
  it("renders a database Markdown glossary once and retains in-text definitions", () => {
    const html = renderToString(
      <EntryContentRenderer
        entry={
          {
            id: "g1-hocaefendi-dinleme-eylul-1",
            grade: 1,
            categoryId: "hocaefendi-dinleme",
            title: "Dinleme",
            month: 9,
            week: 1,
            year: 2026,
            contentFormat: "markdown",
            body: "Bir <u>emanet</u> bırakılıyor.\n\n## Kelimeler\n\n- **emanet**: Korunması için bırakılan şey.\n  - FR: **Dépôt confié**: Une chose confiée à notre soin.\n  - NL: **Toevertrouwd goed**: Iets dat we zorgvuldig bewaren.",
          } as CurriculumEntry
        }
        renderVideo={false}
      />
    );
    expect(html).toContain('aria-label="emanet kelimesinin anlamı"');
    expect(html).toContain('lang="fr"');
    expect(html).toContain('lang="nl"');
    expect(html.match(/Dépôt confié/g)?.length).toBe(1);
    expect(html).toContain("Fransızca");
    expect(html).toContain('aria-label="Fransa bayrağı"');
    expect(html).toContain('aria-label="Belçika bayrağı"');
    expect(html.indexOf("Fransızca")).toBeLessThan(html.indexOf("Felemenkçe"));
  });
});
