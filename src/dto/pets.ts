import { z } from "zod";

export const createPetSchema = z
  .object({
    name: z.string().min(2).max(16),
    birthday: z.coerce.date(),
    breed: z.string().min(2).max(16),
    photo: z
      .object({
        originalKey: z.string(),
        key: z.string(),
      })
      .strict()
      .optional(),
    comments: z.string().min(8).max(120),
  })
  .strict();
