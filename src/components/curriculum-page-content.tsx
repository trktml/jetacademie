"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CurriculumArchive } from "@/components/curriculum-archive";
import type { CurriculumEntry, BelgiumGrade } from "@/lib/curriculum";
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
  );
}
