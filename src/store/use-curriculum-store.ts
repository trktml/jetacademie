import { create } from "zustand";
import { persist } from "zustand/middleware";
import { BELGIUM_GRADES, type BelgiumGrade } from "@/lib/curriculum";

interface CurriculumState {
  selectedGrade: BelgiumGrade;
  hasSelectedGrade: boolean;
  setSelectedGrade: (grade: BelgiumGrade) => void;
}

export function isValidGrade(val: unknown): val is BelgiumGrade {
  return typeof val === "number" && (BELGIUM_GRADES as readonly number[]).includes(val);
}

export function getRememberedCurriculumGrade(
  state: Pick<CurriculumState, "selectedGrade" | "hasSelectedGrade">
): BelgiumGrade | null {
  return state.hasSelectedGrade && isValidGrade(state.selectedGrade) ? state.selectedGrade : null;
}

export function migrateCurriculumGradeState(persistedState: unknown, version: number) {
  const state =
    persistedState && typeof persistedState === "object"
      ? (persistedState as Partial<CurriculumState>)
      : {};
  if (version >= 1) return state;

  return {
    ...state,
    selectedGrade: isValidGrade(state.selectedGrade) ? state.selectedGrade : 1,
    hasSelectedGrade: isValidGrade(state.selectedGrade),
  };
}

export const useCurriculumStore = create<CurriculumState>()(
  persist(
    (set) => ({
      selectedGrade: 1,
      hasSelectedGrade: false,
      setSelectedGrade: (grade: BelgiumGrade) => {
        if (isValidGrade(grade)) {
          set({ selectedGrade: grade, hasSelectedGrade: true });
        }
      },
    }),
    {
      name: "jetacademie-curriculum-grade",
      version: 1,
      migrate: migrateCurriculumGradeState,
    }
  )
);
