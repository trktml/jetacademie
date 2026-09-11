import { CounterDemo } from "@/components/counter-demo";
import { QueryDemo } from "@/components/query-demo";
import { AuthZodDemo } from "@/components/auth-zod-demo";
import { AppHeader } from "@/components/app-header";
import { BottomNav } from "@/components/bottom-nav";
import { QuickActionsDrawer } from "@/components/quick-actions-drawer";
import {
  Smartphone,
  Layers,
  Sparkles,
  Server,
  ShieldCheck,
  CheckCircle2,
  Terminal,
} from "lucide-react";
import { JetLogoIcon } from "@/components/jet-logo";

export default function Home() {
  const stack = [
    { name: "Next.js 16 (App Router)", color: "bg-black text-white dark:bg-white dark:text-black" },
    { name: "Bun 1.3", color: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200" },
    { name: "Tailwind CSS v4", color: "bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-200" },
    {
      name: "Zustand 5",
      color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200",
    },
    {
      name: "TanStack Query 5",
      color: "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-200",
    },
    { name: "Zod 4", color: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200" },
    {
      name: "Better-Auth",
      color: "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-200",
    },
    {
      name: "Vaul Drawer",
      color: "bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-200",
    },
    {
      name: "PWA Manifest",
      color: "bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-200",
    },
    {
      name: "Dokploy / Docker",
      color: "bg-violet-100 text-violet-800 dark:bg-violet-950 dark:text-violet-200",
    },
  ];

  const pwaFeatures = [
    {
      icon: Smartphone,
      title: "Mobile-First & PWA Hazır",
      desc: "Safe-area (çentik) desteği, iOS zoom önleme, 44px dokunma hedefleri ve bağımsız web uygulaması manifesti.",
      color: "text-indigo-600 dark:text-indigo-400",
      bg: "bg-indigo-50 dark:bg-indigo-950/60",
    },
    {
      icon: Layers,
      title: "Vaul Bottom Sheet & Nav",
      desc: "Mobilde parmakla kaydırılabilir modern çekmece (drawer) ve masaüstünde yüzen diyalog penceresi.",
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-950/60",
    },
    {
      icon: Server,
      title: "TanStack Query & SSR",
      desc: "Sunucu tarafında prefetch, isomorphic hydration ve otomatik önbellek senkronizasyonu.",
      color: "text-rose-600 dark:text-rose-400",
      bg: "bg-rose-50 dark:bg-rose-950/60",
    },
    {
      icon: ShieldCheck,
      title: "Better-Auth & Bun SQLite",
      desc: "Dış veritabanı bağımlılığı olmadan çalışan, Zod v4 doğrulamalı yerel ve Docker uyumlu kimlik altyapısı.",
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-950/60",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 text-zinc-900 transition-colors dark:bg-zinc-950 dark:text-zinc-100">
      {/* Responsive Header for Mobile & Desktop */}
      <AppHeader />

      {/* Main Content Area */}
      <main className="pl-safe pr-safe flex-1 px-4 py-8 pb-28 sm:px-6 sm:py-12 md:pb-16 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-10 sm:space-y-12">
          {/* Hero Section */}
          <section id="overview" className="scroll-mt-24 space-y-6 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 dark:border-indigo-900 dark:bg-indigo-950/60 dark:text-indigo-300">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Next.js Mobile-First PWA Starter</span>
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-300">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Dokploy Production Ready</span>
              </div>
            </div>

            <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start">
              <div className="shrink-0 pt-1">
                <div className="group relative">
                  <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-tr from-indigo-500 via-sky-500 to-violet-600 opacity-40 blur-md transition duration-300 group-hover:opacity-75" />
                  <JetLogoIcon className="relative h-16 w-16 rounded-2xl shadow-xl transition-transform duration-200 group-hover:scale-105 sm:h-20 sm:w-20" />
                </div>
              </div>
              <div className="flex-1 space-y-3 text-center sm:text-left">
                <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                  Mobil ve Masaüstünde Kusursuz{" "}
                  <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-500 bg-clip-text text-transparent">
                    JetAcademie
                  </span>
                </h1>
                <p className="mx-auto max-w-3xl text-sm leading-relaxed text-zinc-600 sm:mx-0 sm:text-base lg:text-lg dark:text-zinc-400">
                  Next.js 16, Bun, Tailwind CSS v4, Zustand v5, TanStack Query v5, Zod v4 ve
                  Better-Auth ile güçlendirilmiş; mobil cihazlarda yerel uygulama hissi veren PWA
                  mimarisi, masaüstünde ise geniş ekranlara uyum sağlayan modern çatı.
                </p>
              </div>
            </div>

            {/* Stack Tags */}
            <div className="flex flex-wrap justify-center gap-2 pt-1 sm:justify-start">
              {stack.map((item) => (
                <span
                  key={item.name}
                  className={`rounded-lg px-2.5 py-1 text-xs font-medium shadow-2xs ${item.color}`}
                >
                  {item.name}
                </span>
              ))}
            </div>
          </section>

          {/* PWA & Architecture Highlights */}
          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {pwaFeatures.map((feat) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.title}
                  className="flex flex-col rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${feat.bg} ${feat.color} mb-3`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    {feat.title}
                  </h2>
                  <p className="mt-1.5 text-xs leading-normal text-zinc-500 dark:text-zinc-400">
                    {feat.desc}
                  </p>
                </div>
              );
            })}
          </section>

          {/* Interactive Demos Grid */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl dark:text-zinc-100">
                  Etkileşimli Durum ve Kimlik Modülleri
                </h2>
                <p className="text-xs text-zinc-500 sm:text-sm dark:text-zinc-400">
                  Tüm butonlar mobil dokunma standartlarına (min 44px) ve erişilebilirliğe uygundur.
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <CounterDemo />
              <QueryDemo />
              <div className="md:col-span-2">
                <AuthZodDemo />
              </div>
            </div>
          </section>

          {/* Dokploy & Docker Deployment Info */}
          <section
            id="dokploy"
            className="scroll-mt-24 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:shadow-md sm:p-8 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Terminal className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  <h2 className="text-lg font-bold sm:text-xl">🐳 Dokploy & Docker Dağıtımı</h2>
                </div>
                <p className="mt-1 text-xs text-zinc-500 sm:text-sm dark:text-zinc-400">
                  Çok aşamalı (multi-stage) Bun Dockerfile ve Bun SQLite kalıcı disk yapılandırması
                  Dokploy paneline doğrudan bağlanabilir.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-zinc-200/70 bg-zinc-50 p-4 dark:border-zinc-800/80 dark:bg-zinc-950/60">
                <span className="font-mono text-xs font-semibold tracking-wider text-zinc-500 uppercase">
                  1. Geliştirme (Bun)
                </span>
                <pre className="mt-2.5 overflow-x-auto rounded-lg bg-white p-2.5 font-mono text-xs text-indigo-600 dark:bg-zinc-900 dark:text-indigo-400">
                  bun dev
                </pre>
                <p className="mt-2 text-[11px] text-zinc-500 dark:text-zinc-400">
                  Turbopack ile anında derleme ve test ortamı.
                </p>
              </div>

              <div className="rounded-xl border border-zinc-200/70 bg-zinc-50 p-4 dark:border-zinc-800/80 dark:bg-zinc-950/60">
                <span className="font-mono text-xs font-semibold tracking-wider text-zinc-500 uppercase">
                  2. Docker Konteyneri
                </span>
                <pre className="mt-2.5 overflow-x-auto rounded-lg bg-white p-2.5 font-mono text-xs text-indigo-600 dark:bg-zinc-900 dark:text-indigo-400">
                  docker compose up --build
                </pre>
                <p className="mt-2 text-[11px] text-zinc-500 dark:text-zinc-400">
                  Dokploy üzerinde otomatik sağlık kontrolü ile çalışır.
                </p>
              </div>

              <div className="rounded-xl border border-zinc-200/70 bg-zinc-50 p-4 dark:border-zinc-800/80 dark:bg-zinc-950/60">
                <span className="font-mono text-xs font-semibold tracking-wider text-zinc-500 uppercase">
                  3. Kalite Kontrolü
                </span>
                <pre className="mt-2.5 overflow-x-auto rounded-lg bg-white p-2.5 font-mono text-xs text-indigo-600 dark:bg-zinc-900 dark:text-indigo-400">
                  bun test && bun run lint
                </pre>
                <p className="mt-2 text-[11px] text-zinc-500 dark:text-zinc-400">
                  Unit testler, ESLint ve Prettier standartları.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="pl-safe pr-safe border-t border-zinc-200/80 bg-white px-4 py-6 pb-28 text-center text-xs text-zinc-500 md:pb-6 dark:border-zinc-800/80 dark:bg-zinc-950 dark:text-zinc-400">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 sm:flex-row sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()} JetAcademie. Next.js 16 • Bun • Tailwind v4 • Dokploy
            Ready.
          </p>
          <div className="flex items-center gap-4">
            <span>PWA Standalone Uyumlu</span>
            <span>•</span>
            <span>WCAG 44px Touch Target</span>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Navigation Bar (Hidden on Desktop) */}
      <BottomNav />

      {/* Vaul Quick Actions Drawer (Adapts to Mobile Bottom Sheet & Desktop Dialog) */}
      <QuickActionsDrawer />
    </div>
  );
}
