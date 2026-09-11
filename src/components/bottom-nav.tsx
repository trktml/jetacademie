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
      color: "text-rose-600 dark:text-rose-400",
    },
    {
      id: "zustand",
      label: "Zustand",
      href: "#zustand",
      icon: Layers,
      color: "text-emerald-600 dark:text-emerald-400",
    },
    {
      id: "query",
      label: "Query",
      href: "#query",
      icon: Database,
      color: "text-red-600 dark:text-red-400",
    },
    {
      id: "auth",
      label: "Kimlik",
      href: "#auth",
      icon: ShieldCheck,
      color: "text-amber-600 dark:text-amber-400",
    },
  ];

  return (
    <nav
      aria-label="Mobil Alt Navigasyon"
      className="pb-safe fixed right-0 bottom-0 left-0 z-40 border-t border-zinc-200/90 bg-white/95 shadow-[0_-4px_24px_rgba(0,0,0,0.06)] backdrop-blur-xl transition-colors md:hidden dark:border-zinc-800/90 dark:bg-zinc-950/95 dark:shadow-[0_-4px_24px_rgba(0,0,0,0.4)]"
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
                  className={`h-5 w-5 transition-transform ${item.color} ${
                    isActive ? "scale-110" : "opacity-80"
                  }`}
                />
                {isActive && (
                  <motion.span
                    layoutId="bottomNavDot"
                    className="absolute -top-1 -right-1 h-1.5 w-1.5 rounded-full bg-rose-600 dark:bg-rose-400"
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
            className={`flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-tr from-rose-700 via-red-700 to-amber-600 text-white shadow-xs transition-transform ${
              isDrawerOpen ? "scale-110" : ""
            }`}
          >
            <Sparkles className="h-3 w-3 text-amber-200" />
          </div>
          <span className="mt-1 leading-none font-semibold text-rose-700 dark:text-rose-400">
            Hızlı Menü
          </span>
        </motion.button>
      </div>
    </nav>
  );
}
