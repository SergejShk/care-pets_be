import { PetsDb } from "../database/petsDb";

import { IPet } from "@/interface/pets";

export class PetsService {
  private petsDb: PetsDb;

  constructor(petsDb: PetsDb) {
    this.petsDb = petsDb;
  }

  createPet = async (id: number, pet: IPet) => {
    const birthday = new Date(pet.birthday);
    const newPet = await this.petsDb.createPet({
      ...pet,
      birthday,
      userId: id,
    });

    const { userId, ...createdPet } = newPet;

    return createdPet;
  };

  getUserPets = async () => {
    const userPets = await this.petsDb.getUserPets();

    return userPets;
  };
}
