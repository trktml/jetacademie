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
    expect(html).toContain("RİSALE-İ NUR: BİR KİTABIN SIRA DIŞI YOLCULUĞU");
    expect(html).toContain("Bu kadar farklı insanın yıllardır okuduğu");
    expect(html).toContain("dk okuma");
    expect(html).toContain("5 Kavram");
  });

  it("renders discussion questions, takeaway, and vocabulary cards for Grade 1 Week 1", () => {
    const entry = g1Entries[0];
    const html = renderToString(<KonuLessonReader entry={entry} />);

    expect(html).toContain("Düşünelim ve Konuşalım");
    expect(html).toContain("Bu Hafta Aklımızda Kalsın");
    expect(html).toContain("Bu Hafta Tanıştığımız Kelimeler");

    // Vocabulary card words
    expect(html).toContain("Risale");
    expect(html).toContain("Külliyat");
    expect(html).toContain("Nüsha");
    expect(html).toContain("Sürgün");
    expect(html).toContain("Matbaa");
  });

  it("renders in-text vocabulary buttons with tooltip titles", () => {
    const entry = g1Entries[0];
    const html = renderToString(<KonuLessonReader entry={entry} />);

    expect(html).toContain(
      'title="Risale: Belirli bir konuyu veya meseleyi ele alan yazılı eser ya da bölüm."'
    );
    expect(html).toContain(
      'title="Külliyat: Birbirini tamamlayan eserlerin bir araya gelmiş bütünü."'
    );
  });

  it("handles M6-01 without vocabulary cards section as expected", () => {
    const entry = g6Entries[0];
    const html = renderToString(<KonuLessonReader entry={entry} />);

    expect(html).toContain("BAZI KİTAPLAR NEDEN İNSANIN BAKIŞINI DEĞİŞTİRİR?");
    expect(html).toContain("Bu Hafta Aklımızda Kalsın");
    // Vocab section should NOT be present for M6-01
    expect(html).not.toContain("Bu Hafta Tanıştığımız Kelimeler");
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
    expect(html).toContain('aria-label="Risale kelimesinin anlamı"');
    expect(html).toContain('aria-label="Külliyat kelimesinin anlamı"');
    // Does not render inline role=tooltip popovers that could clip
    expect(html).not.toContain('role="tooltip"');
  });
});
