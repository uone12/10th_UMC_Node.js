export const responseFromCompletedMission = (userMission: any) => {
  return {
    userMissionId: userMission.id,
    status: userMission.status,
    mission: userMission.mission,
  };
};
