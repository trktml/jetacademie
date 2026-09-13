"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUiStore } from "@/store/use-ui-store";
import { LogIn } from "lucide-react";
import { JetLogo } from "@/components/jet-logo";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { AccountSheet } from "@/components/account-sheet";
import { authClient } from "@/lib/auth-client";

export function AppHeader() {
  const pathname = usePathname();
  const openAccount = useUiStore((state) => state.openAccount);
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const initial = (user?.name || "U").charAt(0).toUpperCase();
  const displayName = user?.name?.split(" ")[0] || "Hesap";

  return (
    <>
      <header className="site-header pt-safe" data-home={pathname === "/" ? "true" : undefined}>
        <div className="site-header__wrapper pl-safe pr-safe">
          <div className="site-header__island">
            <Link href="/" className="brand-link group" aria-label="JetAcademie ana sayfa">
              <JetLogo size="sm" showTagline={false} />
            </Link>

            <div className="header-actions">
              <ThemeSwitcher />
              <button
                type="button"
                onClick={openAccount}
                className="account-button"
                data-authenticated={user ? "true" : undefined}
                aria-label={user ? `Hesabı aç (${user.name})` : "Giriş yap"}
              >
                {user ? (
                  <>
                    <span className="account-button__avatar" aria-hidden="true">
                      {initial}
                    </span>
                    <span className="account-button__name">{displayName}</span>
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
      </header>
      <AccountSheet />
    </>
  );
}
