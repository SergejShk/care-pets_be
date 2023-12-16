import { RequestHandler } from "express";

import { Controller } from "./Controller";

import { UsersService } from "../services/usersService";

import { updateUserSchema } from "../dto/users";

import { AuthMiddlewares } from "../middlewares/authMiddlewares";

import { InvalidParameterError } from "../errors/customErrors";

import { BaseResponse, okResponse } from "../api/baseResponses";

import { IUser } from "../interface/auth";

export class UsersController extends Controller {
  authMiddlewares: AuthMiddlewares;
  usersService: UsersService;

  constructor(usersService: UsersService, authMiddlewares: AuthMiddlewares) {
    super("/users");

    this.authMiddlewares = authMiddlewares;
    this.usersService = usersService;

    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.put(
      "/update/:id",
      this.authMiddlewares.isAuthorized,
      this.link({ route: this.updateUser }),
    );
  }

  private updateUser: RequestHandler<{ id: number }, BaseResponse<IUser>> = async (
    req,
    res,
    next,
  ) => {
    try {
      const id = Number(req.params.id);

      const validatedBody = updateUserSchema.safeParse({
        ...req.body,
        id,
      });

      if (!validatedBody.success) {
        throw new InvalidParameterError("Bad request");
      }

      const user = (await this.usersService.updateUser(id, req.body)) as IUser;

      return res.status(200).json(okResponse(user));
    } catch (e) {
      next(e);
    }
  };
}
