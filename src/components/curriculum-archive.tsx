"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import {
  AlertCircle,
  ArrowLeft,
  Check,
  ChevronLeft,
  ChevronRight,
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
  const [selectedCompletedIndex, setSelectedCompletedIndex] = useState(0);
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
          setSelectedCompletedIndex(0);
        }
      }
    }
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  function selectCategory(categoryId: CurriculumCategoryId) {
    setActiveCategoryId(categoryId);
    setSelectedCompletedIndex(0);
    if (typeof window !== "undefined" && window.history?.replaceState) {
      window.history.replaceState(null, "", `#${categoryId}`);
    }
  }

  const activeCategoryIndex = useMemo(() => {
    const idx = curriculumCategories.findIndex((c) => c.id === activeCategoryId);
    return idx >= 0 ? idx : 0;
  }, [activeCategoryId]);

  const activeCategory = curriculumCategories[activeCategoryIndex];
  const ActiveIcon = activeCategory.icon;

  const activeEntries = useMemo(() => {
    if (customEntries) {
      return customEntries.filter((e) => e.categoryId === activeCategory.id);
    }
    return getCategoryEntries(activeCategory.id);
  }, [customEntries, activeCategory.id]);

  const unlockedIndex = useMemo(
    () => getUnlockedEntryIndex(activeEntries, completedSet),
    [activeEntries, completedSet]
  );

  const completedCount = useMemo(
    () => activeEntries.filter((e) => completedSet.has(e.id)).length,
    [activeEntries, completedSet]
  );

  const isAllCompleted = activeEntries.length > 0 && completedCount === activeEntries.length;
  const isHistoryOpen = Boolean(historyViewCategoryIds[activeCategory.id]);
  const completedEntries = useMemo(
    () => activeEntries.filter((e) => completedSet.has(e.id)),
    [activeEntries, completedSet]
  );

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

  function goToPrevCategory() {
    if (activeCategoryIndex > 0) {
      selectCategory(curriculumCategories[activeCategoryIndex - 1].id);
    }
  }

  function goToNextCategory() {
    if (activeCategoryIndex < curriculumCategories.length - 1) {
      selectCategory(curriculumCategories[activeCategoryIndex + 1].id);
    }
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

      {/* Ana Arşiv Kolonu: Seçili Kategorinin Fiziksel Klasör Destesi (Single Active Folder Deck) */}
      <div className="archive-main-column">
        <section
          key={activeCategory.id}
          id={activeCategory.id}
          className="archive-category-block archive-drawer"
          data-category={activeCategory.id}
          data-active="true"
          aria-labelledby={`heading-${activeCategory.id}`}
        >
          {/* Klasör Üst Trim: Editorial Arşiv Sınıflandırma Şeridi (No fake serials/barcodes) */}
          <div className="archive-folder-header archive-drawer-top-trim">
            <div className="archive-folder-code">
              <span className="archive-folder-code__text">
                {`KLASÖR #${String(activeCategoryIndex + 1).padStart(2, "0")} · ${activeCategory.shortLabel.toLocaleUpperCase("tr-TR")} ARŞİVİ`}
              </span>
            </div>
            <div className="archive-folder-category-counter font-mono">
              <span>{`KLASÖR ${String(activeCategoryIndex + 1).padStart(2, "0")} / ${String(curriculumCategories.length).padStart(2, "0")}`}</span>
            </div>
          </div>

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
                  <span>{isHistoryOpen ? "Çekmeceye Dön" : `Geçmiş (${completedCount})`}</span>
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
                    Yeni dosyalar eklendiğinde burada hafta hafta sıralı ve kilitli olarak çekmecede
                    listelenecektir.
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
                      <h3 className="archive-history-ledger__title">Geçmiş Arşiv Dosyaları</h3>
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
                      Bu çekmecedeki sıradaki dosyayı okuyup tamamladığınızda tamamlanan dosyalar
                      burada listelenecektir.
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
                      Bu çekmecedeki tüm haftalık okumaları başarıyla tamamladınız. Arşivdeki tüm
                      dosyaları aşağıda inceleyebilir veya Geçmiş tuşuna basabilirsiniz.
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
                  {activeEntries.map((entry, entryIdx) => {
                    const timing = `${monthNames[entry.month - 1]}-${entry.week}`;
                    const isFront = entryIdx === selectedCompletedIndex;
                    const depth = isFront ? 0 : entryIdx + 1;
                    return (
                      <article
                        key={entry.id}
                        className={`archive-entry-card archive-folder-card archive-folder-card--completed ${isFront ? "archive-folder-card--active" : "archive-stack-behind"}`}
                        data-status="completed"
                        data-depth={isFront ? undefined : depth}
                        onClick={() => setSelectedCompletedIndex(entryIdx)}
                        role={isFront ? undefined : "button"}
                        tabIndex={isFront ? undefined : 0}
                        aria-label={`${entry.title} (Tamamlandı)`}
                      >
                        <div
                          className="archive-folder-tab archive-folder-tab--completed"
                          style={{
                            left: `clamp(0.75rem, calc(1rem + ${entryIdx * 18}%), calc(100% - 8.5rem))`,
                          }}
                          aria-hidden="true"
                        >
                          <Check className="h-3.5 w-3.5" />
                          <span>{`${timing} · ${entry.week}. Hafta`}</span>
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
                          style={{ left: "1rem" }}
                          aria-hidden="true"
                        >
                          <Layers className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>{`${currentTiming} · ${currentEntry.week}. Hafta`}</span>
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
                  {activeEntries.slice(unlockedIndex + 1).map((lockedEntry, offsetIdx) => {
                    const lockedTiming = `${monthNames[lockedEntry.month - 1]}-${lockedEntry.week}`;
                    const depth = offsetIdx + 1;
                    const isShaking = shakingEntryId === lockedEntry.id;
                    const tabOffset = `clamp(0.75rem, calc(1rem + ${depth * 18}%), calc(100% - 8.5rem))`;

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
                          <span>{`${lockedTiming} · ${lockedEntry.week}. Hafta`}</span>
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
                            Bu dosya yığının arkasında kilitli bekliyor. Açmak için önce sıradaki
                            içeriği tamamlamalısınız.
                          </span>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Çekmece Altı Klasör Geçiş Kontrolleri (Pagination Between Categories) */}
          <footer className="archive-drawer-footer">
            <button
              type="button"
              className="archive-folder-nav-btn archive-folder-nav-btn--prev"
              disabled={activeCategoryIndex === 0}
              onClick={goToPrevCategory}
              aria-label={
                activeCategoryIndex > 0
                  ? `Önceki çekmece: ${curriculumCategories[activeCategoryIndex - 1].label}`
                  : "İlk çekmecedesiniz"
              }
            >
              <ChevronLeft aria-hidden="true" />
              <span>
                {activeCategoryIndex > 0
                  ? `Önceki: ${curriculumCategories[activeCategoryIndex - 1].shortLabel}`
                  : "İlk Çekmece"}
              </span>
            </button>

            <div className="archive-drawer-footer__indicator">
              <span className="font-mono text-xs">
                {`KLASÖR ${String(activeCategoryIndex + 1).padStart(2, "0")} / ${String(curriculumCategories.length).padStart(2, "0")}`}
              </span>
            </div>

            <button
              type="button"
              className="archive-folder-nav-btn archive-folder-nav-btn--next"
              disabled={activeCategoryIndex === curriculumCategories.length - 1}
              onClick={goToNextCategory}
              aria-label={
                activeCategoryIndex < curriculumCategories.length - 1
                  ? `Sonraki çekmece: ${curriculumCategories[activeCategoryIndex + 1].label}`
                  : "Son çekmecedesiniz"
              }
            >
              <span>
                {activeCategoryIndex < curriculumCategories.length - 1
                  ? `Sonraki: ${curriculumCategories[activeCategoryIndex + 1].shortLabel}`
                  : "Son Çekmece"}
              </span>
              <ChevronRight aria-hidden="true" />
            </button>
          </footer>
        </section>
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
