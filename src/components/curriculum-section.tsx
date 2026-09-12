import React from "react";
import { BookOpen, Layers, Cpu, Server, CheckCircle2, ArrowUpRight } from "lucide-react";

export function CurriculumSection() {
  const modules = [
    {
      id: "mod-01",
      number: "01",
      title: "Next.js 16 & React 19 Mimarisi",
      category: "Full-Stack Web",
      icon: Layers,
      description:
        "App Router, Server Components, Hydration Boundary, PWA Safe Area desteği ve Turbopack derleme motoru ile modern web temelleri.",
      topics: [
        "React 19 Asenkron Sayfa & Parametre Yönetimi",
        "PWA Manifest & Safe-Area Entegrasyonu",
        "TanStack Query v5 SSR Prefetch Singleton",
        "Turbopack ile Milisaniyelik HSR Geliştirme",
      ],
    },
    {
      id: "mod-02",
      number: "02",
      title: "Bun & SQLite ile Ultra Hızlı Altyapı",
      category: "Çalışma Zamanı & DB",
      icon: Server,
      description:
        "Node.js yerine Bun 1.3 runtime gücü, yerleşik bun:test kütüphanesi ve Better-Auth ile sıfır dış bağımlılıklı SQLite mimarisi.",
      topics: [
        "Bun Native Paket Yöneticisi & Test Suite",
        "Better-Auth ile Yerel SQLite Kimlik Doğrulama",
        "Zod v4 Şema Doğrulama & Tip Çıkarımı",
        "Multi-Stage Docker & SQLite Kalıcı Volume",
      ],
    },
    {
      id: "mod-03",
      number: "03",
      title: "Yapay Zeka Ajanları & LLM Mimarisi",
      category: "Otonom Sistemler",
      icon: Cpu,
      description:
        "Büyük dil modelleri (LLM), işlev çağırma (tool calling), özerk ajan döngüleri ve asenkron akış durum yönetimi.",
      topics: [
        "Ajan Mimarileri & Geri Besleme Döngüleri",
        "Araç Çağırma (Tool Calling) ve Görev Yürütme",
        "Zustand v5 ile İstemci Seviyesinde UI Durumu",
        "TanStack Query ile Model İsteklerinin Önbelleklenmesi",
      ],
    },
    {
      id: "mod-04",
      number: "04",
      title: "Dokploy, Docker & Cloud Canlıya Alma",
      category: "DevOps & Dağıtım",
      icon: BookOpen,
      description:
        "Kendi sunucunuzda çalışan Dokploy platformu ile otomatik CI/CD, konteyner yönetimi, sağlık kontrolü ve ters vekil sunucu yapılandırması.",
      topics: [
        "Docker Compose & Bağımsız Konteynerleşme",
        "Dokploy ile Otomatik Git Dağıtımı",
        "Ters Vekil (Reverse Proxy) & Otomatik SSL",
        "Sağlık Denetimi (/api/health) ve Gözlemlenebilirlik",
      ],
    },
  ];

  return (
    <section id="mufredat" className="scroll-mt-24 space-y-8" aria-label="Müfredat Bölümü">
      {/* Section Header */}
      <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-rose-900/30 bg-rose-950/20 px-3 py-1 text-xs font-semibold text-rose-300">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
            <span>MÜFREDAT</span>
          </div>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-4xl">
            Sistem Mimarisi & Yapay Zeka Müfredatı
          </h2>
          <p className="mt-1 text-sm text-zinc-400 sm:text-base">
            Modern üretim standartlarında tam teşekküllü yazılım ve otonom sistem mühendisliği
            eğitimi.
          </p>
        </div>
      </div>

      {/* Grid of Modules */}
      <div className="grid gap-6 md:grid-cols-2">
        {modules.map((mod) => {
          const Icon = mod.icon;
          return (
            <div
              key={mod.id}
              className="group relative flex flex-col justify-between rounded-2xl border border-zinc-800/80 bg-zinc-900/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-rose-900/60 hover:bg-zinc-900/80 hover:shadow-[0_0_30px_rgba(225,29,72,0.15)]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold tracking-widest text-rose-400">
                    MODÜL {mod.number} • {mod.category}
                  </span>
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-950 text-rose-400 transition-transform group-hover:scale-110">
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                </div>

                <h3 className="mt-3 text-lg font-bold text-white transition-colors group-hover:text-rose-200">
                  {mod.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-zinc-400 sm:text-sm">
                  {mod.description}
                </p>

                <ul className="mt-4 space-y-2 border-t border-zinc-800/60 pt-4">
                  {mod.topics.map((topic) => (
                    <li
                      key={topic}
                      className="flex items-start gap-2 text-xs text-zinc-300 sm:text-sm"
                    >
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-rose-500" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-zinc-800/50 pt-4 text-xs">
                <span className="font-mono text-zinc-500">4 Hafta • 16 Saat Uygulama</span>
                <span className="inline-flex items-center gap-1 font-semibold text-rose-400 group-hover:underline">
                  Detayları Gör <ArrowUpRight className="h-3 w-3" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
