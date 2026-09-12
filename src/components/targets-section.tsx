import React from "react";
import { Target, Rocket, ShieldCheck, Check, Sparkles } from "lucide-react";

export function TargetsSection() {
  const targets = [
    {
      id: "tgt-01",
      icon: Rocket,
      title: "Üretim Seviyesinde Sistem Mimarisi",
      tagline: "Mimari Yetkinlik",
      description:
        "Yalnızca çalışan kod değil; Next.js 16, Bun ve SQLite ile yüksek verimlilikte, ölçeklenebilir ve sıfır hata toleranslı kurumsal mimariler inşa etme kapasitesi.",
      metrics: "10x Daha Hızlı Başlangıç",
    },
    {
      id: "tgt-02",
      icon: Sparkles,
      title: "Otonom AI Ajanları Entegrasyonu",
      tagline: "Yeni Nesil Yapay Zeka",
      description:
        "Büyük dil modellerini basit sohbet arayüzlerinin ötesine geçirerek; veri tabanını yöneten, kod yazan ve kararlar alan otonom sistem ajanlarına dönüştürme.",
      metrics: "%100 Özerk Görev Akışı",
    },
    {
      id: "tgt-03",
      icon: Target,
      title: "Mobil-Öncelikli PWA Standartları",
      tagline: "Kusursuz Kullanıcı Deneyimi",
      description:
        "Çentik (safe-area) koruması, 44px dokunma hedefleri, Vaul bottom sheet deneyimi ve App Store bağımsızlığı sağlayan bağımsız PWA manifestosu.",
      metrics: "Lighthouse 100 Skoru",
    },
    {
      id: "tgt-04",
      icon: ShieldCheck,
      title: "Bağımsız Hosting & Dokploy Dağıtımı",
      tagline: "Sıfır Bulut Bağımlılığı",
      description:
        "Aylık yüksek sunucu faturalarına mecbur kalmadan; Dokploy ve Docker Compose ile kendi VPS altyapınızı kurma, yönetme ve güvenliğini sağlama yeteneği.",
      metrics: "%90 Altyapı Maliyet Tasarrufu",
    },
  ];

  return (
    <section id="hedefler" className="scroll-mt-24 space-y-8" aria-label="Hedefler Bölümü">
      {/* Section Header */}
      <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-rose-900/30 bg-rose-950/20 px-3 py-1 text-xs font-semibold text-rose-300">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
            <span>HEDEFLER</span>
          </div>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-4xl">
            Jet Academie Mezuniyet Hedefleri
          </h2>
          <p className="mt-1 text-sm text-zinc-400 sm:text-base">
            Akademiyi tamamlayan her mühendisin kazanacağı kanıtlanabilir beceriler ve çıktılar.
          </p>
        </div>
      </div>

      {/* Targets Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {targets.map((tgt) => {
          const Icon = tgt.icon;
          return (
            <div
              key={tgt.id}
              className="group relative flex flex-col justify-between rounded-2xl border border-zinc-800/80 bg-zinc-900/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-rose-900/60 hover:bg-zinc-900/80 hover:shadow-[0_0_30px_rgba(225,29,72,0.15)]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-950 text-rose-400 transition-transform group-hover:scale-110">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="rounded-full border border-rose-900/40 bg-rose-950/30 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-rose-300">
                    {tgt.metrics}
                  </span>
                </div>

                <span className="mt-4 block font-mono text-[11px] font-semibold tracking-wider text-rose-400 uppercase">
                  {tgt.tagline}
                </span>
                <h3 className="mt-1 text-base font-bold text-white transition-colors group-hover:text-rose-200">
                  {tgt.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-zinc-400">{tgt.description}</p>
              </div>

              <div className="mt-6 flex items-center gap-2 border-t border-zinc-800/60 pt-4 text-xs font-medium text-zinc-300">
                <Check className="h-4 w-4 text-emerald-400" />
                <span>Hedef Kazanım Garantisi</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
