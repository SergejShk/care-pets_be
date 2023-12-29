import { RequestHandler } from "express";

import { Controller } from "./Controller";

import { FilesService } from "../services/filesService";

import { filesSchema } from "../dto/files";

import { AuthMiddlewares } from "../middlewares/authMiddlewares";

import { InvalidParameterError } from "../errors/customErrors";

import { BaseResponse, okResponse } from "../api/baseResponses";

import { IS3PresignedPostResponse } from "../interface/files";

export class FilesController extends Controller {
  authMiddlewares: AuthMiddlewares;
  filesService: FilesService;

  constructor(filesService: FilesService, authMiddlewares: AuthMiddlewares) {
    super("/files");

    this.filesService = filesService;
    this.authMiddlewares = authMiddlewares;

    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      "/presigned-link/:folder",
      this.authMiddlewares.isAuthorized,
      this.link({ route: this.createPresignedPost }),
    );
  }

  private createPresignedPost: RequestHandler<
    { folder: string },
    BaseResponse<IS3PresignedPostResponse>
  > = async (req, res, next) => {
    try {
      const folder = req.params.folder;

      const validatedBody = filesSchema.safeParse({ ...req.body, folder });

      if (!validatedBody.success) {
        throw new InvalidParameterError("Bad request");
      }
      const key = validatedBody.data.folder + "/" + validatedBody.data.key;

      const presignedPost = await this.filesService.createPresignedPost(
        key,
        validatedBody.data.type,
      );

      return res.status(200).json(okResponse(presignedPost));
    } catch (e) {
      next(e);
    }
  };
}
