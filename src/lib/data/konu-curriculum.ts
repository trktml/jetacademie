import type { CurriculumEntry } from "@/lib/curriculum";

export interface KonuVocabItem {
  readonly word: string;
  readonly definition: string;
}

export interface KonuSection {
  readonly heading?: string | null;
  readonly paragraphs: readonly string[];
  readonly kind?: "quote" | "arabic";
  readonly citation?: string;
}

export interface KonuApplication {
  readonly title: string;
  readonly items: readonly string[];
}

export interface KonuVerse {
  readonly surah: string;
  readonly arabic: string;
  readonly meal: string;
  readonly connection: string;
  readonly source: string;
}

export interface KonuCurriculumItem {
  readonly id: string;
  readonly grade: number;
  readonly weekNumber: number;
  readonly month: number;
  readonly week: number;
  readonly year: number;
  readonly title: string;
  readonly subtitle: string;
  readonly readingMinutes: number;
  readonly verse?: KonuVerse;
  readonly sections: readonly KonuSection[];
  readonly discussionQuestions: readonly string[];
  readonly application?: KonuApplication | null;
  readonly takeaway: readonly string[];
  readonly sources: readonly string[];
  readonly vocab: readonly KonuVocabItem[];
  readonly body: string;
}

export function toSuperscript(value: string): string {
  return value.replace(/\d/g, (digit) => "⁰¹²³⁴⁵⁶⁷⁸⁹"[Number(digit)]);
}

export type LessonDraft = Omit<KonuCurriculumItem, "body">;

export function buildBody(lesson: LessonDraft): string {
  const opening: string[] = [`# ${lesson.title}`];

  if (lesson.verse) {
    opening.push(`> **${lesson.verse.arabic}**`);
    opening.push(`> **“${lesson.verse.meal}”**¹`);
  }

  if (lesson.subtitle) {
    opening.push(lesson.subtitle);
  }

  const sections = lesson.sections.map((section) => {
    const heading = section.heading ? `### ${section.heading}\n\n` : "";
    const paragraphs = section.paragraphs
      .map((paragraph) => {
        if (section.kind === "arabic") return `> **${paragraph}**`;
        if (section.kind === "quote") {
          return `> **“${paragraph}”**${section.citation ? ` ${toSuperscript(section.citation)}` : ""}`;
        }
        return `${paragraph}${section.citation ? ` ${toSuperscript(section.citation)}` : ""}`;
      })
      .join("\n\n");

    return `${heading}${paragraphs}`;
  });

  const questions = lesson.discussionQuestions.map(
    (question, index) => `${index + 1}. ${question}`
  );
  const application = lesson.application
    ? [
        `### ${lesson.application.title}`,
        ...lesson.application.items.map((item) => `- ${item}`),
      ].join("\n\n")
    : "";
  const takeaway = ["# Bana Ne Söylüyor?", ...lesson.takeaway.map((item) => `- ${item}`)].join(
    "\n\n"
  );
  const vocabulary = lesson.vocab.length
    ? [
        "# Bu Hafta Tanıştığımız Kelimeler",
        ...lesson.vocab.map((item) => `**${item.word}** — ${item.definition}`),
      ].join("\n\n")
    : "";
  const allSources = lesson.verse ? [lesson.verse.source, ...lesson.sources] : lesson.sources;
  const sources = allSources
    .map((source, index) => `${toSuperscript(String(index + 1))} ${source}`)
    .join("\n\n");

  return [
    ...opening,
    ...sections,
    questions.length ? `### Düşünelim ve Konuşalım\n\n${questions.join("\n\n")}` : "",
    application,
    takeaway,
    vocabulary,
    sources ? `# Dipnotlar\n\n${sources}` : "",
  ]
    .filter(Boolean)
    .join("\n\n");
}

export function createLesson(lesson: LessonDraft): KonuCurriculumItem {
  return { ...lesson, body: buildBody(lesson) };
}

export function parseKonuItemFromBody(entry: CurriculumEntry): KonuCurriculumItem | null {
  const body = entry.body;
  if (!body) return null;

  const lines = body.split("\n");
  const vocab: KonuVocabItem[] = [];
  const takeaway: string[] = [];
  const discussionQuestions: string[] = [];
  const sources: string[] = [];
  let subtitle = "";

  let currentSection = "";
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("# Bu Hafta Tanıştığımız Kelimeler")) {
      currentSection = "vocab";
      continue;
    }
    if (trimmed.startsWith("# Bana Ne Söylüyor?")) {
      currentSection = "takeaway";
      continue;
    }
    if (trimmed.startsWith("### Düşünelim ve Konuşalım")) {
      currentSection = "questions";
      continue;
    }
    if (trimmed.startsWith("# Dipnotlar")) {
      currentSection = "sources";
      continue;
    }
    if (trimmed.startsWith("### ")) {
      currentSection = "section";
      continue;
    }
    if (trimmed.startsWith("# ")) {
      // Main title line, do not treat as body section
      continue;
    }

    if (currentSection === "vocab") {
      const match = trimmed.match(/^\*\*([^*]+)\*\*\s*(?:—|–|-|:)\s*(.+)$/);
      if (match) {
        vocab.push({ word: match[1].trim(), definition: match[2].trim() });
      }
    } else if (currentSection === "takeaway") {
      if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        takeaway.push(trimmed.slice(2).trim());
      }
    } else if (currentSection === "questions") {
      const match = trimmed.match(/^\d+\.\s*(.+)$/);
      if (match) {
        discussionQuestions.push(match[1].trim());
      }
    } else if (currentSection === "sources") {
      if (trimmed.length > 0) {
        const clean = trimmed.replace(/^[⁰¹²³⁴⁵⁶⁷⁸⁹\d\^]+\s*/, "");
        sources.push(clean);
      }
    } else if (!currentSection && !subtitle && trimmed && !trimmed.startsWith(">")) {
      subtitle = trimmed;
    }
  }

  const wordCount = body.trim().split(/\s+/).length;
  const readingMinutes = Math.max(3, Math.ceil(wordCount / 120));

  return {
    id: entry.id,
    grade: entry.grade ?? 1,
    weekNumber: entry.week,
    month: entry.month,
    week: entry.week,
    year: entry.year,
    title: entry.title,
    subtitle,
    readingMinutes,
    sections: [{ heading: null, paragraphs: [body] }],
    discussionQuestions,
    takeaway,
    sources,
    vocab,
    body,
  };
}

export const konuCurriculumItems: readonly KonuCurriculumItem[] = [];

export const konuCurriculumMap: ReadonlyMap<string, KonuCurriculumItem> = new Map();

export function getKonuItem(id: string): KonuCurriculumItem | undefined {
  return konuCurriculumMap.get(id);
}

export function getKonuEntriesForGrade(grade: number): CurriculumEntry[] {
  return konuCurriculumItems
    .filter((item) => item.grade === grade)
    .map((item) => ({
      id: item.id,
      grade: item.grade,
      categoryId: "konu",
      month: item.month,
      week: item.week,
      year: item.year,
      title: item.title,
      body: item.body,
      pageCount: 2,
    }));
}

export function getAllKonuEntries(): CurriculumEntry[] {
  return konuCurriculumItems.map((item) => ({
    id: item.id,
    grade: item.grade,
    categoryId: "konu",
    month: item.month,
    week: item.week,
    year: item.year,
    title: item.title,
    body: item.body,
    pageCount: 2,
  }));
}
