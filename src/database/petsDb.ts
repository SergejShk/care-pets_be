import { NodePgDatabase } from "drizzle-orm/node-postgres";

import pets, { NewPet } from "./models/pets";

export class PetsDb {
  constructor(private db: NodePgDatabase) {}

  public createPet = async (newPet: NewPet) =>
    this.db
      .insert(pets)
      .values(newPet)
      .returning()
      .then((res) => res[0]);
}
