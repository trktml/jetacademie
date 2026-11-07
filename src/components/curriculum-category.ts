import { BookHeart, Compass, HandHeart, Layers, Video, type LucideIcon } from "lucide-react";
import { EsmaIcon } from "@/components/icons/esma-icon";

import { curriculumCategoryIds, type CurriculumCategoryId } from "@/lib/curriculum";

interface CategoryPresentation {
  readonly label: string;
  readonly shortLabel: string;
  readonly icon: LucideIcon;
  readonly accent: string;
  readonly resourceType?: "pdf" | "audio" | "video";
}

const presentation = {
  konu: {
    label: "Haftanın Konusu",
    shortLabel: "Konu",
    icon: Layers,
    accent: "teal",
  },
  "hocaefendi-dinleme": {
    label: "Hocaefendi Sohbetleri",
    shortLabel: "Sohbet",
    icon: Video,
    accent: "rose",
    resourceType: "video",
  },
  ilmihal: {
    label: "İlmihal",
    shortLabel: "İlmihal",
    icon: BookHeart,
    accent: "lime",
    resourceType: "pdf",
  },
  "adab-i-muaseret": {
    label: "Adab-ı Muaşeret",
    shortLabel: "Adab",
    icon: HandHeart,
    accent: "orange",
  },
  esma: {
    label: "Esmâü'l-Hüsnâ",
    shortLabel: "Esmâ",
    icon: EsmaIcon,
    accent: "emerald",
  },
  tefekkur: {
    label: "Kâinat ve Tefekkür",
    shortLabel: "Tefekkür",
    icon: Compass,
    accent: "sky",
    resourceType: "video",
  },
} satisfies Record<CurriculumCategoryId, CategoryPresentation>;

export interface CurriculumCategory extends CategoryPresentation {
  readonly id: CurriculumCategoryId;
}

export const curriculumCategories: readonly CurriculumCategory[] = curriculumCategoryIds.map(
  (id) => ({ id, ...presentation[id] })
);
