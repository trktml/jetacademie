"use client";

import { Fragment, useCallback, useEffect, useMemo, useRef, useState, useTransition } from "react";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Compass,
  FileClock,
  FolderArchive,
  FolderOpen,
  History,
  Layers,
  LockKeyhole,
  RotateCcw,
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
import { markEntryAsRead, unmarkEntryAsRead } from "@/app/mufredat/actions";

import { useUiStore } from "@/store/use-ui-store";
import { useGuestStore } from "@/store/use-guest-store";

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
  initialHistoryViewCategoryIds?: Record<string, boolean>;
}

export function CurriculumArchive({
  initialCompletedEntryIds,
  isSignedIn,
  customEntries,
  initialCategoryId = "ayet",
  initialHistoryViewCategoryIds = {},
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

  const initialHistoryCategory = useMemo(() => {
    const entry = Object.entries(initialHistoryViewCategoryIds).find(([, isOpen]) => isOpen);
    return (entry ? entry[0] : null) as CurriculumCategoryId | null;
  }, [initialHistoryViewCategoryIds]);

  const [activeHistoryCategoryId, setActiveHistoryCategoryId] =
    useState<CurriculumCategoryId | null>(() => {
      if (initialHistoryCategory) return initialHistoryCategory;
      if (typeof window !== "undefined") {
        const url = new URL(window.location.href);
        const gecmisParam = url.searchParams.get("gecmis") as CurriculumCategoryId | null;
        if (gecmisParam && curriculumCategories.some((c) => c.id === gecmisParam)) {
          return gecmisParam;
        }
      }
      return null;
    });

  const [selectedCompletedIndexes, setSelectedCompletedIndexes] = useState<
    Partial<Record<CurriculumCategoryId, number>>
  >({});
  const [isPending, startTransition] = useTransition();
  const openAccount = useUiStore((state) => state.openAccount);

  // Guest store
  const isGuest = useGuestStore((s) => s.isGuest);
  const guestCompleteEntry = useGuestStore((s) => s.completeEntry);
  const guestUncompleteEntry = useGuestStore((s) => s.uncompleteEntry);
  const guestCompletedIds = useGuestStore((s) => s.completedEntryIds);

  const completedSet = useMemo(
    () => new Set(isGuest ? guestCompletedIds : completedEntryIds),
    [isGuest, guestCompletedIds, completedEntryIds]
  );

  // Handle browser back/forward buttons (popstate)
  useEffect(() => {
    function handlePopState() {
      if (typeof window !== "undefined") {
        const url = new URL(window.location.href);
        const gecmisParam = url.searchParams.get("gecmis") as CurriculumCategoryId | null;
        if (gecmisParam && curriculumCategories.some((c) => c.id === gecmisParam)) {
          setActiveHistoryCategoryId(gecmisParam);
        } else {
          setActiveHistoryCategoryId(null);
        }
      }
    }
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Dedicated history state and helpers
  const activeHistoryCategory = useMemo(
    () => curriculumCategories.find((c) => c.id === activeHistoryCategoryId) ?? null,
    [activeHistoryCategoryId]
  );

  const activeHistoryEntries = useMemo(() => {
    if (!activeHistoryCategory) return [];
    return customEntries
      ? customEntries.filter((entry) => entry.categoryId === activeHistoryCategory.id)
      : getCategoryEntries(activeHistoryCategory.id);
  }, [activeHistoryCategory, customEntries]);

  const historyCompletedEntries = useMemo(() => {
    return activeHistoryEntries
      .filter((entry) => completedSet.has(entry.id))
      .slice()
      .reverse();
  }, [activeHistoryEntries, completedSet]);

  const historyAvailableMonths = useMemo(() => {
    const monthsMap = new Map<number, string>();
    historyCompletedEntries.forEach((e) => {
      if (!monthsMap.has(e.month)) {
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

  function openHistoryView(categoryId: CurriculumCategoryId) {
    setActiveHistoryCategoryId(categoryId);
    setActiveCategoryId(categoryId);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("gecmis", categoryId);
      window.history.pushState(null, "", url.toString());
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function closeHistoryView() {
    const prevCategory = activeHistoryCategoryId;
    setActiveHistoryCategoryId(null);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.delete("gecmis");
      const hash = prevCategory ? `#${prevCategory}` : "";
      window.history.pushState(null, "", `${url.pathname}${url.search}${hash}`);
      if (prevCategory) {
        setTimeout(() => {
          scrollToCategory(prevCategory);
        }, 80);
      }
    }
  }

  // Horizontal mobile capsule navigation state & refs
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const capsuleNavRef = useRef<HTMLElement | null>(null);
  const categoryButtonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const isProgrammaticScrollRef = useRef(false);
  const programmaticScrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateScrollIndicators = useCallback(() => {
    const container = capsuleNavRef.current;
    if (!container) return;
    const { scrollLeft, scrollWidth, clientWidth } = container;
    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 4);
  }, []);

  useEffect(() => {
    const container = capsuleNavRef.current;
    if (!container) return;

    updateScrollIndicators();
    container.addEventListener("scroll", updateScrollIndicators, { passive: true });
    window.addEventListener("resize", updateScrollIndicators);

    const timer = setTimeout(updateScrollIndicators, 150);

    return () => {
      container.removeEventListener("scroll", updateScrollIndicators);
      window.removeEventListener("resize", updateScrollIndicators);
      clearTimeout(timer);
    };
  }, [updateScrollIndicators]);

  // Center active category inside horizontal capsule dock
  useEffect(() => {
    const listElement = capsuleNavRef.current;
    const activeButton = categoryButtonRefs.current[activeCategoryId];

    if (listElement && activeButton) {
      if (listElement.scrollWidth > listElement.clientWidth) {
        const targetLeft =
          activeButton.offsetLeft - listElement.clientWidth / 2 + activeButton.clientWidth / 2;

        listElement.scrollTo({
          left: Math.max(0, targetLeft),
          behavior: "smooth",
        });
      }
    }
  }, [activeCategoryId]);

  function scrollNav(direction: "left" | "right") {
    const container = capsuleNavRef.current;
    if (!container) return;
    const scrollAmount = Math.max(140, Math.round(container.clientWidth * 0.65));
    container.scrollBy({
      left: direction === "right" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  }

  function scrollToCategory(categoryId: CurriculumCategoryId) {
    if (typeof window === "undefined") return;
    const targetElement = document.getElementById(categoryId);
    if (!targetElement) return;

    const isMobile = window.innerWidth <= 767;
    if (isMobile) {
      const header = document.querySelector(".site-header");
      const capsule = document.querySelector(".archive-fixed-capsule");
      const headerHeight = header ? header.getBoundingClientRect().height : 0;
      const capsuleHeight = capsule ? capsule.getBoundingClientRect().height : 0;
      const totalOffset = (headerHeight || 56) + (capsuleHeight || 70) + 16;
      const elementTop = targetElement.getBoundingClientRect().top + window.scrollY;

      window.scrollTo({
        top: Math.max(0, elementTop - totalOffset),
        behavior: "smooth",
      });
    } else {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function selectCategory(categoryId: CurriculumCategoryId) {
    if (activeHistoryCategoryId) {
      openHistoryView(categoryId);
      return;
    }
    setActiveCategoryId(categoryId);
    isProgrammaticScrollRef.current = true;
    if (programmaticScrollTimeoutRef.current) {
      clearTimeout(programmaticScrollTimeoutRef.current);
    }
    programmaticScrollTimeoutRef.current = setTimeout(() => {
      isProgrammaticScrollRef.current = false;
    }, 850);

    if (typeof window !== "undefined") {
      if (window.history?.replaceState) {
        window.history.replaceState(null, "", `#${categoryId}`);
      }
      scrollToCategory(categoryId);
    }
  }

  // Synchronize category with hash changes if triggered externally
  useEffect(() => {
    function handleHashChange() {
      if (typeof window !== "undefined" && window.location.hash) {
        const hash = window.location.hash.replace("#", "") as CurriculumCategoryId;
        if (curriculumCategories.some((c) => c.id === hash)) {
          setActiveCategoryId(hash);
          scrollToCategory(hash);
        }
      }
    }
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // On initial mount, if URL has hash, smoothly scroll to category with correct offset
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const hash = window.location.hash.replace("#", "") as CurriculumCategoryId;
      if (curriculumCategories.some((c) => c.id === hash)) {
        const timer = setTimeout(() => {
          scrollToCategory(hash);
        }, 120);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  // Cleanup programmatic scroll timeout
  useEffect(() => {
    return () => {
      if (programmaticScrollTimeoutRef.current) {
        clearTimeout(programmaticScrollTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (activeHistoryCategoryId) return;
    const sections = curriculumCategories
      .map((category) => document.getElementById(category.id))
      .filter((section): section is HTMLElement => section !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleSection && !isProgrammaticScrollRef.current) {
          setActiveCategoryId(visibleSection.target.id as CurriculumCategoryId);
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.25, 0.5] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [activeHistoryCategoryId]);

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
    if (!isSignedIn && !isGuest) {
      openAccount();
      return;
    }

    if (isGuest) {
      guestCompleteEntry(entryId);
      setToast({
        message: `${timingLabel} okundu olarak kaydedildi. 📱 İlerlemeniz bu cihazda saklanıyor.`,
        type: "success",
      });
      setTimeout(() => setToast(null), 3500);
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

  function unmarkEntry(entryId: string, timingLabel: string) {
    if (!isSignedIn && !isGuest) {
      openAccount();
      return;
    }

    if (isGuest) {
      guestUncompleteEntry(entryId);
      setToast({
        message: `${timingLabel} içeriği okunmadı olarak güncellendi.`,
        type: "success",
      });
      setTimeout(() => setToast(null), 3500);
      return;
    }

    setPendingEntryId(entryId);
    startTransition(async () => {
      try {
        await unmarkEntryAsRead(entryId);
        setCompletedEntryIds((ids) => ids.filter((id) => id !== entryId));
        setToast({
          message: `${timingLabel} içeriği okunmadı olarak güncellendi.`,
          type: "success",
        });
        setTimeout(() => setToast(null), 3500);
      } catch (error) {
        setToast({
          message: error instanceof Error ? error.message : "İşlem geri alınamadı.",
          type: "error",
        });
        setTimeout(() => setToast(null), 4000);
      } finally {
        setPendingEntryId(null);
      }
    });
  }

  return (
    <div className="archive-layout" aria-label="Müfredat akışı">
      {/* Sol Sabit Kapsül Navigasyon (Desktop: Fixed Capsule Rail / Mobile: Sticky Capsule Dock) */}
      <aside className="archive-fixed-capsule" aria-label="Müfredat Hızlı Menü">
        {/* Mobilde sağa/sola kaydırılabilir olduğunu belirten zarif gradyan ve ok butonları */}
        <button
          type="button"
          className="archive-capsule-scroll-hint archive-capsule-scroll-hint--left"
          data-visible={canScrollLeft}
          aria-label="Önceki kategoriler"
          tabIndex={canScrollLeft ? 0 : -1}
          onClick={() => scrollNav("left")}
        >
          <span className="archive-capsule-scroll-hint__icon-box" aria-hidden="true">
            <ChevronLeft className="h-4 w-4" />
          </span>
        </button>

        <nav ref={capsuleNavRef} className="archive-capsule-list" aria-label="Kategori Listesi">
          {curriculumCategories.map((item) => {
            const Icon = item.icon;
            const currentActiveId = activeHistoryCategoryId || activeCategoryId;
            const isActive = item.id === currentActiveId;
            const shortLabel = getCategoryShortLabel(item.id);

            return (
              <button
                key={item.id}
                ref={(el) => {
                  categoryButtonRefs.current[item.id] = el;
                }}
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

        <button
          type="button"
          className="archive-capsule-scroll-hint archive-capsule-scroll-hint--right"
          data-visible={canScrollRight}
          aria-label="Daha fazla kategori"
          tabIndex={canScrollRight ? 0 : -1}
          onClick={() => scrollNav("right")}
        >
          <span className="archive-capsule-scroll-hint__icon-box" aria-hidden="true">
            <ChevronRight className="h-4 w-4" />
          </span>
        </button>
      </aside>

      {/* Eğer bir kategori geçmişi seçildiyse bağımsız Özel Geçmiş Alanı gösterilir */}
      {activeHistoryCategory ? (
        <div className="archive-main-column archive-main-column--history">
          <div
            className="archive-history-screen"
            aria-label={`${activeHistoryCategory.label} Tamamlanan Dosyalar`}
          >
            {/* Üst Bilgi Başlığı ve Geri Dön Butonu */}
            <header className="archive-history-header">
              <div className="archive-history-header__left">
                <button
                  type="button"
                  className="archive-history-back-btn"
                  onClick={closeHistoryView}
                  aria-label="Müfredat akışına geri dön"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  <span>Geri Dön</span>
                </button>

                <div className="archive-history-header__info">
                  <div
                    className="archive-category-icon-box"
                    data-accent={activeHistoryCategory.accent}
                    aria-hidden="true"
                  >
                    {(() => {
                      const IconComponent = activeHistoryCategory.icon;
                      return <IconComponent />;
                    })()}
                  </div>
                  <div>
                    <div className="archive-category-title-wrap">
                      <h2 className="archive-category-title">{activeHistoryCategory.label}</h2>
                      <span className="archive-history-header__badge">
                        <FolderArchive
                          className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400"
                          aria-hidden="true"
                        />
                        <span>Tamamlanan Dosyalar</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="archive-history-header__right">
                <div className="archive-category-progress">
                  <span className="archive-category-progress__count">
                    {historyCompletedEntries.length} / {activeHistoryEntries.length} tamamlandı
                  </span>
                  {activeHistoryEntries.length > 0 && (
                    <div className="archive-progress-track" aria-hidden="true">
                      <div
                        className="archive-progress-fill"
                        style={{
                          width: `${(historyCompletedEntries.length / activeHistoryEntries.length) * 100}%`,
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </header>

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
                      onChange={(e) => setSelectedJumpEntryId(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleJumpToEntry(currentJumpId);
                        }
                      }}
                      aria-label="Geçmişten bir dosya seçin"
                    >
                      {historyCompletedEntries.map((entry) => {
                        const timing = `${monthNames[entry.month - 1]} · ${entry.week}. Hafta`;
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
                        (e) => e.month === m.month
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
                  </div>
                )}
              </div>
            )}

            {/* Tamamlanan Dosyalar Listesi */}
            {historyCompletedEntries.length > 0 ? (
              <div className="archive-history-list">
                {historyCompletedEntries.map((entry, index) => {
                  const timing = `${monthNames[entry.month - 1]}-${entry.week}`;
                  const isLatest = index === 0;
                  const isEntryPending = isPending && pendingEntryId === entry.id;
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
                        <Check className="h-3.5 w-3.5" />
                        <span>{`${timing} · Tamamlandı`}</span>
                      </div>

                      <h3 className="archive-entry-title">{entry.title}</h3>
                      {entry.body && <p className="archive-entry-desc">{entry.body}</p>}

                      {isLatest && (
                        <div className="archive-entry-actions">
                          <button
                            type="button"
                            className="secondary-button archive-undo-button"
                            onClick={() => unmarkEntry(entry.id, timing)}
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
                <p>
                  Sıradaki içeriği okuyup tamamladığınızda tamamlanan dosyalarınız burada
                  listelenir.
                </p>
                <button type="button" className="primary-button mt-2" onClick={closeHistoryView}>
                  Sıradaki Dosyaya Git
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Tüm kategoriler doğal sayfa akışında alt alta yer alır. */
        <div className="archive-main-column">
          {curriculumCategories.map((activeCategory, categoryIndex) => {
            const ActiveIcon = activeCategory.icon;
            const activeEntries = customEntries
              ? customEntries.filter((entry) => entry.categoryId === activeCategory.id)
              : getCategoryEntries(activeCategory.id);
            const unlockedIndex = getUnlockedEntryIndex(activeEntries, completedSet);
            const completedEntries = activeEntries
              .filter((entry) => completedSet.has(entry.id))
              .slice()
              .reverse();
            const completedCount = completedEntries.length;
            const isAllCompleted =
              activeEntries.length > 0 && completedCount === activeEntries.length;
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
                          <h2
                            id={`heading-${activeCategory.id}`}
                            className="archive-category-title"
                          >
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
                          onClick={() => openHistoryView(activeCategory.id)}
                          aria-label={`${activeCategory.label} geçmiş dosyalarını gör (${completedCount} tamamlandı)`}
                          title={
                            completedCount === 0
                              ? "Henüz tamamlanmış dosya yok"
                              : "Geçmiş dosyaları gör"
                          }
                        >
                          <History aria-hidden="true" />
                          <span>{`Geçmiş (${completedCount})`}</span>
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
                            Yeni içerikler eklendiğinde burada hafta hafta sıralı olarak
                            listelenecektir.
                          </p>
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
                              const depth = isFront
                                ? 0
                                : Math.abs(entryIdx - selectedCompletedIndex);
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

                                  <h3 className="archive-entry-title">{entry.title}</h3>
                                  {entry.body && <p className="archive-entry-desc">{entry.body}</p>}
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
                                        <span className="read-status">
                                          <LockKeyhole aria-hidden="true" /> Kilitli
                                        </span>
                                      </div>

                                      <h3 className="archive-entry-title">{lockedEntry.title}</h3>
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
              </Fragment>
            );
          })}
        </div>
      )}

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
