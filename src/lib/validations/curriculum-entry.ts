import { z } from "zod";
import { curriculumYearForPeriod } from "@/lib/curriculum";
import { curriculumVocabularyIssues } from "@/lib/curriculum-vocabulary";
import { curriculumPdfUrl, curriculumResourceUrl } from "@/lib/curriculum-resource-url";

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
  if (!Number.isInteger(weekNumber) || weekNumber < 1 || weekNumber > 48) {
    throw new Error(`Week number must be between 1 and 48, received ${weekNumber}`);
  }
  const monthIndex = Math.floor((weekNumber - 1) / 4);
  const month = monthIndex < 4 ? 9 + monthIndex : monthIndex - 3;
  const year = curriculumYearForPeriod(month);
  const week = ((weekNumber - 1) % 4) + 1;
  const monthSlug = monthSlugs[month];
  return { weekNumber, month, week, year, monthSlug };
}

export function slotToWeekNumber(month: number, week: number): number {
  if (
    !Number.isInteger(month) ||
    month < 1 ||
    month > 12 ||
    !Number.isInteger(week) ||
    week < 1 ||
    week > 4
  )
    throw new Error("Invalid curriculum month/week slot.");
  const monthIndex = month >= 9 ? month - 9 : month + 3;
  return monthIndex * 4 + week;
}

export const weeklyEntryInputSchema = z.object({
  id: z.string().min(1),
  grade: z.number().int().min(1).max(6),
  categoryId: z.enum(WEEKLY_CONTENT_CATEGORIES),
  month: z.number().int().min(1).max(12),
  week: z.number().int().min(1).max(4),
  year: z.number().int().optional(),
  title: z.string().min(3),
  body: z.string().min(20),
  resourceUrl: z
    .string()
    .refine(curriculumResourceUrl, "Güvenli kaynak bağlantısı gerekli.")
    .optional(),
  pdfUrl: z.string().refine(curriculumPdfUrl, "Güvenli PDF bağlantısı gerekli.").optional(),
  pageCount: z.number().int().positive().optional(),
  isDraft: z.boolean().default(true),
});

export type WeeklyEntryInput = z.infer<typeof weeklyEntryInputSchema>;

function createWeeklyPackageSchema(categories: readonly WeeklyContentCategory[]) {
  return z
    .object({
      weekNumber: z.number().int().min(1).max(36),
      entries: z.array(weeklyEntryInputSchema),
    })
    .superRefine((val, ctx) => {
      const slot = weekNumberToSlot(val.weekNumber);

      if (val.entries.length !== 6 * categories.length) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Haftalık paket tam ${6 * categories.length} kayıt içermelidir (6 sınıf × ${categories.length} kategori). Alınan kayıt sayısı: ${val.entries.length}`,
        });
        return;
      }

      const seenIds = new Set<string>();

      for (let grade = 1; grade <= 6; grade++) {
        const gradeEntries = val.entries.filter((e) => e.grade === grade);
        if (gradeEntries.length !== categories.length) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `${grade}. sınıf için tam ${categories.length} kategori bulunmalıdır. Mevcut: ${gradeEntries.length}`,
          });
        }

        for (const cat of categories) {
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
        if (!categories.includes(entry.categoryId)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `${entry.id}: '${entry.categoryId}' seçilen kategori kapsamının dışında.`,
          });
        }
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

        if (entry.year !== undefined && entry.year !== slot.year) {
          ctx.addIssue({
            code: "custom",
            message: `${entry.id}: ${val.weekNumber}. hafta için yıl ${slot.year} olmalıdır.`,
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
    })
    .transform((pkg) => {
      const { year } = weekNumberToSlot(pkg.weekNumber);
      return { ...pkg, entries: pkg.entries.map((entry) => ({ ...entry, year })) };
    });
}

export const weeklyPackageSchema = createWeeklyPackageSchema(WEEKLY_CONTENT_CATEGORIES);

/** A category draft still requires one valid entry for each of the six grades. */
export function weeklyCategoryPackageSchema(category: WeeklyContentCategory) {
  return createWeeklyPackageSchema([category]);
}

export type WeeklyPackage = z.infer<typeof weeklyPackageSchema>;
