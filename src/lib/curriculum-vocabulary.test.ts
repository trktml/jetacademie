import { describe, expect, it } from "bun:test";
import { curriculumVocabularyIssues, readCurriculumVocabulary } from "./curriculum-vocabulary";

describe("Turkish curriculum vocabulary", () => {
  it("accepts Turkish usage even when the word has Arabic origins", () => {
    const body =
      "**النِّيَّة**\n\n<u>Niyet</u> bir işi yapma amacıdır.\n\n## Kelime Açıklaması\n\n**niyet** — Bir işi yapma amacı.\n\n¹ Kaynak.";
    expect(curriculumVocabularyIssues(body)).toEqual([]);
    expect(readCurriculumVocabulary(body).turkishText).not.toContain("النِّيَّة");
  });
  it("rejects Arabic and transliterated words supported only by Arabic or footnotes", () => {
    const body =
      "**تَعَلَّمَ**\n\nKur’ân öğrenen.\n\n# Bu Hafta Tanıştığımız Kelimeler\n\n**taallame** — Öğrendi.\n\n**تَعَلَّمَ** — Öğrendi.\n\n# Dipnotlar\n\n¹ <u>taallame</u>";
    expect(curriculumVocabularyIssues(body).length).toBe(3);
  });
  it("requires definitions for every marked Turkish word and excludes the glossary itself", () => {
    const body = "<u>emanet</u> korunur.\n\n**Kelime Açıklaması**\n\n**tedbir** — Önlem.";
    expect(curriculumVocabularyIssues(body)).toEqual([
      "'tedbir' Türkçe metinde işaretli olarak bulunamadı.",
      "'emanet' için kelime açıklaması bulunamadı.",
    ]);
  });
  it("rejects Arabic marking without a glossary", () => {
    expect(curriculumVocabularyIssues("**<u>تَعَلَّمَ</u>**")).toEqual([
      "Arapça metindeki kelimeler Türkçe kelime desteği için işaretlenemez.",
    ]);
  });
  it("excludes Latin transliteration in a labelled Arabic section", () => {
    const body =
      "**Arapça (okunuşu):**\n\n<u>taallame</u>\n\n**Türkçesi:**\n\nÖğrendi.\n\n## Kelime Açıklaması\n\n**taallame** — Öğrendi.";
    expect(readCurriculumVocabulary(body).turkishText).not.toContain("taallame");
    expect(curriculumVocabularyIssues(body)).toEqual([
      "'taallame' Türkçe metinde işaretli olarak bulunamadı.",
    ]);
  });
});
