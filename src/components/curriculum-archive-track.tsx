import {
  BookOpen,
  Check,
  ExternalLink,
  EyeOff,
  FolderOpen,
  History,
  Layers,
  LockKeyhole,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import { getUnlockedEntryIndex, type CurriculumEntry } from "@/lib/curriculum";
import {
  curriculumMonthNames as monthNames,
  formatPeriodLabel,
  periodOf,
} from "@/lib/curriculum-view";
import { useReadingProgressStore } from "@/store/use-reading-progress-store";
import type { CurriculumCategory } from "./curriculum-category";
import {
  EntryContentRenderer,
  EsmaCardHeader,
  getYouTubeVideoId,
} from "./curriculum-entry-content";
import { InlinePdfViewer } from "./inline-pdf-viewer";

interface Props {
  category: CurriculumCategory;
  entries: CurriculumEntry[];
  completedIds: ReadonlySet<string>;
  selectedCompletedIndex: number;
  selectCompletedIndex: (index: number) => void;
  expandedReadingEntryId: string | null;
  setExpandedReadingEntryId: Dispatch<SetStateAction<string | null>>;
  pendingEntryId: string | null;
  isPending: boolean;
  shakingEntryId: string | null;
  genderSelector: ReactNode;
  undo?: { timingLabel: string; secondsLeft: number; onUndo: () => void };
  openHistoryView: () => void;
  completeEntry: (entryId: string, timing: string) => void;
  notifyLocked: (entryId: string) => void;
}

export function CurriculumArchiveTrack({
  category: activeCategory,
  entries: activeEntries,
  completedIds,
  selectedCompletedIndex,
  selectCompletedIndex,
  expandedReadingEntryId,
  setExpandedReadingEntryId,
  pendingEntryId,
  isPending,
  shakingEntryId,
  genderSelector,
  undo,
  openHistoryView,
  completeEntry,
  notifyLocked,
}: Props) {
  const ActiveIcon = activeCategory.icon;
  const readingProgressMap = useReadingProgressStore((state) => state.progressMap);
  const unlockedIndex = getUnlockedEntryIndex(activeEntries, completedIds);
  const completedEntries = activeEntries.filter((entry) => completedIds.has(entry.id)).reverse();
  const completedCount = completedEntries.length;
  const isAllCompleted = activeEntries.length > 0 && completedCount === activeEntries.length;
  const extraLockedCount = Math.max(0, activeEntries.length - (unlockedIndex + 4));

  return (
    <section
      id={activeCategory.id}
      className="archive-category-block"
      data-category={activeCategory.id}
      aria-labelledby={`heading-${activeCategory.id}`}
    >
      {/* Kategori Başlığı ve Kontrolleri */}
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
              data-active={false}
              onClick={openHistoryView}
              aria-label={`${activeCategory.label} geçmiş dosyalarını gör (${completedCount} tamamlandı)`}
              title={completedCount === 0 ? "Henüz tamamlanmış dosya yok" : "Geçmiş dosyaları gör"}
            >
              <History aria-hidden="true" />
              <span>{`Geçmiş (${completedCount})`}</span>
            </button>
          )}
        </div>
      </header>

      {/* Klasör İçi Arşiv Yığını (Physical Folder Deck Interior) */}
      <div className="archive-category-body archive-drawer-interior">
        {/* İlmihal için Erkek / Bayan Müfredat Seçici */}
        {activeCategory.id === "ilmihal" && genderSelector}

        {activeEntries.length === 0 ? (
          <div className="archive-empty-card">
            <div className="archive-empty-card__icon" aria-hidden="true">
              <FolderOpen />
            </div>
            <div className="archive-empty-card__text">
              <h4>{`${activeCategory.label} haftalık dosyaları hazırlanıyor`}</h4>
              <p>Yeni içerikler eklendiğinde burada hafta hafta sıralı olarak listelenecektir.</p>
            </div>
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
              </div>
              {undo && (
                <button
                  type="button"
                  className="secondary-button archive-inline-undo-button"
                  onClick={undo.onUndo}
                  disabled={isPending}
                  aria-label={`${undo.timingLabel} okundu işaretini geri al (${undo.secondsLeft} saniye)`}
                >
                  <RotateCcw aria-hidden="true" className="h-4 w-4" />
                  <span>Geri Al ({undo.secondsLeft}s)</span>
                </button>
              )}
            </div>

            <div className="archive-folder-stack">
              {activeEntries
                .map((entry, entryIdx) => ({ entry, entryIdx }))
                .filter(({ entryIdx }) => Math.abs(entryIdx - selectedCompletedIndex) <= 3)
                .map(({ entry, entryIdx }) => {
                  const timing = formatPeriodLabel(periodOf(entry));
                  const isFront = entryIdx === selectedCompletedIndex;
                  const depth = isFront ? 0 : Math.abs(entryIdx - selectedCompletedIndex);
                  const tabSlot = isFront ? 0 : Math.min(depth, 3);
                  return (
                    <article
                      key={entry.id}
                      className={`archive-entry-card archive-folder-card archive-folder-card--completed ${isFront ? "archive-folder-card--active" : "archive-stack-behind"}`}
                      data-status="completed"
                      data-depth={isFront ? undefined : depth}
                      onClick={() => selectCompletedIndex(entryIdx)}
                      onKeyDown={(event) => {
                        if (isFront || event.target !== event.currentTarget) return;
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          selectCompletedIndex(entryIdx);
                        }
                      }}
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
                          <span className="tab-full">
                            {entry.isExtra ? `Ekstra ${entry.extraOrder ?? 1} · İlave` : timing}
                          </span>
                          <span className="tab-short" aria-hidden="true">
                            {entry.isExtra
                              ? `Ekstra ${entry.extraOrder ?? 1}`
                              : `${entry.week}. Hafta`}
                          </span>
                        </span>
                      </div>

                      {!(
                        isFront &&
                        expandedReadingEntryId === entry.id &&
                        entry.categoryId === "konu"
                      ) &&
                        (entry.categoryId === "esma" ? (
                          <EsmaCardHeader entry={entry} />
                        ) : (
                          <h3 className="archive-entry-title">{entry.title}</h3>
                        ))}
                      <EntryContentRenderer
                        entry={entry}
                        renderMedia={isFront}
                        isExpanded={isFront && expandedReadingEntryId === entry.id}
                        onToggleExpand={() =>
                          setExpandedReadingEntryId((prev) => (prev === entry.id ? null : entry.id))
                        }
                      />

                      {isFront && entry.pdfUrl && (
                        <div className="archive-history-reading-action mt-3 flex flex-col gap-2">
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              className="secondary-button archive-read-button inline-flex min-h-[40px] items-center gap-1.5"
                              onClick={(e) => {
                                e.stopPropagation();
                                setExpandedReadingEntryId((prev) =>
                                  prev === entry.id ? null : entry.id
                                );
                              }}
                              aria-expanded={expandedReadingEntryId === entry.id}
                              aria-label={`${entry.title} ders metnini görüntüle`}
                            >
                              {expandedReadingEntryId === entry.id ? (
                                <>
                                  <EyeOff className="h-3.5 w-3.5" aria-hidden="true" />
                                  <span>Görüntülemeyi Kapat</span>
                                </>
                              ) : (
                                <>
                                  <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
                                  <span>
                                    {(readingProgressMap[entry.id] || 1) > 1
                                      ? `Dersi Görüntüle (s. ${readingProgressMap[entry.id]})`
                                      : "Dersi Görüntüle"}
                                  </span>
                                </>
                              )}
                            </button>
                          </div>

                          {expandedReadingEntryId === entry.id && (
                            <div onClick={(e) => e.stopPropagation()}>
                              <InlinePdfViewer
                                key={entry.id}
                                pdfUrl={entry.pdfUrl}
                                title={entry.title}
                                entryId={entry.id}
                                onClose={() => setExpandedReadingEntryId(null)}
                              />
                            </div>
                          )}
                        </div>
                      )}

                      {isFront &&
                        entry.resourceUrl &&
                        !entry.pdfUrl &&
                        entry.resourceUrl !== "#" && (
                          <div
                            className="mt-2.5 mb-1 flex items-center"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <a
                              href={entry.resourceUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="secondary-button archive-read-button inline-flex min-h-[40px] items-center gap-1.5 text-xs font-medium"
                              aria-label={`${entry.title} kaynağını yeni sekmede aç`}
                            >
                              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                              <span>
                                {getYouTubeVideoId(entry.resourceUrl)
                                  ? "YouTube'da İzle"
                                  : "Kaynağı Aç"}
                              </span>
                            </a>
                          </div>
                        )}
                    </article>
                  );
                })}
            </div>
          </div>
        ) : (
          /* ─── AKTİF MÜFREDAT: ÜST ÜSTE VE ARKASINA DOĞRU FİZİKSEL KLASÖR YIĞINI ─── */
          <div className="archive-stack-container">
            <div className="archive-folder-stack">
              {/* En Öndeki Aktif Klasör (Front Active Manila Dossier) */}
              {(() => {
                const currentEntry = activeEntries[unlockedIndex];
                const currentTiming = formatPeriodLabel(periodOf(currentEntry));
                const isEntryPending = pendingEntryId === currentEntry.id;

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
                        <span className="tab-full">
                          {currentEntry.isExtra
                            ? `Ekstra ${currentEntry.extraOrder ?? 1} · İlave`
                            : currentTiming}
                        </span>
                        <span className="tab-short" aria-hidden="true">
                          {currentEntry.isExtra
                            ? `Ekstra ${currentEntry.extraOrder ?? 1}`
                            : `${monthNames[currentEntry.month - 1]} · ${currentEntry.week}.H`}
                        </span>
                      </span>
                    </div>

                    {!(
                      expandedReadingEntryId === currentEntry.id &&
                      currentEntry.categoryId === "konu"
                    ) &&
                      (currentEntry.categoryId === "esma" ? (
                        <EsmaCardHeader entry={currentEntry} />
                      ) : (
                        <h3 className="archive-entry-title">{currentEntry.title}</h3>
                      ))}
                    <EntryContentRenderer
                      entry={currentEntry}
                      renderMedia={true}
                      isExpanded={expandedReadingEntryId === currentEntry.id}
                      onToggleExpand={() =>
                        setExpandedReadingEntryId((prev) =>
                          prev === currentEntry.id ? null : currentEntry.id
                        )
                      }
                    />

                    {currentEntry.pdfUrl && (
                      <div className="archive-reading-action mb-4 flex flex-col gap-3">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <button
                            type="button"
                            className={`inline-flex min-h-[44px] items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold shadow-sm transition-all active:scale-[0.98] ${
                              expandedReadingEntryId === currentEntry.id
                                ? "bg-stone-700 text-stone-100 hover:bg-stone-600 dark:bg-stone-800 dark:hover:bg-stone-700"
                                : "bg-emerald-700 text-white hover:bg-emerald-600"
                            }`}
                            onClick={() =>
                              setExpandedReadingEntryId((prev) =>
                                prev === currentEntry.id ? null : currentEntry.id
                              )
                            }
                            aria-expanded={expandedReadingEntryId === currentEntry.id}
                            aria-label={`${currentEntry.title} dersini görüntüle`}
                          >
                            {expandedReadingEntryId === currentEntry.id ? (
                              <>
                                <EyeOff className="h-4 w-4" aria-hidden="true" />
                                <span>Görüntülemeyi Kapat</span>
                              </>
                            ) : (
                              <>
                                <BookOpen className="h-4 w-4" aria-hidden="true" />
                                <span>
                                  {(readingProgressMap[currentEntry.id] || 1) > 1
                                    ? `Dersi Görüntüle (s. ${readingProgressMap[currentEntry.id]})`
                                    : "Dersi Görüntüle"}
                                </span>
                              </>
                            )}
                          </button>
                          {(readingProgressMap[currentEntry.id] || 1) > 1 &&
                            expandedReadingEntryId !== currentEntry.id && (
                              <span className="rounded-lg border border-emerald-300 bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300">
                                {readingProgressMap[currentEntry.id]}. sayfada kaldınız
                              </span>
                            )}
                        </div>

                        {/* Inline PDF Viewer rendered directly below the card */}
                        {expandedReadingEntryId === currentEntry.id && (
                          <InlinePdfViewer
                            key={currentEntry.id}
                            pdfUrl={currentEntry.pdfUrl}
                            title={currentEntry.title}
                            entryId={currentEntry.id}
                            onClose={() => setExpandedReadingEntryId(null)}
                          />
                        )}
                      </div>
                    )}

                    {currentEntry.resourceUrl &&
                      !currentEntry.pdfUrl &&
                      currentEntry.resourceUrl !== "#" && (
                        <div className="mb-4 flex items-center">
                          <a
                            href={currentEntry.resourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="secondary-button archive-read-button inline-flex min-h-[40px] items-center gap-1.5 text-xs font-medium"
                            aria-label={`${currentEntry.title} kaynağını yeni sekmede aç`}
                          >
                            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                            <span>
                              {getYouTubeVideoId(currentEntry.resourceUrl)
                                ? "YouTube'da İzle"
                                : "Kaynağı Aç"}
                            </span>
                          </a>
                        </div>
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

                      {undo && (
                        <button
                          type="button"
                          className="secondary-button archive-inline-undo-button"
                          onClick={undo.onUndo}
                          disabled={isEntryPending}
                          aria-label={`${undo.timingLabel} okundu işaretini geri al (${undo.secondsLeft} saniye)`}
                        >
                          <RotateCcw aria-hidden="true" />
                          <span>Geri Al ({undo.secondsLeft}s)</span>
                        </button>
                      )}
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
                      const lockedTiming = formatPeriodLabel(periodOf(lockedEntry));
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
                              <span className="tab-full">
                                {lockedEntry.isExtra
                                  ? `Ekstra ${lockedEntry.extraOrder ?? 1} · İlave`
                                  : lockedTiming}
                              </span>
                              <span className="tab-short" aria-hidden="true">
                                {lockedEntry.isExtra
                                  ? `Ekstra ${lockedEntry.extraOrder ?? 1}`
                                  : `${lockedEntry.week}. Hafta`}
                              </span>
                            </span>
                          </div>

                          <div className="archive-entry-card__top">
                            <span className="read-status">
                              <LockKeyhole aria-hidden="true" /> Kilitli
                            </span>
                          </div>

                          {lockedEntry.categoryId === "esma" ? (
                            <EsmaCardHeader entry={lockedEntry} isLocked={true} />
                          ) : (
                            <h3 className="archive-entry-title">{lockedEntry.title}</h3>
                          )}
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
                <span>{`Sırada bekleyen ${extraLockedCount} dosya daha var`}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
