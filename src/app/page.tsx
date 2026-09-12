import { CounterDemo } from "@/components/counter-demo";
import { QueryDemo } from "@/components/query-demo";
import { AuthZodDemo } from "@/components/auth-zod-demo";
import { AppHeader } from "@/components/app-header";
import { BottomNav } from "@/components/bottom-nav";
import { QuickActionsDrawer } from "@/components/quick-actions-drawer";
import { HeroShowcase } from "@/components/hero-showcase";
import { CurriculumSection } from "@/components/curriculum-section";
import { TargetsSection } from "@/components/targets-section";
import { Smartphone, Layers, Server, ShieldCheck, Terminal } from "lucide-react";

export default function Home() {
  const stack = [
    "Next.js 16 (App Router)",
    "Bun 1.3",
    "Tailwind CSS v4",
    "Zustand 5",
    "TanStack Query 5",
    "Zod 4",
    "Better-Auth",
    "Vaul Drawer",
    "PWA Manifest",
    "Dokploy / Docker",
  ];

  const pwaFeatures = [
    {
      icon: Smartphone,
      title: "Mobile-First & PWA Hazır",
      desc: "Safe-area (çentik) desteği, iOS zoom önleme, 44px dokunma hedefleri ve bağımsız web uygulaması manifesti.",
    },
    {
      icon: Layers,
      title: "Vaul Bottom Sheet & Nav",
      desc: "Mobilde parmakla kaydırılabilir modern çekmece (drawer) ve masaüstünde yüzen diyalog penceresi.",
    },
    {
      icon: Server,
      title: "TanStack Query & SSR",
      desc: "Sunucu tarafında prefetch, isomorphic hydration ve otomatik önbellek senkronizasyonu.",
    },
    {
      icon: ShieldCheck,
      title: "Better-Auth & Bun SQLite",
      desc: "Dış veritabanı bağımlılığı olmadan çalışan, Zod v4 doğrulamalı yerel ve Docker uyumlu kimlik altyapısı.",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-slate-50/70 text-zinc-900 transition-colors dark:bg-[#0b0d12] dark:text-zinc-100">
      {/* Responsive Header for Mobile & Desktop */}
      <AppHeader />

      {/* Main Flagship Hero Showcase with Illuminated Crimson Tree & Bell Lamp */}
      <section id="overview" className="scroll-mt-24">
        <HeroShowcase />
      </section>

      {/* Main Content Area */}
      <main className="pl-safe pr-safe flex-1 px-4 py-8 pb-28 sm:px-6 sm:py-12 md:pb-16 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-12 sm:space-y-16">
          {/* Müfredat Section */}
          <CurriculumSection />

          {/* Hedefler Section */}
          <TargetsSection />

          {/* Technology Stack & PWA Architecture Highlights */}
          <section className="space-y-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl dark:text-zinc-100">
                  Teknoloji Yığını ve PWA Standartları
                </h2>
                <p className="text-xs text-zinc-500 sm:text-sm dark:text-zinc-400">
                  Üretim seviyesinde hız, bağımsız altyapı ve mobil uyumluluk için seçilmiş modern
                  araçlar.
                </p>
              </div>
            </div>

            {/* Stack Tags */}
            <div className="flex flex-wrap gap-2">
              {stack.map((name) => (
                <span
                  key={name}
                  className="rounded-lg border border-zinc-200/80 bg-white/90 px-2.5 py-1 text-xs font-medium text-zinc-700 shadow-2xs transition hover:border-zinc-300 dark:border-zinc-800/80 dark:bg-zinc-900/60 dark:text-zinc-300 dark:hover:border-zinc-700"
                >
                  {name}
                </span>
              ))}
            </div>

            {/* Features Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {pwaFeatures.map((feat) => {
                const Icon = feat.icon;
                return (
                  <div
                    key={feat.title}
                    className="flex flex-col rounded-2xl border border-zinc-200/80 bg-white/90 p-5 shadow-2xs transition hover:border-zinc-300 hover:shadow-xs dark:border-zinc-800/80 dark:bg-zinc-900/50 dark:hover:border-zinc-700"
                  >
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200/60 bg-zinc-100 text-zinc-800 dark:border-zinc-700/60 dark:bg-zinc-800 dark:text-zinc-200">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                      {feat.title}
                    </h3>
                    <p className="mt-1.5 text-xs leading-normal text-zinc-500 dark:text-zinc-400">
                      {feat.desc}
                    </p>
                  </div>
                );
              })}
            </div>
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
              <div id="zustand" className="scroll-mt-24">
                <CounterDemo />
              </div>
              <div id="query" className="scroll-mt-24">
                <QueryDemo />
              </div>
              <div id="auth" className="scroll-mt-24 md:col-span-2">
                <AuthZodDemo />
              </div>
            </div>
          </section>

          {/* Dokploy & Docker Deployment Info */}
          <section
            id="dokploy"
            className="scroll-mt-24 rounded-2xl border border-zinc-200/80 bg-white/90 p-6 shadow-2xs transition hover:shadow-xs sm:p-8 dark:border-zinc-800/80 dark:bg-zinc-900/50"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Terminal className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
                  <h2 className="text-lg font-bold text-zinc-900 sm:text-xl dark:text-zinc-100">
                    Dokploy & Docker Dağıtımı
                  </h2>
                </div>
                <p className="mt-1 text-xs text-zinc-500 sm:text-sm dark:text-zinc-400">
                  Çok aşamalı (multi-stage) Bun Dockerfile ve Bun SQLite kalıcı disk yapılandırması
                  Dokploy paneline doğrudan bağlanabilir.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-zinc-200/70 bg-zinc-50/80 p-4 dark:border-zinc-800/80 dark:bg-zinc-950/60">
                <span className="font-mono text-xs font-semibold tracking-wider text-zinc-500 uppercase">
                  1. Geliştirme (Bun)
                </span>
                <pre className="mt-2.5 overflow-x-auto rounded-lg border border-zinc-200/70 bg-white p-2.5 font-mono text-xs text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
                  bun dev
                </pre>
                <p className="mt-2 text-[11px] text-zinc-500 dark:text-zinc-400">
                  Turbopack ile anında derleme ve test ortamı.
                </p>
              </div>

              <div className="rounded-xl border border-zinc-200/70 bg-zinc-50/80 p-4 dark:border-zinc-800/80 dark:bg-zinc-950/60">
                <span className="font-mono text-xs font-semibold tracking-wider text-zinc-500 uppercase">
                  2. Docker Konteyneri
                </span>
                <pre className="mt-2.5 overflow-x-auto rounded-lg border border-zinc-200/70 bg-white p-2.5 font-mono text-xs text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
                  docker compose up --build
                </pre>
                <p className="mt-2 text-[11px] text-zinc-500 dark:text-zinc-400">
                  Dokploy üzerinde otomatik sağlık kontrolü ile çalışır.
                </p>
              </div>

              <div className="rounded-xl border border-zinc-200/70 bg-zinc-50/80 p-4 dark:border-zinc-800/80 dark:bg-zinc-950/60">
                <span className="font-mono text-xs font-semibold tracking-wider text-zinc-500 uppercase">
                  3. Kalite Kontrolü
                </span>
                <pre className="mt-2.5 overflow-x-auto rounded-lg border border-zinc-200/70 bg-white p-2.5 font-mono text-xs text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
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
      <footer className="pl-safe pr-safe border-t border-zinc-200/80 bg-white/90 px-4 py-6 pb-28 text-center text-xs text-zinc-500 md:pb-6 dark:border-zinc-800/80 dark:bg-[#0b0d12]/90 dark:text-zinc-400">
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
