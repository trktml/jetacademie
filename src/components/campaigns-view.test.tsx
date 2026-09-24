import { describe, expect, it } from "bun:test";
import React from "react";
import { renderToString } from "react-dom/server";
import { CampaignsView } from "./campaigns-view";

describe("CampaignsView Component", () => {
  it("should render page title and header badge with theme-adaptive styling", () => {
    const html = renderToString(<CampaignsView />);

    expect(html).toContain("Dönemsel Kampanyalar");
    expect(html).toContain("text-zinc-900");
    expect(html).toContain("dark:text-white");
  });

  it("should showcase the campaign visual poster with full-screen and download actions", () => {
    const html = renderToString(<CampaignsView />);

    // Poster image & title
    expect(html).toContain("Risale-i Nur Külliyatı Okuma Kampanyası");
    expect(html).toContain("/kampanyalar/risale-okuma-kampanyasi.jpg");
    expect(html).toContain("2026 – 2027");

    // Action buttons
    expect(html).toContain("Tam Ekran");
    expect(html).toContain("Afişi İndir");

    // Must NOT contain redundant textual duplications already present in the poster
    expect(html).not.toContain("3 OKUMA KADEMESİ");
    expect(html).not.toContain("Bediüzzaman Said Nursî");
    expect(html).not.toContain("Aktif Kampanyalar");
    expect(html).not.toContain("Bu Kampanyaya Katıl");
  });
});
