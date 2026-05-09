import { setPreference } from "../repositories/user.repository.js";

// 요청 DTO
export interface UserSignUpRequest {
  email: string;
  name: string;
  gender: string;
  birth: Date;
  address?: string;
  detailAddress?: string;
  phoneNumber: string;
  preferences: number[];
}

// 응답 DTO
export interface UserSignUpResponse {
  userId: number;
  preferences: string[];
}

// 요청받은 데이터를 우리 시스템에 맞는 데이터로 변환
export const bodyToUser = (body: UserSignUpRequest) => {
  return {
    email: body.email,
    name: body.name,
    gender: body.gender,
    birth: body.birth,
    address: body.address || "",
    detailAddress: body.detailAddress || "",
    phoneNumber: body.phoneNumber,
  };
};

// DB에서 받은 user와 preferences를 응답 DTO 형태로 변환
export const responseFromUser = (data: {
  user: any;
  preferences: any[];
}): UserSignUpResponse => {
  const preferences = data.preferences.map(
    (p) => p.foodCategory.name
  );

  return {
    userId: data.user.id,
    preferences,
  };
};