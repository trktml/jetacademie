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
    color: "text-indigo-500",
  },
  {
    id: "zustand",
    label: "Zustand",
    href: "#zustand",
    icon: Layers,
    color: "text-emerald-500",
  },
  {
    id: "query",
    label: "TanStack Query",
    href: "#query",
    icon: Database,
    color: "text-rose-500",
  },
  {
    id: "auth",
    label: "Kimlik & Zod",
    href: "#auth",
    icon: ShieldCheck,
    color: "text-purple-500",
  },
  {
    id: "dokploy",
    label: "Dokploy",
    href: "#dokploy",
    icon: Container,
    color: "text-sky-500",
  },
];

export function AppHeader() {
  const { openDrawer, activeSection, setActiveSection } = useUiStore();
  useActiveSectionObserver();

  return (
    <header className="pt-safe sticky top-0 z-30 w-full border-b border-zinc-200/80 bg-white/85 backdrop-blur-md transition-colors dark:border-zinc-800/80 dark:bg-zinc-950/85">
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
                className={`relative flex min-h-[44px] items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition ${
                  isActive
                    ? "bg-zinc-100 text-indigo-600 dark:bg-zinc-800/90 dark:text-indigo-300"
                    : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${item.color}`} />
                <span>{item.label}</span>
                {isActive && (
                  <motion.span
                    layoutId="headerActiveIndicator"
                    className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-indigo-600 dark:bg-indigo-400"
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
            className="flex min-h-[44px] items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition hover:from-indigo-500 hover:to-indigo-600 active:scale-95 dark:from-indigo-500 dark:to-indigo-600 dark:hover:from-indigo-400 dark:hover:to-indigo-500"
          >
            <Sparkles className="h-4 w-4 animate-pulse text-amber-300" />
            <span className="hidden sm:inline">Hızlı İşlemler</span>
            <span className="sm:hidden">Menü</span>
          </motion.button>
        </div>
      </div>
    </header>
  );
}
