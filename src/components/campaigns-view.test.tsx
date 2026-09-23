import { describe, expect, it } from "bun:test";
import React from "react";
import { renderToString } from "react-dom/server";
import { CampaignsView } from "./campaigns-view";

describe("CampaignsView Component", () => {
  it("should render page title, stats ribbon and search bar", () => {
    const html = renderToString(<CampaignsView />);

    expect(html).toContain("Öğrenci Gelişim Kampanyaları");
    expect(html).toContain("Gelişim &amp; Amel Seferberliği");
    expect(html).toContain("Aktif Kampanya");
    expect(html).toContain("Kampanya başlığı, hedef veya slogan ara...");
  });

  it("should render status tabs: Aktif, Yaklaşanlar, Tamamlananlar", () => {
    const html = renderToString(<CampaignsView />);

    expect(html).toContain("Aktif Kampanyalar");
    expect(html).toContain("Yaklaşanlar");
    expect(html).toContain("Tamamlananlar");
  });

  it("should render category buttons and campaign cards", () => {
    const html = renderToString(<CampaignsView />);

    expect(html).toContain("30 Günde 1 Kitap");
    expect(html).toContain("100.000 Salavat");
    expect(html).toContain("Sabah Namazı İstikameti");
    expect(html).toContain("Kampanyaya Katıl");
  });
});
