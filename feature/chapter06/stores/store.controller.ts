import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

import {
  listStoreReviews,
  listMyReviews,
  listStoreMissions,
  listMyProgressMissions,
  changeMissionToComplete,
} from "../services/store.service.js";

const getCursor = (cursor: unknown) => {
  return typeof cursor === "string" ? parseInt(cursor, 10) : 0;
};

export const handleListStoreReviews = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const storeId = parseInt(req.params.storeId, 10);
    const cursor = getCursor(req.query.cursor);

    const reviews = await listStoreReviews(storeId, cursor);

    res.status(StatusCodes.OK).json(reviews);
  } catch (err) {
    next(err);
  }
};

export const handleListMyReviews = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const cursor = getCursor(req.query.cursor);

    const reviews = await listMyReviews(userId, cursor);

    res.status(StatusCodes.OK).json(reviews);
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

    const missions = await listStoreMissions(storeId, cursor);

    res.status(StatusCodes.OK).json(missions);
  } catch (err) {
    next(err);
  }
};

export const handleListMyProgressMissions = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const cursor = getCursor(req.query.cursor);

    const missions = await listMyProgressMissions(userId, cursor);

    res.status(StatusCodes.OK).json(missions);
  } catch (err) {
    next(err);
  }
};

export const handleCompleteMission = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const userMissionId = parseInt(req.params.userMissionId, 10);

    const result = await changeMissionToComplete(userId, userMissionId);

    res.status(StatusCodes.OK).json({
      message: "미션이 완료 처리되었습니다.",
      result,
    });
  } catch (err) {
    next(err);
  }
};
