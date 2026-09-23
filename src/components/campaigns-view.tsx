"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Download, Maximize2, Sparkles, X } from "lucide-react";
import { CampaignAnnouncement, getAllCampaignAnnouncements } from "@/lib/data/campaigns";

export function CampaignsView() {
  const [lightboxCampaign, setLightboxCampaign] = useState<CampaignAnnouncement | null>(null);
  const announcements = getAllCampaignAnnouncements();

  // Close lightbox on escape key
  useEffect(() => {
    if (!lightboxCampaign) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxCampaign(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxCampaign]);

  return (
    <div className="campaigns-view mx-auto max-w-5xl space-y-8 px-4 py-6 sm:px-6">
      {/* Page Header */}
      <header className="space-y-3 pt-2 pb-2 text-center">
        <h1 className="text-4xl font-black tracking-tight text-white">Dönemsel Kampanyalar</h1>
      </header>

      {/* Posters Gallery */}
      <div
        className={
          announcements.length === 1
            ? "mx-auto flex max-w-lg justify-center"
            : "grid grid-cols-1 gap-8 md:grid-cols-2"
        }
      >
        {announcements.map((campaign) => (
          <article
            key={campaign.id}
            aria-label={campaign.title}
            className="group relative w-full overflow-hidden rounded-3xl border-2 border-amber-500/40 bg-zinc-900/90 shadow-2xl shadow-amber-950/40 transition-all duration-300 hover:border-amber-400"
          >
            {/* Ambient Background Glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-16 -left-16 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -bottom-16 h-64 w-64 rounded-full bg-rose-500/10 blur-3xl"
            />

            {/* Poster Header Ribbon */}
            <div className="relative flex items-center justify-between border-b border-amber-500/20 bg-amber-950/40 px-4 py-2.5 text-xs font-bold text-amber-300">
              <span className="flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-amber-400" aria-hidden="true" />
                <span>{campaign.badge ?? "Resmi Kampanya Afişi"}</span>
              </span>
              {campaign.period && (
                <span className="font-mono text-amber-200/80">{campaign.period}</span>
              )}
            </div>

            {/* Poster Image Container */}
            <div className="relative aspect-[904/1280] w-full bg-zinc-950">
              <Image
                src={campaign.image}
                alt={`${campaign.title} Resmi Afişi`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 540px"
                priority
                className="object-contain transition-transform duration-300 group-hover:scale-[1.01]"
              />

              {/* Click to Zoom Hover Overlay */}
              <button
                type="button"
                onClick={() => setLightboxCampaign(campaign)}
                className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/50 opacity-0 backdrop-blur-xs transition-opacity duration-200 group-hover:opacity-100 focus:opacity-100 focus:outline-none"
                aria-label="Afişi tam ekran büyüt"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-amber-400/60 bg-amber-500/20 text-amber-300 shadow-xl shadow-black/60">
                  <Maximize2 className="h-7 w-7" aria-hidden="true" />
                </div>
                <span className="rounded-full bg-zinc-950/90 px-3.5 py-1 text-xs font-semibold text-white shadow-md">
                  Afişi Büyütmek İçin Tıkla
                </span>
              </button>
            </div>

            {/* Poster Action Bar */}
            <div className="relative grid grid-cols-2 gap-2.5 border-t border-amber-500/20 bg-zinc-950/90 p-3">
              <button
                type="button"
                onClick={() => setLightboxCampaign(campaign)}
                className="flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800/80 px-4 py-2.5 text-xs font-semibold text-zinc-200 transition hover:border-amber-500/50 hover:bg-zinc-800 hover:text-white"
              >
                <Maximize2 className="h-4 w-4 text-amber-400" aria-hidden="true" />
                <span>Tam Ekran</span>
              </button>

              <a
                href={campaign.image}
                download={campaign.downloadFilename ?? "kampanya-afisi.jpg"}
                className="flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-2.5 text-xs font-semibold text-amber-200 transition hover:bg-amber-500/20 hover:text-white"
              >
                <Download className="h-4 w-4 text-amber-400" aria-hidden="true" />
                <span>Afişi İndir</span>
              </a>
            </div>
          </article>
        ))}
      </div>

      <p className="text-center text-xs text-zinc-500">
        Afişe dokunarak yüksek çözünürlükte inceleyebilir veya cihazınıza indirebilirsiniz.
      </p>

      {/* Lightbox Modal */}
      {lightboxCampaign && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${lightboxCampaign.title} Afişi`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-2 backdrop-blur-md sm:p-4"
          onClick={() => setLightboxCampaign(null)}
        >
          <div
            className="animate-in fade-in zoom-in-95 relative flex max-h-[96vh] w-full max-w-4xl flex-col items-center justify-center duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Lightbox Controls Header */}
            <div className="mb-2 flex w-full items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950/90 px-4 py-2">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                <Sparkles className="h-4 w-4 text-amber-400" aria-hidden="true" />
                <span>
                  {lightboxCampaign.title}
                  {lightboxCampaign.period ? ` (${lightboxCampaign.period})` : ""}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={lightboxCampaign.image}
                  download={lightboxCampaign.downloadFilename ?? "kampanya-afisi.jpg"}
                  className="flex min-h-[44px] items-center gap-1.5 rounded-lg bg-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-300 transition hover:bg-amber-500/30"
                  aria-label="Afişi indir"
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  <span className="hidden sm:inline">İndir</span>
                </a>
                <button
                  type="button"
                  onClick={() => setLightboxCampaign(null)}
                  className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg bg-zinc-900 text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
                  aria-label="Kapat"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Poster in Natural Aspect Ratio */}
            <div className="relative max-h-[85vh] w-auto overflow-hidden rounded-2xl border border-amber-500/40 shadow-2xl">
              <Image
                src={lightboxCampaign.image}
                alt={`${lightboxCampaign.title} Afişi Tam Ekran`}
                width={904}
                height={1280}
                priority
                className="max-h-[85vh] w-auto object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
