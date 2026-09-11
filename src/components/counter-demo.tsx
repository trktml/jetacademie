"use client";

import { useCounterStore } from "@/store/use-counter-store";
import { Plus, Minus, RotateCcw, SlidersHorizontal } from "lucide-react";

export function CounterDemo() {
  const { count, increment, decrement, reset } = useCounterStore();

  return (
    <div
      id="zustand"
      className="flex scroll-mt-24 flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition-all hover:shadow-md sm:p-6 dark:border-zinc-800 dark:bg-zinc-900"
    >
      <div>
        <div className="flex items-center justify-between pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300">
              <SlidersHorizontal className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Zustand Store Demo</h3>
              <p className="text-xs text-zinc-500 sm:text-sm dark:text-zinc-400">
                Global durum yönetimi (Client-side UI state)
              </p>
            </div>
          </div>
          <span className="rounded-full bg-indigo-50 px-3.5 py-1.5 font-mono text-sm font-bold text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
            {count}
          </span>
        </div>

        <p className="text-xs text-zinc-600 dark:text-zinc-400">
          Zustand v5 ile optimize edilmiş hafif istemci durumu. Hızlı menü veya buradaki butonlar
          aynı merkezi sayaç durumunu senkronize eder.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-2.5 sm:flex sm:flex-wrap">
        <button
          type="button"
          onClick={decrement}
          aria-label="Azalt"
          className="flex min-h-[44px] items-center justify-center gap-1.5 rounded-xl bg-zinc-100 px-4 py-2.5 text-sm font-medium text-zinc-800 transition hover:bg-zinc-200 active:scale-95 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
        >
          <Minus className="h-4 w-4" />
          <span>Azalt</span>
        </button>

        <button
          type="button"
          onClick={increment}
          aria-label="Artır"
          className="flex min-h-[44px] items-center justify-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-xs transition hover:bg-indigo-500 active:scale-95 dark:bg-indigo-500 dark:hover:bg-indigo-400"
        >
          <Plus className="h-4 w-4" />
          <span>Artır</span>
        </button>

        <button
          type="button"
          onClick={reset}
          aria-label="Sıfırla"
          className="flex min-h-[44px] items-center justify-center gap-1.5 rounded-xl border border-zinc-300 bg-transparent px-4 py-2.5 text-sm font-medium text-zinc-600 transition hover:bg-zinc-100 active:scale-95 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          <RotateCcw className="h-4 w-4" />
          <span>Sıfırla</span>
        </button>
      </div>
    </div>
  );
}
