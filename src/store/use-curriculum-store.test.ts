import { beforeEach, describe, expect, it } from "bun:test";
import {
  getRememberedCurriculumGrade,
  isValidGrade,
  migrateCurriculumGradeState,
  useCurriculumStore,
} from "./use-curriculum-store";

describe("useCurriculumStore", () => {
  beforeEach(() => {
    useCurriculumStore.setState({ selectedGrade: 1, hasSelectedGrade: false });
  });

  it("does not treat the default 1st grade as a user selection", () => {
    expect(useCurriculumStore.getState().selectedGrade).toBe(1);
    expect(getRememberedCurriculumGrade(useCurriculumStore.getState())).toBeNull();
  });

  it("updates selected grade when valid grade is provided", () => {
    useCurriculumStore.getState().setSelectedGrade(3);
    expect(useCurriculumStore.getState().selectedGrade).toBe(3);
    expect(getRememberedCurriculumGrade(useCurriculumStore.getState())).toBe(3);

    useCurriculumStore.getState().setSelectedGrade(6);
    expect(useCurriculumStore.getState().selectedGrade).toBe(6);

    // Reset back to 1
    useCurriculumStore.getState().setSelectedGrade(1);
    expect(useCurriculumStore.getState().selectedGrade).toBe(1);
    expect(getRememberedCurriculumGrade(useCurriculumStore.getState())).toBe(1);
  });

  it("remembers a valid class from the previous browser storage format", () => {
    expect(migrateCurriculumGradeState({ selectedGrade: 4 }, 0)).toEqual({
      selectedGrade: 4,
      hasSelectedGrade: true,
    });
    expect(migrateCurriculumGradeState({ selectedGrade: 99 }, 0)).toEqual({
      selectedGrade: 1,
      hasSelectedGrade: false,
    });
  });

  it("remembers weekly periods independently for each grade", () => {
    const original = useCurriculumStore.getState();
    try {
      original.setView("weekly");
      original.setWeeklyPeriod(1, { year: 2026, month: 9, week: 2 });
      original.setWeeklyPeriod(2, { extra: 3 });
      expect(useCurriculumStore.getState().view).toBe("weekly");
      expect(useCurriculumStore.getState().weeklyPeriods[1]).toEqual({
        year: 2026,
        month: 9,
        week: 2,
      });
      expect(useCurriculumStore.getState().weeklyPeriods[2]).toEqual({ extra: 3 });
      original.setWeeklyPeriod(1, { year: 2026, month: 13, week: 1 });
      expect(useCurriculumStore.getState().weeklyPeriods[1]).toEqual({
        year: 2026,
        month: 9,
        week: 2,
      });
    } finally {
      useCurriculumStore.setState({ view: original.view, weeklyPeriods: original.weeklyPeriods });
    }
  });

  it("validates grades accurately with isValidGrade", () => {
    expect(isValidGrade(1)).toBe(true);
    expect(isValidGrade(6)).toBe(true);
    expect(isValidGrade(0)).toBe(false);
    expect(isValidGrade(7)).toBe(false);
    expect(isValidGrade("1")).toBe(false);
    expect(isValidGrade(null)).toBe(false);
  });
});
