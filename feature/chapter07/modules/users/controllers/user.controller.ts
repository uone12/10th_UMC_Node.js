import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import {
  userSignUp,
  listMyReviews,
  listMyProgressMissions,
} from "../services/user.service.js";
import { UserSignUpRequest } from "../dtos/user.dto.js";
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

const isValidGender = (gender: unknown): gender is string => {
  return gender === "MALE" || gender === "FEMALE";
};

const isValidDate = (date: unknown): date is string => {
  if (typeof date !== "string") {
    return false;
  }

  return !Number.isNaN(new Date(date).getTime());
};

const validateSignUpBody = (body: Partial<UserSignUpRequest>) => {
  if (!body.email || typeof body.email !== "string") {
    return "email은 필수이며 문자열이어야 합니다.";
  }

  if (!body.name || typeof body.name !== "string") {
    return "name은 필수이며 문자열이어야 합니다.";
  }

  if (!isValidGender(body.gender)) {
    return "gender는 MALE 또는 FEMALE이어야 합니다.";
  }

  if (!isValidDate(body.birth)) {
    return "birth는 올바른 날짜 형식이어야 합니다.";
  }

  if (!body.address || typeof body.address !== "string") {
    return "address는 필수이며 문자열이어야 합니다.";
  }

  if (
    body.detailAddress !== undefined &&
    body.detailAddress !== null &&
    typeof body.detailAddress !== "string"
  ) {
    return "detailAddress는 문자열이어야 합니다.";
  }

  if (!body.phoneNumber || typeof body.phoneNumber !== "string") {
    return "phoneNumber는 필수이며 문자열이어야 합니다.";
  }

  if (!Array.isArray(body.preferences)) {
    return "preferences는 배열이어야 합니다.";
  }

  if (body.preferences.some((preference) => typeof preference !== "number")) {
    return "preferences의 값은 숫자여야 합니다.";
  }

  return null;
};

export const handleUserSignUp = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const validationError = validateSignUpBody(req.body);

    if (validationError) {
      throw new CustomError(StatusCodes.BAD_REQUEST, validationError);
    }

    const user = await userSignUp(req.body);

    res
      .status(StatusCodes.CREATED)
      .json(successResponse(user, "회원가입 성공"));
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

    if (Number.isNaN(userId)) {
      throw new CustomError(StatusCodes.BAD_REQUEST, "userId가 올바르지 않습니다.");
    }

    const reviews = await listMyReviews(userId, cursor);

    res
      .status(StatusCodes.OK)
      .json(successResponse(reviews, "내가 작성한 리뷰 목록 조회 성공"));
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

    if (Number.isNaN(userId)) {
      throw new CustomError(StatusCodes.BAD_REQUEST, "userId가 올바르지 않습니다.");
    }

    const missions = await listMyProgressMissions(userId, cursor);

    res
      .status(StatusCodes.OK)
      .json(successResponse(missions, "내가 진행 중인 미션 목록 조회 성공"));
  } catch (err) {
    next(err);
  }
};
