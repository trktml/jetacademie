import { z } from "zod";
import { requestJson } from "@/lib/client-http";
import {
  curriculumEntryResponseSchema,
  curriculumProgressResponseSchema,
} from "@/lib/validations/curriculum-response";
import { queryOptions } from "@tanstack/react-query";
import type { CurriculumEntry } from "@/lib/curriculum";

export async function fetchCurriculumGrade(
  grade: number,
  signal?: AbortSignal
): Promise<CurriculumEntry[]> {
  return requestJson(
    `/api/curriculum?sinif=${grade}`,
    z.array(curriculumEntryResponseSchema),
    { signal },
    "Müfredat yüklenemedi."
  );
}

export function curriculumGradeQueryOptions(grade: number) {
  return queryOptions({
    queryKey: ["curriculum", grade],
    queryFn: ({ signal }) => fetchCurriculumGrade(grade, signal),
    staleTime: 5 * 60 * 1000,
  });
}

export type CurriculumProgressData = z.infer<typeof curriculumProgressResponseSchema>;

export async function fetchCurriculumProgress(
  expectedUserId?: string | null,
  signal?: AbortSignal
): Promise<CurriculumProgressData> {
  const data = await requestJson(
    "/api/curriculum/progress",
    curriculumProgressResponseSchema,
    { signal },
    "İlerleme bilgisi yüklenemedi."
  );
  if (expectedUserId !== undefined && data.userId !== expectedUserId)
    throw new Error("Oturum değişti. İlerleme yeniden yüklenecek.");
  return data;
}

export const curriculumProgressKey = (userId: string | null = null) =>
  ["curriculum-progress", userId] as const;

export function curriculumProgressQueryOptions(userId: string | null = null) {
  return queryOptions({
    queryKey: curriculumProgressKey(userId),
    queryFn: ({ signal }) => fetchCurriculumProgress(userId, signal),
    staleTime: 30 * 1000,
  });
}
