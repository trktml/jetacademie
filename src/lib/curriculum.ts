import {
  BookHeart,
  BookOpenText,
  BookMarked,
  FileAudio,
  Gem,
  HandHeart,
  Landmark,
  ScrollText,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

export const curriculumCategoryIds = [
  "ayet",
  "hadis",
  "siyer",
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
  { id: "ayet", label: "Ayet", shortLabel: "Ayet", icon: BookOpenText, accent: "coral" },
  { id: "hadis", label: "Hadis", shortLabel: "Hadis", icon: ScrollText, accent: "amber" },
  { id: "siyer", label: "Siyer", shortLabel: "Siyer", icon: Landmark, accent: "blue" },
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

export interface CurriculumEntry {
  id: string;
  categoryId: CurriculumCategoryId;
  month: number;
  week: number;
  year: number;
  title: string;
  body?: string;
  resourceUrl?: string;
  pageCount?: number;
}

// Haftalık içerikler yönetim paneliyle eklendiğinde bu koleksiyona bağlanacak.
// Gerçek içerik sağlanmadığı için kullanıcıya sahte dersler göstermiyoruz.
export const curriculumEntries: readonly CurriculumEntry[] = [];

export function getCategoryEntries(categoryId: CurriculumCategoryId) {
  return curriculumEntries
    .filter((entry) => entry.categoryId === categoryId)
    .toSorted((a, b) =>
      a.year !== b.year
        ? a.year - b.year
        : a.month !== b.month
          ? a.month - b.month
          : a.week - b.week
    );
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
