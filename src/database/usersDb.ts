import { eq } from "drizzle-orm";
import { NodePgDatabase } from "drizzle-orm/node-postgres";

import users, { NewUser } from "./models/users";

export class UsersDb {
  constructor(private db: NodePgDatabase) {}

  public createUser = async (newUser: NewUser) =>
    this.db.insert(users).values(newUser).returning();

  public getUserById = async (userId: number) =>
    this.db.select().from(users).where(eq(users.userId, userId));
}
