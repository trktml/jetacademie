export interface CurriculumVocabularyItem {
  readonly word: string;
  readonly definition: string;
}

const vocabularyHeading =
  /^(?:#{1,6}\s+|\*\*)(?:Bu Hafta Tanıştığımız Kelimeler|Kelime Açıklaması|Kelimeler)(?:\*\*)?\s*$/i;
const arabic = /\p{Script=Arabic}/u;

/** Vocabulary belongs to Turkish reading, never the Arabic verse or hadith. */
export function readCurriculumVocabulary(body: string): {
  items: CurriculumVocabularyItem[];
  turkishText: string;
} {
  const items: CurriculumVocabularyItem[] = [];
  const turkishLines: string[] = [];
  let section: "text" | "vocabulary" | "sources" = "text";
  let inArabic = false;

  for (const line of body.split(/\r?\n/)) {
    const trimmed = line.trim();
    const label = trimmed.replace(/^#{1,6}\s+/, "").replace(/\*\*/g, "");
    if (/^Arapça(?:\s+okunuşu|\s*\([^)]*\))?:?\s*$/i.test(label)) {
      inArabic = true;
      continue;
    }
    if (/^(?:Türkçesi|Türkçe(?:\s+(?:tercüme|anlamı))?|Meal):?\s*$/i.test(label)) {
      inArabic = false;
      continue;
    }
    if (vocabularyHeading.test(trimmed)) {
      section = "vocabulary";
      continue;
    }
    if (/^#{1,6}\s+Dipnotlar\s*$/i.test(trimmed) || /^[¹²³⁴⁵⁶⁷⁸⁹⁰]+\s/.test(trimmed)) {
      section = "sources";
      continue;
    }
    if (/^#{1,6}\s/.test(trimmed)) {
      section = "text";
      inArabic = false;
    }
    if (section === "vocabulary") {
      const match = trimmed.match(/^(?:[-*]\s+)?\*\*([^*]+?)\*\*\s*(?:—|–|-|:)\s*(.+)$/);
      if (match) items.push({ word: match[1].trim(), definition: match[2].trim() });
    } else if (section === "text" && !inArabic && !arabic.test(line)) {
      turkishLines.push(line);
    }
  }
  return { items, turkishText: turkishLines.join("\n") };
}

export function curriculumVocabularyIssues(body: string): string[] {
  const { items, turkishText } = readCurriculumVocabulary(body);
  const marked = [...turkishText.matchAll(/<u>([^<\n]+)<\/u>/g)].map((match) => match[1]);
  const normalize = (word: string) => word.toLocaleLowerCase("tr-TR");
  const issues: string[] = [];
  const seen = new Set<string>();
  for (const item of items) {
    const key = normalize(item.word);
    if (arabic.test(item.word)) issues.push(`'${item.word}' Arapça kelime listesine alınamaz.`);
    if (!marked.some((word) => normalize(word) === key)) {
      issues.push(`'${item.word}' Türkçe metinde işaretli olarak bulunamadı.`);
    }
    if (seen.has(key)) issues.push(`'${item.word}' kelime listesinde tekrar ediyor.`);
    seen.add(key);
  }
  for (const word of marked) {
    if (!seen.has(normalize(word))) issues.push(`'${word}' için kelime açıklaması bulunamadı.`);
  }
  if ([...body.matchAll(/<u>([^<\n]+)<\/u>/g)].some((match) => arabic.test(match[1]))) {
    issues.push("Arapça metindeki kelimeler Türkçe kelime desteği için işaretlenemez.");
  }
  return issues;
}
