import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { CustomError } from "../errors/customError.js";
import { errorResponse } from "../responses/response.js";

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(err);

  if (err instanceof CustomError) {
    res.status(err.statusCode).json(errorResponse(err.statusCode, err.message));
    return;
  }

  if (err instanceof Error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, err.message));
    return;
  }

  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json(errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "서버 오류가 발생했습니다."));
};
