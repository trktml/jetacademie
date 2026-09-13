import { describe, expect, it, mock } from "bun:test";
import React from "react";
import { renderToString } from "react-dom/server";

// Mock next/navigation
mock.module("next/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({ refresh: () => {} }),
}));

// Mock authClient
let mockSessionData: { user: { id: string; name: string; email?: string } } | null = null;
mock.module("@/lib/auth-client", () => ({
  authClient: {
    useSession: () => ({
      data: mockSessionData,
      isPending: false,
    }),
  },
}));

// Import AppHeader after mocks
import { AppHeader } from "./app-header";

describe("AppHeader Component", () => {
  it("should render floating island header container and brand logo", () => {
    mockSessionData = null;
    const html = renderToString(<AppHeader />);

    expect(html).toContain("site-header");
    expect(html).toContain("site-header__island");
    expect(html).toContain("brand-link");
    expect(html).toContain("Jet");
    expect(html).toContain("Academie");
  });

  it("should render login button when unauthenticated", () => {
    mockSessionData = null;
    const html = renderToString(<AppHeader />);

    expect(html).toContain("account-button");
    expect(html).toContain("Giriş yap");
    expect(html).not.toContain("account-button__avatar");
  });

  it("should render avatar initial and username when authenticated", () => {
    mockSessionData = {
      user: {
        id: "usr_123",
        name: "Ahmet Yılmaz",
        email: "ahmet@example.com",
      },
    };
    const html = renderToString(<AppHeader />);

    expect(html).toContain("account-button");
    expect(html).toContain('data-authenticated="true"');
    expect(html).toContain("account-button__avatar");
    expect(html).toContain("A"); // Initial of Ahmet
    expect(html).toContain("Ahmet");
    expect(html).toContain('aria-label="Hesabı aç (Ahmet Yılmaz)"');
  });

  it("should render theme switcher within header actions", () => {
    mockSessionData = null;
    const html = renderToString(<AppHeader />);

    expect(html).toContain("header-actions");
    expect(html).toContain("theme-switcher");
  });
});
