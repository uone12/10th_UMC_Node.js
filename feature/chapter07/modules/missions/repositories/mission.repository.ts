import { StatusCodes } from "http-status-codes";
import { prisma } from "../../../db.config.js";
import { CustomError } from "../../../common/errors/customError.js";

export const completeUserMission = async (
  userId: number,
  userMissionId: number
) => {
  const userMission = await prisma.userMission.findFirst({
    where: {
      id: userMissionId,
      userId,
    },
  });

  if (!userMission) {
    throw new CustomError(StatusCodes.NOT_FOUND, "진행 중인 미션을 찾을 수 없습니다.");
  }

  if (userMission.status === "COMPLETE") {
    throw new CustomError(StatusCodes.BAD_REQUEST, "이미 완료된 미션입니다.");
  }

  return await prisma.userMission.update({
    where: { id: userMissionId },
    data: { status: "COMPLETE" },
    include: {
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
  });
};
