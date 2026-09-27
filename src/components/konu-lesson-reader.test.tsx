import { describe, expect, it } from "bun:test";
import React from "react";
import { renderToString } from "react-dom/server";
import { KonuLessonReader } from "./konu-lesson-reader";
import { getKonuEntriesForGrade } from "@/lib/data/konu-curriculum";

describe("KonuLessonReader Component", () => {
  const g1Entries = getKonuEntriesForGrade(1);
  const g6Entries = getKonuEntriesForGrade(6);

  it("renders 1. Sınıf 1. Hafta lesson title, subtitle, and meta information", () => {
    const entry = g1Entries[0];
    const html = renderToString(<KonuLessonReader entry={entry} />);

    expect(html).toContain("1. Sınıf · 1. Hafta");
    expect(html).toContain("Benim Büyük Sorularım");
    expect(html).toContain("Bir soruyu sormak, öğrenmenin ilk adımı olabilir mi?");
    expect(html).toContain("dk okuma");
    expect(html).toContain("3 Kavram");
  });

  it("renders discussion questions, takeaway, and vocabulary cards for Grade 1 Week 1", () => {
    const entry = g1Entries[0];
    const html = renderToString(<KonuLessonReader entry={entry} />);

    expect(html).toContain("Düşünelim ve Konuşalım");
    expect(html).toContain("Bana ne söylüyor?");
    expect(html).toContain("Bu Hafta Tanıştığımız Kelimeler");
    expect(html).toContain('dir="rtl" lang="ar"');
    expect(html).toContain("Dipnot");

    // Vocabulary card words
    expect(html).toContain("Tefekkür");
    expect(html).toContain("Kaynak");
    expect(html).toContain("Gözlem");
  });

  it("renders in-text vocabulary buttons with tooltip titles", () => {
    const entry = g1Entries[0];
    const html = renderToString(<KonuLessonReader entry={entry} />);

    expect(html).toContain('title="Tefekkür: Bir şey üzerinde dikkatle düşünüp anlamını aramak."');
    expect(html).toContain(
      'title="Kaynak: Bir bilgi ya da düşünceyi öğrendiğimiz eser veya kişi."'
    );
  });

  it("renders the M6-01 vocabulary cards and takeaway", () => {
    const entry = g6Entries[0];
    const html = renderToString(<KonuLessonReader entry={entry} />);

    expect(html).toContain("Bu Yıl Parçaları Nasıl Bir Bütüne Dönüştüreceğiz?");
    expect(html).toContain("Bana ne söylüyor?");
    expect(html).toContain("Bu Hafta Tanıştığımız Kelimeler");
  });

  it("renders close button when onClose prop is provided", () => {
    const entry = g1Entries[0];
    const html = renderToString(<KonuLessonReader entry={entry} onClose={() => {}} />);

    expect(html).toContain("Okumayı Kapat");
  });

  it("renders in-text vocabulary buttons with proper aria-labels and clean tags", () => {
    const entry = g1Entries[0];
    const html = renderToString(<KonuLessonReader entry={entry} />);

    // In-text buttons should have aria-label and not render inline duplicate tooltips
    expect(html).toContain('aria-label="Tefekkür kelimesinin anlamı"');
    expect(html).toContain('aria-label="Kaynak kelimesinin anlamı"');
    // Does not render inline role=tooltip popovers that could clip
    expect(html).not.toContain('role="tooltip"');
  });
});
