"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUiStore } from "@/store/use-ui-store";
import { UserRound } from "lucide-react";
import { JetLogo } from "@/components/jet-logo";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { AccountSheet } from "@/components/account-sheet";
import { authClient } from "@/lib/auth-client";

export function AppHeader() {
  const pathname = usePathname();
  const openAccount = useUiStore((state) => state.openAccount);
  const { data: session } = authClient.useSession();

  return (
    <>
      <header className="site-header pt-safe" data-home={pathname === "/" ? "true" : undefined}>
        <div className="pl-safe pr-safe site-header__inner">
          <Link href="/" className="brand-link group" aria-label="JetAcademie ana sayfa">
            <JetLogo size="md" />
          </Link>

          <div className="header-actions">
            <ThemeSwitcher />
            <button
              type="button"
              onClick={openAccount}
              className="account-button"
              aria-label={session?.user ? "Hesabı aç" : "Giriş yap"}
            >
              <UserRound aria-hidden="true" />
              <span>{session?.user?.name?.split(" ")[0] || "Giriş yap"}</span>
            </button>
          </div>
        </div>
      </header>
      <AccountSheet />
    </>
  );
}
