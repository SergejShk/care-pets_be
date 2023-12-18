import { PetsDb } from "../database/petsDb";

import { IPet } from "@/interface/pets";

export class PetsService {
  private petsDb: PetsDb;

  constructor(petsDb: PetsDb) {
    this.petsDb = petsDb;
  }

  createPet = async (id: number, pet: IPet) => {
    const newPet = await this.petsDb.createPet({
      ...pet,
      userId: id,
    });

    const { userId, ...createdPet } = newPet;

    return createdPet;
  };
}
