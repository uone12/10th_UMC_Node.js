export interface UserSignUpRequest {
  email: string;
  name: string;
  gender: string;
  birth: string;
  address?: string;
  detailAddress?: string;
  phoneNumber: string;
  preferences: number[];
}

export interface UserSignUpResponse {
  userId: number;
  preferences: string[];
}

export interface PaginationResponse<T> {
  data: T[];
  pagination: {
    cursor: number | null;
  };
}

export const responseFromUser = (data: {
  user: any;
  preferences: any[];
}): UserSignUpResponse => {
  const preferences = data.preferences.map((p) => p.foodCategory.name);

  return {
    userId: data.user.id,
    preferences,
  };
};

export const responseFromReviews = <T extends { id: number }>(
  reviews: T[]
): PaginationResponse<T> => {
  const lastReview = reviews[reviews.length - 1];

  return {
    data: reviews,
    pagination: {
      cursor: lastReview ? lastReview.id : null,
    },
  };
};

export const responseFromUserMissions = <T extends { id: number }>(
  userMissions: T[]
): PaginationResponse<T> => {
  const lastUserMission = userMissions[userMissions.length - 1];

  return {
    data: userMissions,
    pagination: {
      cursor: lastUserMission ? lastUserMission.id : null,
    },
  };
};
