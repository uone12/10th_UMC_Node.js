import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import {
  listStoreReviews,
  listStoreMissions,
} from "../services/store.service.js";
import { successResponse } from "../../../common/responses/response.js";
import { CustomError } from "../../../common/errors/customError.js";

const getCursor = (cursor: unknown): number | null => {
  if (typeof cursor !== "string") {
    return null;
  }

  const parsedCursor = parseInt(cursor, 10);

  if (Number.isNaN(parsedCursor)) {
    return null;
  }

  return parsedCursor;
};

export const handleListStoreReviews = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const storeId = parseInt(req.params.storeId, 10);
    const cursor = getCursor(req.query.cursor);

    if (Number.isNaN(storeId)) {
      throw new CustomError(StatusCodes.BAD_REQUEST, "storeId가 올바르지 않습니다.");
    }

    const reviews = await listStoreReviews(storeId, cursor);

    res
      .status(StatusCodes.OK)
      .json(successResponse(reviews, "가게 리뷰 목록 조회 성공"));
  } catch (err) {
    next(err);
  }
};

export const handleListStoreMissions = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const storeId = parseInt(req.params.storeId, 10);
    const cursor = getCursor(req.query.cursor);

    if (Number.isNaN(storeId)) {
      throw new CustomError(StatusCodes.BAD_REQUEST, "storeId가 올바르지 않습니다.");
    }

    const missions = await listStoreMissions(storeId, cursor);

    res
      .status(StatusCodes.OK)
      .json(successResponse(missions, "가게 미션 목록 조회 성공"));
  } catch (err) {
    next(err);
  }
};
