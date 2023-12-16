import { z } from "zod";

export const signUpSchema = z
  .object({
    email: z.string().email().min(5),
    password: z.string().min(7).max(32),
    name: z.string().min(3).max(40),
    city: z.string().min(2).max(40),
    phone: z.string().min(5).max(20),
  })
  .strict();

export const loginSchema = z
  .object({
    email: z.string().email().min(5),
    password: z.string().min(7).max(32),
  })
  .strict();

export const updateUserSchema = z
  .object({
    id: z.number(),
    name: z.string().min(3).max(40).optional(),
    email: z.string().email().min(5).optional(),
    phone: z.string().min(5).max(20).optional(),
    city: z.string().min(2).max(40).optional(),
    birthday: z.coerce.date().optional(),
    photo: z
      .object({
        originalKey: z.string(),
        key: z.string(),
      })
      .strict()
      .optional(),
  })
  .strict();
