import { describe, expect, it } from "bun:test";
import type { CurriculumEntry } from "./curriculum";
import {
  availablePeriods,
  formatPeriodLabel,
  getWeekDateRange,
  initialWeeklyPeriod,
  isCurriculumPeriod,
  readCurriculumView,
  samePeriod,
  visibleCurriculumEntries,
  weeklyGroups,
  writeCurriculumView,
} from "./curriculum-view";
const entry = (overrides: Partial<CurriculumEntry> = {}): CurriculumEntry => ({
  id: "topic",
  grade: 1,
  categoryId: "konu",
  year: 2026,
  month: 9,
  week: 2,
  title: "Ders",
  body: "Metin",
  ...overrides,
});

describe("weekly curriculum browsing", () => {
  it("groups by year, month and week without requiring previous completion", () => {
    const entries = [
      entry(),
      entry({ id: "talk", categoryId: "hocaefendi-dinleme" }),
      entry({ id: "other-year", year: 2027 }),
      entry({ id: "draft", isDraft: true }),
    ];
    const groups = weeklyGroups(entries, { year: 2026, month: 9, week: 2 });
    expect(groups).toHaveLength(5);
    expect(groups[0].entries.map((e) => e.id)).toEqual(["topic"]);
    expect(groups[1].entries.map((e) => e.id)).toEqual(["talk"]);
    expect(groups[2].entries).toEqual([]);
    expect(entries).toHaveLength(4);
  });
  it("filters drafts, other grades and inactive gender", () => {
    expect(
      visibleCurriculumEntries(
        [
          entry(),
          entry({ id: "bayan", categoryId: "ilmihal", gender: "bayan" }),
          entry({ id: "erkek", gender: "erkek", categoryId: "ilmihal" }),
          entry({ id: "other", grade: 2 }),
          entry({ id: "draft", isDraft: true }),
        ],
        1,
        "bayan"
      ).map((e) => e.id)
    ).toEqual(["topic", "bayan"]);
  });
  it("orders academic periods across the year boundary and extras afterward", () => {
    expect(
      availablePeriods([
        entry({ year: 2027, month: 1 }),
        entry({ month: 12 }),
        entry(),
        entry(),
        entry({ isExtra: true, extraOrder: 2 }),
        entry({ isExtra: true, extraOrder: 1 }),
      ])
    ).toEqual([
      { year: 2026, month: 9, week: 2 },
      { year: 2026, month: 12, week: 2 },
      { year: 2027, month: 1, week: 2 },
      { extra: 1 },
      { extra: 2 },
    ]);
  });
  it("keeps extras separate from their stored August date", () => {
    expect(samePeriod({ extra: 1 }, { year: 2027, month: 8, week: 4 })).toBe(false);
    expect(
      weeklyGroups([entry({ id: "extra", isExtra: true, extraOrder: 1 }), entry()], {
        extra: 1,
      })[0].entries.map((e) => e.id)
    ).toEqual(["extra"]);
  });
  it("opens the active category's next unread week, then last standard period for extras", () => {
    const entries = [
      entry({ id: "first", week: 1 }),
      entry({ id: "second", week: 2 }),
      entry({ id: "extra", isExtra: true, extraOrder: 1 }),
    ];
    expect(initialWeeklyPeriod(entries, "konu", ["first"], 1, "erkek")).toEqual({
      year: 2026,
      month: 9,
      week: 2,
    });
    expect(initialWeeklyPeriod(entries, "konu", ["first", "second"], 1, "erkek")).toEqual({
      year: 2026,
      month: 9,
      week: 2,
    });
    expect(initialWeeklyPeriod(entries, "esma", [], 1, "erkek")).toEqual({
      year: 2026,
      month: 9,
      week: 1,
    });
    expect(initialWeeklyPeriod([], "konu", [], 1, "erkek")).toBeNull();
  });
  it("round-trips shareable URLs and clears history or stale period parameters", () => {
    const url = new URL("https://example.test/mufredat?sinif=2&gecmis=konu&ekstra=3#esma");
    writeCurriculumView(url, "weekly", { year: 2026, month: 9, week: 2 });
    expect(url.searchParams.get("sinif")).toBe("2");
    expect(url.searchParams.has("gecmis")).toBe(false);
    expect(url.searchParams.has("ekstra")).toBe(false);
    expect(readCurriculumView(url.searchParams)).toEqual({
      view: "weekly",
      period: { year: 2026, month: 9, week: 2 },
    });
    writeCurriculumView(url, "weekly", { extra: 4 });
    expect(readCurriculumView(url.searchParams)).toEqual({ view: "weekly", period: { extra: 4 } });
    expect(url.searchParams.has("ay")).toBe(false);
    writeCurriculumView(url, "sequential", null);
    expect(readCurriculumView(url.searchParams)).toEqual({ view: "sequential", period: null });
  });
  it("rejects invalid periods and gives explicit history its sequential view", () => {
    for (const value of [
      null,
      {},
      { extra: 0 },
      { extra: 1.5 },
      { year: 2026, month: 13, week: 1 },
      { year: 2026, month: 9, week: 5 },
    ])
      expect(isCurriculumPeriod(value)).toBe(false);
    expect(readCurriculumView(new URLSearchParams("gorunum=haftalik&ay=9&hafta=2"))).toEqual({
      view: "weekly",
      period: null,
    });
    expect(readCurriculumView(new URLSearchParams("gecmis=konu")).view).toBe("sequential");
  });

  it("calculates week date ranges matching the standard calendar layout", () => {
    // September 2026: 1st is Tuesday, 6th is Sunday
    expect(getWeekDateRange(2026, 9, 1)).toBe("1 – 6 Eylül 2026");
    expect(getWeekDateRange(2026, 9, 2)).toBe("7 – 13 Eylül 2026");
    expect(getWeekDateRange(2026, 9, 3)).toBe("14 – 20 Eylül 2026");
    expect(getWeekDateRange(2026, 9, 4)).toBe("21 – 27 Eylül 2026");

    // October 2026: 1st is Thursday, 4th is Sunday
    expect(getWeekDateRange(2026, 10, 1)).toBe("1 – 4 Ekim 2026");
    expect(getWeekDateRange(2026, 10, 2)).toBe("5 – 11 Ekim 2026");

    // February 2026: 1st is Sunday
    expect(getWeekDateRange(2026, 2, 1)).toBe("1 – 1 Şubat 2026");
    expect(getWeekDateRange(2026, 2, 2)).toBe("2 – 8 Şubat 2026");
  });

  it("formats user-facing period labels for standard weeks and extras", () => {
    expect(formatPeriodLabel({ year: 2026, month: 9, week: 1 })).toBe("Eylül 2026 · 1. Hafta");
    expect(formatPeriodLabel({ extra: 3 })).toBe("Ekstra 3");
    expect(formatPeriodLabel(null)).toBe("Dönem Seçin");
  });
});
