import { z } from "zod";
import { curriculumVocabularyIssues } from "@/lib/curriculum-vocabulary";

export const WEEKLY_CONTENT_CATEGORIES = ["konu", "hocaefendi-dinleme"] as const;

export type WeeklyContentCategory = (typeof WEEKLY_CONTENT_CATEGORIES)[number];

export const monthSlugs: Record<number, string> = {
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

export function weekNumberToSlot(weekNumber: number) {
  if (weekNumber < 1 || weekNumber > 48) {
    throw new Error(`Week number must be between 1 and 48, received ${weekNumber}`);
  }
  const monthIndex = Math.floor((weekNumber - 1) / 4);
  const month = monthIndex < 4 ? 9 + monthIndex : monthIndex - 3;
  const year = monthIndex < 4 ? 2026 : 2027;
  const week = ((weekNumber - 1) % 4) + 1;
  const monthSlug = monthSlugs[month];
  return { weekNumber, month, week, year, monthSlug };
}

export function slotToWeekNumber(month: number, week: number): number {
  const monthIndex = month >= 9 ? month - 9 : month + 3;
  return monthIndex * 4 + week;
}

export const weeklyEntryInputSchema = z.object({
  id: z.string().min(1),
  grade: z.number().int().min(1).max(6),
  categoryId: z.enum(WEEKLY_CONTENT_CATEGORIES),
  month: z.number().int().min(1).max(12),
  week: z.number().int().min(1).max(4),
  year: z.number().int().default(2026),
  title: z.string().min(3),
  body: z.string().min(20),
  resourceUrl: z.string().url().optional(),
  pdfUrl: z.string().optional(),
  pageCount: z.number().int().positive().optional(),
  isDraft: z.boolean().default(true),
});

export type WeeklyEntryInput = z.infer<typeof weeklyEntryInputSchema>;

export const weeklyPackageSchema = z
  .object({
    weekNumber: z.number().int().min(1).max(36),
    entries: z.array(weeklyEntryInputSchema),
  })
  .superRefine((val, ctx) => {
    const slot = weekNumberToSlot(val.weekNumber);

    if (val.entries.length !== 6 * WEEKLY_CONTENT_CATEGORIES.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Haftalık paket tam ${6 * WEEKLY_CONTENT_CATEGORIES.length} kayıt içermelidir (6 sınıf × ${WEEKLY_CONTENT_CATEGORIES.length} kategori). Alınan kayıt sayısı: ${val.entries.length}`,
      });
      return;
    }

    const seenIds = new Set<string>();

    for (let grade = 1; grade <= 6; grade++) {
      const gradeEntries = val.entries.filter((e) => e.grade === grade);
      if (gradeEntries.length !== WEEKLY_CONTENT_CATEGORIES.length) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `${grade}. sınıf için tam ${WEEKLY_CONTENT_CATEGORIES.length} kategori bulunmalıdır. Mevcut: ${gradeEntries.length}`,
        });
      }

      for (const cat of WEEKLY_CONTENT_CATEGORIES) {
        const catEntry = gradeEntries.find((e) => e.categoryId === cat);
        if (!catEntry) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `${grade}. sınıf için '${cat}' kategorisi eksik.`,
          });
        }
      }
    }

    for (const entry of val.entries) {
      for (const message of curriculumVocabularyIssues(entry.body)) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: `${entry.id}: ${message}` });
      }
      if (seenIds.has(entry.id)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Mükerrer kayıt ID tespit edildi: ${entry.id}`,
        });
      }
      seenIds.add(entry.id);

      const expectedId = `g${entry.grade}-${entry.categoryId}-${slot.monthSlug}-${slot.week}`;
      if (entry.id !== expectedId) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Geçersiz ID: '${entry.id}'. Beklenen standart ID: '${expectedId}'`,
        });
      }

      if (entry.month !== slot.month || entry.week !== slot.week) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `${entry.id} kaydının ay/hafta bilgisi (${entry.month}/${entry.week}) ${val.weekNumber}. hafta slotu ile (${slot.month}/${slot.week}) uyuşmuyor.`,
        });
      }

      if (entry.categoryId === "konu") {
        if (!entry.body.includes("# Bana Ne Söylüyor?")) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `${entry.id} konu dersinde '# Bana Ne Söylüyor?' bölümü bulunamadı.`,
          });
        }
        if (!entry.body.includes("# Bu Hafta Tanıştığımız Kelimeler")) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `${entry.id} konu dersinde '# Bu Hafta Tanıştığımız Kelimeler' bölümü bulunamadı.`,
          });
        }
      }
    }
  });

export type WeeklyPackage = z.infer<typeof weeklyPackageSchema>;
