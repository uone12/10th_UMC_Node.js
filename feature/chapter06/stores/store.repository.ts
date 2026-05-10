export interface ReviewItem {
  id: number;
  content: string;
  rating: number;
}

export interface ReviewListResponse {
  data: any[];
  pagination: {
    cursor: number | null;
  };
}

export const responseFromReviews = (reviews: any[]): ReviewListResponse => {
  const lastReview = reviews[reviews.length - 1];

  return {
    data: reviews,
    pagination: {
      cursor: lastReview ? lastReview.id : null,
    },
  };
};

export const responseFromMissions = (missions: any[]) => {
  const lastMission = missions[missions.length - 1];

  return {
    data: missions,
    pagination: {
      cursor: lastMission ? lastMission.id : null,
    },
  };
};

export const responseFromUserMissions = (userMissions: any[]) => {
  const lastMission = userMissions[userMissions.length - 1];

  return {
    data: userMissions,
    pagination: {
      cursor: lastMission ? lastMission.id : null,
    },
  };
};
