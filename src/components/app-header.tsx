"use client";

import Link from "next/link";
import { useUiStore } from "@/store/use-ui-store";
import { Sparkles, BookOpen, Star } from "lucide-react";
import { motion } from "motion/react";
import { JetLogo } from "@/components/jet-logo";

const navItems = [
  { id: "overview", label: "Ana Sayfa", href: "/", icon: Star },
  { id: "mufredat", label: "Müfredat", href: "/#mufredat-grid", icon: BookOpen },
];

export function AppHeader() {
  const { openDrawer } = useUiStore();

  return (
    <header className="pt-safe sticky top-0 z-30 w-full border-b border-zinc-200/80 bg-white/90 backdrop-blur-md transition-colors dark:border-zinc-800/80 dark:bg-[#0b0d12]/90">
      <div className="pl-safe pr-safe mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link
          href="/"
          className="group flex min-h-[44px] items-center rounded-lg text-left transition"
        >
          <JetLogo size="md" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                href={item.href}
                className="relative flex min-h-[44px] items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-zinc-600 transition hover:bg-zinc-100/70 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900/60 dark:hover:text-zinc-100"
              >
                <Icon className="h-3.5 w-3.5 text-zinc-500 dark:text-zinc-400" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Quick Actions */}
        <div className="flex items-center gap-2">
          <motion.button
            type="button"
            onClick={openDrawer}
            whileTap={{ scale: 0.95 }}
            aria-label="Hızlı İşlemler Menüsünü Aç"
            className="flex min-h-[44px] items-center gap-2 rounded-xl bg-zinc-900 px-3.5 py-2 text-xs font-semibold text-white shadow-2xs transition hover:bg-zinc-800 active:scale-95 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            <Sparkles className="h-4 w-4 text-zinc-400 dark:text-zinc-600" />
            <span className="hidden sm:inline">Hızlı İşlemler</span>
            <span className="sm:hidden">Menü</span>
          </motion.button>
        </div>
      </div>
    </header>
  );
}
