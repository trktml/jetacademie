import {
  curriculumCategoryIds,
  getCategoryEntries,
  type CurriculumCategoryId,
  type CurriculumEntry,
} from "./curriculum";

export type CurriculumView = "sequential" | "weekly";
export type CurriculumPeriod =
  | { month: number; week: number; year?: number; extra?: never }
  | { extra: number; year?: never; month?: never; week?: never };
export const curriculumMonthNames = [
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

export const academicMonthOrder = [9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8] as const;

export function getWeekDateRange(
  monthOrYear: number,
  weekOrMonth: number,
  optionalWeek?: number
): string {
  const month = optionalWeek !== undefined ? weekOrMonth : monthOrYear;
  const week = optionalWeek !== undefined ? optionalWeek : weekOrMonth;
  const monthName = curriculumMonthNames[month - 1] ?? "";
  const ranges: Record<number, string> = {
    1: `1 – 7 ${monthName}`,
    2: `8 – 14 ${monthName}`,
    3: `15 – 21 ${monthName}`,
    4: `22 – 28 ${monthName}`,
  };
  return ranges[week] ?? `${week}. Hafta`;
}

export function formatPeriodLabel(period: CurriculumPeriod | null): string {
  if (!period) return "Dönem Seçin";
  if (period.extra !== undefined) return `Ekstra ${period.extra}`;
  const monthName = curriculumMonthNames[period.month - 1] ?? "";
  return `${monthName} · ${period.week}. Hafta`;
}

export function isCurriculumPeriod(value: unknown): value is CurriculumPeriod {
  if (!value || typeof value !== "object") return false;
  const p = value as CurriculumPeriod;
  if (p.extra !== undefined) return Number.isInteger(p.extra) && p.extra > 0;
  return (
    Number.isInteger(p.month) &&
    p.month >= 1 &&
    p.month <= 12 &&
    Number.isInteger(p.week) &&
    p.week >= 1 &&
    p.week <= 4
  );
}
export function periodOf(entry: CurriculumEntry): CurriculumPeriod {
  return entry.isExtra
    ? { extra: entry.extraOrder ?? 1 }
    : { month: entry.month, week: entry.week };
}
export function samePeriod(a: CurriculumPeriod, b: CurriculumPeriod) {
  return a.extra !== undefined || b.extra !== undefined
    ? a.extra === b.extra
    : a.month === b.month && a.week === b.week;
}
export function visibleCurriculumEntries(
  entries: readonly CurriculumEntry[],
  grade: number,
  gender: "erkek" | "bayan"
) {
  return entries.filter(
    (e) => !e.isDraft && (e.grade ?? 1) === grade && (!e.gender || e.gender === gender)
  );
}
export function availablePeriods(entries: readonly CurriculumEntry[]): CurriculumPeriod[] {
  const periods = entries.map(periodOf).filter(isCurriculumPeriod);
  return periods
    .filter((p, i) => periods.findIndex((other) => samePeriod(p, other)) === i)
    .sort((a, b) => {
      if (a.extra !== undefined) return b.extra !== undefined ? a.extra - b.extra : 1;
      if (b.extra !== undefined) return -1;
      const orderA = a.month >= 9 ? a.month - 9 : a.month + 3;
      const orderB = b.month >= 9 ? b.month - 9 : b.month + 3;
      return orderA - orderB || a.week - b.week;
    });
}
export function initialWeeklyPeriod(
  entries: readonly CurriculumEntry[],
  category: CurriculumCategoryId,
  completedIds: readonly string[],
  grade: number,
  gender: "erkek" | "bayan"
): CurriculumPeriod | null {
  const visible = visibleCurriculumEntries(entries, grade, gender);
  const periods = availablePeriods(visible);
  const categoryEntries = getCategoryEntries(category, visible, grade, gender);
  const next = categoryEntries.find((e) => !completedIds.includes(e.id));
  if (next && !next.isExtra) return periodOf(next);
  if (next?.isExtra)
    return periods.filter((p) => p.extra === undefined).at(-1) ?? periods[0] ?? null;
  return periods[0] ?? null;
}
export function weeklyGroups(entries: readonly CurriculumEntry[], period: CurriculumPeriod) {
  return curriculumCategoryIds.map((categoryId) => ({
    categoryId,
    entries: entries.filter(
      (e) => e.categoryId === categoryId && !e.isDraft && samePeriod(periodOf(e), period)
    ),
  }));
}
export function readCurriculumView(params: URLSearchParams): {
  view: CurriculumView | null;
  period: CurriculumPeriod | null;
} {
  const view =
    params.get("gorunum") === "haftalik"
      ? "weekly"
      : params.get("gorunum") === "sirali" || params.has("gecmis")
        ? "sequential"
        : null;
  const period = params.has("ekstra")
    ? { extra: Number(params.get("ekstra")) }
    : {
        month: Number(params.get("ay")),
        week: Number(params.get("hafta")),
      };
  return { view, period: isCurriculumPeriod(period) ? period : null };
}
export function writeCurriculumView(
  url: URL,
  view: CurriculumView,
  period: CurriculumPeriod | null
) {
  for (const key of ["yil", "ay", "hafta", "ekstra", "gecmis"]) url.searchParams.delete(key);
  url.searchParams.set("gorunum", view === "weekly" ? "haftalik" : "sirali");
  if (view === "weekly" && period) {
    if (period.extra !== undefined) url.searchParams.set("ekstra", String(period.extra));
    else {
      url.searchParams.set("ay", String(period.month));
      url.searchParams.set("hafta", String(period.week));
    }
  }
  return url;
}
