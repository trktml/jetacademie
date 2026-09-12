import { notFound } from "next/navigation";
import Link from "next/link";
import { curriculumModules, getModuleBySlug } from "@/lib/curriculum-data";
import { ArrowLeft, CheckCircle2, Clock, Calendar, ChevronRight } from "lucide-react";

export function generateStaticParams() {
  return curriculumModules.map((mod) => ({ slug: mod.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const mod = getModuleBySlug(slug);
  if (!mod) return { title: "Bulunamadı — JetAcademie" };
  return {
    title: `${mod.title} — JetAcademie`,
    description: mod.description,
  };
}

export default async function ModulePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const mod = getModuleBySlug(slug);
  if (!mod) notFound();

  const Icon = mod.icon;
  const currentIndex = curriculumModules.findIndex((m) => m.id === mod.id);
  const prevMod = currentIndex > 0 ? curriculumModules[currentIndex - 1] : null;
  const nextMod =
    currentIndex < curriculumModules.length - 1 ? curriculumModules[currentIndex + 1] : null;

  return (
    <div className="flex min-h-screen flex-col bg-slate-50/70 text-zinc-900 transition-colors dark:bg-[#0b0d12] dark:text-zinc-100">
      {/* Top Bar */}
      <header className="pt-safe sticky top-0 z-30 w-full border-b border-zinc-200/80 bg-white/90 backdrop-blur-md dark:border-zinc-800/80 dark:bg-[#0b0d12]/90">
        <div className="pl-safe pr-safe mx-auto flex h-14 max-w-3xl items-center gap-3 px-4 sm:px-6">
          <Link
            href="/"
            className="flex min-h-[44px] items-center gap-1.5 rounded-lg px-2 py-2 text-sm font-medium text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Ana Sayfa</span>
          </Link>
          <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-800" />
          <span className="text-xs font-semibold tracking-wider text-zinc-400 uppercase dark:text-zinc-500">
            MODÜL {mod.number}
          </span>
        </div>
      </header>

      <main className="flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto max-w-3xl">
          {/* Module Header */}
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-zinc-200/60 bg-zinc-100 text-zinc-700 dark:border-zinc-700/60 dark:bg-zinc-800 dark:text-zinc-300">
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold tracking-tight sm:text-2xl">{mod.title}</h1>
              <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">{mod.subtitle}</p>
            </div>
          </div>

          {/* Stats Row */}
          <div className="mt-5 flex flex-wrap gap-3">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200/80 bg-white px-3 py-1.5 text-xs font-medium text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
              <Calendar className="h-3.5 w-3.5" />
              <span>{mod.weeks} Hafta</span>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200/80 bg-white px-3 py-1.5 text-xs font-medium text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
              <Clock className="h-3.5 w-3.5" />
              <span>{mod.hours} Saat</span>
            </div>
          </div>

          {/* Description */}
          <div className="mt-6 rounded-xl border border-zinc-200/80 bg-white p-5 dark:border-zinc-800/80 dark:bg-zinc-900/60">
            <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Genel Bakış</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {mod.description}
            </p>
          </div>

          {/* Topics */}
          <div className="mt-4 rounded-xl border border-zinc-200/80 bg-white p-5 dark:border-zinc-800/80 dark:bg-zinc-900/60">
            <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
              İşlenecek Konular
            </h2>
            <ul className="mt-3 space-y-2.5">
              {mod.topics.map((topic, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-sm text-zinc-700 dark:text-zinc-300"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" />
                  <span>{topic}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Weekly Breakdown (generated) */}
          <div className="mt-4 rounded-xl border border-zinc-200/80 bg-white p-5 dark:border-zinc-800/80 dark:bg-zinc-900/60">
            <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Haftalık Program</h2>
            <div className="mt-3 space-y-2">
              {Array.from({ length: mod.weeks }, (_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-lg border border-zinc-100 bg-zinc-50/60 px-3 py-2.5 dark:border-zinc-800/60 dark:bg-zinc-950/40"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-zinc-200/80 font-mono text-xs font-bold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                    {i + 1}
                  </span>
                  <span className="text-xs text-zinc-600 dark:text-zinc-400">
                    {i < mod.topics.length
                      ? mod.topics[i]
                      : `Hafta ${i + 1} — Derinleştirme ve Uygulama`}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Prev / Next Navigation */}
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {prevMod ? (
              <Link
                href={`/mufredat/${prevMod.slug}`}
                prefetch={true}
                className="flex items-center gap-3 rounded-xl border border-zinc-200/80 bg-white p-4 transition hover:border-rose-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-rose-800"
              >
                <ArrowLeft className="h-4 w-4 shrink-0 text-zinc-400" />
                <div>
                  <span className="text-[10px] font-semibold tracking-wider text-zinc-400 uppercase">
                    Önceki
                  </span>
                  <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    {prevMod.title.split("—")[0].trim()}
                  </p>
                </div>
              </Link>
            ) : (
              <div />
            )}
            {nextMod && (
              <Link
                href={`/mufredat/${nextMod.slug}`}
                prefetch={true}
                className="flex items-center justify-between gap-3 rounded-xl border border-zinc-200/80 bg-white p-4 transition hover:border-rose-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-rose-800"
              >
                <div>
                  <span className="text-[10px] font-semibold tracking-wider text-zinc-400 uppercase">
                    Sonraki
                  </span>
                  <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    {nextMod.title.split("—")[0].trim()}
                  </p>
                </div>
                <ChevronRight className="h-4 w-4 shrink-0 text-zinc-400" />
              </Link>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200/80 bg-white/90 px-4 py-4 text-center text-xs text-zinc-500 dark:border-zinc-800/80 dark:bg-[#0b0d12]/90 dark:text-zinc-400">
        <p>© {new Date().getFullYear()} JetAcademie — Manevi Gelişim Müfredatı</p>
      </footer>
    </div>
  );
}
