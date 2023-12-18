import { pgTable, serial, varchar, timestamp, integer } from "drizzle-orm/pg-core";
import { type InferSelectModel, type InferInsertModel } from "drizzle-orm";

import users from "./users";

const pets = pgTable("pets", {
  id: serial("id").primaryKey().notNull(),
  name: varchar("name").notNull(),
  birthday: timestamp("birthday").notNull(),
  breed: varchar("breed").notNull(),
  photo: varchar("photo"),
  comments: varchar("comments").notNull(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
});

export default pets;

export type Pet = InferSelectModel<typeof pets>;
export type NewPet = InferInsertModel<typeof pets>;
