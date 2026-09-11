"use client";

import { Drawer } from "vaul";
import { useUiStore } from "@/store/use-ui-store";
import { useCounterStore } from "@/store/use-counter-store";
import { useQueryClient } from "@tanstack/react-query";
import {
  Sparkles,
  Smartphone,
  Server,
  RotateCcw,
  Plus,
  Minus,
  CheckCircle2,
  X,
  ExternalLink,
  Laptop,
} from "lucide-react";
import { useState, useSyncExternalStore } from "react";

function subscribeStandalone(callback: () => void) {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return () => {};
  const mediaQuery = window.matchMedia("(display-mode: standalone)");
  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener("change", callback);
    return () => mediaQuery.removeEventListener("change", callback);
  }
  return () => {};
}

function getStandaloneSnapshot() {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return false;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    Boolean((window.navigator as unknown as { standalone?: boolean }).standalone)
  );
}

function getStandaloneServerSnapshot() {
  return false;
}

export function QuickActionsDrawer() {
  const { isDrawerOpen, setDrawerOpen } = useUiStore();
  const { count, increment, decrement, reset } = useCounterStore();
  const queryClient = useQueryClient();
  const isStandalone = useSyncExternalStore(
    subscribeStandalone,
    getStandaloneSnapshot,
    getStandaloneServerSnapshot
  );
  const [isHealthRefetching, setIsHealthRefetching] = useState(false);

  const handleHealthRefetch = async () => {
    setIsHealthRefetching(true);
    try {
      await queryClient.refetchQueries({ queryKey: ["health"] });
    } finally {
      setIsHealthRefetching(false);
    }
  };

  return (
    <Drawer.Root open={isDrawerOpen} onOpenChange={setDrawerOpen}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs transition-opacity" />
        <Drawer.Content className="pb-safe fixed right-0 bottom-0 left-0 z-50 mt-24 flex max-h-[85vh] flex-col rounded-t-[28px] border-t border-zinc-200 bg-white p-6 shadow-2xl transition-all outline-none md:bottom-8 md:mx-auto md:max-w-xl md:rounded-3xl md:border dark:border-zinc-800 dark:bg-[#0d0f14]">
          {/* Native Drawer Handle for touch gesture drag */}
          <Drawer.Handle className="mx-auto mb-4 bg-zinc-300 dark:bg-zinc-700" />

          {/* Drawer Header */}
          <div className="flex items-center justify-between pb-3">
            <div>
              <Drawer.Title className="flex items-center gap-2 text-lg font-bold text-zinc-900 dark:text-zinc-100">
                <Sparkles className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
                <span>Hızlı İşlem & PWA Paneli</span>
              </Drawer.Title>
              <Drawer.Description className="text-xs text-zinc-500 dark:text-zinc-400">
                Mobil ve masaüstü için optimize edilmiş hızlı kontroller.
              </Drawer.Description>
            </div>
            <Drawer.Close asChild>
              <button
                type="button"
                aria-label="Kapat"
                className="flex h-11 min-h-[44px] w-11 min-w-[44px] items-center justify-center rounded-full bg-zinc-100 text-zinc-600 transition-colors hover:bg-zinc-200 active:scale-95 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
              >
                <X className="h-5 w-5" />
              </button>
            </Drawer.Close>
          </div>

          <div className="space-y-4 overflow-y-auto pr-1">
            {/* PWA Info Card */}
            <div className="rounded-2xl border border-zinc-200/80 bg-zinc-50/80 p-4 dark:border-zinc-800/80 dark:bg-zinc-950/60">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-900 text-white shadow-2xs dark:bg-zinc-100 dark:text-zinc-900">
                    <Smartphone className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      PWA Durumu
                    </h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      {isStandalone ? "Uygulama Modunda Çalışıyor" : "Tarayıcı Modu (Yüklenebilir)"}
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full border border-zinc-200 bg-white px-2.5 py-1 text-xs font-semibold text-zinc-800 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  {isStandalone ? "Kurulu" : "Hazır"}
                </span>
              </div>

              <div className="mt-3 grid grid-cols-1 gap-2 text-xs text-zinc-600 sm:grid-cols-2 dark:text-zinc-400">
                <div className="flex items-center gap-1.5 rounded-lg border border-zinc-200/70 bg-white/90 p-2 dark:border-zinc-800 dark:bg-zinc-900/80">
                  <Smartphone className="h-4 w-4 shrink-0 text-zinc-700 dark:text-zinc-300" />
                  <span>iOS: Paylaş → Ana Ekrana Ekle</span>
                </div>
                <div className="flex items-center gap-1.5 rounded-lg border border-zinc-200/70 bg-white/90 p-2 dark:border-zinc-800 dark:bg-zinc-900/80">
                  <Laptop className="h-4 w-4 shrink-0 text-zinc-700 dark:text-zinc-300" />
                  <span>Android & PC: Adres çubuğundan Yükle</span>
                </div>
              </div>
            </div>

            {/* Fast Zustand Counter Control */}
            <div className="rounded-2xl border border-zinc-200/80 bg-zinc-50/80 p-4 dark:border-zinc-800/80 dark:bg-zinc-950/60">
              <div className="flex items-center justify-between pb-3">
                <span className="text-xs font-semibold tracking-wider text-zinc-600 uppercase dark:text-zinc-400">
                  Zustand Hızlı Sayaç
                </span>
                <span className="font-mono text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  Sayaç: {count}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={decrement}
                  aria-label="Azalt"
                  className="flex min-h-[44px] items-center justify-center gap-1 rounded-xl border border-zinc-200 bg-white text-sm font-medium text-zinc-800 shadow-2xs transition hover:bg-zinc-100 active:scale-95 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
                >
                  <Minus className="h-4 w-4" />
                  <span>Azalt</span>
                </button>
                <button
                  type="button"
                  onClick={increment}
                  aria-label="Artır"
                  className="flex min-h-[44px] items-center justify-center gap-1 rounded-xl bg-zinc-900 text-sm font-medium text-white shadow-2xs transition hover:bg-zinc-800 active:scale-95 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
                >
                  <Plus className="h-4 w-4" />
                  <span>Artır</span>
                </button>
                <button
                  type="button"
                  onClick={reset}
                  aria-label="Sıfırla"
                  className="flex min-h-[44px] items-center justify-center gap-1 rounded-xl border border-zinc-200 bg-white text-sm font-medium text-zinc-600 shadow-2xs transition hover:bg-zinc-100 active:scale-95 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>Sıfırla</span>
                </button>
              </div>
            </div>

            {/* Fast Query Refetch Control */}
            <div className="rounded-2xl border border-zinc-200/80 bg-zinc-50/80 p-4 dark:border-zinc-800/80 dark:bg-zinc-950/60">
              <div className="flex items-center justify-between pb-3">
                <div className="flex items-center gap-2">
                  <Server className="h-4 w-4 text-zinc-700 dark:text-zinc-300" />
                  <span className="text-xs font-semibold tracking-wider text-zinc-600 uppercase dark:text-zinc-400">
                    Sunucu Durumu
                  </span>
                </div>
                <span className="text-xs text-zinc-500">TanStack Query</span>
              </div>
              <button
                type="button"
                onClick={handleHealthRefetch}
                disabled={isHealthRefetching}
                className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white shadow-2xs transition hover:bg-zinc-800 active:scale-95 disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
              >
                <RotateCcw className={`h-4 w-4 ${isHealthRefetching ? "animate-spin" : ""}`} />
                <span>{isHealthRefetching ? "Yenileniyor..." : "Sağlık Kontrolünü Yenile"}</span>
              </button>
            </div>

            {/* Dokploy & Cloud Deployment Quick Link */}
            <div className="flex items-center justify-between rounded-xl border border-zinc-200/80 bg-zinc-100/80 px-3.5 py-2.5 text-xs text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900/70 dark:text-zinc-400">
              <span>Dokploy & Docker Multi-Stage Ready</span>
              <span className="inline-flex items-center gap-1 font-semibold text-zinc-900 dark:text-zinc-100">
                Bun SQLite <ExternalLink className="h-3 w-3" />
              </span>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
