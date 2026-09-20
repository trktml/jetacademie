import { describe, expect, it } from "bun:test";
import React from "react";
import { renderToString } from "react-dom/server";
import { GenderSelector } from "./gender-selector";

describe("GenderSelector Component", () => {
  it("renders both Erkek and Bayan tabs with appropriate labels and roles", () => {
    const html = renderToString(
      <GenderSelector
        currentGender="erkek"
        onGenderChange={() => {}}
        onSelectGuest={() => {}}
        onOpenAccount={() => {}}
        isSignedIn={false}
        isGuest={false}
      />
    );

    expect(html).toContain('role="tablist"');
    expect(html).toContain("Erkek Müfredatı");
    expect(html).toContain("Bayan Müfredatı");
    expect(html).toContain('id="gender-tab-erkek"');
    expect(html).toContain('id="gender-tab-bayan"');
  });

  it("sets active state on Erkek tab when currentGender is erkek", () => {
    const html = renderToString(
      <GenderSelector
        currentGender="erkek"
        onGenderChange={() => {}}
        onSelectGuest={() => {}}
        onOpenAccount={() => {}}
        isSignedIn={true}
        isGuest={false}
      />
    );

    expect(html).toContain('id="gender-tab-erkek" aria-selected="true"');
    expect(html).toContain('id="gender-tab-bayan" aria-selected="false"');
  });

  it("sets active state on Bayan tab when currentGender is bayan", () => {
    const html = renderToString(
      <GenderSelector
        currentGender="bayan"
        onGenderChange={() => {}}
        onSelectGuest={() => {}}
        onOpenAccount={() => {}}
        isSignedIn={true}
        isGuest={false}
      />
    );

    expect(html).toContain('id="gender-tab-erkek" aria-selected="false"');
    expect(html).toContain('id="gender-tab-bayan" aria-selected="true"');
  });

  it("renders signed-in status badge when user is authenticated", () => {
    const html = renderToString(
      <GenderSelector
        currentGender="erkek"
        onGenderChange={() => {}}
        onSelectGuest={() => {}}
        onOpenAccount={() => {}}
        isSignedIn={true}
        isGuest={false}
      />
    );

    expect(html).toContain("archive-gender-status--synced");
    expect(html).toContain("Hesabınıza Kaydediliyor");
  });

  it("renders guest status badge when in guest mode", () => {
    const html = renderToString(
      <GenderSelector
        currentGender="bayan"
        onGenderChange={() => {}}
        onSelectGuest={() => {}}
        onOpenAccount={() => {}}
        isSignedIn={false}
        isGuest={true}
      />
    );

    expect(html).toContain("archive-gender-status--guest");
    expect(html).toContain("Misafir Modu (Bu Cihaz)");
  });

  it("renders authentication required badge when visitor is anonymous and not guest", () => {
    const html = renderToString(
      <GenderSelector
        currentGender="erkek"
        onGenderChange={() => {}}
        onSelectGuest={() => {}}
        onOpenAccount={() => {}}
        isSignedIn={false}
        isGuest={false}
      />
    );

    expect(html).toContain("archive-gender-status--anon");
    expect(html).toContain("Kaydetmek İçin Giriş Gerekir");
  });

  it("renders professional, concise modal dialog when target gender is set", () => {
    const html = renderToString(
      <GenderSelector
        currentGender="erkek"
        onGenderChange={() => {}}
        onSelectGuest={() => {}}
        onOpenAccount={() => {}}
        isSignedIn={false}
        isGuest={false}
        initialModalGender="bayan"
      />
    );

    // Dialog structure and role
    expect(html).toContain('role="dialog"');
    expect(html).toContain('aria-modal="true"');

    // Clean tag and title (no emoji in title)
    expect(html).toContain("Bayan Müfredatı");
    expect(html).toContain("İlerlemenizi Nasıl Kaydedelim?");
    expect(html).toContain("Ders takibinizi korumak için bir yöntem seçin.");

    // Options with clear, short copy
    expect(html).toContain("Misafir Olarak Devam Et");
    expect(html).toContain("Hesap açmadan bu cihazda saklayın");
    expect(html).toContain("Giriş Yap veya Kaydol");
    expect(html).toContain("Tüm cihazlarınızla eşitleyin");
    expect(html).toContain("Vazgeç");

    // Must NOT contain old wordy AI tropes or generic sparkles
    expect(html).not.toContain(
      "İlmihal müfredatında Erkek ve Bayan konuları ayrı takip edilmektedir"
    );
    expect(html).not.toContain("Hızlı Başla");
    expect(html).not.toContain("🧕");
  });

  it("renders appropriate tag for erkek target gender modal", () => {
    const html = renderToString(
      <GenderSelector
        currentGender="bayan"
        onGenderChange={() => {}}
        onSelectGuest={() => {}}
        onOpenAccount={() => {}}
        isSignedIn={false}
        isGuest={false}
        initialModalGender="erkek"
      />
    );

    expect(html).toContain("Erkek Müfredatı");
    expect(html).toContain("İlerlemenizi Nasıl Kaydedelim?");
  });
});
