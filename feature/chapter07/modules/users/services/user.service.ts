import { StatusCodes } from "http-status-codes";
import {
  UserSignUpRequest,
  UserSignUpResponse,
  responseFromReviews,
  responseFromUserMissions,
} from "../dtos/user.dto.js";

import {
  addUser,
  getUser,
  getUserPreferencesByUserId,
  setPreference,
  getMyReviews,
  getMyProgressMissions,
} from "../repositories/user.repository.js";
import { CustomError } from "../../../common/errors/customError.js";

export const userSignUp = async (
  data: UserSignUpRequest
): Promise<UserSignUpResponse> => {
  const joinUserId = await addUser({
    email: data.email,
    name: data.name,
    gender: data.gender,
    birth: new Date(data.birth),
    address: data.address,
    detailAddress: data.detailAddress || null,
    phoneNumber: data.phoneNumber,
  });

  if (joinUserId === null) {
    throw new CustomError(StatusCodes.CONFLICT, "이미 존재하는 이메일입니다.");
  }

  for (const preference of data.preferences) {
    await setPreference(joinUserId, preference);
  }

  const user = await getUser(joinUserId);

  const preferences = (await getUserPreferencesByUserId(joinUserId)).map(
    (obj) => obj.foodCategory.name
  );

  return {
    userId: user.id,
    preferences,
  };
};

export const listMyReviews = async (
  userId: number,
  cursor: number | null
) => {
  await getUser(userId);

  const reviews = await getMyReviews(userId, cursor);
  return responseFromReviews(reviews);
};

export const listMyProgressMissions = async (
  userId: number,
  cursor: number | null
) => {
  await getUser(userId);

  const missions = await getMyProgressMissions(userId, cursor);
  return responseFromUserMissions(missions);
};
