"use client";

import { useCallback, useEffect, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { CurriculumArchive } from "@/components/curriculum-archive";
import {
  BELGIUM_GRADES,
  GRADE_LABELS,
  type CurriculumEntry,
  type BelgiumGrade,
} from "@/lib/curriculum";
import { isValidGrade, useCurriculumStore } from "@/store/use-curriculum-store";
import { curriculumGradeQueryOptions } from "@/lib/queries/curriculum";

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
    placeholderData: keepPreviousData,
  });

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

  // Browser back/forward navigation sync
  useEffect(() => {
    function handlePopState() {
      if (typeof window === "undefined") return;
      const url = new URL(window.location.href);
      const param = url.searchParams.get("sinif");
      if (param) {
        const num = parseInt(param, 10);
        if (isValidGrade(num) && num !== selectedGrade) {
          setSelectedGrade(num);
          setStoreGrade(num);
        }
      }
    }

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [selectedGrade, setStoreGrade]);

  // Keyboard navigation for tablist
  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const currentIndex = BELGIUM_GRADES.indexOf(selectedGrade);
    const nextIndex =
      event.key === "ArrowRight"
        ? (currentIndex + 1) % BELGIUM_GRADES.length
        : (currentIndex - 1 + BELGIUM_GRADES.length) % BELGIUM_GRADES.length;
    handleSelectGrade(BELGIUM_GRADES[nextIndex]);
  }

  return (
    <>
      <nav className="curriculum-grade-nav" aria-label="Sınıf Seçimi">
        <h1 className="sr-only">{GRADE_LABELS[selectedGrade]} Müfredatı</h1>
        <div
          className="curriculum-grade-nav__track"
          role="tablist"
          aria-label="Belçika müfredat sınıfları"
          onKeyDown={handleKeyDown}
        >
          {BELGIUM_GRADES.map((grade) => {
            const isSelected = grade === selectedGrade;
            return (
              <button
                key={grade}
                type="button"
                role="tab"
                aria-selected={isSelected}
                tabIndex={isSelected ? 0 : -1}
                className={`curriculum-grade-nav__item ${isSelected ? "curriculum-grade-nav__item--active" : ""}`}
                onClick={() => handleSelectGrade(grade)}
              >
                <span>{GRADE_LABELS[grade]}</span>
              </button>
            );
          })}
        </div>
      </nav>
      <CurriculumArchive
        initialCompletedEntryIds={initialCompletedEntryIds}
        isSignedIn={isSignedIn}
        initialGender={initialGender}
        allEntries={query.data ?? []}
        initialGrade={initialGrade}
        selectedGradeOverride={selectedGrade}
        onGradeChange={handleSelectGrade}
        isGradeLoading={query.isPending && !query.data}
        gradeLoadError={query.isError ? query.error.message : null}
        onRetryGrade={() => void query.refetch()}
      />
    </>
  );
}
