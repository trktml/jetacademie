import { expect, it } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { MarkdownContent } from "@/components/markdown-content";
import { narrationCueAt } from "@/lib/konu-narration";
import { lessonNarrationParagraphs } from "./konu-narration-text";

it("keeps inline markup and definitions aligned with the spoken paragraphs", () => {
  const body = [
    "# Başlık",
    "Hz. Ali bir <u>örnek</u> verdi.[^1] **Güzel bir örnekti.**",
    "> وَقُلْ رَبِّ زِدْنِي عِلْمًا\n> Rabbim, ilmimi artır.² Bunu hatırladım.",
    "²",
    "# Bu Hafta Tanıştığımız Kelimeler",
    "**örnek** — Bir konuyu açıklayan olay.",
    "# Dipnotlar",
    "[^1]: Kaynak açıklaması.",
  ].join("\n\n");
  expect(lessonNarrationParagraphs(body)).toEqual([
    "Başlık",
    "Hz. Ali bir örnek verdi. Güzel bir örnekti.",
    "وَقُلْ رَبِّ زِدْنِي عِلْمًا Rabbim, ilmimi artır. Bunu hatırladım.",
    "Bu Hafta Tanıştığımız Kelimeler",
    "örnek — Bir konuyu açıklayan olay.",
  ]);
  const html = renderToStaticMarkup(<MarkdownContent narration>{body}</MarkdownContent>);
  expect(html).toContain('aria-label="örnek kelimesinin anlamı"');
  expect(html).toMatch(
    /<p dir="auto" data-narration-cue="1">Hz\. Ali.*<strong>Güzel bir örnekti\.<\/strong><\/p>/
  );
  expect(html).toContain('<p dir="auto" data-narration-cue="2">وَقُلْ');
  expect(html).toMatch(/<sup><a [^>]*fnref-1[^>]*>1<\/a><\/sup>/);
  expect(html).not.toContain('data-narration-cue="5"');
});

it("moves the highlight when seeking in either direction, including silent gaps", () => {
  const cues = [
    { start: 0, end: 1 },
    { start: 1.1, end: 2 },
  ];
  expect([1.5, 1, 0.5, 2].map((time) => narrationCueAt(cues, time))).toEqual([1, -1, 0, -1]);
});
