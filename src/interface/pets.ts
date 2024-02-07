import { IPhoto } from "./common";

export interface IPet {
  id: number;
  name: string;
  birthday: Date;
  breed: string;
  photo?: IPhoto | null;
  comments: string;
}
