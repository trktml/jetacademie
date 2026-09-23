"use client";

import { useId, useMemo, useState } from "react";
import {
  Award,
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  Filter,
  Flame,
  Plus,
  Quote,
  Search,
  Sparkles,
  Trophy,
  Users,
  X,
} from "lucide-react";
import {
  CAMPAIGN_CATEGORIES,
  CAMPAIGN_STATUS_TABS,
  Campaign,
  CampaignCategory,
  CampaignStatus,
  getAllCampaigns,
} from "@/lib/data/campaigns";
import { useCampaignsStore } from "@/store/use-campaigns-store";

interface CampaignsViewProps {
  initialStatus?: CampaignStatus;
  initialCategory?: string;
}

export function CampaignsView({
  initialStatus = "active",
  initialCategory = "all",
}: CampaignsViewProps) {
  const [selectedStatus, setSelectedStatus] = useState<CampaignStatus>(initialStatus);
  const [selectedCategory, setSelectedCategory] = useState<CampaignCategory | "all">(
    (CAMPAIGN_CATEGORIES.some((c) => c.id === initialCategory) ? initialCategory : "all") as
      CampaignCategory | "all"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModalCampaign, setActiveModalCampaign] = useState<Campaign | null>(null);

  const joinedCampaignIds = useCampaignsStore((s) => s.joinedCampaignIds);
  const toggleJoinCampaign = useCampaignsStore((s) => s.toggleJoinCampaign);

  const searchInputId = useId();
  const allCampaigns = useMemo(() => getAllCampaigns(), []);

  const filteredCampaigns = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return allCampaigns.filter((campaign) => {
      if (campaign.status !== selectedStatus) {
        return false;
      }
      if (selectedCategory !== "all" && campaign.category !== selectedCategory) {
        return false;
      }
      if (q) {
        const inTitle = campaign.title.toLowerCase().includes(q);
        const inSlogan = campaign.slogan.toLowerCase().includes(q);
        const inDesc = campaign.description.toLowerCase().includes(q);
        const inTarget = campaign.targetGoal.toLowerCase().includes(q);
        if (!inTitle && !inSlogan && !inDesc && !inTarget) {
          return false;
        }
      }
      return true;
    });
  }, [allCampaigns, selectedStatus, selectedCategory, searchQuery]);

  // Aggregate stats
  const activeCount = allCampaigns.filter((c) => c.status === "active").length;
  const totalParticipants = allCampaigns.reduce((acc, c) => acc + c.participantsCount, 0);

  return (
    <div className="campaigns-view mx-auto max-w-6xl space-y-8 px-4 py-6 sm:px-6">
      {/* Hero Header */}
      <header className="space-y-3 pt-2 pb-4 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/20 bg-rose-500/10 px-3 py-1 text-xs font-semibold text-rose-400">
          <Flame className="h-3.5 w-3.5 text-rose-400" aria-hidden="true" />
          <span>Gelişim & Amel Seferberliği</span>
        </div>
        <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-4xl">
          Öğrenci Gelişim Kampanyaları
        </h1>
        <p className="mx-auto max-w-2xl text-sm text-zinc-400 sm:text-base">
          Birlikte okuyor, birlikte amel ediyoruz. Dönemsel okuma maratonları, manevi hedefler,
          sabah namazı istikameti ve cemaat ruhu.
        </p>
      </header>

      {/* Stats Ribbon */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-3.5 text-center">
          <div className="text-xl font-black text-rose-400 sm:text-2xl">{activeCount}</div>
          <div className="text-xs font-medium text-zinc-400">Aktif Kampanya</div>
        </div>
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-3.5 text-center">
          <div className="text-xl font-black text-emerald-400 sm:text-2xl">
            {totalParticipants}+
          </div>
          <div className="text-xs font-medium text-zinc-400">Katılımcı Öğrenci</div>
        </div>
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-3.5 text-center">
          <div className="text-xl font-black text-amber-400 sm:text-2xl">
            {joinedCampaignIds.length}
          </div>
          <div className="text-xs font-medium text-zinc-400">Katıldığın Kampanya</div>
        </div>
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-3.5 text-center">
          <div className="text-xl font-black text-sky-400 sm:text-2xl">4 Boyut</div>
          <div className="text-xs font-medium text-zinc-400">Kitap, Dua, Namaz, Ahlak</div>
        </div>
      </div>

      {/* Controls Container */}
      <section className="space-y-4 rounded-2xl border border-zinc-800/90 bg-zinc-900/60 p-4 shadow-sm backdrop-blur-md sm:p-5">
        {/* Status Segmented Tabs */}
        <div className="grid grid-cols-3 gap-1.5 rounded-xl border border-zinc-800 bg-zinc-950/80 p-1">
          {CAMPAIGN_STATUS_TABS.map((tab) => {
            const isSelected = selectedStatus === tab.id;
            const count = allCampaigns.filter((c) => c.status === tab.id).length;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedStatus(tab.id)}
                className={`flex min-h-[44px] items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold transition ${
                  isSelected
                    ? "bg-rose-600 text-white shadow-md shadow-rose-900/40"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`py-0.2 rounded-full px-1.5 text-[10px] ${
                    isSelected ? "bg-white/20 text-white" : "bg-zinc-800 text-zinc-400"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative">
          <label htmlFor={searchInputId} className="sr-only">
            Kampanya ara
          </label>
          <Search
            className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-zinc-400"
            aria-hidden="true"
          />
          <input
            id={searchInputId}
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Kampanya başlığı, hedef veya slogan ara..."
            className="min-h-[44px] w-full rounded-xl border border-zinc-800 bg-zinc-950/80 pr-10 pl-10 text-sm text-zinc-100 placeholder-zinc-500 transition focus:border-rose-500/60 focus:ring-2 focus:ring-rose-500/50 focus:outline-none"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute top-1/2 right-2.5 flex min-h-[36px] min-w-[36px] -translate-y-1/2 items-center justify-center text-zinc-400 hover:text-zinc-200"
              aria-label="Aramayı temizle"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 border-t border-zinc-800/60 pt-1">
          <span className="mr-1 flex items-center gap-1.5 py-1 text-xs font-semibold text-zinc-400">
            <Filter className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Kategori:</span>
          </span>

          {CAMPAIGN_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`min-h-[44px] rounded-xl px-3.5 py-1.5 text-xs font-semibold transition ${
                  isSelected
                    ? "bg-rose-600 text-white shadow-md shadow-rose-900/30"
                    : "border border-zinc-800/80 bg-zinc-950/60 text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-200"
                }`}
              >
                {cat.shortLabel}
              </button>
            );
          })}
        </div>
      </section>

      {/* Results Header */}
      <div className="flex items-center justify-between px-1 text-xs text-zinc-400">
        <span>
          Toplam <strong className="font-bold text-white">{filteredCampaigns.length}</strong>{" "}
          kampanya listeleniyor
        </span>
        {(searchQuery || selectedCategory !== "all") && (
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
            }}
            className="flex min-h-[44px] items-center text-rose-400 hover:underline"
          >
            Filtreleri Sıfırla
          </button>
        )}
      </div>

      {/* Campaigns Grid */}
      {filteredCampaigns.length === 0 ? (
        <div className="space-y-3 rounded-3xl border border-zinc-800 bg-zinc-900/40 p-12 text-center">
          <Flame className="mx-auto h-10 w-10 text-zinc-500" aria-hidden="true" />
          <h2 className="text-lg font-bold text-white">Kampanya Bulunamadı</h2>
          <p className="mx-auto max-w-md text-sm text-zinc-400">
            Bu kategoride veya arama kriterinde henüz kampanya bulunmuyor.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
            }}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-rose-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-rose-500"
          >
            Tüm Kampanyaları Göster
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {filteredCampaigns.map((camp) => {
            const isJoined = joinedCampaignIds.includes(camp.id);

            return (
              <article
                key={camp.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-zinc-800 bg-zinc-900/90 p-5 shadow-sm transition-all duration-200 hover:border-rose-500/50 hover:bg-zinc-900 hover:shadow-xl hover:shadow-rose-950/20 sm:p-6"
              >
                <div className="space-y-4">
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`inline-block rounded-md px-2.5 py-1 text-[11px] font-bold ${camp.themeColor.badgeBg} ${camp.themeColor.badgeText} border border-white/5`}
                    >
                      {camp.badge}
                    </span>

                    <div className="flex items-center gap-3 text-xs text-zinc-400">
                      {camp.daysLeft !== undefined && (
                        <span className="flex items-center gap-1 font-medium text-amber-300">
                          <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>{camp.daysLeft} gün kaldı</span>
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>{camp.participantsCount} öğrenci</span>
                      </span>
                    </div>
                  </div>

                  {/* Title & Slogan */}
                  <div className="space-y-1">
                    <h2 className="text-lg leading-snug font-extrabold text-white transition-colors group-hover:text-rose-200 sm:text-xl">
                      {camp.title}
                    </h2>
                    <p className="text-xs leading-relaxed text-zinc-400 sm:text-sm">
                      {camp.slogan}
                    </p>
                  </div>

                  {/* Target Goal Pill Box */}
                  <div className="flex items-center justify-between rounded-xl border border-zinc-800/80 bg-zinc-950/80 p-3 text-xs">
                    <span className="font-medium text-zinc-400">Hedef:</span>
                    <span className="font-mono font-bold text-zinc-200">{camp.targetGoal}</span>
                  </div>

                  {/* Progress Bar (if active or completed) */}
                  {camp.status !== "upcoming" && (
                    <div className="space-y-1.5 pt-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium text-zinc-400">Genel İlerleme</span>
                        <span className="font-mono font-bold text-white">
                          %{camp.progressPercent}
                        </span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full border border-zinc-800/80 bg-zinc-950">
                        <div
                          className={`h-full rounded-full ${camp.themeColor.barColor} transition-all duration-500`}
                          style={{ width: `${camp.progressPercent}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Motivation Quote Box */}
                  <div className="space-y-1 rounded-xl border border-zinc-800/60 bg-zinc-950/40 p-3 text-xs text-zinc-400 italic">
                    <div className="flex items-start gap-1.5">
                      <Quote
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-rose-400"
                        aria-hidden="true"
                      />
                      <p className="line-clamp-2">&ldquo;{camp.motivationQuote}&rdquo;</p>
                    </div>
                    <div className="text-right text-[11px] text-zinc-500 not-italic">
                      — {camp.quoteSource}
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="mt-5 flex items-center justify-between gap-2 border-t border-zinc-800/80 pt-4">
                  <button
                    type="button"
                    onClick={() => setActiveModalCampaign(camp)}
                    className="flex min-h-[44px] items-center gap-1.5 rounded-xl bg-zinc-800/80 px-3.5 py-2 text-xs font-semibold text-zinc-200 transition hover:bg-zinc-800 hover:text-white"
                  >
                    <span>Program Detayları</span>
                    <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleJoinCampaign(camp.id)}
                    className={`flex min-h-[44px] items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition ${
                      isJoined
                        ? "border border-emerald-500/40 bg-emerald-600/30 text-emerald-200 hover:bg-emerald-600/50"
                        : "bg-rose-600 text-white shadow-md shadow-rose-950/30 hover:bg-rose-500"
                    }`}
                  >
                    {isJoined ? (
                      <>
                        <Check className="h-4 w-4 text-emerald-300" aria-hidden="true" />
                        <span>Katıldın ✓</span>
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4" aria-hidden="true" />
                        <span>Kampanyaya Katıl</span>
                      </>
                    )}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Campaign Detail Modal */}
      {activeModalCampaign && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="campaign-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
        >
          <div className="animate-in fade-in zoom-in-95 relative max-h-[90vh] w-full max-w-lg space-y-5 overflow-y-auto rounded-3xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl duration-200">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActiveModalCampaign(null)}
              className="absolute top-4 right-4 flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl bg-zinc-900 text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
              aria-label="Kapat"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>

            {/* Modal Header */}
            <div className="space-y-1.5 pr-8">
              <div className="flex items-center gap-2">
                <span className="inline-block rounded-lg border border-rose-500/20 bg-rose-500/10 px-2.5 py-1 text-xs font-bold tracking-wider text-rose-400 uppercase">
                  {activeModalCampaign.badge}
                </span>
                <span className="flex items-center gap-1 text-xs text-zinc-400">
                  <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{activeModalCampaign.period}</span>
                </span>
              </div>
              <h2
                id="campaign-modal-title"
                className="text-xl leading-tight font-black text-white sm:text-2xl"
              >
                {activeModalCampaign.title}
              </h2>
              <p className="text-xs text-zinc-400 sm:text-sm">{activeModalCampaign.slogan}</p>
            </div>

            {/* Target and Period Details */}
            <div className="grid grid-cols-2 gap-2 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-3.5 text-xs">
              <div>
                <span className="font-medium text-zinc-500">Hedef:</span>
                <p className="mt-0.5 font-mono font-bold text-zinc-200">
                  {activeModalCampaign.targetGoal}
                </p>
              </div>
              <div>
                <span className="font-medium text-zinc-500">Katılımcı:</span>
                <p className="mt-0.5 font-mono font-bold text-zinc-200">
                  {activeModalCampaign.participantsCount} Öğrenci
                </p>
              </div>
            </div>

            {/* Motivation Quote */}
            <div className="space-y-1 rounded-2xl border border-rose-500/30 bg-rose-950/20 p-4 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-rose-400">
                <Quote className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Günün İlhamı</span>
              </div>
              <p className="leading-relaxed text-rose-100 italic">
                &ldquo;{activeModalCampaign.motivationQuote}&rdquo;
              </p>
              <div className="text-right text-[11px] text-rose-300">
                — {activeModalCampaign.quoteSource}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <h3 className="text-xs font-bold tracking-wider text-zinc-400 uppercase">
                Kampanya Hakkında
              </h3>
              <p className="text-xs leading-relaxed text-zinc-300 sm:text-sm">
                {activeModalCampaign.description}
              </p>
            </div>

            {/* Guidance Steps */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold tracking-wider text-zinc-400 uppercase">
                Uygulama ve Rehberlik Adımları
              </h3>
              <ol className="space-y-2">
                {activeModalCampaign.guidanceSteps.map((step, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 rounded-xl border border-zinc-800/80 bg-zinc-900/60 p-3 text-xs text-zinc-200 sm:text-sm"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-600/30 text-xs font-bold text-rose-300">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Rewards */}
            <div className="space-y-2">
              <h3 className="flex items-center gap-1.5 text-xs font-bold tracking-wider text-zinc-400 uppercase">
                <Trophy className="h-3.5 w-3.5 text-amber-400" aria-hidden="true" />
                <span>Kazanımlar & Ödüller</span>
              </h3>
              <ul className="space-y-1.5">
                {activeModalCampaign.rewards.map((reward, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2 rounded-xl border border-amber-500/20 bg-amber-950/20 p-2.5 text-xs text-zinc-200 sm:text-sm"
                  >
                    <Award className="h-4 w-4 shrink-0 text-amber-400" aria-hidden="true" />
                    <span>{reward}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Modal Bottom Actions */}
            <div className="flex items-center justify-end gap-3 border-t border-zinc-800 pt-2">
              <button
                type="button"
                onClick={() => setActiveModalCampaign(null)}
                className="min-h-[44px] rounded-xl bg-zinc-900 px-4 py-2 text-xs font-semibold text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
              >
                Kapat
              </button>

              <button
                type="button"
                onClick={() => {
                  toggleJoinCampaign(activeModalCampaign.id);
                }}
                className={`flex min-h-[44px] items-center gap-1.5 rounded-xl px-5 py-2 text-xs font-bold transition ${
                  joinedCampaignIds.includes(activeModalCampaign.id)
                    ? "bg-emerald-600 text-white hover:bg-emerald-500"
                    : "bg-rose-600 text-white shadow-lg shadow-rose-950/40 hover:bg-rose-500"
                }`}
              >
                {joinedCampaignIds.includes(activeModalCampaign.id) ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                    <span>Katıldın (Çıkmak için tıkla)</span>
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4" aria-hidden="true" />
                    <span>Hemen Katıl</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
