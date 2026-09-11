import { CounterDemo } from "@/components/counter-demo";
import { AuthZodDemo } from "@/components/auth-zod-demo";

export default function Home() {
  const stack = [
    { name: "Next.js 16 (App Router)", color: "bg-black text-white dark:bg-white dark:text-black" },
    { name: "Bun 1.3", color: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200" },
    { name: "Tailwind CSS v4", color: "bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-200" },
    {
      name: "Zustand 5",
      color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200",
    },
    { name: "Zod 4", color: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200" },
    {
      name: "Better-Auth",
      color: "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-200",
    },
    { name: "Prettier", color: "bg-pink-100 text-pink-800 dark:bg-pink-950 dark:text-pink-200" },
    {
      name: "Dokploy / Docker",
      color: "bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-200",
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 px-4 py-12 text-zinc-900 transition-colors sm:px-6 lg:px-8 dark:bg-zinc-950 dark:text-zinc-100">
      <div className="mx-auto max-w-5xl space-y-10">
        {/* Header */}
        <header className="space-y-4 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 dark:border-indigo-900 dark:bg-indigo-950/60 dark:text-indigo-300">
            <span>🚀 Production Ready Starter</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">JetAcademie</h1>
          <p className="max-w-2xl text-base text-zinc-600 dark:text-zinc-400">
            Next.js, Bun, Tailwind CSS v4, Zustand, Zod, Better-Auth, Prettier ve Dokploy için
            Docker hazır tam konfigürasyonlu modern geliştirme çatısı.
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {stack.map((item) => (
              <span
                key={item.name}
                className={`rounded-md px-2.5 py-1 text-xs font-medium ${item.color}`}
              >
                {item.name}
              </span>
            ))}
          </div>
        </header>

        {/* Interactive Demos Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          <CounterDemo />
          <AuthZodDemo />
        </div>

        {/* dokploy & Docker info */}
        <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-lg font-semibold">🐳 Dokploy & Docker Dağıtımı</h2>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Proje Dokploy üzerinde doğrudan deploy edilebilir şekilde çok aşamalı (multi-stage)
            Dockerfile ve docker-compose yapılandırmasına sahiptir.
          </p>

          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg bg-zinc-50 p-4 dark:bg-zinc-800/60">
              <span className="font-mono text-xs font-semibold text-zinc-500">1. Yerel Test</span>
              <pre className="mt-2 overflow-x-auto font-mono text-xs text-indigo-600 dark:text-indigo-400">
                bun dev
              </pre>
            </div>
            <div className="rounded-lg bg-zinc-50 p-4 dark:bg-zinc-800/60">
              <span className="font-mono text-xs font-semibold text-zinc-500">2. Docker Build</span>
              <pre className="mt-2 overflow-x-auto font-mono text-xs text-indigo-600 dark:text-indigo-400">
                docker compose up --build
              </pre>
            </div>
            <div className="rounded-lg bg-zinc-50 p-4 dark:bg-zinc-800/60">
              <span className="font-mono text-xs font-semibold text-zinc-500">3. Kod Formatı</span>
              <pre className="mt-2 overflow-x-auto font-mono text-xs text-indigo-600 dark:text-indigo-400">
                bun run format
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
