import { describe, expect, it, mock } from "bun:test";
import React from "react";
import { renderToString as renderMarkup } from "react-dom/server";
import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/query-client";
const renderToString = (element: React.ReactNode) =>
  renderMarkup(<QueryClientProvider client={getQueryClient()}>{element}</QueryClientProvider>);

let drawerAutoFocus = false;
let renderDrawerContent = false;
let drawerContent: {
  onOpenAutoFocus: () => void;
  onCloseAutoFocus: (event: { preventDefault: () => void }) => void;
};
mock.module("vaul", () => {
  const Slot = ({ children }: { children?: React.ReactNode }) => <>{children}</>;
  return {
    Drawer: {
      Root: ({ children, autoFocus }: { children?: React.ReactNode; autoFocus: boolean }) => {
        drawerAutoFocus = autoFocus;
        return renderDrawerContent ? <>{children}</> : null;
      },
      Portal: Slot,
      Overlay: () => null,
      Handle: () => null,
      Title: Slot,
      Description: Slot,
      Close: Slot,
      Content: ({ children, ...props }: { children?: React.ReactNode } & typeof drawerContent) => {
        drawerContent = props;
        return <>{children}</>;
      },
    },
  };
});

// Mock next/navigation
let currentPathname = "/";
mock.module("next/navigation", () => ({
  usePathname: () => currentPathname,
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
  it("should render floating island header container and brand logo in center on home page", () => {
    currentPathname = "/";
    mockSessionData = null;
    const html = renderToString(<AppHeader />);

    expect(html).toContain("site-header");
    expect(html).toContain("site-header__island");
    expect(html).toContain("site-header__slot--center");
    expect(html).toContain("brand-link");
    expect(html).toContain("Jet");
    expect(html).toContain("Academie");
    // Center slot contains the logo
    const centerSlot = html.split('site-header__slot--center">')[1]?.split("</div>")[0];
    expect(centerSlot).toContain("brand-link");
  });

  it("should render logo on the left slot and page title in center when on inner page", () => {
    currentPathname = "/mufredat";
    mockSessionData = null;
    const html = renderToString(<AppHeader />);

    expect(html).toContain("site-header__slot--left");
    expect(html).toContain("site-header__breadcrumb");
    expect(html).toContain("Müfredat");

    // Left slot contains the logo
    const leftSlot = html.split('site-header__slot--left">')[1]?.split("</div>")[0];
    expect(leftSlot).toContain("brand-link");
  });

  it("should render login button when unauthenticated", () => {
    currentPathname = "/";
    mockSessionData = null;
    const html = renderToString(<AppHeader />);

    expect(html).toContain("account-button");
    expect(html).toContain("Giriş yap");
    expect(html).not.toContain("account-button__avatar");
  });

  it("should render avatar initial and username when authenticated", () => {
    currentPathname = "/";
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
    currentPathname = "/";
    mockSessionData = null;
    const html = renderToString(<AppHeader />);

    expect(html).toContain("header-actions");
    expect(html).toContain("theme-switcher");
  });

  it("should render Müfredat Kitapları breadcrumb on /mufredat-kitaplari", () => {
    currentPathname = "/mufredat-kitaplari";
    mockSessionData = null;
    const html = renderToString(<AppHeader />);

    expect(html).toContain("site-header__breadcrumb");
    expect(html).toContain("Müfredat Kitapları");
  });

  it("should render Kampanyalar breadcrumb on /kampanyalar", () => {
    currentPathname = "/kampanyalar";
    mockSessionData = null;
    const html = renderToString(<AppHeader />);

    expect(html).toContain("site-header__breadcrumb");
    expect(html).toContain("Kampanyalar");
  });

  it("should render select element with all navigation options on inner pages", () => {
    currentPathname = "/mufredat";
    mockSessionData = null;
    const html = renderToString(<AppHeader />);

    expect(html).toContain("site-header__nav-select");
    expect(html).toContain('aria-label="Sayfa navigasyonu"');
    expect(html).toContain('value="/"');
    expect(html).toContain('value="/mufredat"');
    expect(html).toContain('value="/hedefler"');
    expect(html).toContain('value="/mufredat-kitaplari"');
    expect(html).toContain('value="/kampanyalar"');
    expect(html).toContain("Ana Sayfa");
    expect(html).toContain("Müfredat");
    expect(html).toContain("Hedefler");
    expect(html).toContain("Müfredat Kitapları");
    expect(html).toContain("Kampanyalar");
  });

  it("should mark current path as selected value in select navigation", () => {
    currentPathname = "/hedefler";
    mockSessionData = null;
    const html = renderToString(<AppHeader />);

    expect(html).toContain('value="/hedefler"');
    expect(html).toContain("Hedefler");
  });

  it("opens the sign-in form and restores focus to the opener", () => {
    currentPathname = "/";
    mockSessionData = null;
    renderDrawerContent = true;
    const html = renderToString(<AppHeader />);

    expect(html).toContain('name="username"');
    expect(html).not.toContain('name="confirmPassword"');
    expect(drawerAutoFocus).toBe(true);

    const focus = mock(() => {});
    const preventDefault = mock(() => {});
    const originalDocument = Object.getOwnPropertyDescriptor(globalThis, "document");
    Object.defineProperty(globalThis, "document", {
      configurable: true,
      value: { activeElement: { isConnected: true, focus } },
    });
    try {
      drawerContent.onOpenAutoFocus();
      drawerContent.onCloseAutoFocus({ preventDefault });
      expect(preventDefault).toHaveBeenCalledTimes(1);
      expect(focus).toHaveBeenCalledTimes(1);
    } finally {
      if (originalDocument) Object.defineProperty(globalThis, "document", originalDocument);
      else Reflect.deleteProperty(globalThis, "document");
      renderDrawerContent = false;
    }
  });
});
