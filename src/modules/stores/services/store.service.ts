import { ReviewListResponse, responseFromReviews } from "../dtos/store.dto.js";
import { getAllStoreReviews } from "../repositories/store.repository.js";
export const listStoreReviews = async (
  storeId: number,
  cursor: number
): Promise<ReviewListResponse> => {
  const reviews = await getAllStoreReviews(storeId, cursor);

  return responseFromReviews(reviews);
};