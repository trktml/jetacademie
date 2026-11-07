"use client";

import { useArchiveFeedback, UNDO_DURATION_SECONDS } from "@/hooks/use-archive-feedback";
import { curriculumCategories } from "./curriculum-category";
import { CurriculumArchiveTrack } from "./curriculum-archive-track";
import { CurriculumArchiveNav } from "./curriculum-archive-nav";
import { CurriculumArchiveHistory } from "./curriculum-archive-history";
import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AlertCircle, Check, LockKeyhole, RotateCcw, X } from "lucide-react";
import {
  getCategoryEntries,
  type BelgiumGrade,
  type CurriculumCategoryId,
  type CurriculumEntry,
} from "@/lib/curriculum";
import { type Gender } from "@/lib/data/ilmihal-curriculum";
import { GenderSelector } from "@/components/gender-selector";

import { useUiStore } from "@/store/use-ui-store";
import { useGuestStore } from "@/store/use-guest-store";
import { isValidGrade, useCurriculumStore } from "@/store/use-curriculum-store";
import { resolveActiveSectionId, type ActiveSectionEntry } from "@/hooks/use-active-section";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { curriculumProgressMutationOptions } from "@/lib/mutations/curriculum";

interface CurriculumArchiveProps {
  initialCompletedEntryIds: string[];
  isSignedIn: boolean;
  currentUserId?: string | null;
  initialGender?: "erkek" | "bayan" | null;
  customEntries?: readonly CurriculumEntry[];
  allEntries?: readonly CurriculumEntry[];
  initialGrade?: number;
  initialCategoryId?: CurriculumCategoryId;
  initialHistoryViewCategoryIds?: Record<string, boolean>;
  selectedGradeOverride?: BelgiumGrade;
  onGradeChange?: (grade: BelgiumGrade) => void;
  isGradeLoading?: boolean;
  gradeLoadError?: string | null;
  onRetryGrade?: () => void;
  weeklyView?: (gender: Gender, genderSelector: React.ReactNode) => React.ReactNode;
  onActiveContext?: (
    category: CurriculumCategoryId,
    gender: Gender,
    completedIds: string[]
  ) => void;
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
    const weeklyToolbar = document.querySelector(".weekly-toolbar");
    const toolbarHeight = weeklyToolbar ? weeklyToolbar.getBoundingClientRect().height + 8 : 0;
    const totalOffset = (headerHeight || 56) + (capsuleHeight || 70) + toolbarHeight + 16;
    const elementTop = targetElement.getBoundingClientRect().top + window.scrollY;

