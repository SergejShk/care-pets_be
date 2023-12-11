import { pgTable, varchar } from "drizzle-orm/pg-core";
import { type InferSelectModel, type InferInsertModel } from "drizzle-orm";

const users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email").notNull(),
  password: varchar("password").notNull(),
  name: varchar("name").notNull(),
  city: varchar("city").notNull(),
  phone: varchar("phone").notNull(),
  birthday: varchar("birthday"),
  photo: varchar("photo"),
});

export default users;

export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;
