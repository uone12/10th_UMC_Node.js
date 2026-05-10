import { responseFromCompletedMission } from "../dtos/mission.dto.js";
import { completeUserMission } from "../repositories/mission.repository.js";

export const changeMissionToComplete = async (
  userId: number,
  userMissionId: number
) => {
  const completedMission = await completeUserMission(userId, userMissionId);
  return responseFromCompletedMission(completedMission);
};
