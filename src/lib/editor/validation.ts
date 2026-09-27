import { z } from "zod";
import { curriculumCategoryIds } from "@/lib/curriculum";

export const editorLoginSchema = z
  .object({ username: z.string().min(1).max(80), password: z.string().min(1).max(128) })
  .strict();
const safeResource = z
  .string()
  .max(2048)
  .refine((value) => {
    if (!value) return true;
    if (/^\/(?!\/)[a-zA-Z0-9/_ .%-]+\.pdf$/.test(value)) return true;
    try {
      const url = new URL(value);
      return url.protocol === "https:" && !url.username && !url.password;
    } catch {
      return false;
    }
  }, "HTTPS bağlantısı veya yerel PDF yolu kullanın.");
export const editorEntrySchema = z
  .object({
    grade: z.number().int().min(1).max(6),
    categoryId: z.enum(curriculumCategoryIds),
    gender: z.enum(["erkek", "bayan"]).optional(),
    month: z.number().int().min(1).max(12),
    week: z.number().int().min(1).max(4),
    extraOrder: z.number().int().min(1).max(100).optional(),
    title: z.string().trim().min(1, "Başlık gerekli.").max(200),
    body: z.string().trim().min(1, "İçerik gerekli.").max(100000),
    resourceUrl: safeResource,
    revision: z.number().int().min(0),
  })
  .strict()
  .superRefine((value, ctx) => {
    if ((value.categoryId === "ilmihal") !== !!value.gender)
      ctx.addIssue({
        code: "custom",
        path: ["gender"],
        message: "İlmihal için içerik hattı seçin.",
      });
  });
export type EditorEntryInput = z.infer<typeof editorEntrySchema>;
