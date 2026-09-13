"use client";

import { Fragment, useEffect, useMemo, useState, useTransition } from "react";
import {
  AlertCircle,
  ArrowLeft,
  Check,
  FileClock,
  FolderArchive,
  FolderOpen,
  History,
  Layers,
  LockKeyhole,
  Sparkles,
} from "lucide-react";
import {
  curriculumCategories,
  getCategoryEntries,
  getCategoryShortLabel,
  getUnlockedEntryIndex,
  type CurriculumCategoryId,
  type CurriculumEntry,
} from "@/lib/curriculum";
import { markEntryAsRead } from "@/app/mufredat/actions";
import { useUiStore } from "@/store/use-ui-store";

const monthNames = [
  "Ocak",
  "Şubat",
  "Mart",
  "Nisan",
  "Mayıs",
  "Haziran",
  "Temmuz",
  "Ağustos",
  "Eylül",
  "Ekim",
  "Kasım",
  "Aralık",
];

interface CurriculumArchiveProps {
  initialCompletedEntryIds: string[];
  isSignedIn: boolean;
  customEntries?: readonly CurriculumEntry[];
  initialCategoryId?: CurriculumCategoryId;
}

export function CurriculumArchive({
  initialCompletedEntryIds,
  isSignedIn,
  customEntries,
  initialCategoryId = "ayet",
}: CurriculumArchiveProps) {
  const [activeCategoryId, setActiveCategoryId] = useState<CurriculumCategoryId>(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const hash = window.location.hash.replace("#", "") as CurriculumCategoryId;
      if (curriculumCategories.some((c) => c.id === hash)) {
        return hash;
      }
    }
    return initialCategoryId;
  });
  const [completedEntryIds, setCompletedEntryIds] = useState(initialCompletedEntryIds);
  const [pendingEntryId, setPendingEntryId] = useState<string | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "warning" | "error";
  } | null>(null);
  const [shakingEntryId, setShakingEntryId] = useState<string | null>(null);
  const [historyViewCategoryIds, setHistoryViewCategoryIds] = useState<Record<string, boolean>>({});
  const [selectedCompletedIndexes, setSelectedCompletedIndexes] = useState<
    Partial<Record<CurriculumCategoryId, number>>
  >({});
  const [isPending, startTransition] = useTransition();
  const openAccount = useUiStore((state) => state.openAccount);

  const completedSet = useMemo(() => new Set(completedEntryIds), [completedEntryIds]);

  // Synchronize category with hash changes if triggered externally
  useEffect(() => {
    function handleHashChange() {
      if (typeof window !== "undefined" && window.location.hash) {
        const hash = window.location.hash.replace("#", "") as CurriculumCategoryId;
        if (curriculumCategories.some((c) => c.id === hash)) {
          setActiveCategoryId(hash);
        }
      }
    }
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  function selectCategory(categoryId: CurriculumCategoryId) {
    setActiveCategoryId(categoryId);
    if (typeof window !== "undefined" && window.history?.replaceState) {
      window.history.replaceState(null, "", `#${categoryId}`);
      document.getElementById(categoryId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  useEffect(() => {
    const sections = curriculumCategories
      .map((category) => document.getElementById(category.id))
      .filter((section): section is HTMLElement => section !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleSection) {
          setActiveCategoryId(visibleSection.target.id as CurriculumCategoryId);
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.25, 0.5] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  function toggleHistoryView(categoryId: string) {
    setHistoryViewCategoryIds((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  }

  function notifyLocked(entryId?: string) {
    if (entryId) {
      setShakingEntryId(entryId);
      setTimeout(() => setShakingEntryId(null), 500);
    }
    setToast({
      message: "Önce sıradaki içeriği okumalısınız. Müfredat dosyaları sırayla açılmaktadır.",
      type: "warning",
    });
    setTimeout(() => setToast(null), 3500);
  }

  function completeEntry(entryId: string, timingLabel: string) {
    if (!isSignedIn) {
      openAccount();
      return;
    }

    setPendingEntryId(entryId);
    startTransition(async () => {
      try {
        await markEntryAsRead(entryId);
        setCompletedEntryIds((ids) => [...new Set([...ids, entryId])]);
        setToast({
          message: `${timingLabel} okundu olarak kaydedildi. Sıradaki dosyanın kilidi açıldı!`,
          type: "success",
        });
        setTimeout(() => setToast(null), 3500);
      } catch (error) {
        setToast({
          message: error instanceof Error ? error.message : "İlerleme kaydedilemedi.",
          type: "error",
        });
        setTimeout(() => setToast(null), 4000);
      } finally {
        setPendingEntryId(null);
      }
    });
  }

  return (
    <div className="archive-layout" aria-label="Müfredat arşivi">
      {/* Sol Sabit Kapsül Navigasyon (Desktop: Fixed Capsule Rail / Mobile: Sticky Capsule Dock) */}
      <aside className="archive-fixed-capsule" aria-label="Müfredat Hızlı Menü">
        <nav className="archive-capsule-list" aria-label="Kategori Listesi">
          {curriculumCategories.map((item) => {
            const Icon = item.icon;
            const isActive = item.id === activeCategoryId;
            const shortLabel = getCategoryShortLabel(item.id);

            return (
              <button
                key={item.id}
                type="button"
                className="archive-capsule-item"
                data-active={isActive}
                aria-current={isActive ? "true" : undefined}
                aria-label={item.label}
                title={item.label}
                onClick={() => selectCategory(item.id)}
              >
                <span className="archive-capsule-icon-wrap" aria-hidden="true">
                  <Icon />
                </span>
                <span className="archive-capsule-label">{shortLabel}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Tüm kategoriler doğal sayfa akışında alt alta yer alır. */}
      <div className="archive-main-column">
        {curriculumCategories.map((activeCategory, categoryIndex) => {
          const ActiveIcon = activeCategory.icon;
          const activeEntries = customEntries
            ? customEntries.filter((entry) => entry.categoryId === activeCategory.id)
            : getCategoryEntries(activeCategory.id);
          const unlockedIndex = getUnlockedEntryIndex(activeEntries, completedSet);
          const completedEntries = activeEntries.filter((entry) => completedSet.has(entry.id));
          const completedCount = completedEntries.length;
          const isAllCompleted =
            activeEntries.length > 0 && completedCount === activeEntries.length;
          const isHistoryOpen = Boolean(historyViewCategoryIds[activeCategory.id]);
          const selectedCompletedIndex = selectedCompletedIndexes[activeCategory.id] ?? 0;
          const extraLockedCount = Math.max(0, activeEntries.length - (unlockedIndex + 4));

          return (
            <Fragment key={activeCategory.id}>
              {categoryIndex > 0 && (
                <div className="archive-category-separator" role="separator" aria-hidden="true">
                  <div className="archive-category-divider-line" />
                </div>
              )}
              <section
                id={activeCategory.id}
                className="archive-category-block"
                data-category={activeCategory.id}
                aria-labelledby={`heading-${activeCategory.id}`}
              >
                {/* Çekmece Başlığı ve Kontrolleri */}
                <header className="archive-category-header">
                  <div className="archive-category-header__info">
                    <div
                      className="archive-category-icon-box"
                      data-accent={activeCategory.accent}
                      aria-hidden="true"
                    >
                      <ActiveIcon />
                    </div>
                    <div>
                      <div className="archive-category-title-wrap">
                        <h2 id={`heading-${activeCategory.id}`} className="archive-category-title">
                          {activeCategory.label}
                        </h2>
                        {activeCategory.resourceType && (
                          <span className="archive-resource-badge">
                            {activeCategory.resourceType.toUpperCase()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="archive-drawer-controls">
                    <div className="archive-category-progress">
                      <span className="archive-category-progress__count">
                        {activeEntries.length > 0
                          ? `${completedCount} / ${activeEntries.length} tamamlandı`
                          : "Henüz içerik yayımlanmadı"}
                      </span>
                      {activeEntries.length > 0 && (
                        <div className="archive-progress-track" aria-hidden="true">
                          <div
                            className="archive-progress-fill"
                            style={{
                              width: `${(completedCount / activeEntries.length) * 100}%`,
                            }}
                          />
                        </div>
                      )}
                    </div>

                    {activeEntries.length > 0 && (
                      <button
                        type="button"
                        className="archive-drawer-history-btn"
                        data-active={isHistoryOpen}
                        onClick={() => toggleHistoryView(activeCategory.id)}
                        aria-label={
                          isHistoryOpen
                            ? `${activeCategory.label} çekmecesine geri dön`
                            : `${activeCategory.label} geçmiş dosyalarını gör (${completedCount} tamamlandı)`
                        }
                        title={
                          isHistoryOpen
                            ? "Çekmeceye geri dön"
                            : completedCount === 0
                              ? "Henüz tamamlanmış geçmiş dosya yok"
                              : "Geçmiş dosyaları gör"
                        }
                      >
                        <History aria-hidden="true" />
                        <span>
                          {isHistoryOpen ? "Çekmeceye Dön" : `Geçmiş (${completedCount})`}
                        </span>
                      </button>
                    )}
                  </div>
                </header>

                {/* Klasör İçi Arşiv Yığını (Physical Folder Deck Interior) */}
                <div className="archive-category-body archive-drawer-interior">
                  {activeEntries.length === 0 ? (
                    <div className="archive-empty-card">
                      <div className="archive-empty-card__icon" aria-hidden="true">
                        <FolderOpen />
                      </div>
                      <div className="archive-empty-card__text">
                        <h4>{`${activeCategory.label} haftalık dosyaları hazırlanıyor`}</h4>
                        <p>
                          Yeni dosyalar eklendiğinde burada hafta hafta sıralı ve kilitli olarak
                          çekmecede listelenecektir.
                        </p>
                      </div>
                    </div>
                  ) : isHistoryOpen ? (
                    /* ─── GEÇMİŞ GÖRÜNÜMÜ (History Ledger) ─── */
                    <div className="archive-history-ledger">
                      <div className="archive-history-ledger__header">
                        <div className="archive-history-ledger__title-group">
                          <FolderArchive
                            className="h-5 w-5 text-emerald-700 dark:text-emerald-400"
                            aria-hidden="true"
                          />
                          <div>
                            <h3 className="archive-history-ledger__title">
                              Geçmiş Arşiv Dosyaları
                            </h3>
                            <p className="archive-history-ledger__desc">
                              {`Daha önce okuyup tamamladığınız ${completedCount} dosya arşive kaldırıldı.`}
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          className="secondary-button"
                          onClick={() => toggleHistoryView(activeCategory.id)}
                        >
                          <ArrowLeft aria-hidden="true" />
                          Çekmeceye Dön
                        </button>
                      </div>

                      {completedEntries.length > 0 ? (
                        <div className="archive-history-list">
                          {completedEntries.map((entry) => {
                            const timing = `${monthNames[entry.month - 1]}-${entry.week}`;
                            return (
                              <article
                                key={entry.id}
                                className="archive-entry-card archive-folder-card archive-folder-card--completed"
                                data-status="completed"
                              >
                                <div
                                  className="archive-folder-tab archive-folder-tab--completed"
                                  aria-hidden="true"
                                >
                                  <Check className="h-3.5 w-3.5" />
                                  <span>{`${timing} · Tamamlandı`}</span>
                                </div>

                                <div className="archive-entry-card__top">
                                  <span className="archive-entry-timing">{`${timing} · ${entry.week}. Hafta`}</span>
                                  <span className="read-status read-status--complete">
                                    <Check aria-hidden="true" /> Okundu
                                  </span>
                                </div>

                                <h3 className="archive-entry-title">{entry.title}</h3>
                                {entry.body && <p className="archive-entry-desc">{entry.body}</p>}

                                <div className="archive-folder-meta">
                                  <span className="archive-folder-stamp">ARŞİVLENDİ</span>
                                  <span className="archive-folder-note">
                                    Bu dosya tamamlandı ve kişisel arşivinize kaydedildi.
                                  </span>
                                </div>
                              </article>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="archive-history-empty">
                          <FileClock className="text-ink-faint h-8 w-8" aria-hidden="true" />
                          <h4>Henüz geçmiş dosya bulunmuyor</h4>
                          <p>
                            Bu çekmecedeki sıradaki dosyayı okuyup tamamladığınızda tamamlanan
                            dosyalar burada listelenecektir.
                          </p>
                          <button
                            type="button"
                            className="primary-button mt-2"
                            onClick={() => toggleHistoryView(activeCategory.id)}
                          >
                            Sıradaki Dosyaya Git
                          </button>
                        </div>
                      )}
                    </div>
                  ) : isAllCompleted ? (
                    /* ─── TÜM DOSYALAR TAMAMLANDI GÖRÜNÜMÜ ─── */
                    <div className="archive-all-completed">
                      <div className="archive-all-completed__banner">
                        <div className="archive-all-completed__badge">
                          <Sparkles className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <div className="flex-1">
                          <h3 className="archive-all-completed__title">
                            {`Tüm ${activeCategory.label} Dosyaları Tamamlandı!`}
                          </h3>
                          <p className="archive-all-completed__desc">
                            Bu çekmecedeki tüm haftalık okumaları başarıyla tamamladınız. Arşivdeki
                            tüm dosyaları aşağıda inceleyebilir veya Geçmiş tuşuna basabilirsiniz.
                          </p>
                        </div>
                        <button
                          type="button"
                          className="secondary-button"
                          onClick={() => toggleHistoryView(activeCategory.id)}
                        >
                          <History aria-hidden="true" />
                          Geçmiş Arşiv
                        </button>
                      </div>

                      <div className="archive-folder-stack">
                        {activeEntries
                          .map((entry, entryIdx) => ({ entry, entryIdx }))
                          .filter(
                            ({ entryIdx }) => Math.abs(entryIdx - selectedCompletedIndex) <= 3
                          )
                          .map(({ entry, entryIdx }) => {
                            const timing = `${monthNames[entry.month - 1]}-${entry.week}`;
                            const isFront = entryIdx === selectedCompletedIndex;
                            const depth = isFront ? 0 : Math.abs(entryIdx - selectedCompletedIndex);
                            const tabSlot = isFront ? 0 : Math.min(depth, 3);
                            return (
                              <article
                                key={entry.id}
                                className={`archive-entry-card archive-folder-card archive-folder-card--completed ${isFront ? "archive-folder-card--active" : "archive-stack-behind"}`}
                                data-status="completed"
                                data-depth={isFront ? undefined : depth}
                                onClick={() =>
                                  setSelectedCompletedIndexes((indexes) => ({
                                    ...indexes,
                                    [activeCategory.id]: entryIdx,
                                  }))
                                }
                                role={isFront ? undefined : "button"}
                                tabIndex={isFront ? undefined : 0}
                                aria-label={`${entry.title} (Tamamlandı)`}
                              >
                                <div
                                  className="archive-folder-tab archive-folder-tab--completed"
                                  style={{
                                    left: `clamp(0.6rem, calc(0.75rem + ${tabSlot * 25}%), calc(100% - 6.5rem))`,
                                  }}
                                  aria-hidden="true"
                                >
                                  <Check className="h-3.5 w-3.5" />
                                  <span>
                                    <span className="tab-full">{`${timing} · ${entry.week}. Hafta`}</span>
                                    <span
                                      className="tab-short"
                                      aria-hidden="true"
                                    >{`${entry.week}. Hafta`}</span>
                                  </span>
                                </div>

                                <div className="archive-entry-card__top">
                                  <span className="archive-entry-timing">{`${timing} · ${entry.week}. Hafta`}</span>
                                  <span className="read-status read-status--complete">
                                    <Check aria-hidden="true" /> Okundu
                                  </span>
                                </div>

                                <h3 className="archive-entry-title">{entry.title}</h3>
                                {entry.body && <p className="archive-entry-desc">{entry.body}</p>}
                              </article>
                            );
                          })}
                      </div>
                    </div>
                  ) : (
                    /* ─── AKTİF ÇEKMECE: ÜST ÜSTE VE ARKASINA DOĞRU FİZİKSEL KLASÖR YIĞINI ─── */
                    <div className="archive-stack-container">
                      {/* Daha önce tamamlanmış geçmiş dosyalar varsa gösterilen arşiv rafı */}
                      {completedCount > 0 && (
                        <div className="archive-past-shelf">
                          <div className="archive-past-shelf__bar">
                            <span className="archive-past-shelf__text">
                              <FolderArchive
                                className="h-4 w-4 text-emerald-700 dark:text-emerald-400"
                                aria-hidden="true"
                              />
                              <span>{`${completedCount} dosya tamamlandı ve arşive kaldırıldı`}</span>
                            </span>
                            <button
                              type="button"
                              className="archive-past-shelf__btn"
                              onClick={() => toggleHistoryView(activeCategory.id)}
                            >
                              Geçmişi İncele →
                            </button>
                          </div>
                        </div>
                      )}

                      <div className="archive-folder-stack">
                        {/* En Öndeki Aktif Klasör (Front Active Manila Dossier) */}
                        {(() => {
                          const currentEntry = activeEntries[unlockedIndex];
                          const currentTiming = `${monthNames[currentEntry.month - 1]}-${currentEntry.week}`;
                          const isEntryPending = isPending && pendingEntryId === currentEntry.id;

                          return (
                            <article
                              key={currentEntry.id}
                              className="archive-entry-card archive-folder-card archive-folder-card--active"
                              data-status="current"
                            >
                              {/* Öndeki Klasör Kulakçığı (Front Tab) */}
                              <div
                                className="archive-folder-tab archive-folder-tab--active"
                                style={{ left: "0.75rem" }}
                                aria-hidden="true"
                              >
                                <Layers className="h-3.5 w-3.5" aria-hidden="true" />
                                <span>
                                  <span className="tab-full">{`${currentTiming} · ${currentEntry.week}. Hafta`}</span>
                                  <span
                                    className="tab-short"
                                    aria-hidden="true"
                                  >{`${currentTiming} · ${currentEntry.week}.H`}</span>
                                </span>
                              </div>

                              <div className="archive-entry-card__top">
                                <span className="archive-entry-timing">{`${currentTiming} · ${currentEntry.week}. Hafta`}</span>
                                <span className="read-status read-status--current">
                                  <FileClock aria-hidden="true" /> Sıradaki
                                </span>
                              </div>

                              <h3 className="archive-entry-title">{currentEntry.title}</h3>

                              {currentEntry.body && (
                                <p className="archive-entry-desc">{currentEntry.body}</p>
                              )}

                              <div className="archive-entry-actions">
                                <button
                                  type="button"
                                  className="primary-button archive-complete-button"
                                  onClick={() => completeEntry(currentEntry.id, currentTiming)}
                                  disabled={isEntryPending}
                                >
                                  <Check aria-hidden="true" />
                                  {isEntryPending ? "Kaydediliyor…" : "Okundu işaretle"}
                                </button>
                              </div>
                            </article>
                          );
                        })()}

                        {/* Arkaya Doğru Basamaklı Kilitli Klasörler (Stacked in Depth with Stepped Manila Tabs) */}
                        {(() => {
                          const visibleLockedEntries = activeEntries.slice(
                            unlockedIndex + 1,
                            unlockedIndex + 4
                          );

                          return (
                            <>
                              {visibleLockedEntries.map((lockedEntry, offsetIdx) => {
                                const lockedTiming = `${monthNames[lockedEntry.month - 1]}-${lockedEntry.week}`;
                                const depth = offsetIdx + 1;
                                const isShaking = shakingEntryId === lockedEntry.id;
                                const tabOffset = `clamp(0.6rem, calc(0.75rem + ${depth * 25}%), calc(100% - 6.5rem))`;

                                return (
                                  <article
                                    key={lockedEntry.id}
                                    className="archive-entry-card archive-folder-card archive-folder-card--locked archive-stack-behind"
                                    data-status="locked"
                                    data-depth={depth}
                                    data-shaking={isShaking ? "true" : undefined}
                                    onClick={() => notifyLocked(lockedEntry.id)}
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter" || e.key === " ") {
                                        e.preventDefault();
                                        notifyLocked(lockedEntry.id);
                                      }
                                    }}
                                    aria-label={`${lockedEntry.title} (Kilitli klasör)`}
                                  >
                                    {/* Arkadaki Klasör Kulakçığı (Stepped Manila Tab) */}
                                    <div
                                      className="archive-folder-tab archive-folder-tab--locked"
                                      style={{
                                        left: tabOffset,
                                      }}
                                    >
                                      <LockKeyhole className="h-3.5 w-3.5" aria-hidden="true" />
                                      <span>
                                        <span className="tab-full">{`${lockedTiming} · ${lockedEntry.week}. Hafta`}</span>
                                        <span
                                          className="tab-short"
                                          aria-hidden="true"
                                        >{`${lockedEntry.week}. Hafta`}</span>
                                      </span>
                                    </div>

                                    <div className="archive-entry-card__top">
                                      <span className="archive-entry-timing">{`${lockedTiming} · ${lockedEntry.week}. Hafta`}</span>
                                      <span className="read-status">
                                        <LockKeyhole aria-hidden="true" /> Kilitli
                                      </span>
                                    </div>

                                    <h3 className="archive-entry-title">{lockedEntry.title}</h3>

                                    <div className="archive-locked-stack-notice">
                                      <LockKeyhole className="h-4 w-4" aria-hidden="true" />
                                      <span>
                                        Bu dosya yığının arkasında kilitli bekliyor. Açmak için önce
                                        sıradaki içeriği tamamlamalısınız.
                                      </span>
                                    </div>
                                  </article>
                                );
                              })}
                            </>
                          );
                        })()}
                      </div>

                      {extraLockedCount > 0 && (
                        <div className="archive-queue-note" aria-live="polite">
                          <LockKeyhole className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                          <span>{`Bu çekmecede sırada bekleyen ${extraLockedCount} kilitli dosya daha var`}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </section>
            </Fragment>
          );
        })}
      </div>

      {toast && (
        <aside className="archive-toast" data-type={toast.type} role="status" aria-live="polite">
          {toast.type === "success" && (
            <Check aria-hidden="true" className="h-4 w-4 shrink-0 text-emerald-400" />
          )}
          {toast.type === "warning" && (
            <LockKeyhole aria-hidden="true" className="h-4 w-4 shrink-0 text-amber-400" />
          )}
          {toast.type === "error" && (
            <AlertCircle aria-hidden="true" className="h-4 w-4 shrink-0 text-rose-400" />
          )}
          <span>{toast.message}</span>
        </aside>
      )}
    </div>
  );
}
