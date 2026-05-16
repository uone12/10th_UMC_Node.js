import {
  ReviewListResponse,
  responseFromReviews,
  responseFromMissions,
  responseFromUserMissions,
} from "../dtos/store.dto.js";

import {
  getAllStoreReviews,
  getMyReviews,
  getStoreMissions,
  getMyProgressMissions,
  completeUserMission,
} from "../repositories/store.repository.js";

export const listStoreReviews = async (
  storeId: number,
  cursor: number
): Promise<ReviewListResponse> => {
  const reviews = await getAllStoreReviews(storeId, cursor);
  return responseFromReviews(reviews);
};

export const listMyReviews = async (userId: number, cursor: number) => {
  const reviews = await getMyReviews(userId, cursor);
  return responseFromReviews(reviews);
};

export const listStoreMissions = async (storeId: number, cursor: number) => {
  const missions = await getStoreMissions(storeId, cursor);
  return responseFromMissions(missions);
};

export const listMyProgressMissions = async (
  userId: number,
  cursor: number
) => {
  const missions = await getMyProgressMissions(userId, cursor);
  return responseFromUserMissions(missions);
};

export const changeMissionToComplete = async (
  userId: number,
  userMissionId: number
) => {
  return await completeUserMission(userId, userMissionId);
};
