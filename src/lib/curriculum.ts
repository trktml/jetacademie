import {
  BookHeart,
  BookOpenText,
  BookMarked,
  FileAudio,
  Gem,
  HandHeart,
  Infinity,
  ScrollText,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import { GoncaGulIcon } from "@/components/icons/gonca-gul-icon";
import { getAdabEntriesForGrade } from "@/lib/data/adab-curriculum";
import { getAyetEntriesForGrade } from "@/lib/data/ayet-curriculum";
import { getEfendimizEntriesForGrade } from "@/lib/data/efendimiz-curriculum";
import { getEsmaEntriesForGrade } from "@/lib/data/esma-curriculum";
import { getHadisEntriesForGrade } from "@/lib/data/hadis-curriculum";
import { getIlmihalEntriesForGrade } from "@/lib/data/ilmihal-curriculum";
import { getSahabeEntriesForGrade } from "@/lib/data/sahabe-curriculum";

export const curriculumCategoryIds = [
  "esma",
  "efendimiz",
  "ayet",
  "hadis",
  "sahabe-kissalari",
  "risale",
  "hocaefendi-dinleme",
  "pirlanta",
  "ilmihal",
  "adab-i-muaseret",
] as const;

export type CurriculumCategoryId = (typeof curriculumCategoryIds)[number];

export interface CurriculumCategory {
  readonly id: CurriculumCategoryId;
  readonly label: string;
  readonly shortLabel: string;
  readonly icon: LucideIcon;
  readonly accent: string;
  readonly resourceType?: "pdf" | "audio";
}

export const curriculumCategories: readonly CurriculumCategory[] = [
  {
    id: "esma",
    label: "Esmâü'l-Hüsnâ",
    shortLabel: "Esmâ",
    icon: Infinity,
    accent: "emerald",
  },
  {
    id: "efendimiz",
    label: "Efendimiz",
    shortLabel: "Efendimiz",
    icon: GoncaGulIcon,
    accent: "blue",
  },
  { id: "ayet", label: "Ayet", shortLabel: "Ayet", icon: BookOpenText, accent: "coral" },
  { id: "hadis", label: "Hadis", shortLabel: "Hadis", icon: ScrollText, accent: "amber" },
  {
    id: "sahabe-kissalari",
    label: "Sahabe kıssaları",
    shortLabel: "Sahabe",
    icon: UsersRound,
    accent: "violet",
  },
  {
    id: "risale",
    label: "Risale",
    shortLabel: "Risale",
    icon: BookMarked,
    accent: "teal",
    resourceType: "pdf",
  },
  {
    id: "hocaefendi-dinleme",
    label: "Hocaefendi dinleme",
    shortLabel: "Dinleme",
    icon: FileAudio,
    accent: "rose",
    resourceType: "audio",
  },
  { id: "pirlanta", label: "Pırlanta", shortLabel: "Pırlanta", icon: Gem, accent: "sky" },
  {
    id: "ilmihal",
    label: "İlmihal",
    shortLabel: "İlmihal",
    icon: BookHeart,
    accent: "lime",
    resourceType: "pdf",
  },
  {
    id: "adab-i-muaseret",
    label: "Adab-ı Muaşeret",
    shortLabel: "Adab",
    icon: HandHeart,
    accent: "orange",
  },
] as const;

export function getCategoryShortLabel(categoryId: CurriculumCategoryId): string {
  const category = curriculumCategories.find((item) => item.id === categoryId);
  return category?.shortLabel || category?.label || "";
}

export const BELGIUM_GRADES = [1, 2, 3, 4, 5, 6] as const;
export type BelgiumGrade = (typeof BELGIUM_GRADES)[number];

export const GRADE_LABELS: Record<BelgiumGrade, string> = {
  1: "1. Sınıf",
  2: "2. Sınıf",
  3: "3. Sınıf",
  4: "4. Sınıf",
  5: "5. Sınıf",
  6: "6. Sınıf",
};

export const TOTAL_CURRICULUM_MONTHS = 12;
export const WEEKS_PER_MONTH = 4;
export const TOTAL_CURRICULUM_WEEKS = TOTAL_CURRICULUM_MONTHS * WEEKS_PER_MONTH; // 48 weeks

export interface CurriculumEntry {
  id: string;
  grade?: number;
  gender?: "erkek" | "bayan";
  categoryId: CurriculumCategoryId;
  month: number;
  week: number;
  year: number;
  isExtra?: boolean;
  extraOrder?: number;
  title: string;
  body?: string;
  resourceUrl?: string;
  pdfUrl?: string;
  pageCount?: number;
}

const monthLabels: Record<number, string> = {
  1: "ocak",
  2: "subat",
  3: "mart",
  4: "nisan",
  5: "mayis",
  6: "haziran",
  7: "temmuz",
  8: "agustos",
  9: "eylul",
  10: "ekim",
  11: "kasim",
  12: "aralik",
};

/**
 * Generates a deterministic entry ID.
 * Pattern: "hadis-eylul-1", "g2-ayet-eylul-2", "g1-ayet-extra-1", etc.
 */
export function makeEntryId(
  categoryId: CurriculumCategoryId,
  month: number,
  week: number,
  grade: number = 1,
  isExtra: boolean = false,
  extraOrder?: number
): string {
  if (isExtra) {
    const prefix = grade === 1 ? "" : `g${grade}-`;
    return `${prefix}${categoryId}-extra-${extraOrder ?? 1}`;
  }
  const monthSlug = monthLabels[month] ?? `m${month}`;
  return grade === 1
    ? `${categoryId}-${monthSlug}-${week}`
    : `g${grade}-${categoryId}-${monthSlug}-${week}`;
}

// 2 haftalık örnek müfredat içerikleri — Eylül 2026
export const curriculumEntries: readonly CurriculumEntry[] = [
  // ── Ayet (Ortaokul 1. Sınıf – 55 Hafta) ────────────────────────
  ...getAyetEntriesForGrade(1),

  // ── Hadis (Ortaokul 1. Sınıf – 55 Hafta) ───────────────────────
  ...getHadisEntriesForGrade(1),

  // ── Efendimiz (Ortaokul 1. Sınıf – 55 Hafta) ───────────────────
  ...getEfendimizEntriesForGrade(1),

  // ── Sahabe Kıssaları (Ortaokul 1. Sınıf – 55 Hafta) ────────────
  ...getSahabeEntriesForGrade(1),

  // ── Risale ──────────────────────────────────────
  {
    id: "risale-eylul-1",
    categoryId: "risale",
    month: 9,
    week: 1,
    year: 2026,
    title: "Birinci Söz — Bismillah",
    body: '"Bismillah" her hayrın başıdır. Biz dahi başta onu söyleriz. Bismillah\'ın mana derinliği ve günlük hayattaki yeri. (Sözler, Birinci Söz)',
    resourceUrl: "#",
    pageCount: 4,
  },
  {
    id: "risale-eylul-2",
    categoryId: "risale",
    month: 9,
    week: 2,
    year: 2026,
    title: "İkinci Söz — İman ve Küfür Mukayesesi",
    body: "İki yolcunun hikâyesi üzerinden iman ve küfürün insana kazandırdıkları ve kaybettirdikleri. (Sözler, İkinci Söz)",
    resourceUrl: "#",
    pageCount: 3,
  },

  // ── Hocaefendi Dinleme ──────────────────────────
  {
    id: "hocaefendi-dinleme-eylul-1",
    categoryId: "hocaefendi-dinleme",
    month: 9,
    week: 1,
    year: 2026,
    title: "Hizmet Ahlâkı ve Samimiyet",
    body: "Hizmetin temelinde yatan ihlas, samimiyet ve fedakârlık. Yapılan işlerin Allah rızası için olması gerektiğine dair sohbet.",
  },
  {
    id: "hocaefendi-dinleme-eylul-2",
    categoryId: "hocaefendi-dinleme",
    month: 9,
    week: 2,
    year: 2026,
    title: "Duanın Önemi ve Adabı",
    body: "Dua, kulun Allah'a en samimi yönelişidir. Duanın kabul şartları, âdâbı ve günlük hayatta dua bilinci.",
  },

  // ── Pırlanta ────────────────────────────────────
  {
    id: "pirlanta-eylul-1",
    categoryId: "pirlanta",
    month: 9,
    week: 1,
    year: 2026,
    title: "İman — Kalbin Ziyası",
    body: "İmanın altı şartı, kalpte iman nurunun nasıl oluştuğu ve korunduğu üzerine tefekkür.",
  },
  {
    id: "pirlanta-eylul-2",
    categoryId: "pirlanta",
    month: 9,
    week: 2,
    year: 2026,
    title: "İhlas — Saf ve Katışıksız Niyet",
    body: "İhlasın tanımı, önemi ve ihlaslı olmanın pratik yolları. İhlas Risalesi'nden ilhamla.",
  },

  // ── İlmihal (Ortaokul 1. Sınıf – Erkek & Bayan) ───────────────
  ...getIlmihalEntriesForGrade(1, "erkek"),
  ...getIlmihalEntriesForGrade(1, "bayan"),

  // ── Adab-ı Muaşeret (Ortaokul 1. Sınıf – 54 Hafta) ─────────────
  ...getAdabEntriesForGrade(1),

  // ── Esmâü'l-Hüsnâ (Ortaokul 1. Sınıf – 55 Hafta) ───────────────
  ...getEsmaEntriesForGrade(1),
];

export function sortCurriculumEntries(entries: readonly CurriculumEntry[]): CurriculumEntry[] {
  return entries.toSorted((a, b) => {
    const gradeA = a.grade ?? 1;
    const gradeB = b.grade ?? 1;
    if (gradeA !== gradeB) return gradeA - gradeB;

    const aIsExtra = Boolean(a.isExtra);
    const bIsExtra = Boolean(b.isExtra);

    // Standard entries always precede extra entries
    if (aIsExtra !== bIsExtra) {
      return aIsExtra ? 1 : -1;
    }

    if (aIsExtra && bIsExtra) {
      return (a.extraOrder ?? 0) - (b.extraOrder ?? 0);
    }

    if (a.year !== b.year) return a.year - b.year;
    if (a.month !== b.month) return a.month - b.month;
    return a.week - b.week;
  });
}

/**
 * Resolves curriculum entries within a single category and grade:
 * - Sorts standard entries chronologically first.
 * - Standard 48-week curriculum (12 months x 4 weeks): entries at index < 48 are standard weeks.
 * - Under no circumstances can an entry become an extra before all 48 weeks are filled.
 * - Any entry beyond 48 weeks (index >= 48) automatically turns into an extra with sequential extraOrder.
 */
export function resolveCategoryEntries(entries: readonly CurriculumEntry[]): CurriculumEntry[] {
  const sorted = sortCurriculumEntries(entries);

  return sorted.map((entry, index) => {
    if (index < TOTAL_CURRICULUM_WEEKS) {
      return {
        ...entry,
        isExtra: false,
        extraOrder: undefined,
      };
    }

    return {
      ...entry,
      isExtra: true,
      extraOrder: index - TOTAL_CURRICULUM_WEEKS + 1,
    };
  });
}

/**
 * Resolves all curriculum entries across all grades and categories
 * enforcing the 48-week standard curriculum threshold before any extras appear.
 */
export function resolveAllCurriculumEntries(
  entries: readonly CurriculumEntry[]
): CurriculumEntry[] {
  const groups = new Map<string, CurriculumEntry[]>();

  for (const entry of entries) {
    const grade = entry.grade ?? 1;
    const key = `${grade}:${entry.categoryId}`;
    let group = groups.get(key);
    if (!group) {
      group = [];
      groups.set(key, group);
    }
    group.push(entry);
  }

  const resolvedAll: CurriculumEntry[] = [];
  for (const group of groups.values()) {
    resolvedAll.push(...resolveCategoryEntries(group));
  }

  return sortCurriculumEntries(resolvedAll);
}

export function getCategoryEntries(
  categoryId: CurriculumCategoryId,
  entries: readonly CurriculumEntry[] = curriculumEntries,
  grade?: number,
  gender?: "erkek" | "bayan"
): CurriculumEntry[] {
  const targetGender = gender ?? "erkek";
  const filtered = entries.filter(
    (entry) =>
      entry.categoryId === categoryId &&
      (typeof grade !== "number" || (entry.grade ?? 1) === grade) &&
      (!entry.gender || entry.gender === targetGender)
  );
  return resolveCategoryEntries(filtered);
}

export function getUnlockedEntryIndex(
  entries: readonly CurriculumEntry[],
  completedEntryIds: ReadonlySet<string>
) {
  if (entries.length === 0) return -1;
  const firstUnreadIndex = entries.findIndex((entry) => !completedEntryIds.has(entry.id));
  return firstUnreadIndex === -1 ? entries.length - 1 : firstUnreadIndex;
}

export function canCompleteEntry(
  entryId: string,
  entries: readonly CurriculumEntry[],
  completedEntryIds: ReadonlySet<string>
) {
  const entryIndex = entries.findIndex((entry) => entry.id === entryId);
  if (entryIndex < 0) return false;
  return entries.slice(0, entryIndex).every((entry) => completedEntryIds.has(entry.id));
}

export function canUnmarkEntry(
  entryId: string,
  entries: readonly CurriculumEntry[],
  completedEntryIds: ReadonlySet<string>
) {
  const entryIndex = entries.findIndex((entry) => entry.id === entryId);
  if (entryIndex < 0) return false;
  if (!completedEntryIds.has(entryId)) return false;
  return entries.slice(entryIndex + 1).every((entry) => !completedEntryIds.has(entry.id));
}
