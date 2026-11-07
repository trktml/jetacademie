import { z } from "zod";
import { curriculumCategoryIds } from "@/lib/curriculum";

export const curriculumEntryResponseSchema = z.object({
  id: z.string(),
  grade: z.number().optional(),
  categoryId: z.enum(curriculumCategoryIds),
  gender: z.enum(["erkek", "bayan"]).optional(),
  month: z.number(),
  week: z.number(),
  year: z.number(),
  title: z.string(),
  body: z.string().optional(),
  arabic: z.string().optional(),
  isExtra: z.boolean().optional(),
  extraOrder: z.number().optional(),
  isDraft: z.boolean().optional(),
  contentFormat: z.literal("markdown").optional(),
  resourceUrl: z.string().optional(),
  pdfUrl: z.string().optional(),
  pageCount: z.number().optional(),
});
export const editorRecordResponseSchema = z.object({
  entry: curriculumEntryResponseSchema,
  revision: z.number().int().nonnegative(),
  updatedAt: z.string().nullable(),
});
