import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  Compass,
  ExternalLink,
  EyeOff,
  FileClock,
  FolderArchive,
  RotateCcw,
} from "lucide-react";
import type { CurriculumEntry } from "@/lib/curriculum";
import type { Gender } from "@/lib/data/ilmihal-curriculum";
import {
  curriculumMonthNames as monthNames,
  formatPeriodLabel,
  periodOf,
} from "@/lib/curriculum-view";
import { useReadingProgressStore } from "@/store/use-reading-progress-store";
import {
  EntryContentRenderer,
  EsmaCardHeader,
  getYouTubeVideoId,
} from "./curriculum-entry-content";
import { InlinePdfViewer } from "./inline-pdf-viewer";
import type { CurriculumCategory } from "./curriculum-category";

interface Props {
  category: CurriculumCategory;
  entries: CurriculumEntry[];
  completedIds: ReadonlySet<string>;
  activeGender: Gender;
  genderSelector: ReactNode;
  pendingEntryId: string | null;
  expandedEntryId: string | null;
  setExpandedEntryId: Dispatch<SetStateAction<string | null>>;
  onClose: () => void;
  onUndo: (entryId: string, timing: string) => void;
}

export function CurriculumArchiveHistory({
  category,
  entries,
  completedIds,
  activeGender,
  genderSelector,
  pendingEntryId,
  expandedEntryId,
  setExpandedEntryId,
  onClose,
  onUndo,
}: Props) {
  const Icon = category.icon;
  const readingProgressMap = useReadingProgressStore((state) => state.progressMap);
  const historyCompletedEntries = useMemo(() => {
    return entries.filter((entry) => completedIds.has(entry.id)).reverse();
  }, [entries, completedIds]);

  const historyAvailableMonths = useMemo(() => {
    const monthsMap = new Map<number, string>();
    historyCompletedEntries.forEach((e) => {
      if (!e.isExtra && e.month && !monthsMap.has(e.month)) {
        monthsMap.set(e.month, monthNames[e.month - 1]);
      }
    });
    return Array.from(monthsMap.entries()).map(([month, name]) => ({ month, name }));
  }, [historyCompletedEntries]);

  const [selectedJumpEntryId, setSelectedJumpEntryId] = useState<string>("");
  const [spotlightEntryId, setSpotlightEntryId] = useState<string | null>(null);
  const spotlightTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentJumpId =
    selectedJumpEntryId && historyCompletedEntries.some((e) => e.id === selectedJumpEntryId)
      ? selectedJumpEntryId
      : (historyCompletedEntries[0]?.id ?? "");

  useEffect(() => {
    return () => {
      if (spotlightTimeoutRef.current) {
        clearTimeout(spotlightTimeoutRef.current);
      }
    };
  }, []);

  function handleJumpToEntry(entryId: string) {
    if (!entryId) return;
    setSelectedJumpEntryId(entryId);
    if (typeof window === "undefined") return;

    const targetElement = document.getElementById(`history-card-${entryId}`);
    if (!targetElement) return;

    targetElement.scrollIntoView({ behavior: "smooth", block: "center" });

    setSpotlightEntryId(entryId);
    if (spotlightTimeoutRef.current) {
      clearTimeout(spotlightTimeoutRef.current);
    }
    spotlightTimeoutRef.current = setTimeout(() => {
      setSpotlightEntryId(null);
    }, 2200);
  }

  return (
    <div className="archive-main-column archive-main-column--history">
      <div className="archive-history-screen" aria-label={`${category.label} Tamamlanan Dosyalar`}>
        {/* Üst Bilgi Başlığı ve Geri Dön Butonu */}
        <header className="archive-history-header">
          <div className="archive-history-header__top-row">
            <button
              type="button"
              className="archive-history-back-btn"
              onClick={onClose}
              aria-label="Müfredat akışına geri dön"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              <span>Geri Dön</span>
            </button>

            <span className="archive-history-header__badge">
              <FolderArchive
                className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400"
                aria-hidden="true"
              />
              <span>Tamamlanan Dosyalar</span>
            </span>
          </div>

          <div className="archive-history-header__content">
            <div className="archive-history-header__info">
              <div
                className="archive-category-icon-box"
                data-accent={category.accent}
                aria-hidden="true"
              >
                <Icon />
              </div>
              <div>
                <div className="archive-category-title-wrap">
                  <h2 className="archive-category-title">
                    {category.label}
                    {category.id === "ilmihal" && (
                      <span className="text-sm font-normal opacity-75">
                        {" "}
                        ({activeGender === "erkek" ? "Erkek" : "Bayan"})
                      </span>
                    )}
                  </h2>
                </div>
              </div>
            </div>

            <div className="archive-history-header__right">
              <div className="archive-category-progress">
                <span className="archive-category-progress__count">
                  {historyCompletedEntries.length} / {entries.length} tamamlandı
                </span>
                {entries.length > 0 && (
                  <div className="archive-progress-track" aria-hidden="true">
                    <div
                      className="archive-progress-fill"
                      style={{
                        width: `${(historyCompletedEntries.length / entries.length) * 100}%`,
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* İlmihal Geçmişi için Erkek / Bayan Müfredat Seçici */}
        {category.id === "ilmihal" && (
          <div className="archive-history-gender-wrap mb-1">{genderSelector}</div>
        )}

        {/* Geçmişte Yolculuk & Hızlı Seçim Araç Çubuğu */}
        {historyCompletedEntries.length > 0 && (
          <div className="archive-history-toolbar">
            <div className="archive-history-toolbar__main">
              <label htmlFor="history-jump-select" className="archive-history-toolbar__label">
                <Compass
                  className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400"
                  aria-hidden="true"
                />
                <span>Hızlı Seçim:</span>
              </label>

              <div className="archive-history-jump-box">
                <select
                  id="history-jump-select"
                  className="archive-history-jump__select"
                  value={currentJumpId}
                  onChange={(e) => {
                    handleJumpToEntry(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleJumpToEntry(currentJumpId);
                    }
                  }}
                  aria-label="Geçmişten bir dosya seçin"
                >
                  {historyCompletedEntries.map((entry) => {
                    const timing = formatPeriodLabel(periodOf(entry));
                    return (
                      <option key={entry.id} value={entry.id}>
                        {`${timing} — ${entry.title}`}
                      </option>
                    );
                  })}
                </select>

                <button
                  type="button"
                  className="archive-history-jump__btn"
                  onClick={() => handleJumpToEntry(currentJumpId)}
                  aria-label="Seçilen geçmiş dosyasına git"
                >
                  <span>Git</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Kısayol Hızlı Atlama Çipleri (En Yeni, En Eski, Ay rozetleri) */}
            {historyCompletedEntries.length > 1 && (
              <div className="archive-history-chips" aria-label="Hızlı atlama kısayolları">
                <span className="archive-history-chips__label">Atla:</span>
                <button
                  type="button"
                  className="archive-history-chip"
                  onClick={() => handleJumpToEntry(historyCompletedEntries[0].id)}
                  title="En son tamamlanan dosyaya git"
                >
                  En Yeni
                </button>
                <button
                  type="button"
                  className="archive-history-chip"
                  onClick={() =>
                    handleJumpToEntry(
                      historyCompletedEntries[historyCompletedEntries.length - 1].id
                    )
                  }
                  title="İlk tamamlanan dosyaya git"
                >
                  En Eski
                </button>

                {historyAvailableMonths.map((m) => {
                  const monthEntries = historyCompletedEntries.filter(
                    (e) => !e.isExtra && e.month === m.month
                  );
                  const firstInMonth = monthEntries[0];
                  return (
                    <button
                      key={m.month}
                      type="button"
                      className="archive-history-chip archive-history-chip--month"
                      onClick={() => firstInMonth && handleJumpToEntry(firstInMonth.id)}
                      title={`${m.name} ayındaki dosyalara git`}
                    >
                      {`${m.name} (${monthEntries.length})`}
                    </button>
                  );
                })}

                {historyCompletedEntries.some((e) => e.isExtra) && (
                  <button
                    type="button"
                    className="archive-history-chip archive-history-chip--extra"
                    onClick={() => {
                      const firstExtra = historyCompletedEntries.find((e) => e.isExtra);
                      if (firstExtra) handleJumpToEntry(firstExtra.id);
                    }}
                    title="Tamamlanan ilave dosyalara git"
                  >
                    Ekstra
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* Tamamlanan Dosyalar Listesi */}
        {historyCompletedEntries.length > 0 ? (
          <div className="archive-history-list">
            {historyCompletedEntries.map((entry, index) => {
              const timing = formatPeriodLabel(periodOf(entry));
              const isLatest = index === 0;
              const isEntryPending = pendingEntryId === entry.id;
              const isSpotlight = spotlightEntryId === entry.id;

              return (
                <article
                  key={entry.id}
                  id={`history-card-${entry.id}`}
                  className={`archive-entry-card archive-folder-card archive-folder-card--completed ${
                    isSpotlight ? "archive-folder-card--spotlight" : ""
                  }`}
                  data-status="completed"
                  data-spotlight={isSpotlight ? "true" : undefined}
                >
                  <div
                    className="archive-folder-tab archive-folder-tab--completed"
                    aria-hidden="true"
                  >
                    <Check className="h-3.5 w-3.5 shrink-0" />
                    <span className="sm:hidden">{timing}</span>
                    <span className="hidden sm:inline">{`${timing} · Tamamlandı`}</span>
                  </div>

                  {!(expandedEntryId === entry.id && entry.categoryId === "konu") &&
                    (entry.categoryId === "esma" ? (
                      <EsmaCardHeader entry={entry} />
                    ) : (
                      <h3 className="archive-entry-title">{entry.title}</h3>
                    ))}
                  <EntryContentRenderer
                    entry={entry}
                    isExpanded={expandedEntryId === entry.id}
                    onToggleExpand={() =>
                      setExpandedEntryId((prev) => (prev === entry.id ? null : entry.id))
                    }
                  />

                  {entry.pdfUrl && (
                    <div className="archive-history-reading-action mt-2 mb-2 flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          className="secondary-button archive-read-button inline-flex min-h-[44px] items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold"
                          onClick={() =>
                            setExpandedEntryId((prev) => (prev === entry.id ? null : entry.id))
                          }
                          aria-expanded={expandedEntryId === entry.id}
                          aria-label={`${entry.title} ders metnini görüntüle`}
                        >
                          {expandedEntryId === entry.id ? (
                            <>
                              <EyeOff className="h-4 w-4" aria-hidden="true" />
                              <span>Görüntülemeyi Kapat</span>
                            </>
                          ) : (
                            <>
                              <BookOpen className="h-4 w-4" aria-hidden="true" />
                              <span>
                                {(readingProgressMap[entry.id] || 1) > 1
                                  ? `Dersi Görüntüle (s. ${readingProgressMap[entry.id]})`
                                  : "Dersi Görüntüle"}
                              </span>
                            </>
                          )}
                        </button>
                      </div>

                      {expandedEntryId === entry.id && (
                        <InlinePdfViewer
                          key={entry.id}
                          pdfUrl={entry.pdfUrl}
                          title={entry.title}
                          entryId={entry.id}
                          onClose={() => setExpandedEntryId(null)}
                        />
                      )}
                    </div>
                  )}

                  {entry.resourceUrl && !entry.pdfUrl && entry.resourceUrl !== "#" && (
                    <div className="archive-history-resource-action mt-2 mb-2 flex items-center">
                      <a
                        href={entry.resourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="secondary-button archive-read-button inline-flex min-h-[44px] items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold"
                        aria-label={`${entry.title} kaynağını yeni sekmede aç`}
                      >
                        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>
                          {getYouTubeVideoId(entry.resourceUrl) ? "YouTube'da İzle" : "Kaynağı Aç"}
                        </span>
                      </a>
                    </div>
                  )}

                  {isLatest && (
                    <div className="archive-entry-actions">
                      <button
                        type="button"
                        className="secondary-button archive-undo-button"
                        onClick={() => onUndo(entry.id, timing)}
                        disabled={isEntryPending}
                        aria-label={`${entry.title} dosyasını okunmadı olarak işaretle`}
                      >
                        <RotateCcw aria-hidden="true" className="h-4 w-4" />
                        {isEntryPending ? "Güncelleniyor…" : "Okunmadı Olarak İşaretle"}
                      </button>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        ) : (
          <div className="archive-history-empty">
            <FileClock className="text-ink-faint h-8 w-8" aria-hidden="true" />
            <h4>Henüz tamamlanan dosya bulunmuyor</h4>
            <p>Mevcut dersi okuyup tamamladığınızda tamamlanan dosyalarınız burada listelenir.</p>
            <button type="button" className="primary-button mt-2" onClick={onClose}>
              Mevcut Dosyaya Dön
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
