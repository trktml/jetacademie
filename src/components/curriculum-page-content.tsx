"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CurriculumArchive } from "@/components/curriculum-archive";
import {
  type CurriculumEntry,
  type CurriculumCategoryId,
  type BelgiumGrade,
} from "@/lib/curriculum";
import { isValidGrade, useCurriculumStore } from "@/store/use-curriculum-store";
import { curriculumGradeQueryOptions } from "@/lib/queries/curriculum";

import { CurriculumWeeklyView } from "./curriculum-weekly-view";
import { CurriculumTopBar } from "./curriculum-top-bar";
import {
  availablePeriods,
  initialWeeklyPeriod,
  isCurriculumPeriod,
  readCurriculumView,
  visibleCurriculumEntries,
  writeCurriculumView,
  type CurriculumPeriod,
  type CurriculumView,
} from "@/lib/curriculum-view";

interface CurriculumPageContentProps {
  initialCompletedEntryIds: string[];
  isSignedIn: boolean;
  initialGender: "erkek" | "bayan" | null;
  allEntries: readonly CurriculumEntry[];
  initialGrade: number;
}

export function CurriculumPageContent({
  initialCompletedEntryIds,
  isSignedIn,
  initialGender,
  allEntries,
  initialGrade,
}: CurriculumPageContentProps) {
  const [selectedGrade, setSelectedGrade] = useState<BelgiumGrade>(initialGrade as BelgiumGrade);
  const setStoreGrade = useCurriculumStore((state) => state.setSelectedGrade);

  const query = useQuery({
    ...curriculumGradeQueryOptions(selectedGrade),
    initialData: selectedGrade === initialGrade ? [...allEntries] : undefined,
  });

  const [view, setView] = useState<CurriculumView>("sequential");
  const [period, setPeriod] = useState<CurriculumPeriod | null>(null);
  const [initialized, setInitialized] = useState(false);
  const context = useRef<{
    category: CurriculumCategoryId;
    gender: "erkek" | "bayan";
    completedIds: string[];
  }>({
    category: "konu",
    gender: initialGender ?? "erkek",
    completedIds: initialCompletedEntryIds,
  });
  const [activeGender, setActiveGender] = useState<"erkek" | "bayan">(initialGender ?? "erkek");
  const sequentialCategory = useRef<CurriculumCategoryId>("konu");
  const onActiveContext = useCallback(
    (category: CurriculumCategoryId, gender: "erkek" | "bayan", completedIds: string[]) => {
      context.current = { category, gender, completedIds };
      setActiveGender(gender);
    },
    []
  );

  const rememberPeriod = useCallback(
    (next: CurriculumPeriod) => {
      setPeriod(next);
      useCurriculumStore.getState().setWeeklyPeriod(selectedGrade, next);
    },
    [selectedGrade]
  );

  useEffect(() => {
    function sync() {
      const url = new URL(window.location.href);
      const gradeParam = Number(url.searchParams.get("sinif"));
      const grade = isValidGrade(gradeParam) ? gradeParam : (initialGrade as BelgiumGrade);
      const state = useCurriculumStore.getState();
      const parsed = readCurriculumView(url.searchParams);
      const nextView = parsed.view ?? (state.view === "weekly" ? "weekly" : "sequential");
      setSelectedGrade(grade);
      setStoreGrade(grade);
      setView(nextView);
      state.setView(nextView);
      const remembered = state.weeklyPeriods?.[grade];
      setPeriod(parsed.period ?? (isCurriculumPeriod(remembered) ? remembered : null));
      setInitialized(true);
    }
    sync();
    window.addEventListener("popstate", sync);
    const unsubscribe = useCurriculumStore.persist.onFinishHydration(sync);
    return () => {
      window.removeEventListener("popstate", sync);
      unsubscribe();
    };
  }, [initialGrade, setStoreGrade]);

  useEffect(() => {
    if (!initialized || view !== "weekly" || !query.data) return;
    const entries = visibleCurriculumEntries(query.data, selectedGrade, activeGender);
    const periods = availablePeriods(entries);
    const exists =
      period &&
      periods.some((p) =>
        period.extra !== undefined
          ? p.extra === period.extra
          : p.extra === undefined && p.year === period.year && p.month === period.month
      );
    const next = exists
      ? period
      : period
        ? (periods[0] ?? null)
        : initialWeeklyPeriod(
            query.data,
            context.current.category,
            context.current.completedIds,
            selectedGrade,
            activeGender
          );
    if (next) {
      rememberPeriod(next);
      const url = writeCurriculumView(new URL(window.location.href), "weekly", next);
      window.history.replaceState(null, "", url.toString());
    }
  }, [initialized, view, query.data, selectedGrade, activeGender, period, rememberPeriod]);

  function changeView(nextView: CurriculumView) {
    const state = useCurriculumStore.getState();
    const remembered = state.weeklyPeriods?.[selectedGrade];
    const nextPeriod =
      (isCurriculumPeriod(remembered) ? remembered : null) ??
      initialWeeklyPeriod(
        query.data ?? [],
        context.current.category,
        context.current.completedIds,
        selectedGrade,
        context.current.gender
      );
    if (nextView === "weekly") sequentialCategory.current = context.current.category;
    setView(nextView);
    state.setView(nextView);
    setPeriod(nextPeriod);
    const url = writeCurriculumView(new URL(window.location.href), nextView, nextPeriod);
    url.hash = nextView === "weekly" ? "" : sequentialCategory.current;
    window.history.pushState(null, "", url.toString());
  }

  function changePeriod(next: CurriculumPeriod) {
    rememberPeriod(next);
    const url = writeCurriculumView(new URL(window.location.href), "weekly", next);
    url.hash = "";
    window.history.pushState(null, "", url.toString());
  }

  const handleSelectGrade = useCallback(
    (grade: BelgiumGrade) => {
      if (grade === selectedGrade) return;
      setSelectedGrade(grade);
      setStoreGrade(grade);

      if (typeof window !== "undefined") {
        const url = new URL(window.location.href);
        url.searchParams.set("sinif", String(grade));
        window.history.pushState(null, "", url.toString());
      }
    },
    [selectedGrade, setStoreGrade]
  );

  const availablePeriodsList = query.data
    ? availablePeriods(visibleCurriculumEntries(query.data, selectedGrade, activeGender))
    : [];

  return (
    <>
      <CurriculumTopBar
        selectedGrade={selectedGrade}
        onGradeChange={handleSelectGrade}
        view={view}
        onViewChange={changeView}
        period={period}
        onPeriodChange={changePeriod}
        availablePeriods={availablePeriodsList}
      />
      {initialized ? (
        <CurriculumArchive
          initialCompletedEntryIds={initialCompletedEntryIds}
          isSignedIn={isSignedIn}
          initialGender={initialGender}
          allEntries={query.data ?? []}
          initialGrade={initialGrade}
          selectedGradeOverride={selectedGrade}
          onGradeChange={handleSelectGrade}
          isGradeLoading={query.isPending}
          gradeLoadError={query.isError ? query.error.message : null}
          onRetryGrade={() => void query.refetch()}
          onActiveContext={onActiveContext}
          weeklyView={
            view === "weekly"
              ? (gender, genderSelector) => (
                  <CurriculumWeeklyView
                    entries={visibleCurriculumEntries(query.data ?? [], selectedGrade, gender)}
                    period={period}
                    onPeriodChange={changePeriod}
                    genderSelector={genderSelector}
                  />
                )
              : undefined
          }
        />
      ) : (
        <p className="weekly-empty" role="status">
          Müfredat yükleniyor…
        </p>
      )}
    </>
  );
}
