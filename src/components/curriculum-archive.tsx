"use client";

import { Fragment, useCallback, useEffect, useMemo, useRef, useState, useTransition } from "react";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  ChevronLeft,
  ChevronRight,
  Compass,
  ExternalLink,
  EyeOff,
  FileClock,
  FolderArchive,
  FolderOpen,
  History,
  Layers,
  LockKeyhole,
  RotateCcw,
  Sparkles,
  X,
} from "lucide-react";
import {
  curriculumCategories,
  curriculumEntries,
  getCategoryEntries,
  getCategoryShortLabel,
  getUnlockedEntryIndex,
  type CurriculumCategoryId,
  type CurriculumEntry,
} from "@/lib/curriculum";
import { markEntryAsRead, unmarkEntryAsRead } from "@/app/mufredat/actions";
import { updateUserGender } from "@/app/mufredat/gender-actions";
import { type Gender } from "@/lib/data/ilmihal-curriculum";
import { GenderSelector } from "@/components/gender-selector";
import { InlinePdfViewer } from "@/components/inline-pdf-viewer";

import { useUiStore } from "@/store/use-ui-store";
import { useGuestStore } from "@/store/use-guest-store";
import { useReadingProgressStore } from "@/store/use-reading-progress-store";
import { isValidGrade, useCurriculumStore } from "@/store/use-curriculum-store";
import { GradeSelector } from "@/components/grade-selector";

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

export const UNDO_DURATION_SECONDS = 7;

export interface UndoState {
  entryId: string;
  timingLabel: string;
  categoryId: CurriculumCategoryId;
}

export interface ToastState {
  message: string;
  type: "success" | "warning" | "error";
  hasUndo?: boolean;
}

interface CurriculumArchiveProps {
  initialCompletedEntryIds: string[];
  isSignedIn: boolean;
  initialGender?: "erkek" | "bayan" | null;
  customEntries?: readonly CurriculumEntry[];
  allEntries?: readonly CurriculumEntry[];
  initialGrade?: number;
  initialCategoryId?: CurriculumCategoryId;
  initialHistoryViewCategoryIds?: Record<string, boolean>;
}

