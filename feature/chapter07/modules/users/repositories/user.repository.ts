import { prisma } from "../../../db.config.js";

const PAGE_SIZE = 10;

export const addUser = async (data: any) => {
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (user) {
    return null;
  }

  const created = await prisma.user.create({
    data: {
      email: data.email,
      name: data.name,
      gender: data.gender,
      birth: data.birth,
      address: data.address,
      detailAddress: data.detailAddress,
      phoneNumber: data.phoneNumber,
    },
  });

  return created.id;
};

export const getUser = async (userId: number) => {
  return await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
  });
};

export const setPreference = async (userId: number, foodCategoryId: number) => {
  await prisma.userFavorCategory.create({
    data: {
      userId,
      foodCategoryId,
    },
  });
};

export const getUserPreferencesByUserId = async (userId: number) => {
  return await prisma.userFavorCategory.findMany({
    where: {
      userId,
    },
    include: {
      foodCategory: true,
    },
    orderBy: {
      foodCategoryId: "asc",
    },
  });
};

export const getMyReviews = async (
  userId: number,
  cursor: number | null
) => {
  return await prisma.userStoreReview.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      content: true,
      rating: true,
      createdAt: true,
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

export const getMyProgressMissions = async (
  userId: number,
  cursor: number | null
) => {
  return await prisma.userMission.findMany({
    where: {
      userId,
      status: "IN_PROGRESS",
    },
    select: {
      id: true,
      status: true,
      createdAt: true,
      mission: {
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
