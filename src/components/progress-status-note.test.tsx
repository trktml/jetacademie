import { describe, expect, it } from "bun:test";
import React from "react";
import { renderToString } from "react-dom/server";
import { ProgressStatusNote } from "./progress-status-note";

describe("ProgressStatusNote component", () => {
  it("renders authenticated note when isSignedIn prop is true", () => {
    const html = renderToString(<ProgressStatusNote isSignedIn={true} isGuest={false} />);
    expect(html).toContain("İlerlemeniz hesabınıza kaydediliyor");
    expect(html).not.toContain("Kaydetmek için giriş yapın");
  });

  it("renders guest note when guest mode is active and unauthenticated", () => {
    const html = renderToString(<ProgressStatusNote isSignedIn={false} isGuest={true} />);
    expect(html).toContain("Kaldığınız yerler cihazınızda kaydediliyor");
    expect(html).not.toContain("Kaydetmek için giriş yapın");
  });

  it("renders login prompt when unauthenticated and not in guest mode", () => {
    const html = renderToString(<ProgressStatusNote isSignedIn={false} isGuest={false} />);
    expect(html).toContain("Kaydetmek için giriş yapın");
    expect(html).not.toContain("İlerlemeniz hesabınıza kaydediliyor");
  });
});
