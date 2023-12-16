import { eq } from "drizzle-orm";
import { NodePgDatabase } from "drizzle-orm/node-postgres";

import users, { NewUser } from "./models/users";

import { IUserUpdate } from "../interface/auth";

export class UsersDb {
  constructor(private db: NodePgDatabase) {}

  public getUserByEmail = async (email: string) =>
    this.db.select().from(users).where(eq(users.email, email));

  public createUser = async (newUser: NewUser) => {
    return this.db.insert(users).values(newUser).returning();
  };

  public getUserById = async (id: number) => this.db.select().from(users).where(eq(users.id, id));

  public updateUser = async (id: number, user: IUserUpdate) =>
    this.db.update(users).set(user).where(eq(users.id, id)).returning();
}
