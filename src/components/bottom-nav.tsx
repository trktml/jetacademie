"use client";

import { useUiStore } from "@/store/use-ui-store";
import { Sparkles, Rocket, Layers, Database, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";

export function BottomNav() {
  const { isDrawerOpen, openDrawer, activeSection, setActiveSection } = useUiStore();

  const navItems = [
    {
      id: "overview",
      label: "Özet",
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
      label: "Query",
      href: "#query",
      icon: Database,
    },
    {
      id: "auth",
      label: "Kimlik",
      href: "#auth",
      icon: ShieldCheck,
    },
  ];

  return (
    <nav
      aria-label="Mobil Alt Navigasyon"
      className="pb-safe fixed right-0 bottom-0 left-0 z-40 border-t border-zinc-200/90 bg-white/95 shadow-[0_-4px_20px_rgba(0,0,0,0.04)] backdrop-blur-xl transition-colors md:hidden dark:border-zinc-800/90 dark:bg-[#0b0d12]/95 dark:shadow-[0_-4px_20px_rgba(0,0,0,0.4)]"
    >
      <div className="flex items-center justify-around px-2 py-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <motion.a
              key={item.id}
              href={item.href}
              onClick={() => setActiveSection(item.id)}
              whileTap={{ scale: 0.92 }}
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
            </motion.a>
          );
        })}

        {/* Action Trigger for Drawer */}
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
            Hızlı Menü
          </span>
        </motion.button>
      </div>
    </nav>
  );
}
