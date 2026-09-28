"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CurriculumArchive } from "@/components/curriculum-archive";
import { GradeSelector } from "@/components/grade-selector";
import { GRADE_LABELS, type CurriculumEntry, type BelgiumGrade } from "@/lib/curriculum";
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
  const query = useQuery({
    ...curriculumGradeQueryOptions(selectedGrade),
    initialData: selectedGrade === initialGrade ? [...allEntries] : undefined,
  });

  return (
    <>
      <div className="curriculum-grade-bar">
        <div>
          <span className="curriculum-grade-bar__eyebrow">Müfredat</span>
          <h1>{GRADE_LABELS[selectedGrade]} Müfredatı</h1>
        </div>
        <GradeSelector labeled value={selectedGrade} onGradeChange={setSelectedGrade} />
      </div>
      <CurriculumArchive
        initialCompletedEntryIds={initialCompletedEntryIds}
        isSignedIn={isSignedIn}
        initialGender={initialGender}
        allEntries={query.data ?? []}
        initialGrade={initialGrade}
        selectedGradeOverride={selectedGrade}
        onGradeChange={setSelectedGrade}
        isGradeLoading={query.isPending}
        gradeLoadError={query.isError ? query.error.message : null}
        onRetryGrade={() => void query.refetch()}
      />
    </>
  );
}
