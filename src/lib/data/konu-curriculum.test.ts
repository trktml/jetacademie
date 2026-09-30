import { describe, expect, it } from "bun:test";
import {
  konuCurriculumItems,
  getKonuItem,
  getKonuEntriesForGrade,
  getAllKonuEntries,
  toSuperscript,
  createLesson,
  type LessonDraft,
} from "./konu-curriculum";

describe("konu-curriculum data and builder integrity", () => {
  it("initializes with empty entries when no static lessons are registered", () => {
    expect(konuCurriculumItems).toHaveLength(0);
    expect(getAllKonuEntries()).toHaveLength(0);
    for (let grade = 1; grade <= 6; grade++) {
      expect(getKonuEntriesForGrade(grade)).toHaveLength(0);
    }
  });

  it("returns undefined for unknown item IDs", () => {
    expect(getKonuItem("unknown-id")).toBeUndefined();
    expect(getKonuItem("g1-konu-eylul-2")).toBeUndefined();
  });

  it("converts numbers to superscript correctly", () => {
    expect(toSuperscript("123")).toBe("¹²³");
    expect(toSuperscript("4567890")).toBe("⁴⁵⁶⁷⁸⁹⁰");
  });

  it("creates a lesson and builds formatted markdown body with opening verse and structure", () => {
    const draft: LessonDraft = {
      id: "g1-konu-ornek-1",
      grade: 1,
      weekNumber: 1,
      month: 9,
      week: 1,
      year: 2026,
      title: "Örnek Ders Başlığı",
      subtitle: "Giriş ve arka plan sorusu",
      readingMinutes: 5,
      verse: {
        surah: "Bakara 2/255",
        arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ",
        meal: "Allah O’dur ki O’ndan başka ilah yoktur; Hayy’dır, Kayyûm’dur.",
        connection: "Âyetin ana temayla bağlantısı.",
        source: "Suat Yıldırım Meali, s. 42.",
      },
      sections: [
        {
          heading: "Birinci Bölüm",
          paragraphs: ["Bu ilk paragraftır.", "Bu da ikinci paragraftır."],
        },
        {
          heading: "Alıntı Pasajı",
          paragraphs: ["Önemli bir iktibas metni."],
          kind: "quote",
          citation: "2",
        },
      ],
      discussionQuestions: ["Birinci soru?", "İkinci soru?"],
      application: {
        title: "Uygulama Adımları",
        items: ["Günde bir sayfa oku.", "Haftada bir tefekkür et."],
      },
      takeaway: ["İlk çıkarım.", "İkinci çıkarım."],
      vocab: [
        { word: "Tefekkür", definition: "Derinlemesine düşünme." },
        { word: "İhlas", definition: "Samimiyet." },
      ],
      sources: ["Bediüzzaman Said Nursî, Sözler, s. 10."],
    };

    const lesson = createLesson(draft);
    expect(lesson.body).toContain("# Örnek Ders Başlığı");
    expect(lesson.body).toContain("> **اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ**");
    expect(lesson.body).toContain(
      "> **“Allah O’dur ki O’ndan başka ilah yoktur; Hayy’dır, Kayyûm’dur.”**¹"
    );
    expect(lesson.body).toContain("Giriş ve arka plan sorusu");
    expect(lesson.body).toContain("### Birinci Bölüm");
    expect(lesson.body).toContain("### Düşünelim ve Konuşalım");
    expect(lesson.body).toContain("1. Birinci soru?");
    expect(lesson.body).toContain("2. İkinci soru?");
    expect(lesson.body).toContain("### Uygulama Adımları");
    expect(lesson.body).toContain("# Bana Ne Söylüyor?");
    expect(lesson.body).toContain("# Bu Hafta Tanıştığımız Kelimeler");
    expect(lesson.body).toContain("**Tefekkür** — Derinlemesine düşünme.");
    expect(lesson.body).toContain("# Dipnotlar");
    expect(lesson.body).toContain("¹ Suat Yıldırım Meali, s. 42.");
    expect(lesson.body).toContain("² Bediüzzaman Said Nursî, Sözler, s. 10.");
  });
});
