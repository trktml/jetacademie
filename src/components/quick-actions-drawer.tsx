"use client";

import { Drawer } from "vaul";
import Link from "next/link";
import { useUiStore } from "@/store/use-ui-store";
import { curriculumModules } from "@/lib/curriculum-data";
import { Sparkles, X, ChevronRight, BookOpen } from "lucide-react";

export function QuickActionsDrawer() {
  const { isDrawerOpen, setDrawerOpen, closeDrawer } = useUiStore();

  return (
    <Drawer.Root open={isDrawerOpen} onOpenChange={setDrawerOpen}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs transition-opacity" />
        <Drawer.Content className="pb-safe fixed right-0 bottom-0 left-0 z-50 mt-24 flex max-h-[85vh] flex-col rounded-t-[28px] border-t border-zinc-200 bg-white p-6 shadow-2xl transition-all outline-none md:bottom-8 md:mx-auto md:max-w-xl md:rounded-3xl md:border dark:border-zinc-800 dark:bg-[#0d0f14]">
          <Drawer.Handle className="mx-auto mb-4 bg-zinc-300 dark:bg-zinc-700" />

          {/* Header */}
          <div className="flex items-center justify-between pb-3">
            <div>
              <Drawer.Title className="flex items-center gap-2 text-lg font-bold text-zinc-900 dark:text-zinc-100">
                <Sparkles className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
                <span>Müfredat Menüsü</span>
              </Drawer.Title>
              <Drawer.Description className="text-xs text-zinc-500 dark:text-zinc-400">
                Hızlıca bir derse geçin.
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

          {/* Module List */}
          <div className="space-y-2 overflow-y-auto pr-1">
            {curriculumModules.map((mod) => {
              const Icon = mod.icon;
              return (
                <Link
                  key={mod.id}
                  href={`/mufredat/${mod.slug}`}
                  prefetch={true}
                  onClick={closeDrawer}
                  className="flex min-h-[48px] items-center gap-3 rounded-xl border border-zinc-200/80 bg-zinc-50/80 p-3.5 transition-all hover:border-rose-300 hover:shadow-sm active:scale-[0.98] dark:border-zinc-800/80 dark:bg-zinc-950/60 dark:hover:border-rose-800"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-zinc-200/60 bg-white text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      {mod.title}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">{mod.subtitle}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 shrink-0 text-zinc-300 dark:text-zinc-600" />
                </Link>
              );
            })}

            {/* Hadith Quote */}
            <div className="mt-2 rounded-xl border border-zinc-200/60 bg-gradient-to-br from-zinc-50 to-rose-50/30 p-4 text-center dark:border-zinc-800/60 dark:from-zinc-900/60 dark:to-rose-950/10">
              <BookOpen className="mx-auto h-4 w-4 text-rose-400" />
              <p className="mt-2 text-xs font-medium text-zinc-600 dark:text-zinc-400">
                &ldquo;Kim ilim öğrenmek için bir yola girerse, Allah ona cennetin yolunu
                kolaylaştırır.&rdquo;
              </p>
              <p className="mt-1 text-[10px] text-zinc-400 dark:text-zinc-500">— Sahih-i Müslim</p>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
