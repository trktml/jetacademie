import type { CurriculumEntry } from "@/lib/curriculum";
import { getAdabEntriesForGrade } from "@/lib/data/adab-curriculum";
import { getAyetEntriesForGrade } from "@/lib/data/ayet-curriculum";
import { getEfendimizEntriesForGrade } from "@/lib/data/efendimiz-curriculum";
import { getEsmaEntriesForGrade } from "@/lib/data/esma-curriculum";
import { getHadisEntriesForGrade } from "@/lib/data/hadis-curriculum";
import { getHocaefendiEntriesForGrade } from "@/lib/data/hocaefendi-curriculum";
import { getIlmihalEntriesForGrade } from "@/lib/data/ilmihal-curriculum";
import { getKonuEntriesForGrade } from "@/lib/data/konu-curriculum";
import { getSahabeEntriesForGrade } from "@/lib/data/sahabe-curriculum";

export const curriculumEntries: readonly CurriculumEntry[] = [
  ...getAyetEntriesForGrade(1),
  ...getHadisEntriesForGrade(1),
  ...getEfendimizEntriesForGrade(1),
  ...getSahabeEntriesForGrade(1),
  ...getHocaefendiEntriesForGrade(1),
  ...getKonuEntriesForGrade(1),
  ...getIlmihalEntriesForGrade(1, "erkek"),
  ...getIlmihalEntriesForGrade(1, "bayan"),
  ...getAdabEntriesForGrade(1),
  ...getEsmaEntriesForGrade(1),
];
