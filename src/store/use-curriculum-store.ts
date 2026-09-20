import { create } from "zustand";
import { persist } from "zustand/middleware";
import { BELGIUM_GRADES, type BelgiumGrade } from "@/lib/curriculum";

interface CurriculumState {
  selectedGrade: BelgiumGrade;
  setSelectedGrade: (grade: BelgiumGrade) => void;
}

export function isValidGrade(val: unknown): val is BelgiumGrade {
  return typeof val === "number" && (BELGIUM_GRADES as readonly number[]).includes(val);
}

export const useCurriculumStore = create<CurriculumState>()(
  persist(
    (set) => ({
      selectedGrade: 1,
      setSelectedGrade: (grade: BelgiumGrade) => {
        if (isValidGrade(grade)) {
          set({ selectedGrade: grade });
        }
      },
    }),
    {
      name: "jetacademie-curriculum-grade",
    }
  )
);
