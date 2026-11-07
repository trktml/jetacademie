import { z } from "zod";

export const entryIdSchema = z.string().min(1).max(120);
export const guestProgressSchema = z.object({
  expectedUserId: z.string().min(1),
  entryIds: z.array(entryIdSchema).max(5000),
  gender: z.enum(["erkek", "bayan"]).nullish(),
});
