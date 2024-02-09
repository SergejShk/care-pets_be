import { RequestHandler } from "express";

import { Controller } from "./Controller";

import { PetsService } from "../services/petsService";

import { createPetSchema } from "../dto/pets";

import { AuthMiddlewares } from "../middlewares/authMiddlewares";

import { InvalidParameterError } from "../errors/customErrors";

import { BaseResponse, okResponse } from "../api/baseResponses";

import { IPet } from "../interface/pets";

export class PetsController extends Controller {
  authMiddlewares: AuthMiddlewares;
  petsService: PetsService;

  constructor(petsService: PetsService, authMiddlewares: AuthMiddlewares) {
    super("/pets");

    this.authMiddlewares = authMiddlewares;
    this.petsService = petsService;

    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      "/new",
      this.authMiddlewares.isAuthorized,
      this.link({ route: this.createPet }),
    );
    this.router.post(
      "/user-pets",
      this.authMiddlewares.isAuthorized,
      this.link({ route: this.getUserPets }),
    );
  }

  private createPet: RequestHandler<{ id: number }, BaseResponse<IPet>> = async (
    req,
    res,
    next,
  ) => {
    try {
      //@ts-ignore
      const userId = req.user.id;

      const validatedBody = createPetSchema.safeParse(req.body);

      if (!validatedBody.success) {
        throw new InvalidParameterError("Bad request");
      }

      const newPet = await this.petsService.createPet(userId, req.body);

      return res.status(200).json(okResponse(newPet));
    } catch (e) {
      next(e);
    }
  };

  private getUserPets: RequestHandler<{ id: number }, BaseResponse<IPet[]>> = async (
    _req,
    res,
    next,
  ) => {
    try {
      const userPets = await this.petsService.getUserPets();

      return res.status(200).json(okResponse(userPets));
    } catch (e) {
      next(e);
    }
  };
}
