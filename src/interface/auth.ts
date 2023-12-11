export enum Token {
  Access = "access",
  Refresh = "refresh",
}

export interface ITokenPayload {
  id: string;
  email: string;
  name: string;
}

export interface ISignUpBody {
  id: string;
  email: string;
  password: string;
  name: string;
  city: string;
  phone: string;
}

export interface IRegisteredUser {
  id: string;
  email: string;
  name: string;
  city: string;
  phone: string;
}

export interface IUser extends IRegisteredUser {
  birthday?: string;
  photo?: string;
}

export interface ILogInBody {
  email: string;
  password: string;
}
