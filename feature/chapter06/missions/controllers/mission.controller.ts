import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { changeMissionToComplete } from "../services/mission.service.js";

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

