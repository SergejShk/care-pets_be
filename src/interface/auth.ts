export enum Token {
  Access = "access",
  Refresh = "refresh",
}

export interface GeneratedAuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface ITokenPayload {
  id: number;
  email: string;
  name: string;
}

export interface JwtData extends ITokenPayload {
  tokenType: Token;
}

export interface ISignUpBody {
  email: string;
  password: string;
  name: string;
  city: string;
  phone: string;
}

export interface IRegisteredUser {
  id: number;
  email: string;
  name: string;
  city: string;
  phone: string;
}

export interface IUser extends IRegisteredUser {
  birthday?: Date;
  photo?: string;
}

export interface ILogInBody {
  email: string;
  password: string;
}

export interface IUserUpdate {
  email: string;
  name: string;
  city: string;
  phone: string;
  birthday?: Date;
  photo?: string;
}
