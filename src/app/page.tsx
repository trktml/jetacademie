import Link from "next/link";
import { curriculumModules } from "@/lib/curriculum-data";
import { AppHeader } from "@/components/app-header";
import { BottomNav } from "@/components/bottom-nav";
import { QuickActionsDrawer } from "@/components/quick-actions-drawer";
import { HeroTree } from "@/components/hero-tree";
import { ChevronRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50/70 text-zinc-900 transition-colors dark:bg-[#0b0d12] dark:text-zinc-100">
      <AppHeader />

      {/* Compact Hero */}
      <section id="overview" className="scroll-mt-24">
        <HeroTree />
      </section>

      {/* Compact Curriculum List */}
      <main
        id="mufredat-grid"
        className="pl-safe pr-safe flex-1 px-4 py-6 pb-28 sm:px-6 sm:py-8 md:pb-10 lg:px-8"
      >
        <div className="mx-auto max-w-3xl">
          {/* Section Header */}
          <div className="mb-4 text-center sm:mb-6">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-200/60 bg-rose-50 px-3 py-1 text-[10px] font-semibold tracking-wider text-rose-700 uppercase dark:border-rose-900/40 dark:bg-rose-950/30 dark:text-rose-300">
              <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />6 MODÜL
            </span>
            <h2 className="mt-2 text-lg font-extrabold tracking-tight sm:text-xl">
              Manevi Gelişim Müfredatı
            </h2>
          </div>

          {/* Compact Module List */}
          <div className="space-y-2">
            {curriculumModules.map((mod) => {
              const Icon = mod.icon;
              return (
                <Link
                  key={mod.id}
                  href={`/mufredat/${mod.slug}`}
                  prefetch={true}
                  className="group flex items-center gap-3 rounded-xl border border-zinc-200/80 bg-white px-3.5 py-3 shadow-2xs transition-all duration-150 hover:border-rose-300 hover:shadow-md active:scale-[0.98] dark:border-zinc-800/80 dark:bg-zinc-900/60 dark:hover:border-rose-800"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-zinc-200/60 bg-zinc-100 text-zinc-600 transition-colors group-hover:border-rose-300 group-hover:bg-rose-50 group-hover:text-rose-600 dark:border-zinc-700/60 dark:bg-zinc-800 dark:text-zinc-300 dark:group-hover:border-rose-800 dark:group-hover:bg-rose-950/40 dark:group-hover:text-rose-400">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-semibold tracking-wider text-zinc-400 uppercase dark:text-zinc-500">
                        {mod.number}
                      </span>
                      <h3 className="text-sm leading-snug font-semibold text-zinc-900 group-hover:text-rose-700 dark:text-zinc-100 dark:group-hover:text-rose-300">
                        {mod.title}
                      </h3>
                    </div>
                    <p className="mt-0.5 line-clamp-1 text-xs text-zinc-500 dark:text-zinc-400">
                      {mod.subtitle} · {mod.weeks} Hafta · {mod.hours} Saat
                    </p>
                  </div>
                  <ChevronRight className="h-4 w-4 shrink-0 text-zinc-300 transition-transform group-hover:translate-x-0.5 group-hover:text-rose-400 dark:text-zinc-600" />
                </Link>
              );
            })}
          </div>

          {/* Motivational Quote */}
          <div className="mt-6 rounded-xl border border-zinc-200/60 bg-gradient-to-br from-zinc-50 to-rose-50/30 px-4 py-3.5 text-center dark:border-zinc-800/60 dark:from-zinc-900/60 dark:to-rose-950/10">
            <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
              &ldquo;İlim öğrenmek her Müslüman&apos;a farzdır.&rdquo;
            </p>
            <p className="mt-0.5 text-[10px] text-zinc-400 dark:text-zinc-500">
              — Hz. Muhammed (s.a.v.)
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="pl-safe pr-safe border-t border-zinc-200/80 bg-white/90 px-4 py-4 pb-24 text-center text-xs text-zinc-500 md:pb-4 dark:border-zinc-800/80 dark:bg-[#0b0d12]/90 dark:text-zinc-400">
        <p>© {new Date().getFullYear()} JetAcademie — Manevi Gelişim Müfredatı</p>
      </footer>

      <BottomNav />
      <QuickActionsDrawer />
    </div>
  );
}