export function scrollCategoryIntoView(categoryId: string) {
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

    if (typeof window.scrollTo === "function") {
      window.scrollTo({
        top: Math.max(0, elementTop - totalOffset),
        behavior: "smooth",
      });
    }
  } else {
    if (typeof targetElement.scrollIntoView === "function") {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
}

export function CurriculumArchive({
  initialCompletedEntryIds,
  isSignedIn,
  initialGender = null,
  customEntries,
  allEntries,
  initialGrade = 1,
  initialCategoryId = "ayet",
  initialHistoryViewCategoryIds = {},
}: CurriculumArchiveProps) {
  const [activeCategoryId, setActiveCategoryId] = useState<CurriculumCategoryId>(initialCategoryId);
  const [completedEntryIds, setCompletedEntryIds] = useState(initialCompletedEntryIds);
  const [userGender, setUserGender] = useState<Gender | null>(initialGender ?? null);
  const [isGenderUpdating, setIsGenderUpdating] = useState(false);
  const [pendingEntryId, setPendingEntryId] = useState<string | null>(null);
  const [toast, setToast] = useState<ToastState | null>(null);
  const [undoState, setUndoState] = useState<UndoState | null>(null);
  const [undoSecondsLeft, setUndoSecondsLeft] = useState<number>(0);
  const undoTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [shakingEntryId, setShakingEntryId] = useState<string | null>(null);

  const initialHistoryCategory = useMemo(() => {
    const entry = Object.entries(initialHistoryViewCategoryIds).find(([, isOpen]) => isOpen);
    return (entry ? entry[0] : null) as CurriculumCategoryId | null;
  }, [initialHistoryViewCategoryIds]);

  const [activeHistoryCategoryId, setActiveHistoryCategoryId] =
    useState<CurriculumCategoryId | null>(initialHistoryCategory ?? null);

  const [selectedCompletedIndexes, setSelectedCompletedIndexes] = useState<
    Partial<Record<CurriculumCategoryId, number>>
  >({});
  const [expandedReadingEntryId, setExpandedReadingEntryId] = useState<string | null>(null);
  const readingProgressMap = useReadingProgressStore((s) => s.progressMap);
  const [isPending, startTransition] = useTransition();
  const openAccount = useUiStore((state) => state.openAccount);

  // Guest store
  const isGuest = useGuestStore((s) => s.isGuest);
  const guestCompleteEntry = useGuestStore((s) => s.completeEntry);
  const guestUncompleteEntry = useGuestStore((s) => s.uncompleteEntry);
  const guestCompletedIds = useGuestStore((s) => s.completedEntryIds);
  const guestGender = useGuestStore((s) => s.gender);
  const guestSetGender = useGuestStore((s) => s.setGender);

  const activeGender: Gender = isSignedIn ? (userGender ?? "erkek") : (guestGender ?? "erkek");

  const clearUndo = useCallback(() => {
    if (undoTimerRef.current) {
      clearInterval(undoTimerRef.current);
      undoTimerRef.current = null;
    }
    setUndoState(null);
    setUndoSecondsLeft(0);
  }, []);

  const dismissToast = useCallback(() => {
    clearUndo();
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
      toastTimerRef.current = null;
    }
    setToast(null);
  }, [clearUndo]);

  const showToast = useCallback(
    (message: string, type: "success" | "warning" | "error", durationMs = 3500) => {
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
        toastTimerRef.current = null;
      }
      setToast({ message, type, hasUndo: false });
      toastTimerRef.current = setTimeout(() => {
        setToast(null);
      }, durationMs);
    },
    []
  );

  const triggerUndoCountdown = useCallback(
    (entryId: string, timingLabel: string, categoryId: CurriculumCategoryId) => {
      clearUndo();
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
        toastTimerRef.current = null;
      }

      setUndoState({ entryId, timingLabel, categoryId });
      setUndoSecondsLeft(UNDO_DURATION_SECONDS);

      setToast({
        message: `${timingLabel} okundu olarak kaydedildi.`,
        type: "success",
        hasUndo: true,
      });

      undoTimerRef.current = setInterval(() => {
        setUndoSecondsLeft((prev) => {
          if (prev <= 1) {
            if (undoTimerRef.current) {
              clearInterval(undoTimerRef.current);
              undoTimerRef.current = null;
            }
            setUndoState(null);
            toastTimerRef.current = setTimeout(() => {
              setToast(null);
            }, 1200);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    },
    [clearUndo]
  );

  useEffect(() => {
    return () => {
      if (undoTimerRef.current) clearInterval(undoTimerRef.current);
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  function handleGenderChange(newGender: Gender) {
    if (isSignedIn) {
      setIsGenderUpdating(true);
      startTransition(async () => {
        try {
          await updateUserGender(newGender);
          setUserGender(newGender);
          setSelectedCompletedIndexes((prev) => ({ ...prev, ilmihal: 0 }));
          setSelectedJumpEntryId("");
          showToast(
            `${newGender === "erkek" ? "Erkek" : "Bayan"} müfredatı seçildi ve hesabınıza kaydedildi.`,
            "success",
            3500
          );
        } catch (error) {
          showToast(
            error instanceof Error ? error.message : "Tercih kaydedilemedi.",
            "error",
            4000
          );
        } finally {
          setIsGenderUpdating(false);
        }
      });
    } else if (isGuest) {
      guestSetGender(newGender);
      setSelectedCompletedIndexes((prev) => ({ ...prev, ilmihal: 0 }));
      setSelectedJumpEntryId("");
      showToast(
        `${newGender === "erkek" ? "Erkek" : "Bayan"} müfredatı seçildi (Misafir Modu).`,
        "success",
        3500
      );
    }
  }

  function handleSelectGuestGender(newGender: Gender) {
    guestSetGender(newGender);
    setSelectedCompletedIndexes((prev) => ({ ...prev, ilmihal: 0 }));
    setSelectedJumpEntryId("");
    showToast(
      `Misafir modu etkinleştirildi: ${newGender === "erkek" ? "Erkek" : "Bayan"} müfredatı seçildi.`,
      "success",
      3500
    );
  }

  const completedSet = useMemo(
    () => new Set(isGuest ? guestCompletedIds : completedEntryIds),
    [isGuest, guestCompletedIds, completedEntryIds]
  );

  // Handle browser back/forward buttons (popstate) and post-mount sync
  useEffect(() => {
    function syncHistoryFromUrl() {
      if (typeof window !== "undefined") {
        const url = new URL(window.location.href);
        const gecmisParam = url.searchParams.get("gecmis") as CurriculumCategoryId | null;
        if (gecmisParam && curriculumCategories.some((c) => c.id === gecmisParam)) {
          setActiveHistoryCategoryId(gecmisParam);
        } else if (!initialHistoryCategory) {
          setActiveHistoryCategoryId(null);
        }
      }
    }
    syncHistoryFromUrl();
    window.addEventListener("popstate", syncHistoryFromUrl);
    return () => window.removeEventListener("popstate", syncHistoryFromUrl);
  }, [initialHistoryCategory]);

  const selectedGrade = useCurriculumStore((s) => s.selectedGrade);
  const setSelectedGrade = useCurriculumStore((s) => s.setSelectedGrade);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      const param = url.searchParams.get("sinif");
      if (param) {
        const num = parseInt(param, 10);
        if (isValidGrade(num)) {
          setSelectedGrade(num);
          return;
        }
      }
    }
    if (initialGrade && isValidGrade(initialGrade)) {
      setSelectedGrade(initialGrade);
    }
  }, [initialGrade, setSelectedGrade]);

  const currentGradeEntries = useMemo(() => {
    if (customEntries && customEntries.length > 0) {
      const hasGrade = customEntries.some((e) => typeof e.grade === "number");
      if (hasGrade) {
        return customEntries.filter((entry) => (entry.grade ?? 1) === selectedGrade);
      }
      return customEntries;
    }
    if (allEntries && allEntries.length > 0) {
      return allEntries.filter((entry) => (entry.grade ?? 1) === selectedGrade);
    }
    return curriculumEntries.filter((entry) => (entry.grade ?? 1) === selectedGrade);
  }, [allEntries, customEntries, selectedGrade]);

  // Dedicated history state and helpers
  const activeHistoryCategory = useMemo(
    () => curriculumCategories.find((c) => c.id === activeHistoryCategoryId) ?? null,
    [activeHistoryCategoryId]
  );

  const activeHistoryEntries = useMemo(() => {
    if (!activeHistoryCategory) return [];
    return getCategoryEntries(
      activeHistoryCategory.id,
      currentGradeEntries,
      selectedGrade,
      activeHistoryCategory.id === "ilmihal" ? activeGender : undefined
    );
  }, [activeHistoryCategory, currentGradeEntries, selectedGrade, activeGender]);

  const historyCompletedEntries = useMemo(() => {
    return activeHistoryEntries
      .filter((entry) => completedSet.has(entry.id))
      .slice()
      .reverse();
  }, [activeHistoryEntries, completedSet]);

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
    isProgrammaticScrollRef.current = true;
    if (programmaticScrollTimeoutRef.current) {
      clearTimeout(programmaticScrollTimeoutRef.current);
    }
    programmaticScrollTimeoutRef.current = setTimeout(() => {
      isProgrammaticScrollRef.current = false;
    }, 850);

    scrollCategoryIntoView(categoryId);
  }

  function selectCategory(categoryId: CurriculumCategoryId) {
    if (activeHistoryCategoryId) {
      openHistoryView(categoryId);
      return;
    }
    setActiveCategoryId(categoryId);

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

  // On initial mount, if URL has hash, synchronize active category and smoothly scroll
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const hash = window.location.hash.replace("#", "") as CurriculumCategoryId;
      if (curriculumCategories.some((c) => c.id === hash)) {
        const timer = setTimeout(() => {
          setActiveCategoryId(hash);
          scrollToCategory(hash);
        }, 100);
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
    showToast(
      "Önce sıradaki içeriği okumalısınız. Müfredat dosyaları sırayla açılmaktadır.",
      "warning",
      3500
    );
  }

  function completeEntry(entryId: string, timingLabel: string, categoryId: CurriculumCategoryId) {
    if (!isSignedIn && !isGuest) {
      openAccount();
      return;
    }

    setExpandedReadingEntryId(null);
    scrollToCategory(categoryId);

    if (isGuest) {
      guestCompleteEntry(entryId);
      triggerUndoCountdown(entryId, timingLabel, categoryId);
      setTimeout(() => {
        scrollToCategory(categoryId);
      }, 60);
      return;
    }

    setPendingEntryId(entryId);
    startTransition(async () => {
      try {
        await markEntryAsRead(entryId);
        setCompletedEntryIds((ids) => [...new Set([...ids, entryId])]);
        triggerUndoCountdown(entryId, timingLabel, categoryId);
        setTimeout(() => {
          scrollToCategory(categoryId);
        }, 60);
      } catch (error) {
        showToast(
          error instanceof Error ? error.message : "İlerleme kaydedilemedi.",
          "error",
          4000
        );
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

    clearUndo();

    if (isGuest) {
      guestUncompleteEntry(entryId);
      showToast(`${timingLabel} içeriği okunmadı olarak güncellendi.`, "success", 3500);
      return;
    }

    setPendingEntryId(entryId);
    startTransition(async () => {
      try {
        await unmarkEntryAsRead(entryId);
        setCompletedEntryIds((ids) => ids.filter((id) => id !== entryId));
        showToast(`${timingLabel} içeriği okunmadı olarak güncellendi.`, "success", 3500);
      } catch (error) {
        showToast(error instanceof Error ? error.message : "İşlem geri alınamadı.", "error", 4000);
      } finally {
        setPendingEntryId(null);
      }
    });
  }

  function handleUndo() {
    if (!undoState) return;
    const { entryId, timingLabel } = undoState;
    unmarkEntry(entryId, timingLabel);
  }

  return (
    <div className="archive-layout" aria-label="Müfredat akışı">
      {/* Sol Sabit Kapsül Navigasyon (Desktop: Fixed Capsule Rail / Mobile: Sticky Capsule Dock) */}
      <aside className="archive-fixed-capsule" aria-label="Müfredat Hızlı Menü">
        <div className="archive-capsule-grade-wrapper">
          <GradeSelector
            compact
            value={selectedGrade}
            onGradeChange={(grade) => setSelectedGrade(grade)}
          />
        </div>

        <div className="archive-capsule-nav-container">
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
        </div>
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
                      <h2 className="archive-category-title">
                        {activeHistoryCategory.label}
                        {activeHistoryCategory.id === "ilmihal" && (
                          <span className="text-sm font-normal opacity-75">
                            {" "}
                            ({activeGender === "erkek" ? "Erkek" : "Bayan"})
                          </span>
                        )}
                      </h2>
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

            {/* İlmihal Geçmişi için Erkek / Bayan Müfredat Seçici */}
            {activeHistoryCategory.id === "ilmihal" && (
              <div className="archive-history-gender-wrap mb-1">
                <GenderSelector
                  currentGender={activeGender}
                  onGenderChange={handleGenderChange}
                  onSelectGuest={handleSelectGuestGender}
                  onOpenAccount={openAccount}
                  isSignedIn={isSignedIn}
                  isGuest={isGuest}
                  isPending={isGenderUpdating || isPending}
                />
              </div>
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
                        const timing = entry.isExtra
                          ? `Ekstra ${entry.extraOrder ?? 1}`
                          : `${monthNames[entry.month - 1]} · ${entry.week}. Hafta`;
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
                  const timing = entry.isExtra
                    ? `Ekstra ${entry.extraOrder ?? 1}`
                    : `${monthNames[entry.month - 1]}-${entry.week}`;
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

                      {entry.pdfUrl && (
                        <div className="archive-history-reading-action mt-2 mb-2 flex flex-col gap-2">
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              className="secondary-button archive-read-button inline-flex min-h-[40px] items-center gap-1.5"
                              onClick={() =>
                                setExpandedReadingEntryId((prev) =>
                                  prev === entry.id ? null : entry.id
                                )
                              }
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
                            <InlinePdfViewer
                              pdfUrl={entry.pdfUrl}
                              title={entry.title}
                              entryId={entry.id}
                              onClose={() => setExpandedReadingEntryId(null)}
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
                            className="secondary-button archive-read-button inline-flex min-h-[40px] items-center gap-1.5 text-xs font-medium"
                            aria-label={`${entry.title} kaynağını yeni sekmede aç`}
                          >
                            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                            <span>Kaynağı Aç (sunnah.com)</span>
                          </a>
                        </div>
                      )}

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
            const activeEntries = getCategoryEntries(
              activeCategory.id,
              currentGradeEntries,
              selectedGrade,
              activeCategory.id === "ilmihal" ? activeGender : undefined
            );
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
                    {/* İlmihal için Erkek / Bayan Müfredat Seçici */}
                    {activeCategory.id === "ilmihal" && (
                      <GenderSelector
                        currentGender={activeGender}
                        onGenderChange={handleGenderChange}
                        onSelectGuest={handleSelectGuestGender}
                        onOpenAccount={openAccount}
                        isSignedIn={isSignedIn}
                        isGuest={isGuest}
                        isPending={isGenderUpdating || isPending}
                      />
                    )}

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
                          {undoState && undoState.categoryId === activeCategory.id && (
                            <button
                              type="button"
                              className="secondary-button archive-inline-undo-button"
                              onClick={handleUndo}
                              disabled={isPending}
                              aria-label={`${undoState.timingLabel} okundu işaretini geri al (${undoSecondsLeft} saniye)`}
                            >
                              <RotateCcw aria-hidden="true" className="h-4 w-4" />
                              <span>Geri Al ({undoSecondsLeft}s)</span>
                            </button>
                          )}
                        </div>

                        <div className="archive-folder-stack">
                          {activeEntries
                            .map((entry, entryIdx) => ({ entry, entryIdx }))
                            .filter(
                              ({ entryIdx }) => Math.abs(entryIdx - selectedCompletedIndex) <= 3
                            )
                            .map(({ entry, entryIdx }) => {
                              const timing = entry.isExtra
                                ? `Ekstra ${entry.extraOrder ?? 1}`
                                : `${monthNames[entry.month - 1]}-${entry.week}`;
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
                                    setSelectedCompletedIndexes((prev) => ({
                                      ...prev,
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
                                      <span className="tab-full">
                                        {entry.isExtra
                                          ? `Ekstra ${entry.extraOrder ?? 1} · İlave`
                                          : `${timing} · ${entry.week}. Hafta`}
                                      </span>
                                      <span className="tab-short" aria-hidden="true">
                                        {entry.isExtra
                                          ? `Ekstra ${entry.extraOrder ?? 1}`
                                          : `${entry.week}. Hafta`}
                                      </span>
                                    </span>
                                  </div>

                                  <h3 className="archive-entry-title">{entry.title}</h3>
                                  {entry.body && <p className="archive-entry-desc">{entry.body}</p>}

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
                                              <BookOpen
                                                className="h-3.5 w-3.5"
                                                aria-hidden="true"
                                              />
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
                                          <ExternalLink
                                            className="h-3.5 w-3.5"
                                            aria-hidden="true"
                                          />
                                          <span>Kaynağı Aç (sunnah.com)</span>
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
                            const currentTiming = currentEntry.isExtra
                              ? `Ekstra ${currentEntry.extraOrder ?? 1}`
                              : `${monthNames[currentEntry.month - 1]}-${currentEntry.week}`;
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
                                    <span className="tab-full">
                                      {currentEntry.isExtra
                                        ? `Ekstra ${currentEntry.extraOrder ?? 1} · İlave`
                                        : `${currentTiming} · ${currentEntry.week}. Hafta`}
                                    </span>
                                    <span className="tab-short" aria-hidden="true">
                                      {currentEntry.isExtra
                                        ? `Ekstra ${currentEntry.extraOrder ?? 1}`
                                        : `${currentTiming} · ${currentEntry.week}.H`}
                                    </span>
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
                                        <span>Kaynağı Aç (sunnah.com)</span>
                                      </a>
                                    </div>
                                  )}

                                <div className="archive-entry-actions">
                                  <button
                                    type="button"
                                    className="primary-button archive-complete-button"
                                    onClick={() =>
                                      completeEntry(
                                        currentEntry.id,
                                        currentTiming,
                                        activeCategory.id
                                      )
                                    }
                                    disabled={isEntryPending}
                                  >
                                    <Check aria-hidden="true" />
                                    {isEntryPending ? "Kaydediliyor…" : "Okundu işaretle"}
                                  </button>

                                  {undoState && undoState.categoryId === activeCategory.id && (
                                    <button
                                      type="button"
                                      className="secondary-button archive-inline-undo-button"
                                      onClick={handleUndo}
                                      disabled={isEntryPending}
                                      aria-label={`${undoState.timingLabel} okundu işaretini geri al (${undoSecondsLeft} saniye)`}
                                    >
                                      <RotateCcw aria-hidden="true" />
                                      <span>Geri Al ({undoSecondsLeft}s)</span>
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
                                  const lockedTiming = lockedEntry.isExtra
                                    ? `Ekstra ${lockedEntry.extraOrder ?? 1}`
                                    : `${monthNames[lockedEntry.month - 1]}-${lockedEntry.week}`;
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
                                              : `${lockedTiming} · ${lockedEntry.week}. Hafta`}
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
        <aside
          className="archive-toast"
          data-type={toast.type}
          data-has-undo={Boolean(toast.hasUndo && undoState)}
          role="status"
          aria-live="polite"
        >
          <div className="archive-toast-content">
            <div className="archive-toast-message-wrap">
              {toast.type === "success" && (
                <Check aria-hidden="true" className="h-4 w-4 shrink-0 text-emerald-400" />
              )}
              {toast.type === "warning" && (
                <LockKeyhole aria-hidden="true" className="h-4 w-4 shrink-0 text-amber-400" />
              )}
              {toast.type === "error" && (
                <AlertCircle aria-hidden="true" className="h-4 w-4 shrink-0 text-rose-400" />
              )}
              <span className="archive-toast-message">{toast.message}</span>
            </div>

            {toast.hasUndo && undoState && (
              <div className="archive-toast-actions">
                <button
                  type="button"
                  className="archive-toast-undo-button"
                  onClick={handleUndo}
                  disabled={isPending}
                  aria-label={`${undoState.timingLabel} okundu işaretini geri al (${undoSecondsLeft} saniye kaldı)`}
                >
                  <RotateCcw aria-hidden="true" className="h-3.5 w-3.5" />
                  <span>Geri Al</span>
                  <span className="archive-undo-badge" aria-hidden="true">
                    {undoSecondsLeft}s
                  </span>
                </button>
                <button
                  type="button"
                  className="archive-toast-close-button"
                  onClick={dismissToast}
                  aria-label="Bildirimi kapat"
                >
                  <X className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>
            )}
          </div>

          {toast.hasUndo && undoState && (
            <div
              className="archive-toast-progress-bar"
              aria-hidden="true"
              style={{
                width: `${(undoSecondsLeft / UNDO_DURATION_SECONDS) * 100}%`,
              }}
            />
          )}
        </aside>
      )}
    </div>
  );
}
