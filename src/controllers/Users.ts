import { RequestHandler } from "express";

import { Controller } from "./Controller";

import { BaseResponse, okResponse } from "../api/baseResponses";

export class UsersController extends Controller {
  constructor() {
    super("/users");

    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/", this.link({ route: this.hello }));
  }

  private hello: RequestHandler<{}, BaseResponse<string>> = async (_, res) => {
    return res.status(200).json(okResponse("Hello user!"));
  };
}
