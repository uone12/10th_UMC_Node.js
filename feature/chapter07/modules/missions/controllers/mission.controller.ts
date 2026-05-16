import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { changeMissionToComplete } from "../services/mission.service.js";
import { successResponse } from "../../../common/responses/response.js";
import { CustomError } from "../../../common/errors/customError.js";

export const handleCompleteMission = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const userMissionId = parseInt(req.params.userMissionId, 10);

    if (Number.isNaN(userId)) {
      throw new CustomError(StatusCodes.BAD_REQUEST, "userId가 올바르지 않습니다.");
    }

    if (Number.isNaN(userMissionId)) {
      throw new CustomError(StatusCodes.BAD_REQUEST, "userMissionId가 올바르지 않습니다.");
    }

    const result = await changeMissionToComplete(userId, userMissionId);

    res
      .status(StatusCodes.OK)
      .json(successResponse(result, "미션 완료 처리 성공"));
  } catch (err) {
    next(err);
  }
};
