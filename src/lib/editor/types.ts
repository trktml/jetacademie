import type { z } from "zod";
import type { editorRecordResponseSchema } from "@/lib/validations/curriculum-response";

export type EditorRecord = z.infer<typeof editorRecordResponseSchema>;
