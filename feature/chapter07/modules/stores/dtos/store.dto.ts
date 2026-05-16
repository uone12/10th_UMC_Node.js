export interface PaginationResponse<T> {
  data: T[];
  pagination: {
    cursor: number | null;
  };
}

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

export const responseFromMissions = <T extends { id: number }>(
  missions: T[]
): PaginationResponse<T> => {
  const lastMission = missions[missions.length - 1];

  return {
    data: missions,
    pagination: {
      cursor: lastMission ? lastMission.id : null,
    },
  };
};
