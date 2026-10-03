"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  Calendar,
  Check,
  ChevronDown,
  ChevronUp,
  GraduationCap,
  ListFilter,
  Monitor,
} from "lucide-react";
import { BELGIUM_GRADES, GRADE_LABELS, type BelgiumGrade } from "@/lib/curriculum";
import {
  academicMonthOrder,
  curriculumMonthNames,
  formatPeriodLabel,
  getWeekDateRange,
  type CurriculumPeriod,
  type CurriculumView,
} from "@/lib/curriculum-view";

interface CurriculumTopBarProps {
  selectedGrade: BelgiumGrade;
  onGradeChange: (grade: BelgiumGrade) => void;
  view: CurriculumView;
  onViewChange: (view: CurriculumView) => void;
  period: CurriculumPeriod | null;
  onPeriodChange: (period: CurriculumPeriod) => void;
  availablePeriods: readonly CurriculumPeriod[];
}

export function CurriculumTopBar({
  selectedGrade,
  onGradeChange,
  view,
  onViewChange,
  period,
  onPeriodChange,
  availablePeriods,
}: CurriculumTopBarProps) {
  const [isGradeOpen, setIsGradeOpen] = useState(false);
  const [isPeriodOpen, setIsPeriodOpen] = useState(false);

  // User override when navigating inside the popover
  const [userNavigatedMonth, setUserNavigatedMonth] = useState<number | null>(null);

  const browsingMonth = userNavigatedMonth ?? period?.month ?? 9;

  const containerRef = useRef<HTMLDivElement>(null);
  const gradeButtonRef = useRef<HTMLButtonElement>(null);
  const periodButtonRef = useRef<HTMLButtonElement>(null);

  const gradeMenuId = useId();
  const periodMenuId = useId();

  function closePeriod() {
    setIsPeriodOpen(false);
    setUserNavigatedMonth(null);
  }

  // Handle outside click & Escape key
  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsGradeOpen(false);
        setIsPeriodOpen(false);
        setUserNavigatedMonth(null);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        if (isGradeOpen) {
          setIsGradeOpen(false);
          gradeButtonRef.current?.focus();
        }
        if (isPeriodOpen) {
          setIsPeriodOpen(false);
          setUserNavigatedMonth(null);
          periodButtonRef.current?.focus();
        }
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isGradeOpen, isPeriodOpen]);

  // Available extras
  const extraPeriods = availablePeriods.filter((p) => p.extra !== undefined);

  // Month select handler
  function handleSelectMonth(monthNumber: number) {
    setUserNavigatedMonth(monthNumber);
    // If the active period is already in this month, keep week; otherwise default to week 1
    const targetWeek = period && period.month === monthNumber ? (period.week ?? 1) : 1;
    onPeriodChange({
      month: monthNumber,
      week: targetWeek,
    });
    if (view !== "weekly") onViewChange("weekly");
  }

  // Week select handler
  function handleSelectWeek(weekNumber: number) {
    onPeriodChange({
      month: browsingMonth,
      week: weekNumber,
    });
    if (view !== "weekly") onViewChange("weekly");
    closePeriod();
    periodButtonRef.current?.focus();
  }

  // Extra select handler
  function handleSelectExtra(extraNumber: number) {
    onPeriodChange({ extra: extraNumber });
    if (view !== "weekly") onViewChange("weekly");
    closePeriod();
    periodButtonRef.current?.focus();
  }

  return (
    <div
      ref={containerRef}
      data-open={isGradeOpen || (view === "weekly" && isPeriodOpen)}
      className={`curriculum-topbar-wrapper relative mx-auto mb-6 w-full ${
        view === "weekly" ? "max-w-4xl" : "max-w-fit"
      } px-2 sm:px-4 ${isGradeOpen || (view === "weekly" && isPeriodOpen) ? "z-60" : "z-25"}`}
    >
      {/* Backdrop overlay on mobile for easier dismiss */}
      {(isGradeOpen || (view === "weekly" && isPeriodOpen)) && (
        <div
          className="fixed inset-0 z-40 bg-black/25 backdrop-blur-[2px] sm:hidden"
          onClick={() => {
            setIsGradeOpen(false);
            closePeriod();
          }}
          aria-hidden="true"
        />
      )}

      {/* Main Floating Island Capsule */}
      <div
        className={`curriculum-topbar-pill relative z-50 flex border border-slate-200/90 bg-white/95 p-1.5 shadow-[0_8px_30px_rgb(0,0,0,0.06)] backdrop-blur-md transition-all sm:rounded-full sm:px-3 sm:py-1.5 dark:border-slate-800 dark:bg-slate-900/95 dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] ${
          view === "weekly"
            ? "flex-col gap-2 rounded-3xl sm:flex-row sm:items-center sm:justify-between sm:gap-1"
            : "flex-row items-center justify-between gap-2 rounded-full sm:justify-center sm:gap-3"
        }`}
      >
        {/* Left Section: Grade Selector Dropdown */}
        <div className="relative flex items-center justify-between gap-2 sm:justify-start sm:gap-0">
          <button
            ref={gradeButtonRef}
            type="button"
            aria-haspopup="listbox"
            aria-expanded={isGradeOpen}
            aria-controls={gradeMenuId}
            aria-label={`Sınıf seçimi: ${GRADE_LABELS[selectedGrade]}`}
            onClick={() => {
              setIsGradeOpen(!isGradeOpen);
              if (isPeriodOpen) closePeriod();
            }}
            className={`flex min-h-[44px] items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-medium transition-all ${
              isGradeOpen
                ? "bg-slate-100 text-slate-900 ring-2 ring-emerald-500/30 dark:bg-slate-800 dark:text-white"
                : "text-slate-700 hover:bg-slate-100/80 dark:text-slate-200 dark:hover:bg-slate-800"
            }`}
          >
            <GraduationCap
              className="h-5 w-5 text-blue-500 transition-transform group-hover:scale-110"
              aria-hidden="true"
            />
            <span className="font-semibold">{GRADE_LABELS[selectedGrade]}</span>
            <ChevronDown
              className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
                isGradeOpen ? "rotate-180 text-slate-700 dark:text-slate-200" : ""
              }`}
              aria-hidden="true"
            />
          </button>

          {/* Grade Dropdown Menu */}
          {isGradeOpen && (
            <div
              id={gradeMenuId}
              role="listbox"
              aria-label="Sınıf Seçenekleri"
              className="absolute top-[calc(100%+0.5rem)] left-0 z-60 w-52 overflow-hidden rounded-2xl border border-slate-200 bg-white p-1.5 shadow-2xl dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="px-2.5 py-1.5 text-xs font-semibold tracking-wider text-slate-400 uppercase dark:text-slate-500">
                Sınıf Seçin
              </div>
              {BELGIUM_GRADES.map((grade) => {
                const isSelected = grade === selectedGrade;
                return (
                  <button
                    key={grade}
                    role="option"
                    aria-selected={isSelected}
                    type="button"
                    onClick={() => {
                      onGradeChange(grade);
                      setIsGradeOpen(false);
                      gradeButtonRef.current?.focus();
                    }}
                    className={`flex min-h-[44px] w-full items-center justify-between rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
                      isSelected
                        ? "bg-emerald-50 font-semibold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300"
                        : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                    }`}
                  >
                    <span>{GRADE_LABELS[grade]}</span>
                    {isSelected && (
                      <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* Mobile Right: View Toggle on same row */}
          <div className="flex items-center gap-1 sm:hidden">
            <div
              className="flex items-center rounded-full bg-slate-100 p-0.5 dark:bg-slate-800"
              role="group"
              aria-label="Görünüm modu seçimi"
            >
              <button
                type="button"
                aria-pressed={view === "sequential"}
                onClick={() => {
                  closePeriod();
                  onViewChange("sequential");
                }}
                className={`flex min-h-[40px] items-center rounded-full px-3 py-1 text-xs font-medium transition-all ${
                  view === "sequential"
                    ? "bg-emerald-100/90 font-semibold text-emerald-900 shadow-xs dark:bg-emerald-800/60 dark:text-emerald-200"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                }`}
              >
                Sıralı
              </button>
              <button
                type="button"
                aria-pressed={view === "weekly"}
                onClick={() => onViewChange("weekly")}
                className={`flex min-h-[40px] items-center rounded-full px-3 py-1 text-xs font-medium transition-all ${
                  view === "weekly"
                    ? "bg-emerald-100/90 font-semibold text-emerald-900 shadow-xs dark:bg-emerald-800/60 dark:text-emerald-200"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                }`}
              >
                Haftalık
              </button>
            </div>
          </div>
        </div>

        {/* Divider (Desktop only) */}
        <div
          className="hidden h-5 w-px bg-slate-200 sm:block dark:bg-slate-700"
          aria-hidden="true"
        />

        {/* Middle Section: Period Picker Button (Only in Weekly view) */}
        {view === "weekly" && (
          <>
            <div className="relative flex-1">
              <button
                ref={periodButtonRef}
                type="button"
                aria-haspopup="dialog"
                aria-expanded={isPeriodOpen}
                aria-controls={periodMenuId}
                aria-label={`Dönem seçimi: ${formatPeriodLabel(period)}`}
                onClick={() => {
                  setIsPeriodOpen(!isPeriodOpen);
                  if (isGradeOpen) setIsGradeOpen(false);
                }}
                className={`flex min-h-[44px] w-full items-center justify-between gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-all sm:justify-center sm:px-4 sm:py-1.5 ${
                  isPeriodOpen
                    ? "border-2 border-emerald-500 bg-emerald-50/40 text-emerald-950 shadow-sm dark:border-emerald-500 dark:bg-emerald-950/30 dark:text-emerald-200"
                    : "border border-slate-200/80 bg-white/70 text-slate-800 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-200 dark:hover:bg-slate-800"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Calendar
                    className="h-4.5 w-4.5 text-emerald-600 dark:text-emerald-400"
                    aria-hidden="true"
                  />
                  <span className="font-semibold tracking-tight">{formatPeriodLabel(period)}</span>
                </div>
                {isPeriodOpen ? (
                  <ChevronUp
                    className="h-4 w-4 text-emerald-600 dark:text-emerald-400"
                    aria-hidden="true"
                  />
                ) : (
                  <ChevronDown
                    className="h-4 w-4 text-slate-400 dark:text-slate-500"
                    aria-hidden="true"
                  />
                )}
              </button>

              {/* 2-Column Period Popover Card */}
              {isPeriodOpen && (
                <div
                  id={periodMenuId}
                  role="dialog"
                  aria-label="Ay ve Hafta Seçimi"
                  className="curriculum-period-popover absolute top-[calc(100%+0.65rem)] left-1/2 z-60 w-[min(94vw,700px)] -translate-x-1/2 overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-4 shadow-[0_20px_50px_rgba(0,0,0,0.18)] sm:p-6 dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-12 sm:gap-5">
                    {/* Left Column: Ay Seçin (Month Grid) */}
                    <div className="sm:col-span-7">
                      {/* Month Header */}
                      <div className="mb-4 flex items-center gap-2 text-slate-900 dark:text-white">
                        <Calendar
                          className="h-5 w-5 text-emerald-600 dark:text-emerald-400"
                          aria-hidden="true"
                        />
                        <h3 className="text-base font-bold">Ay Seçin</h3>
                      </div>

                      {/* 3x4 Month Grid (Academic Order: Eylül -> Ağustos) */}
                      <div className="grid grid-cols-3 gap-2">
                        {academicMonthOrder.map((monthNum) => {
                          const monthName = curriculumMonthNames[monthNum - 1];
                          const isSelected =
                            browsingMonth === monthNum && (!period || period.extra === undefined);

                          return (
                            <button
                              key={monthName}
                              type="button"
                              onClick={() => handleSelectMonth(monthNum)}
                              className={`flex min-h-[44px] items-center justify-between rounded-xl px-2.5 py-2 text-xs font-medium transition-all ${
                                isSelected
                                  ? "bg-emerald-100 font-semibold text-emerald-900 ring-1 ring-emerald-500/40 dark:bg-emerald-950 dark:text-emerald-300"
                                  : "bg-slate-100/80 text-slate-700 hover:bg-slate-200/70 hover:text-slate-900 dark:bg-slate-800/80 dark:text-slate-300 dark:hover:bg-slate-700"
                              }`}
                            >
                              <span className="truncate">{monthName}</span>
                              {isSelected && (
                                <Check className="ml-1 h-3.5 w-3.5 shrink-0 text-emerald-700 dark:text-emerald-400" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Extra Contents Option (if present) */}
                      {extraPeriods.length > 0 && (
                        <div className="mt-4 border-t border-slate-100 pt-3 dark:border-slate-800">
                          <div className="mb-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                            Ekstra İçerikler
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {extraPeriods.map((p) => {
                              const isSelected = period?.extra === p.extra;
                              return (
                                <button
                                  key={`extra-${p.extra}`}
                                  type="button"
                                  onClick={() => handleSelectExtra(p.extra!)}
                                  className={`flex min-h-[40px] items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium transition-all ${
                                    isSelected
                                      ? "bg-emerald-100 font-semibold text-emerald-900 ring-1 ring-emerald-500/40 dark:bg-emerald-950 dark:text-emerald-300"
                                      : "bg-slate-100/80 text-slate-700 hover:bg-slate-200/70 dark:bg-slate-800/80 dark:text-slate-300"
                                  }`}
                                >
                                  <span>Ekstra {p.extra}</span>
                                  {isSelected && (
                                    <Check className="h-3.5 w-3.5 text-emerald-700 dark:text-emerald-400" />
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Vertical Divider (Desktop only) */}
                    <div
                      className="hidden h-full w-px bg-slate-100 sm:col-span-1 sm:block dark:bg-slate-800"
                      aria-hidden="true"
                    />

                    {/* Right Column: Hafta Seçin (Week List) */}
                    <div className="border-t border-slate-100 pt-4 sm:col-span-4 sm:border-t-0 sm:pt-0 dark:border-slate-800">
                      <div className="mb-4">
                        <div className="flex items-center gap-2 text-slate-900 dark:text-white">
                          <ListFilter
                            className="h-5 w-5 text-emerald-600 dark:text-emerald-400"
                            aria-hidden="true"
                          />
                          <h3 className="text-base font-bold">Hafta Seçin</h3>
                        </div>
                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                          {curriculumMonthNames[browsingMonth - 1]} ayı için 4 hafta bulunmaktadır.
                        </p>
                      </div>

                      {/* Week Cards List */}
                      <div className="flex flex-col gap-2">
                        {[1, 2, 3, 4].map((weekNum) => {
                          const isSelected =
                            period?.extra === undefined &&
                            period?.month === browsingMonth &&
                            period?.week === weekNum;
                          const dateRange = getWeekDateRange(browsingMonth, weekNum);

                          return (
                            <button
                              key={weekNum}
                              type="button"
                              onClick={() => handleSelectWeek(weekNum)}
                              className={`group flex min-h-[46px] w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-xs transition-all ${
                                isSelected
                                  ? "bg-emerald-100/90 font-semibold text-emerald-950 ring-1 ring-emerald-500/40 dark:bg-emerald-950/70 dark:text-emerald-200"
                                  : "bg-slate-100/70 text-slate-700 hover:bg-slate-200/70 hover:text-slate-900 dark:bg-slate-800/70 dark:text-slate-300 dark:hover:bg-slate-700"
                              }`}
                            >
                              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                                <span className="font-bold text-slate-900 dark:text-white">
                                  {weekNum}. Hafta
                                </span>
                                <span
                                  className={`text-[11px] ${
                                    isSelected
                                      ? "text-emerald-800 dark:text-emerald-300"
                                      : "text-slate-500 dark:text-slate-400"
                                  }`}
                                >
                                  {dateRange}
                                </span>
                              </div>
                              {isSelected && (
                                <Check className="h-4 w-4 shrink-0 text-emerald-700 dark:text-emerald-400" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Divider (Desktop only) */}
            <div
              className="hidden h-5 w-px bg-slate-200 sm:block dark:bg-slate-700"
              aria-hidden="true"
            />
          </>
        )}

        {/* Right Section: View Mode Switcher (Desktop) */}
        <div className="hidden items-center gap-2 sm:flex">
          <Monitor className="h-4.5 w-4.5 text-slate-600 dark:text-slate-400" aria-hidden="true" />
          <div
            className="flex items-center rounded-full bg-slate-100 p-0.5 dark:bg-slate-800"
            role="group"
            aria-label="Görünüm modu seçimi"
          >
            <button
              type="button"
              aria-pressed={view === "sequential"}
              onClick={() => {
                closePeriod();
                onViewChange("sequential");
              }}
              className={`flex min-h-[38px] items-center rounded-full px-3.5 py-1 text-xs font-medium transition-all ${
                view === "sequential"
                  ? "bg-emerald-100/90 font-semibold text-emerald-900 shadow-xs dark:bg-emerald-800/60 dark:text-emerald-200"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              }`}
            >
              Sıralı
            </button>
            <button
              type="button"
              aria-pressed={view === "weekly"}
              onClick={() => onViewChange("weekly")}
              className={`flex min-h-[38px] items-center rounded-full px-3.5 py-1 text-xs font-medium transition-all ${
                view === "weekly"
                  ? "bg-emerald-100/90 font-semibold text-emerald-900 shadow-xs dark:bg-emerald-800/60 dark:text-emerald-200"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              }`}
            >
              Haftalık
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
