"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useUiStore } from "@/store/use-ui-store";
import { ChevronDown, LogIn } from "lucide-react";
import { JetLogo } from "@/components/jet-logo";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { AccountSheet } from "@/components/account-sheet";
import { authClient } from "@/lib/auth-client";
import { useGuestStore } from "@/store/use-guest-store";

export const NAV_OPTIONS = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/mufredat", label: "Müfredat" },
  { href: "/hedefler", label: "Hedefler" },
  { href: "/mufredat-kitaplari", label: "Müfredat Kitapları" },
  { href: "/kampanyalar", label: "Kampanyalar" },
] as const;

export function getActiveNavValue(pathname: string | null): string {
  if (!pathname || pathname === "/") return "/";
  if (pathname.startsWith("/mufredat-kitaplari") || pathname.startsWith("/kitaplar")) {
    return "/mufredat-kitaplari";
  }
  if (pathname.startsWith("/mufredat")) return "/mufredat";
  if (pathname.startsWith("/hedefler")) return "/hedefler";
  if (pathname.startsWith("/kampanyalar")) return "/kampanyalar";
  return "/";
}

export function getPageTitle(pathname: string | null): string | null {
  if (!pathname || pathname === "/") return null;
  if (pathname.startsWith("/mufredat-kitaplari") || pathname.startsWith("/kitaplar")) {
    return "Müfredat Kitapları";
  }
  if (pathname.startsWith("/mufredat")) return "Müfredat";
  if (pathname.startsWith("/hedefler")) return "Hedefler";
  if (pathname.startsWith("/kampanyalar")) return "Kampanyalar";
  return null;
}

export function AppHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const pageTitle = getPageTitle(pathname);
  const activeNav = getActiveNavValue(pathname);

  const openAccount = useUiStore((state) => state.openAccount);
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const isGuest = useGuestStore((s) => s.isGuest);
  const initial = (user?.name || "U").charAt(0).toUpperCase();
  const displayName = user?.name?.split(" ")[0] || "Hesap";

  const logoMarkup = (size: "sm" | "md" = "sm") => (
    <motion.div
      layoutId="header-logo"
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 26,
      }}
      className="brand-link-wrap"
    >
      <Link href="/" className="brand-link group" aria-label="JetAcademie ana sayfa">
        <JetLogo size={size} showTagline={false} />
      </Link>
    </motion.div>
  );

  return (
    <>
      <header className="site-header pt-safe" data-home={isHome ? "true" : undefined}>
        <div className="site-header__wrapper pl-safe pr-safe">
          <div className="site-header__island">
            <div className="site-header__slot site-header__slot--left">
              {!isHome && logoMarkup()}
            </div>

            <div className="site-header__slot site-header__slot--center">
              {isHome ? (
                logoMarkup()
              ) : (
                <div className="site-header__nav-select-wrap">
                  <AnimatePresence mode="wait">
                    {pageTitle && (
                      <motion.div
                        key={pathname}
                        initial={{ opacity: 0, scale: 0.92, y: 3 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.92, y: -3 }}
                        transition={{ duration: 0.22, ease: "easeOut" }}
                        className="site-header__breadcrumb site-header__nav-select-pill group/crumb"
                      >
                        <span>{pageTitle}</span>
                        <ChevronDown
                          className="h-3.5 w-3.5 text-zinc-400 transition-transform duration-200 group-hover/crumb:text-zinc-200"
                          aria-hidden="true"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <select
                    aria-label="Sayfa navigasyonu"
                    value={activeNav}
                    onChange={(e) => {
                      const target = e.target.value;
                      if (target && target !== pathname) {
                        router.push(target);
                      }
                    }}
                    className="site-header__nav-select"
                  >
                    {NAV_OPTIONS.map((opt) => (
                      <option key={opt.href} value={opt.href}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <div className="site-header__slot site-header__slot--right">
              <div className="header-actions">
                <ThemeSwitcher />
                <button
                  type="button"
                  onClick={openAccount}
                  className="account-button"
                  data-authenticated={user ? "true" : undefined}
                  data-guest={!user && isGuest ? "true" : undefined}
                  aria-label={
                    user ? `Hesabı aç (${user.name})` : isGuest ? "Misafir hesabı aç" : "Giriş yap"
                  }
                >
                  {user ? (
                    <>
                      <span className="account-button__avatar" aria-hidden="true">
                        {initial}
                      </span>
                      <span className="account-button__name">{displayName}</span>
                    </>
                  ) : isGuest ? (
                    <>
                      <span
                        className="account-button__avatar account-button__avatar--guest"
                        aria-hidden="true"
                      >
                        M
                      </span>
                      <span className="account-button__name">Misafir</span>
                    </>
                  ) : (
                    <>
                      <LogIn className="account-button__icon" aria-hidden="true" />
                      <span className="account-button__name">Giriş yap</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      <AccountSheet />
    </>
  );
}
