"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useUiStore } from "@/store/use-ui-store";
import { BookOpenText, ChevronDown, Flame, Library, LogIn, Target } from "lucide-react";
import { JetLogo } from "@/components/jet-logo";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { AccountSheet } from "@/components/account-sheet";
import { authClient } from "@/lib/auth-client";
import { useGuestStore } from "@/store/use-guest-store";

const NAV_PAGES = [
  { href: "/mufredat", title: "Müfredat", subtitle: "Haftalık dosyalar", icon: BookOpenText },
  { href: "/hedefler", title: "Hedefler", subtitle: "Dönem planı", icon: Target },
  {
    href: "/mufredat-kitaplari",
    title: "Müfredat Kitapları",
    subtitle: "Ders kaynakları",
    icon: Library,
  },
  { href: "/kampanyalar", title: "Kampanyalar", subtitle: "Okuma & İbadet", icon: Flame },
];

function getPageTitle(pathname: string | null): string | null {
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
  const pathname = usePathname();
  const isHome = pathname === "/";
  const pageTitle = getPageTitle(pathname);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navDropdownRef = useRef<HTMLDivElement>(null);

  const openAccount = useUiStore((state) => state.openAccount);
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const isGuest = useGuestStore((s) => s.isGuest);
  const initial = (user?.name || "U").charAt(0).toUpperCase();
  const displayName = user?.name?.split(" ")[0] || "Hesap";

  // Close dropdown on outside click or escape
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navDropdownRef.current && !navDropdownRef.current.contains(e.target as Node)) {
        setIsNavOpen(false);
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsNavOpen(false);
      }
    }
    if (isNavOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isNavOpen]);

  // Close dropdown when pathname changes
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsNavOpen(false);
  }

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
                logoMarkup("md")
              ) : (
                <div className="relative" ref={navDropdownRef}>
                  <AnimatePresence mode="wait">
                    {pageTitle && (
                      <motion.button
                        key={pathname}
                        type="button"
                        onClick={() => setIsNavOpen((prev) => !prev)}
                        initial={{ opacity: 0, scale: 0.92, y: 3 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.92, y: -3 }}
                        transition={{ duration: 0.22, ease: "easeOut" }}
                        className="site-header__breadcrumb group/crumb flex cursor-pointer items-center gap-1.5 rounded-xl px-2 py-1 transition hover:bg-zinc-800/40"
                        aria-expanded={isNavOpen}
                        aria-haspopup="true"
                        aria-label={`Bölüm menüsü: ${pageTitle}`}
                      >
                        <span>{pageTitle}</span>
                        <ChevronDown
                          className={`h-3.5 w-3.5 text-zinc-400 transition-transform duration-200 ${
                            isNavOpen
                              ? "rotate-180 text-rose-400"
                              : "group-hover/crumb:text-zinc-200"
                          }`}
                          aria-hidden="true"
                        />
                      </motion.button>
                    )}
                  </AnimatePresence>

                  {/* Section Switcher Popover */}
                  <AnimatePresence>
                    {isNavOpen && (
                      <motion.nav
                        initial={{ opacity: 0, y: 6, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-1/2 z-50 mt-2 w-64 -translate-x-1/2 space-y-0.5 rounded-2xl border border-zinc-800/90 bg-zinc-950/95 p-1.5 shadow-2xl backdrop-blur-xl"
                        aria-label="JetAcademie ana bölümleri"
                      >
                        {NAV_PAGES.map((nav) => {
                          const Icon = nav.icon;
                          const isActive =
                            pathname === nav.href ||
                            (nav.href === "/mufredat-kitaplari" &&
                              pathname.startsWith("/mufredat-kitaplari"));
                          return (
                            <Link
                              key={nav.href}
                              href={nav.href}
                              onClick={() => setIsNavOpen(false)}
                              className={`flex min-h-[44px] items-center gap-3 rounded-xl p-2 transition ${
                                isActive
                                  ? "border border-rose-500/30 bg-rose-600/20 text-white"
                                  : "text-zinc-300 hover:bg-zinc-900 hover:text-white"
                              }`}
                            >
                              <span
                                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                                  isActive
                                    ? "bg-rose-600 text-white"
                                    : "border border-zinc-800 bg-zinc-900 text-zinc-400"
                                }`}
                              >
                                <Icon className="h-4 w-4" aria-hidden="true" />
                              </span>
                              <div className="flex flex-col text-left">
                                <span className="text-xs leading-tight font-bold">{nav.title}</span>
                                <span className="text-[10px] leading-tight text-zinc-400">
                                  {nav.subtitle}
                                </span>
                              </div>
                            </Link>
                          );
                        })}
                      </motion.nav>
                    )}
                  </AnimatePresence>
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
