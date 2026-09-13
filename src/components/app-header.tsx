"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useUiStore } from "@/store/use-ui-store";
import { LogIn } from "lucide-react";
import { JetLogo } from "@/components/jet-logo";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { AccountSheet } from "@/components/account-sheet";
import { authClient } from "@/lib/auth-client";
import { useGuestStore } from "@/store/use-guest-store";

function getPageTitle(pathname: string | null): string | null {
  if (!pathname || pathname === "/") return null;
  if (pathname.startsWith("/mufredat")) return "Müfredat";
  if (pathname.startsWith("/hedefler")) return "Hedefler";
  return null;
}

export function AppHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const pageTitle = getPageTitle(pathname);

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
                logoMarkup("md")
              ) : (
                <AnimatePresence mode="wait">
                  {pageTitle && (
                    <motion.div
                      key={pathname}
                      initial={{ opacity: 0, scale: 0.92, y: 3 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.92, y: -3 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                      className="site-header__breadcrumb"
                    >
                      <span>{pageTitle}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
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
