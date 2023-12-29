import { z } from "zod";

export enum FolderType {
  Profile = "profile",
  Pets = "pets",
}

export const filesSchema = z
  .object({
    key: z.string(),
    type: z.string(),
    folder: z.nativeEnum(FolderType),
  })
  .strict();
