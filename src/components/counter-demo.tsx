"use client";

import { useCounterStore } from "@/store/use-counter-store";

export function CounterDemo() {
  const { count, increment, decrement, reset } = useCounterStore();

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-center justify-between pb-4">
        <div>
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Zustand Store Demo</h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Global durum yönetimi testi (Client-side state)
          </p>
        </div>
        <span className="rounded-full bg-indigo-50 px-3 py-1 font-mono text-sm font-bold text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400">
          Sayaç: {count}
        </span>
      </div>

      <div className="mt-2 flex gap-3">
        <button
          type="button"
          onClick={decrement}
          className="rounded-lg bg-zinc-100 px-4 py-2 font-medium text-zinc-800 transition-colors hover:bg-zinc-200 active:scale-95 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
        >
          - Azalt
        </button>
        <button
          type="button"
          onClick={increment}
          className="rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white transition-colors hover:bg-indigo-500 active:scale-95 dark:bg-indigo-500 dark:hover:bg-indigo-400"
        >
          + Artır
        </button>
        <button
          type="button"
          onClick={reset}
          className="rounded-lg border border-zinc-300 px-4 py-2 font-medium text-zinc-600 transition-colors hover:bg-zinc-100 active:scale-95 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800"
        >
          Sıfırla
        </button>
      </div>
    </div>
  );
}
