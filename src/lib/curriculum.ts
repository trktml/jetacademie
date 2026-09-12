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

export const curriculumCategories = [
  { id: "ayet", label: "Ayet", icon: BookOpenText, accent: "coral" },
  { id: "hadis", label: "Hadis", icon: ScrollText, accent: "amber" },
  { id: "siyer", label: "Siyer", icon: Landmark, accent: "blue" },
  {
    id: "sahabe-kissalari",
    label: "Sahabe kıssaları",
    icon: UsersRound,
    accent: "violet",
  },
  { id: "risale", label: "Risale", icon: BookMarked, accent: "teal", resourceType: "pdf" },
  {
    id: "hocaefendi-dinleme",
    label: "Hocaefendi dinleme",
    icon: FileAudio,
    accent: "rose",
    resourceType: "audio",
  },
  { id: "pirlanta", label: "Pırlanta", icon: Gem, accent: "sky" },
  {
    id: "ilmihal",
    label: "İlmihal",
    icon: BookHeart,
    accent: "lime",
    resourceType: "pdf",
  },
  { id: "adab-i-muaseret", label: "Adab-ı Muaşeret", icon: HandHeart, accent: "orange" },
] as const satisfies ReadonlyArray<{
  id: string;
  label: string;
  icon: LucideIcon;
  accent: string;
  resourceType?: "pdf" | "audio";
}>;

export type CurriculumCategoryId = (typeof curriculumCategories)[number]["id"];

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
