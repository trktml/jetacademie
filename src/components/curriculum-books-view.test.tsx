import { describe, expect, it } from "bun:test";
import React from "react";
import { renderToString } from "react-dom/server";
import { CurriculumBooksView } from "./curriculum-books-view";

describe("CurriculumBooksView Component", () => {
  it("should render page title, stats ribbon and search bar", () => {
    const html = renderToString(<CurriculumBooksView />);

    expect(html).toContain("Müfredat Kitapları &amp; Kaynak Eserler");
    expect(html).toContain("JetAcademie Kütüphanesi");
    expect(html).toContain("Temel Eser");
    expect(html).toContain("Kitap adı, yazar, kavram veya konu ara...");
  });

  it("should render book category filter buttons", () => {
    const html = renderToString(<CurriculumBooksView />);

    expect(html).toContain("İlmihal");
    expect(html).toContain("Hadis");
    expect(html).toContain("Siyer");
    expect(html).toContain("Risale");
  });

  it("should render grade buttons M1 through M6", () => {
    const html = renderToString(<CurriculumBooksView />);

    expect(html).toContain("M1");
    expect(html).toContain("M2");
    expect(html).toContain("M3");
    expect(html).toContain("M4");
    expect(html).toContain("M5");
    expect(html).toContain("M6");
  });

  it("should render book cards with publishers and authors", () => {
    const html = renderToString(<CurriculumBooksView />);

    expect(html).toContain("Gençlik İlmihali");
    expect(html).toContain("Ahmet Başak");
    expect(html).toContain("Sonsuz Nur");
    expect(html).toContain("Bediüzzaman Said Nursi");
  });
});
