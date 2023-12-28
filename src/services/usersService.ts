import { UsersDb } from "../database/usersDb";

import { IUserUpdate } from "../interface/auth";

export class UsersService {
  private usersDb: UsersDb;

  constructor(usersDb: UsersDb) {
    this.usersDb = usersDb;
  }

  updateUser = async (id: number, user: IUserUpdate) => {
    const birthday = user.birthday ? new Date(user.birthday) : undefined;

    const [updatedUser] = await this.usersDb.updateUser(id, {
      ...user,
      birthday,
    });

    const { password, ...responseUser } = updatedUser;

    return responseUser;
  };
}
