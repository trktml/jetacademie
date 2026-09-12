"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUiStore } from "@/store/use-ui-store";
import { Sparkles, Home, BookOpen, Heart, Star } from "lucide-react";
import { motion } from "motion/react";

const navItems = [
  { id: "home", label: "Ana Sayfa", href: "/", icon: Home },
  { id: "akaid", label: "Akaid", href: "/mufredat/akaid", icon: Star },
  { id: "ibadet", label: "İbadet", href: "/mufredat/ibadet", icon: BookOpen },
  { id: "ahlak", label: "Ahlâk", href: "/mufredat/ahlak", icon: Heart },
];

export function BottomNav() {
  const { openDrawer, isDrawerOpen } = useUiStore();
  const pathname = usePathname();

  return (
    <nav
      aria-label="Mobil Alt Navigasyon"
      className="pb-safe fixed right-0 bottom-0 left-0 z-40 border-t border-zinc-200/90 bg-white/95 shadow-[0_-4px_20px_rgba(0,0,0,0.04)] backdrop-blur-xl transition-colors md:hidden dark:border-zinc-800/90 dark:bg-[#0b0d12]/95 dark:shadow-[0_-4px_20px_rgba(0,0,0,0.4)]"
    >
      <div className="flex items-center justify-around px-2 py-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.id}
              href={item.href}
              prefetch={true}
              className={`relative flex min-h-[48px] min-w-[48px] flex-1 flex-col items-center justify-center rounded-xl py-1 text-[11px] font-medium transition-colors ${
                isActive
                  ? "font-bold text-zinc-900 dark:text-zinc-50"
                  : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              }`}
            >
              <div className="relative">
                <Icon
                  className={`h-5 w-5 transition-transform ${
                    isActive
                      ? "scale-110 text-[#881337] dark:text-[#e05666]"
                      : "text-zinc-500 opacity-80 dark:text-zinc-400"
                  }`}
                />
                {isActive && (
                  <motion.span
                    layoutId="bottomNavDot"
                    className="absolute -top-1 -right-1 h-1.5 w-1.5 rounded-full bg-[#881337] dark:bg-[#d64555]"
                    transition={{ type: "spring", stiffness: 380, damping: 25 }}
                  />
                )}
              </div>
              <span className="mt-1 leading-none">{item.label}</span>
            </Link>
          );
        })}

        {/* Drawer Trigger */}
        <motion.button
          type="button"
          onClick={openDrawer}
          whileTap={{ scale: 0.92 }}
          aria-label="Hızlı İşlemler Paneli"
          className="group relative flex min-h-[48px] min-w-[48px] flex-1 flex-col items-center justify-center rounded-xl py-1 text-[11px] font-medium text-zinc-600 transition-transform dark:text-zinc-400"
        >
          <div
            className={`flex h-5 w-5 items-center justify-center rounded-full bg-zinc-900 text-white shadow-2xs transition-transform dark:bg-zinc-100 dark:text-zinc-900 ${
              isDrawerOpen ? "scale-110" : ""
            }`}
          >
            <Sparkles className="h-3 w-3" />
          </div>
          <span className="mt-1 leading-none font-medium text-zinc-800 dark:text-zinc-200">
            Menü
          </span>
        </motion.button>
      </div>
    </nav>
  );
}
