import { queryOptions } from "@tanstack/react-query";
import type { CurriculumEntry } from "@/lib/curriculum";

export async function fetchCurriculumGrade(grade: number): Promise<CurriculumEntry[]> {
  const response = await fetch(`/api/curriculum?sinif=${grade}`);
  if (!response.ok) {
    throw new Error("Müfredat yüklenemedi.");
  }
  return response.json();
}

export function curriculumGradeQueryOptions(grade: number) {
  return queryOptions({
    queryKey: ["curriculum", grade],
    queryFn: () => fetchCurriculumGrade(grade),
    staleTime: 5 * 60 * 1000,
  });
}

export interface CurriculumProgressData {
  isSignedIn: boolean;
  completedEntryIds: string[];
  gender: "erkek" | "bayan" | null;
}

export async function fetchCurriculumProgress(): Promise<CurriculumProgressData> {
  const response = await fetch("/api/curriculum/progress");
  if (!response.ok) {
    throw new Error("İlerleme bilgisi yüklenemedi.");
  }
  return response.json();
}

export function curriculumProgressQueryOptions() {
  return queryOptions({
    queryKey: ["curriculum-progress"],
    queryFn: fetchCurriculumProgress,
    staleTime: 30 * 1000,
  });
}
