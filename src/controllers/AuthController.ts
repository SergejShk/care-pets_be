import { RequestHandler, CookieOptions, Response } from "express";
import { nanoid } from "nanoid";

import { Controller } from "./Controller";

import { signUpSchema } from "../dto/users";

import { AuthService } from "../services/authService";

import { InvalidParameterError } from "../errors/customErrors";

import { BaseResponse, okResponse } from "../api/baseResponses";

import { IRegisteredUser } from "@/interface/auth";

export class AuthController extends Controller {
  authService: AuthService;

  constructor(authService: AuthService) {
    super("/auth");

    this.authService = authService;

    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post("/sign-up", this.link({ route: this.signUp }));
  }

  private signUp: RequestHandler<{}, BaseResponse<IRegisteredUser>> = async (
    req,
    res
  ) => {
    const validatedBody = signUpSchema.safeParse(req.body);
    const id = nanoid();

    if (!validatedBody.success) {
      throw new InvalidParameterError("Bad request");
    }

    const { accessToken, refreshToken, ...newUser } =
      await this.authService.signupUser({ ...req.body, id });

    this.setCookies({ res, accessToken, refreshToken });

    return res.status(201).json(okResponse(newUser));
  };

  private setCookies = ({
    res,
    accessToken,
    refreshToken,
  }: {
    res: Response;
    accessToken: string;
    refreshToken: string;
  }): Response => {
    const expireAccessToken = new Date();
    expireAccessToken.setHours(expireAccessToken.getHours() + 1);

    const expireRefreshToken = new Date();
    expireRefreshToken.setHours(expireRefreshToken.getHours() + 7 * 24);

    const options: CookieOptions = {
      secure: true,
      httpOnly: false,
      sameSite: "none",
    };

    res.cookie("accessToken", accessToken, {
      ...options,
      expires: expireAccessToken,
    });

    res.cookie("refreshToken", refreshToken, {
      ...options,
      expires: expireRefreshToken,
    });

    return res;
  };
}