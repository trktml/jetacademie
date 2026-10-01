import type { CurriculumEntry } from "@/lib/curriculum";
import { getAdabEntriesForGrade } from "@/lib/data/adab-curriculum";
import { getEsmaEntriesForGrade } from "@/lib/data/esma-curriculum";
import { getHocaefendiEntriesForGrade } from "@/lib/data/hocaefendi-curriculum";
import { getIlmihalEntriesForGrade } from "@/lib/data/ilmihal-curriculum";
import { getKonuEntriesForGrade } from "@/lib/data/konu-curriculum";

export const curriculumEntries: readonly CurriculumEntry[] = [
  ...getHocaefendiEntriesForGrade(1),
  ...getKonuEntriesForGrade(1),
  ...getIlmihalEntriesForGrade(1, "erkek"),
  ...getIlmihalEntriesForGrade(1, "bayan"),
  ...getAdabEntriesForGrade(1),
  ...getEsmaEntriesForGrade(1),
];