    if (typeof window.scrollTo === "function") {
      window.scrollTo({
        top: Math.max(0, elementTop - totalOffset),
        behavior: window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
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
  currentUserId = null,
  initialGender = null,
  customEntries,
  allEntries,
  initialGrade = 1,
  initialCategoryId = curriculumCategories[0].id,
  initialHistoryViewCategoryIds = {},
  selectedGradeOverride,
  onGradeChange,
  isGradeLoading = false,
  gradeLoadError,
  weeklyView,
  onActiveContext,
  onRetryGrade,
}: CurriculumArchiveProps) {
  const isWeekly = Boolean(weeklyView);
  const previousView = useRef(false);
  const sequentialCategory = useRef(initialCategoryId);
  const [activeCategoryId, setActiveCategoryId] = useState<CurriculumCategoryId>(initialCategoryId);
  const completedEntryIds = initialCompletedEntryIds;
  const userGender = initialGender;
  const queryClient = useQueryClient();
  const progressMutation = useMutation(
    curriculumProgressMutationOptions(queryClient, currentUserId)
  );
  const isPending = progressMutation.isPending;
  const isGenderUpdating = isPending && progressMutation.variables?.kind === "gender";
  const pendingEntryId =
    isPending && progressMutation.variables?.kind === "completion"
      ? progressMutation.variables.entryId
      : null;
  const {
    toast,
    undoState,
    undoSecondsLeft,
    clearUndo,
    dismissToast,
    showToast,
    triggerUndoCountdown,
  } = useArchiveFeedback();
  const [shakingEntryId, setShakingEntryId] = useState<string | null>(null);

  const initialHistoryCategory = useMemo(() => {
    const entry = Object.entries(initialHistoryViewCategoryIds).find(([, isOpen]) => isOpen);
    return (entry ? entry[0] : null) as CurriculumCategoryId | null;
  }, [initialHistoryViewCategoryIds]);

  const [activeHistoryCategoryId, setActiveHistoryCategoryId] =
    useState<CurriculumCategoryId | null>(initialHistoryCategory ?? null);

  useEffect(() => {
    if (isWeekly && !previousView.current) {
      sequentialCategory.current = activeCategoryId;
      setActiveHistoryCategoryId(null);
    } else if (!isWeekly && previousView.current) {
      setActiveCategoryId(sequentialCategory.current);
    }
    previousView.current = isWeekly;
  }, [isWeekly, activeCategoryId]);

  const [selectedCompletedIndexes, setSelectedCompletedIndexes] = useState<
    Partial<Record<CurriculumCategoryId, number>>
  >({});
  const [expandedReadingEntryId, setExpandedReadingEntryId] = useState<string | null>(null);
  const openAccount = useUiStore((state) => state.openAccount);

  const effectiveSignedIn = isSignedIn;

  // Guest store
  const guestEnabled = useGuestStore((s) => s.isGuest);
  const isGuest = !effectiveSignedIn && guestEnabled;
  const guestCompleteEntry = useGuestStore((s) => s.completeEntry);
  const guestUncompleteEntry = useGuestStore((s) => s.uncompleteEntry);
  const guestCompletedIds = useGuestStore((s) => s.completedEntryIds);
  const guestGender = useGuestStore((s) => s.gender);
  const guestSetGender = useGuestStore((s) => s.setGender);

  const activeGender: Gender = effectiveSignedIn
    ? (userGender ?? "erkek")
    : (guestGender ?? "erkek");

  useEffect(() => {
    onActiveContext?.(
      activeCategoryId,
      activeGender,
      isGuest ? guestCompletedIds : completedEntryIds
    );
  }, [
    activeCategoryId,
    activeGender,
    isGuest,
    guestCompletedIds,
    completedEntryIds,
    onActiveContext,
  ]);

  function handleGenderChange(newGender: Gender) {
    if (effectiveSignedIn) {
      progressMutation.mutate(
        { kind: "gender", gender: newGender },
        {
          onSuccess: () => {
            setSelectedCompletedIndexes((prev) => ({ ...prev, ilmihal: 0 }));
            showToast(
              `${newGender === "erkek" ? "Erkek" : "Bayan"} müfredatı seçildi ve hesabınıza kaydedildi.`,
              "success"
            );
          },
          onError: (error) => showToast(error.message, "error", 4000),
        }
      );
    } else if (isGuest) {
      guestSetGender(newGender);
      setSelectedCompletedIndexes((prev) => ({ ...prev, ilmihal: 0 }));
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

  const storeGrade = useCurriculumStore((s) => s.selectedGrade);
  const selectedGrade = selectedGradeOverride ?? storeGrade;
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
    if (allEntries) {
      return allEntries.filter((entry) => (entry.grade ?? 1) === selectedGrade);
    }
    return [];
  }, [allEntries, customEntries, selectedGrade]);

  const activeHistoryCategory = curriculumCategories.find((c) => c.id === activeHistoryCategoryId);

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

  const isProgrammaticScrollRef = useRef(false);
  const programmaticScrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tickingRef = useRef(false);

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
    if (activeHistoryCategoryId && !weeklyView) {
      openHistoryView(categoryId);
      return;
    }
    setActiveCategoryId(categoryId);

    if (typeof window !== "undefined") {
      if (window.history?.replaceState) {
        const url = new URL(window.location.href);
        url.hash = categoryId;
        window.history.replaceState(null, "", url.toString());
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

  const updateActiveSection = useCallback(() => {
    if ((!isWeekly && activeHistoryCategoryId) || isProgrammaticScrollRef.current) return;
    if (typeof window === "undefined") return;

    const doc = document.documentElement;
    const isAtBottom = window.innerHeight + window.scrollY >= doc.scrollHeight - 60;
    const isAtTop = window.scrollY < 60;

    if (isAtTop) {
      setActiveCategoryId(curriculumCategories[0].id);
      return;
    }

    const sectionIds = curriculumCategories.map((c) => c.id);
    const readingOffsetPx = window.innerWidth <= 767 ? 180 : 140;

    const entries: ActiveSectionEntry[] = sectionIds
      .map((id) => {
        const el = document.getElementById(id);
        if (!el) return null;
        const rect = el.getBoundingClientRect();
        const isIntersecting = rect.bottom > 0 && rect.top < window.innerHeight;
        return {
          id,
          top: rect.top,
          isIntersecting,
        };
      })
      .filter((e): e is NonNullable<typeof e> => e !== null);

    const nextId = resolveActiveSectionId({
      entries,
      sectionIds,
      readingOffsetPx,
      isAtBottom,
    });

    if (nextId && curriculumCategories.some((c) => c.id === nextId)) {
      setActiveCategoryId(nextId as CurriculumCategoryId);
    }
  }, [activeHistoryCategoryId, isWeekly]);

  useEffect(() => {
    if (activeHistoryCategoryId && !isWeekly) return;

    const handleScroll = () => {
      if (isProgrammaticScrollRef.current) return;
      if (!tickingRef.current) {
        tickingRef.current = true;
        window.requestAnimationFrame(() => {
          updateActiveSection();
          tickingRef.current = false;
        });
      }
    };

    const rafId = window.requestAnimationFrame(updateActiveSection);

    const observer =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(
            () => {
              if (!isProgrammaticScrollRef.current) {
                updateActiveSection();
              }
            },
            { threshold: [0, 0.25, 0.5, 0.75, 1] }
          )
        : null;

    if (observer) {
      curriculumCategories.forEach((cat) => {
        const el = document.getElementById(cat.id);
        if (el) observer.observe(el);
      });
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.cancelAnimationFrame(rafId);
      if (observer) observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [
    activeHistoryCategoryId,
    isWeekly,
    selectedGrade,
    isGradeLoading,
    currentGradeEntries,
    updateActiveSection,
  ]);

  function notifyLocked(entryId?: string) {
    if (entryId) {
      setShakingEntryId(entryId);
      setTimeout(() => setShakingEntryId(null), 500);
    }
    showToast(
      "Önce mevcut dersi okumalısınız. Müfredat dosyaları sırayla açılmaktadır.",
      "warning",
      3500
    );
  }

  function completeEntry(entryId: string, timingLabel: string, categoryId: CurriculumCategoryId) {
    if (!effectiveSignedIn && !isGuest) {
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

    if (isPending) return;
    progressMutation.mutate(
      { kind: "completion", entryId, completed: true },
      {
        onSuccess: () => {
          triggerUndoCountdown(entryId, timingLabel, categoryId);
          setTimeout(() => scrollToCategory(categoryId), 60);
        },
        onError: (error) => showToast(error.message, "error", 4000),
      }
    );
  }

  function unmarkEntry(entryId: string, timingLabel: string) {
    if (!effectiveSignedIn && !isGuest) {
      openAccount();
      return;
    }

    clearUndo();

    if (isGuest) {
      guestUncompleteEntry(entryId);
      showToast(`${timingLabel} içeriği okunmadı olarak güncellendi.`, "success", 3500);
      return;
    }

    if (isPending) return;
    progressMutation.mutate(
      { kind: "completion", entryId, completed: false },
      {
        onSuccess: () =>
          showToast(`${timingLabel} içeriği okunmadı olarak güncellendi.`, "success"),
        onError: (error) => showToast(error.message, "error", 4000),
      }
    );
  }

  function handleUndo() {
    if (!undoState) return;
    const { entryId, timingLabel } = undoState;
    unmarkEntry(entryId, timingLabel);
  }

  const genderSelector = (
    <GenderSelector
      currentGender={activeGender}
      onGenderChange={handleGenderChange}
      onSelectGuest={handleSelectGuestGender}
      onOpenAccount={openAccount}
      isSignedIn={effectiveSignedIn}
      isGuest={isGuest}
      isPending={isGenderUpdating || isPending}
    />
  );

  return (
    <div
      className={`archive-layout${weeklyView ? "archive-layout--weekly" : ""}`}
      aria-label="Müfredat akışı"
    >
      <CurriculumArchiveNav
        selectedGrade={selectedGrade}
        activeCategoryId={(!weeklyView && activeHistoryCategoryId) || activeCategoryId}
        onGradeChange={(grade) => {
          setSelectedGrade(grade);
          onGradeChange?.(grade);
        }}
        onSelectCategory={selectCategory}
      />

      {/* Eğer bir kategori geçmişi seçildiyse bağımsız Özel Geçmiş Alanı gösterilir */}
      {isGradeLoading || gradeLoadError ? (
        <div className="archive-main-column" role="status" aria-live="polite">
          <div className="archive-history-empty">
            <p>{gradeLoadError ?? "Müfredat yükleniyor…"}</p>
            {gradeLoadError && onRetryGrade && (
              <button type="button" className="primary-button min-h-[44px]" onClick={onRetryGrade}>
                Tekrar dene
              </button>
            )}
          </div>
        </div>
      ) : weeklyView ? (
        weeklyView(activeGender, genderSelector)
      ) : activeHistoryCategory ? (
        <CurriculumArchiveHistory
          key={activeHistoryCategory.id === "ilmihal" ? activeGender : activeHistoryCategory.id}
          category={activeHistoryCategory}
          entries={getCategoryEntries(
            activeHistoryCategory.id,
            currentGradeEntries,
            selectedGrade,
            activeGender
          )}
          completedIds={completedSet}
          activeGender={activeGender}
          genderSelector={genderSelector}
          pendingEntryId={pendingEntryId}
          expandedEntryId={expandedReadingEntryId}
          setExpandedEntryId={setExpandedReadingEntryId}
          onClose={closeHistoryView}
          onUndo={unmarkEntry}
        />
      ) : (
        /* Tüm kategoriler doğal sayfa akışında alt alta yer alır. */
        <div className="archive-main-column">
          {curriculumCategories.map((category, index) => (
            <Fragment key={category.id}>
              {index > 0 && (
                <div className="archive-category-separator" role="separator" aria-hidden="true">
                  <div className="archive-category-divider-line" />
                </div>
              )}
              <CurriculumArchiveTrack
                category={category}
                entries={getCategoryEntries(
                  category.id,
                  currentGradeEntries,
                  selectedGrade,
                  activeGender
                )}
                completedIds={completedSet}
                selectedCompletedIndex={selectedCompletedIndexes[category.id] ?? 0}
                selectCompletedIndex={(index) =>
                  setSelectedCompletedIndexes((previous) => ({ ...previous, [category.id]: index }))
                }
                expandedReadingEntryId={expandedReadingEntryId}
                setExpandedReadingEntryId={setExpandedReadingEntryId}
                pendingEntryId={pendingEntryId}
                isPending={isPending}
                shakingEntryId={shakingEntryId}
                genderSelector={genderSelector}
                undo={
                  undoState?.categoryId === category.id
                    ? {
                        timingLabel: undoState.timingLabel,
                        secondsLeft: undoSecondsLeft,
                        onUndo: handleUndo,
                      }
                    : undefined
                }
                openHistoryView={() => openHistoryView(category.id)}
                completeEntry={(id, timing) => completeEntry(id, timing, category.id)}
                notifyLocked={notifyLocked}
              />
            </Fragment>
          ))}
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
