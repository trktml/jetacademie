"use client";

import { useMemo, useState, useTransition } from "react";
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
import { useActiveSection } from "@/hooks/use-active-section";

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
}

export function CurriculumArchive({
  initialCompletedEntryIds,
  isSignedIn,
  customEntries,
}: CurriculumArchiveProps) {
  const categoryIds = useMemo(() => curriculumCategories.map((c) => c.id), []);
  const [activeCategoryId, setActiveCategoryId] = useActiveSection(categoryIds, "ayet");
  const [completedEntryIds, setCompletedEntryIds] = useState(initialCompletedEntryIds);
  const [pendingEntryId, setPendingEntryId] = useState<string | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "warning" | "error";
  } | null>(null);
  const [shakingEntryId, setShakingEntryId] = useState<string | null>(null);
  const [historyViewCategoryIds, setHistoryViewCategoryIds] = useState<Record<string, boolean>>({});
  const [isPending, startTransition] = useTransition();
  const openAccount = useUiStore((state) => state.openAccount);

  const completedSet = useMemo(() => new Set(completedEntryIds), [completedEntryIds]);

  function scrollToCategory(categoryId: CurriculumCategoryId) {
    setActiveCategoryId(categoryId);
    const element = document.getElementById(categoryId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

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
      {/* Sol Sabit Kapsül Navigasyon (Fixed Capsule Rail) */}
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
                onClick={() => scrollToCategory(item.id)}
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

      {/* Dikey Alt Alta Arşiv Çekmeceleri Akışı (Archive Drawer Feed) */}
      <div className="archive-feed">
        {curriculumCategories.map((category, index) => {
          const Icon = category.icon;
          const entries = customEntries
            ? customEntries.filter((e) => e.categoryId === category.id)
            : getCategoryEntries(category.id);
          const unlockedIndex = getUnlockedEntryIndex(entries, completedSet);
          const completedCount = entries.filter((e) => completedSet.has(e.id)).length;
          const isAllCompleted = entries.length > 0 && completedCount === entries.length;
          const isHistoryOpen = Boolean(historyViewCategoryIds[category.id]);
          const completedEntries = entries.filter((e) => completedSet.has(e.id));

          return (
            <section
              key={category.id}
              id={category.id}
              className="archive-category-block archive-drawer scroll-mt-20 sm:scroll-mt-24"
              data-category={category.id}
              aria-labelledby={`heading-${category.id}`}
            >
              {/* Çekmece Dış Kasa Üst Trim: Pirinç Etiket Plakası ve Kulp Metaphor */}
              <div className="archive-drawer-top-trim" aria-hidden="true">
                <div className="archive-drawer-rivet" />
                <div className="archive-drawer-labelplate">
                  <span className="archive-drawer-labelplate__code">
                    {`ÇEKMECE #${String(index + 1).padStart(2, "0")} · ${category.shortLabel.toLocaleUpperCase("tr-TR")} ARŞİVİ`}
                  </span>
                </div>
                <div className="archive-drawer-handle" />
                <div className="archive-drawer-rivet" />
              </div>

              {/* Çekmece Başlığı ve Kontrolleri */}
              <header className="archive-category-header">
                <div className="archive-category-header__info">
                  <div
                    className="archive-category-icon-box"
                    data-accent={category.accent}
                    aria-hidden="true"
                  >
                    <Icon />
                  </div>
                  <div>
                    <div className="archive-category-eyebrow">
                      <span>{`${String(index + 1).padStart(2, "0")} · ARŞİV ÇEKMECESİ`}</span>
                      {category.resourceType && (
                        <span className="archive-resource-badge">
                          {category.resourceType.toUpperCase()}
                        </span>
                      )}
                    </div>
                    <h2 id={`heading-${category.id}`} className="archive-category-title">
                      {category.label}
                    </h2>
                  </div>
                </div>

                <div className="archive-drawer-controls">
                  <div className="archive-category-progress">
                    <span className="archive-category-progress__count">
                      {entries.length > 0
                        ? `${completedCount} / ${entries.length} tamamlandı`
                        : "Henüz içerik yayımlanmadı"}
                    </span>
                    {entries.length > 0 && (
                      <div className="archive-progress-track" aria-hidden="true">
                        <div
                          className="archive-progress-fill"
                          style={{
                            width: `${(completedCount / entries.length) * 100}%`,
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {entries.length > 0 && (
                    <button
                      type="button"
                      className="archive-drawer-history-btn"
                      data-active={isHistoryOpen}
                      onClick={() => toggleHistoryView(category.id)}
                      aria-label={
                        isHistoryOpen
                          ? `${category.label} çekmecesine geri dön`
                          : `${category.label} geçmiş dosyalarını gör (${completedCount} tamamlandı)`
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

              {/* Çekmece İçi Raf ve Klasör Yığını */}
              <div className="archive-category-body archive-drawer-interior">
                <div className="archive-drawer-rails" aria-hidden="true" />

                {entries.length === 0 ? (
                  <div className="archive-empty-card">
                    <div className="archive-empty-card__icon" aria-hidden="true">
                      <FolderOpen />
                    </div>
                    <div className="archive-empty-card__text">
                      <h4>{`${category.label} haftalık dosyaları hazırlanıyor`}</h4>
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
                          className="h-5 w-5 text-amber-600 dark:text-amber-400"
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
                        onClick={() => toggleHistoryView(category.id)}
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
                                <span className="archive-entry-timing">{timing}</span>
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
                          onClick={() => toggleHistoryView(category.id)}
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
                          {`Tüm ${category.label} Dosyaları Tamamlandı!`}
                        </h3>
                        <p className="archive-all-completed__desc">
                          Bu çekmecedeki tüm haftalık okumaları başarıyla tamamladınız. Arşivdeki
                          tüm dosyaları aşağıda inceleyebilir veya Geçmiş tuşuna basabilirsiniz.
                        </p>
                      </div>
                      <button
                        type="button"
                        className="secondary-button"
                        onClick={() => toggleHistoryView(category.id)}
                      >
                        <History aria-hidden="true" />
                        Geçmiş Arşiv
                      </button>
                    </div>

                    <div className="archive-folder-stack">
                      {entries.map((entry) => {
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
                              <span className="archive-entry-timing">{timing}</span>
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
                  /* ─── AKTİF ÇEKMECE YIĞIN GÖRÜNÜMÜ (Sequential Drawer Stack) ─── */
                  <div className="archive-stack-container">
                    {/* Daha önce tamamlanmış geçmiş dosyalar varsa gösterilen arşiv rafı */}
                    {completedCount > 0 && (
                      <div className="archive-past-shelf">
                        <div className="archive-past-shelf__bar">
                          <span className="archive-past-shelf__text">
                            <FolderArchive
                              className="h-4 w-4 text-emerald-600 dark:text-emerald-400"
                              aria-hidden="true"
                            />
                            <span>{`${completedCount} dosya tamamlandı ve arşive kaldırıldı`}</span>
                          </span>
                          <button
                            type="button"
                            className="archive-past-shelf__btn"
                            onClick={() => toggleHistoryView(category.id)}
                          >
                            Geçmişi İncele →
                          </button>
                        </div>
                        <div className="archive-past-shelf__cards">
                          {entries.slice(0, unlockedIndex).map((entry) => {
                            const timing = `${monthNames[entry.month - 1]}-${entry.week}`;
                            return (
                              <article
                                key={entry.id}
                                className="archive-entry-card archive-folder-card archive-folder-card--completed archive-folder-card--compact"
                                data-status="completed"
                              >
                                <div
                                  className="archive-folder-tab archive-folder-tab--completed"
                                  aria-hidden="true"
                                >
                                  <Check className="h-3.5 w-3.5" />
                                  <span>{timing}</span>
                                </div>
                                <div className="archive-entry-card__top">
                                  <span className="archive-entry-timing">{timing}</span>
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
                    )}

                    <div className="archive-folder-stack">
                      {/* En Öndeki Aktif Klasör (Front Active Folder) */}
                      {(() => {
                        const currentEntry = entries[unlockedIndex];
                        const currentTiming = `${monthNames[currentEntry.month - 1]}-${currentEntry.week}`;
                        const isEntryPending = isPending && pendingEntryId === currentEntry.id;

                        return (
                          <article
                            key={currentEntry.id}
                            className="archive-entry-card archive-folder-card archive-folder-card--active"
                            data-status="current"
                          >
                            {/* Fiziksel Klasör Kulakçığı (Manila Folder Tab) */}
                            <div className="archive-folder-tab archive-folder-tab--active">
                              <Layers className="h-3.5 w-3.5" aria-hidden="true" />
                              <span>{`${currentTiming} · ${currentEntry.week}. Hafta Dosyası`}</span>
                            </div>

                            <div className="archive-entry-card__top">
                              <span className="archive-entry-timing">{currentTiming}</span>
                              <span className="read-status read-status--current">
                                <FileClock aria-hidden="true" /> Sıradaki
                              </span>
                            </div>

                            <h3 className="archive-entry-title">{currentEntry.title}</h3>

                            {currentEntry.body && (
                              <p className="archive-entry-desc">{currentEntry.body}</p>
                            )}

                            <div className="archive-entry-actions">
                              <p className="archive-folder-help">
                                Okuyunca bir sonraki haftaya / alttaki klasöre geçebilirsiniz.
                              </p>
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

                      {/* Arkaya Doğru Yerleştirilmiş / Kilitli Yığın Klasörleri (Stacked Behind) */}
                      {entries.slice(unlockedIndex + 1).map((lockedEntry, offsetIdx) => {
                        const lockedTiming = `${monthNames[lockedEntry.month - 1]}-${lockedEntry.week}`;
                        const depth = offsetIdx + 1;
                        const isShaking = shakingEntryId === lockedEntry.id;

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
                            {/* Arkadaki Klasör Kulakçığı */}
                            <div
                              className="archive-folder-tab archive-folder-tab--locked"
                              style={{
                                left: `clamp(1rem, ${1.25 + (offsetIdx + 1) * 2.2}rem, calc(100% - 12rem))`,
                              }}
                            >
                              <LockKeyhole className="h-3.5 w-3.5" aria-hidden="true" />
                              <span>{`${lockedTiming} · ${lockedEntry.week}. Hafta (Kilitli Yığın)`}</span>
                            </div>

                            <div className="archive-entry-card__top">
                              <span className="archive-entry-timing">{lockedTiming}</span>
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
                    </div>
                  </div>
                )}
              </div>
            </section>
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
