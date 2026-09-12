"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUiStore } from "@/store/use-ui-store";
import { BookOpenText, Target, UserRound } from "lucide-react";
import { authClient } from "@/lib/auth-client";

const navItems = [
  { id: "mufredat", label: "Müfredat", href: "/mufredat", icon: BookOpenText },
  { id: "hedefler", label: "Hedefler", href: "/hedefler", icon: Target },
];

export function BottomNav() {
  const pathname = usePathname();
  const openAccount = useUiStore((state) => state.openAccount);
  const { data: session } = authClient.useSession();

  return (
    <nav aria-label="Mobil Alt Navigasyon" className="mobile-nav pb-safe">
      <div className="mobile-nav__inner">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.id}
              href={item.href}
              prefetch={true}
              className="mobile-nav__link"
              aria-current={isActive ? "page" : undefined}
            >
              <Icon aria-hidden="true" />
              <span>{item.label}</span>
            </Link>
          );
        })}

        <button
          type="button"
          onClick={openAccount}
          className="mobile-nav__link"
          aria-label={session?.user ? "Hesabı aç" : "Giriş yap"}
        >
          <UserRound aria-hidden="true" />
          <span>{session?.user ? "Hesap" : "Giriş"}</span>
        </button>
      </div>
    </nav>
  );
}
