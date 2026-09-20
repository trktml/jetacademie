import { beforeEach, describe, expect, it } from "bun:test";
import { isValidGrade, useCurriculumStore } from "./use-curriculum-store";

describe("useCurriculumStore", () => {
  beforeEach(() => {
    useCurriculumStore.getState().setSelectedGrade(1);
  });

  it("initializes with 1st grade by default", () => {
    expect(useCurriculumStore.getState().selectedGrade).toBe(1);
  });

  it("updates selected grade when valid grade is provided", () => {
    useCurriculumStore.getState().setSelectedGrade(3);
    expect(useCurriculumStore.getState().selectedGrade).toBe(3);

    useCurriculumStore.getState().setSelectedGrade(6);
    expect(useCurriculumStore.getState().selectedGrade).toBe(6);

    // Reset back to 1
    useCurriculumStore.getState().setSelectedGrade(1);
    expect(useCurriculumStore.getState().selectedGrade).toBe(1);
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
