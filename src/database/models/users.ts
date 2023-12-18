import { pgTable, serial, varchar, timestamp, json } from "drizzle-orm/pg-core";
import { type InferSelectModel, type InferInsertModel } from "drizzle-orm";

import { IPhoto } from "@/interface/common";

const users = pgTable("users", {
  id: serial("id").primaryKey().notNull(),
  email: varchar("email").notNull(),
  password: varchar("password").notNull(),
  name: varchar("name").notNull(),
  city: varchar("city").notNull(),
  phone: varchar("phone").notNull(),
  birthday: timestamp("birthday"),
  photo: json("photo").$type<IPhoto>(),
});

export default users;

export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;
