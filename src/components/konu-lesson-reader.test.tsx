import { describe, expect, it } from "bun:test";
import React from "react";
import { renderToString } from "react-dom/server";
import { KonuLessonReader } from "./konu-lesson-reader";
import { createLesson, type LessonDraft } from "@/lib/data/konu-curriculum";
import type { CurriculumEntry } from "@/lib/curriculum";

describe("KonuLessonReader Component", () => {
  const g1Draft: LessonDraft = {
    id: "g1-konu-eylul-1",
    grade: 1,
    weekNumber: 2,
    month: 9,
    week: 2,
    year: 2026,
    title: "Bediüzzaman kimdir?",
    subtitle: "Bu eserlerin arkasında nasıl bir hayat ve ilim yolculuğu var?",
    readingMinutes: 8,
    sections: [
      {
        heading: "Bir hayat hikâyesinin kapısını aralamak",
        paragraphs: [
          "Molla Abdullah’ın gittikçe <u>tekâmül</u> ederek köydeki okumamış arkadaşlarından okumakla tezahür eden meziyetini düşünüp hayran kaldı. Bunun üzerine ciddî bir <u>şevk</u> ile <u>tahsil</u>i gözüne aldı.",
        ],
      },
      {
        heading: "Âyet — Tâhâ 20/114",
        paragraphs: ["فَتَعَالَى اللَّهُ الْمَلِكُ الْحَقُّ"],
        kind: "arabic",
      },
    ],
    discussionQuestions: ["İlim öğrenmek insanı nasıl olgunlaştırır?"],
    takeaway: ["İlim öğrenmenin bir emanet olduğunu fark edebilirim."],
    vocab: [
      { word: "Tekâmül", definition: "Adım adım olgunlaşma, gelişme ve kemale erme." },
      { word: "Meziyet", definition: "Bir şeyi benzerlerinden üstün kılan özellik." },
      { word: "Şevk", definition: "İstek, heves ve coşku." },
      { word: "Tahsil", definition: "İlim öğrenme, bilgi edinme faaliyeti." },
      { word: "İzzet-i İlmiye", definition: "İlmin vakar ve haysiyeti." },
      { word: "Derceylemek", definition: "İçine yerleştirmek." },
    ],
    sources: ["Tarihçe-i Hayat, s. 25."],
  };

  const g1Lesson = createLesson(g1Draft);
  const g1Entry: CurriculumEntry = {
    id: g1Lesson.id,
    grade: g1Lesson.grade,
    categoryId: "konu",
    month: g1Lesson.month,
    week: g1Lesson.week,
    year: g1Lesson.year,
    title: g1Lesson.title,
    body: g1Lesson.body,
    pageCount: 2,
  };

  const g6Draft: LessonDraft = {
    id: "g6-konu-eylul-1",
    grade: 6,
    weekNumber: 2,
    month: 9,
    week: 2,
    year: 2026,
    title: "Bediüzzaman: Bir Ömür Nasıl Bir Merkez Etrafında Toplanır?",
    subtitle: "Mefkûre insanının hedef birliği ve gaye şuuru",
    readingMinutes: 10,
    sections: [
      {
        heading: "Gaye-i Hayat",
        paragraphs: ["Bediüzzaman’ın hayatındaki temel rota iman ve Kur'an hizmetidir."],
      },
    ],
    discussionQuestions: ["İnsanın hayatında temel bir gayesi olması ne kazandırır?"],
    takeaway: ["Tevhid-i kıble şuuruyla hareket edebilirim."],
    vocab: [
      { word: "Mefkûre", definition: "Ulaşılmak istenen yüce ülkü." },
      { word: "Tevhid-i kıble", definition: "Hedef birliği." },
    ],
    sources: ["Tarihçe-i Hayat, s. 582."],
  };

  const g6Lesson = createLesson(g6Draft);
  const g6Entry: CurriculumEntry = {
    id: g6Lesson.id,
    grade: g6Lesson.grade,
    categoryId: "konu",
    month: g6Lesson.month,
    week: g6Lesson.week,
    year: g6Lesson.year,
    title: g6Lesson.title,
    body: g6Lesson.body,
    pageCount: 2,
  };

  it("renders 1. Sınıf 2. Hafta lesson title, subtitle, and meta information", () => {
    const html = renderToString(<KonuLessonReader entry={g1Entry} item={g1Lesson} />);

    expect(html).toContain("1. Sınıf · 2. Hafta");
    expect(html).toContain("Bediüzzaman kimdir?");
    expect(html).toContain("Bu eserlerin arkasında nasıl bir hayat ve ilim yolculuğu var?");
    expect(html).toContain("8 dk okuma");
    expect(html).toContain("6 Kavram");
  });

  it("renders discussion questions, takeaway, and vocabulary cards for Grade 1 Week 2", () => {
    const html = renderToString(<KonuLessonReader entry={g1Entry} item={g1Lesson} />);

    expect(html).toContain("Düşünelim ve Konuşalım");
    expect(html).toContain("Bana ne söylüyor?");
    expect(html).toContain("Bu Hafta Tanıştığımız Kelimeler");
    expect(html).toContain('dir="rtl" lang="ar"');
    expect(html).toContain("Dipnotlar");

    // Vocabulary card words
    expect(html).toContain("Tekâmül");
    expect(html).toContain("Meziyet");
    expect(html).toContain("Şevk");
  });

  it("renders in-text vocabulary buttons with tooltip titles", () => {
    const html = renderToString(<KonuLessonReader entry={g1Entry} item={g1Lesson} />);

    expect(html).toContain('title="Tekâmül: Adım adım olgunlaşma, gelişme ve kemale erme."');
    expect(html).toContain('title="Tahsil: İlim öğrenme, bilgi edinme faaliyeti."');
  });

  it("renders the M6-02 vocabulary cards and takeaway", () => {
    const html = renderToString(<KonuLessonReader entry={g6Entry} item={g6Lesson} />);

    expect(html).toContain("Bediüzzaman: Bir Ömür Nasıl Bir Merkez Etrafında Toplanır?");
    expect(html).toContain("Bana ne söylüyor?");
    expect(html).toContain("Bu Hafta Tanıştığımız Kelimeler");
  });

  it("renders close button when onClose prop is provided", () => {
    const html = renderToString(
      <KonuLessonReader entry={g1Entry} item={g1Lesson} onClose={() => {}} />
    );

    expect(html).toContain("Okumayı Kapat");
  });

  it("renders in-text vocabulary buttons with proper aria-labels and clean tags", () => {
    const html = renderToString(<KonuLessonReader entry={g1Entry} item={g1Lesson} />);

    // In-text buttons should have aria-label and not render inline duplicate tooltips
    expect(html).toContain('aria-label="Tekâmül kelimesinin anlamı"');
    expect(html).toContain('aria-label="Tahsil kelimesinin anlamı"');
    // Does not render inline role=tooltip popovers that could clip
    expect(html).not.toContain('role="tooltip"');
  });

  it("renders database lessons as Markdown in authored order without duplicating sections", () => {
    const entry = {
      ...g1Entry,
      body: "# Veritabanı dersi\n\n**اقْرَأْ**\n\nOku.¹\n\n### Bir soru\n\n> **<u>Tefekkür</u> etmek.**²\n\n# Bana Ne Söylüyor?\n\n- Düşünebilirim.\n\n# Bu Hafta Tanıştığımız Kelimeler\n\n**Tefekkür** — Dikkatle düşünme.\n\n# Dipnotlar\n\n¹ Meal kaynağı.\n\n² Pasaj kaynağı.",
    };
    const html = renderToString(<KonuLessonReader entry={entry} />);

    expect(html).toContain("<h1>Veritabanı dersi</h1>");
    expect(html).toContain("<strong>اقْرَأْ</strong>");
    expect(html).toContain("<h3>Bir soru</h3>");
    expect(html).toContain('<blockquote dir="auto">');
    expect(html).toContain('aria-label="Tefekkür kelimesinin anlamı"');
    expect(html).toContain('aria-expanded="false"');
    expect(html).not.toContain("&lt;u&gt;");
    expect(html.indexOf("اقْرَأْ")).toBeLessThan(html.indexOf("Oku.¹"));
    expect(html.indexOf("Oku.¹")).toBeLessThan(html.indexOf("<h3>Bir soru"));
    expect(html.match(/<h1>Bana Ne Söylüyor\?<\/h1>/g)).toHaveLength(1);
    expect(html.match(/<h1>Dipnotlar<\/h1>/g)).toHaveLength(1);
  });
});
