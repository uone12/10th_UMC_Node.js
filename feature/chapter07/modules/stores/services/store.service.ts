import { StatusCodes } from "http-status-codes";
import {
  responseFromReviews,
  responseFromMissions,
} from "../dtos/store.dto.js";

import {
  getAllStoreReviews,
  getStoreById,
  getStoreMissions,
} from "../repositories/store.repository.js";
import { CustomError } from "../../../common/errors/customError.js";

const validateStoreExists = async (storeId: number) => {
  const store = await getStoreById(storeId);

  if (!store) {
    throw new CustomError(StatusCodes.NOT_FOUND, "존재하지 않는 가게입니다.");
  }

  return store;
};

export const listStoreReviews = async (
  storeId: number,
  cursor: number | null
) => {
  await validateStoreExists(storeId);

  const reviews = await getAllStoreReviews(storeId, cursor);
  return responseFromReviews(reviews);
};

export const listStoreMissions = async (
  storeId: number,
  cursor: number | null
) => {
  await validateStoreExists(storeId);

  const missions = await getStoreMissions(storeId, cursor);
  return responseFromMissions(missions);
};
