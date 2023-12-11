import { pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { type InferSelectModel, type InferInsertModel } from "drizzle-orm";

const users = pgTable("users", {
  userId: serial("id").primaryKey().notNull(),
  email: varchar("email").notNull(),
  password: varchar("password").notNull(),
  name: varchar("name").notNull(),
  city: varchar("name").notNull(),
  phone: varchar("phone").notNull(),
  birthday: varchar("phone"),
  photo: varchar("photo"),
});

export default users;

export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;
