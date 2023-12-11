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
