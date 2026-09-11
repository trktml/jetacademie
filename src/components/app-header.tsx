"use client";

import { useUiStore } from "@/store/use-ui-store";
import { useActiveSectionObserver } from "@/hooks/use-active-section";
import { Sparkles, Rocket, Layers, Database, ShieldCheck, Container } from "lucide-react";
import { motion } from "motion/react";
import { JetLogo } from "@/components/jet-logo";

const navItems = [
  {
    id: "overview",
    label: "Genel Bakış",
    href: "#overview",
    icon: Rocket,
  },
  {
    id: "zustand",
    label: "Zustand",
    href: "#zustand",
    icon: Layers,
  },
  {
    id: "query",
    label: "TanStack Query",
    href: "#query",
    icon: Database,
  },
  {
    id: "auth",
    label: "Kimlik & Zod",
    href: "#auth",
    icon: ShieldCheck,
  },
  {
    id: "dokploy",
    label: "Dokploy",
    href: "#dokploy",
    icon: Container,
  },
];

export function AppHeader() {
  const { openDrawer, activeSection, setActiveSection } = useUiStore();
  useActiveSectionObserver();

  return (
    <header className="pt-safe sticky top-0 z-30 w-full border-b border-zinc-200/80 bg-white/90 backdrop-blur-md transition-colors dark:border-zinc-800/80 dark:bg-[#0b0d12]/90">
      <div className="pl-safe pr-safe mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand & Logo */}
        <a
          href="#overview"
          onClick={() => setActiveSection("overview")}
          className="group flex min-h-[44px] items-center rounded-lg text-left transition"
        >
          <JetLogo size="md" />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setActiveSection(item.id)}
                className={`relative flex min-h-[44px] items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition ${
                  isActive
                    ? "bg-zinc-100 font-semibold text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100"
                    : "text-zinc-600 hover:bg-zinc-100/70 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900/60 dark:hover:text-zinc-100"
                }`}
              >
                <Icon
                  className={`h-3.5 w-3.5 ${
                    isActive
                      ? "text-[#881337] dark:text-[#e05666]"
                      : "text-zinc-500 dark:text-zinc-400"
                  }`}
                />
                <span>{item.label}</span>
                {isActive && (
                  <motion.span
                    layoutId="headerActiveIndicator"
                    className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-[#881337] dark:bg-[#d64555]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Quick Actions Drawer Trigger */}
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
