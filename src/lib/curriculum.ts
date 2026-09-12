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
 * Pattern: "hadis-eylul-1", "ayet-eylul-2", etc.
 */
export function makeEntryId(categoryId: CurriculumCategoryId, month: number, week: number): string {
  const monthSlug = monthLabels[month] ?? `m${month}`;
  return `${categoryId}-${monthSlug}-${week}`;
}

// 2 haftalık örnek müfredat içerikleri — Eylül 2026
export const curriculumEntries: readonly CurriculumEntry[] = [
  // ── Ayet ────────────────────────────────────────
  {
    id: "ayet-eylul-1",
    categoryId: "ayet",
    month: 9,
    week: 1,
    year: 2026,
    title: "Bakara Suresi 2:152 — Beni Anın",
    body: '"Öyleyse siz Beni (ibadetle) anın ki Ben de sizi anayım. Bana şükredin; sakın Bana nankörlük etmeyin." Ayetin tefsiri ve hayata yansımaları üzerine düşünceler.',
  },
  {
    id: "ayet-eylul-2",
    categoryId: "ayet",
    month: 9,
    week: 2,
    year: 2026,
    title: "Âl-i İmran 3:159 — Şûrâ ve Tevekkül",
    body: '"İş hakkında onlarla istişare et. Bir kere de karar verip azmettin mi, artık Allah\'a tevekkül et." Karar alma süreçlerinde istişare ve tevekkül dengesi.',
  },

  // ── Hadis ───────────────────────────────────────
  {
    id: "hadis-eylul-1",
    categoryId: "hadis",
    month: 9,
    week: 1,
    year: 2026,
    title: "Niyet Hadisi — Ameller Niyetlere Göredir",
    body: '"Ameller ancak niyetlere göredir. Herkese niyet ettiği şey vardır." (Buhârî, Müslim) Niyetin ibadet ve günlük hayattaki merkezi rolü.',
  },
  {
    id: "hadis-eylul-2",
    categoryId: "hadis",
    month: 9,
    week: 2,
    year: 2026,
    title: "Kolaylaştırın Hadisi — Müjdeleyin",
    body: '"Kolaylaştırın, zorlaştırmayın; müjdeleyin, nefret ettirmeyin." (Buhârî, Müslim) Tebliğ ve eğitimde kolaylaştırma prensibi.',
  },

  // ── Siyer ───────────────────────────────────────
  {
    id: "siyer-eylul-1",
    categoryId: "siyer",
    month: 9,
    week: 1,
    year: 2026,
    title: "Mekke Dönemi — İlk Vahiy ve Gizli Davet",
    body: "Hz. Peygamber'in (s.a.v.) Hira Mağarası'nda ilk vahyi alışı, Hz. Hatice'nin desteği ve ilk Müslümanların iman süreci.",
  },
  {
    id: "siyer-eylul-2",
    categoryId: "siyer",
    month: 9,
    week: 2,
    year: 2026,
    title: "Açık Davet ve İlk Tepkiler",
    body: "Safâ Tepesi'ndeki açık davet, Kureyş'in tepkileri ve ilk Müslümanlara uygulanan baskılar. Sabır ve metanetin önemi.",
  },

  // ── Sahabe Kıssaları ────────────────────────────
  {
    id: "sahabe-kissalari-eylul-1",
    categoryId: "sahabe-kissalari",
    month: 9,
    week: 1,
    year: 2026,
    title: "Hz. Ebu Bekir (r.a.) — Sıddîk'ın Sadakati",
    body: "İslam'a ilk iman eden erkek, hicret arkadaşı ve ilk halife. Malını, canını, her şeyini İslam için feda eden yüce sahabenin hikâyesi.",
  },
  {
    id: "sahabe-kissalari-eylul-2",
    categoryId: "sahabe-kissalari",
    month: 9,
    week: 2,
    year: 2026,
    title: "Hz. Bilal-i Habeşî (r.a.) — İmanın Sesi",
    body: "Zulme rağmen \"Ehad, Ehad!\" diyerek direnen, İslam'ın ilk müezzini Hz. Bilal'in eşsiz iman gücü ve sabrı.",
  },

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

  // ── İlmihal ─────────────────────────────────────
  {
    id: "ilmihal-eylul-1",
    categoryId: "ilmihal",
    month: 9,
    week: 1,
    year: 2026,
    title: "Abdest ve Gusül — Taharetin Temeli",
    body: "Abdestin farzları, sünnetleri ve âdâbı. Guslün gerektiren durumlar ve yapılış şekli.",
    resourceUrl: "#",
    pageCount: 8,
  },
  {
    id: "ilmihal-eylul-2",
    categoryId: "ilmihal",
    month: 9,
    week: 2,
    year: 2026,
    title: "Namaz — Müminin Miracı",
    body: "Namazın farzları, vacipleri, sünnetleri. Namazda huşu ve namaz kılınışının detaylı anlatımı.",
    resourceUrl: "#",
    pageCount: 12,
  },

  // ── Adab-ı Muaşeret ────────────────────────────
  {
    id: "adab-i-muaseret-eylul-1",
    categoryId: "adab-i-muaseret",
    month: 9,
    week: 1,
    year: 2026,
    title: "Selam ve Selamlaşma Adabı",
    body: "Selamın fazileti, kimlere ve nasıl selam verilir, selamlaşmada öncelik sırası ve günlük hayatta uygulama.",
  },
  {
    id: "adab-i-muaseret-eylul-2",
    categoryId: "adab-i-muaseret",
    month: 9,
    week: 2,
    year: 2026,
    title: "Sofra Adabı ve Yeme-İçme",
    body: "Sünnet-i seniyye çerçevesinde sofra düzeni, yemek duaları, sağ elle yeme ve israftan kaçınma.",
  },
];

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
