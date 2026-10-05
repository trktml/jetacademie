import { describe, expect, it } from "bun:test";
import { parseEntryContent } from "./curriculum-entry-content";

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
});
