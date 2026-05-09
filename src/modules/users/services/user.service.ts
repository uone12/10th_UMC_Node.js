import {
  UserSignUpRequest,
  UserSignUpResponse,
} from "../dtos/user.dto.js";

import {
  addUser,
  getUser,
  getUserPreferencesByUserId,
  setPreference,
} from "../repositories/user.repository.js";

export const userSignUp = async (
  data: UserSignUpRequest
): Promise<UserSignUpResponse> => {
  const joinUserId = await addUser({
    email: data.email,
    name: data.name,
    gender: data.gender,
    birth: new Date(data.birth),
    address: data.address || "",
    detailAddress: data.detailAddress || "",
    phoneNumber: data.phoneNumber,
  });

  if (joinUserId === null) {
    throw new Error("이미 존재하는 이메일입니다.");
  }

  for (const preference of data.preferences) {
    await setPreference(joinUserId, preference);
  }

  const user = await getUser(joinUserId);

  if (!user) {
    throw new Error("사용자를 찾을 수 없습니다.");
  }

  const preferences = (
    await getUserPreferencesByUserId(joinUserId)
  ).map((obj) => obj.foodCategory.name);

  return {
    userId: user.id,
    preferences,
  };
};