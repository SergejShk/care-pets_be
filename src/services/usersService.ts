import { UsersDb } from "../database/usersDb";

import { IUserUpdate } from "../interface/auth";

export class UsersService {
  private usersDb: UsersDb;

  constructor(usersDb: UsersDb) {
    this.usersDb = usersDb;
  }

  updateUser = async (id: number, user: IUserUpdate) => {
    const [updatedUser] = await this.usersDb.updateUser(id, {
      ...user,
    });

    const { password, ...responseUser } = updatedUser;

    return responseUser;
  };
}
