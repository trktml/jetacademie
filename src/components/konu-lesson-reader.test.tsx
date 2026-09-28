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
    expect(html).toContain("Bu Eser Neden Hâlâ Okunuyor?");
    expect(html).toContain(
      "Bu kadar farklı insanın yıllardır okuduğu, çoğalttığı ve araştırdığı bir eserde ne var?"
    );
    expect(html).toContain("7 dk okuma");
    expect(html).toContain("6 Kavram");
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
    expect(html).toContain("Bismillâh");
    expect(html).toContain("Lisân-ı hâl");
    expect(html).toContain("Tefekkür");
  });

  it("renders in-text vocabulary buttons with tooltip titles", () => {
    const entry = g1Entries[0];
    const html = renderToString(<KonuLessonReader entry={entry} />);

    expect(html).toContain(
      'title="Bismillâh: “Allah’ın adıyla” anlamına gelen, her hayırlı işe başlarken söylenen mübarek başlangıç sözü."'
    );
    expect(html).toContain(
      'title="Tefekkür: Bir şeyin anlamı ve bize ne gösterdiği üzerinde dikkatlice düşünme."'
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
    expect(html).toContain('aria-label="Bismillâh kelimesinin anlamı"');
    expect(html).toContain('aria-label="Tefekkür kelimesinin anlamı"');
    // Does not render inline role=tooltip popovers that could clip
    expect(html).not.toContain('role="tooltip"');
  });
});
