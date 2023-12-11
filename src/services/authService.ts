import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { UsersDb } from "../database/usersDb";

import { DuplicateUserError, InvalidParameterError } from "../errors/customErrors";

import { ILogInBody, ISignUpBody, ITokenPayload, Token } from "../interface/auth";

export class AuthService {
  private usersDb: UsersDb;

  constructor(usersDb: UsersDb) {
    this.usersDb = usersDb;
  }

  getToken = (data: ITokenPayload, tokenType: Token) => {
    const payload = {
      id: data.id,
      name: data.name,
      email: data.email,
      tokenType,
    };

    return jwt.sign(payload, process.env.JWT_SECRET || "", {
      expiresIn: tokenType === Token.Refresh ? "24h" : "1h",
    });
  };

  signUp = async (body: ISignUpBody) => {
    const { email } = body;

    const user = await this.usersDb.getUserByEmail(email);

    if (user.length) {
      throw new DuplicateUserError("User already exists");
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const [response] = await this.usersDb.createUser({
      ...body,
      password: hashedPassword,
    });

    const payloadToken = {
      id: response.id,
      email: response.email,
      name: response.name,
    };

    const newUser = {
      ...payloadToken,
      city: response.city,
      phone: response.phone,
    };

    const accessToken = this.getToken(payloadToken, Token.Access);
    const refreshToken = this.getToken(payloadToken, Token.Refresh);

    return { ...newUser, accessToken, refreshToken };
  };

  logIn = async (body: ILogInBody) => {
    const { email, password: reqPassword } = body;

    const [user] = await this.usersDb.getUserByEmail(email);

    if (!user || !(await bcrypt.compare(reqPassword, user.password))) {
      throw new InvalidParameterError("Email or password is wrong");
    }

    const { password, ...response } = user;

    const payloadToken = {
      id: response.id,
      email: response.email,
      name: response.name,
    };

    const accessToken = this.getToken(payloadToken, Token.Access);
    const refreshToken = this.getToken(payloadToken, Token.Refresh);

    return { ...response, accessToken, refreshToken };
  };
}
