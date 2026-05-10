import { prisma } from "../../../db.config.js";

const PAGE_SIZE = 10;

export const getStoreById = async (storeId: number) => {
  return await prisma.store.findUnique({
    where: {
      id: storeId,
    },
    select: {
      id: true,
      name: true,
    },
  });
};

export const getAllStoreReviews = async (
  storeId: number,
  cursor: number | null
) => {
  return await prisma.userStoreReview.findMany({
    where: {
      storeId,
    },
    select: {
      id: true,
      content: true,
      rating: true,
      createdAt: true,
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: {
      id: "asc",
    },
    take: PAGE_SIZE,
    ...(cursor
      ? {
          cursor: {
            id: cursor,
          },
          skip: 1,
        }
      : {}),
  });
};

export const getStoreMissions = async (
  storeId: number,
  cursor: number | null
) => {
  return await prisma.mission.findMany({
    where: {
      storeId,
    },
    select: {
      id: true,
      content: true,
      reward: true,
      deadline: true,
      store: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: {
      id: "asc",
    },
    take: PAGE_SIZE,
    ...(cursor
      ? {
          cursor: {
            id: cursor,
          },
          skip: 1,
        }
      : {}),
  });
};
