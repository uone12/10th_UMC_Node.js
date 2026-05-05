```
1. 내가 작성한 리뷰 목록
   <controller>
         export const handleListMyReviews = async (...) => {
          const userId = parseInt(req.params.userId, 10);
          const cursor = getCursor(req.query.cursor);
      
          const reviews = await listMyReviews(userId, cursor);
      
          res.status(StatusCodes.OK).json(reviews);
        };
      -> 처음 api를 받은 후  GET /api/v1/users/1/reviews 이러한 주소로 요청하면 req.params.userId에       서 1을 꺼내서 userId로 사용한다.
  <service>
      export const listMyReviews = async (userId: number, cursor: number) => {
      const reviews = await getMyReviews(userId, cursor);
      return responseFromReviews(reviews);
    };
   getMyReviews()로 DB에서 리뷰를 가져오고 responseFromReviews()로 응답 모양을 정리한다.

   <repository>
         export const getMyReviews = async (userId: number, cursor: number) => {
        return await prisma.userStoreReview.findMany({
          where: {
            userId,
            id: { gt: cursor },
          },
          orderBy: { id: "asc" },
          take: 5,
        });
      };
      -> 실제로 내가 작성한 리뷰를 데이터베이스에서 찾는 부분

3. 특정 가게의 미션 목록

   <controller>
         export const handleListStoreMissions = async (...) => {
            const storeId = parseInt(req.params.storeId, 10);
            const cursor = getCursor(req.query.cursor);
          
            const missions = await listStoreMissions(storeId, cursor);
          
            res.status(StatusCodes.OK).json(missions);
          };
      -> GET /api/v1/users/1/reviews 요청을 받으면 storeId를 1로 받는다. 

  <service>
     export const listStoreMissions = async (storeId: number, cursor: number) => {
        const missions = await getStoreMissions(storeId, cursor);
        return responseFromMissions(missions);
      };
   -> DB에서 미션을 가져오고 응답 형태로 정리한다.

   <repository>
      export const getStoreMissions = async (storeId: number, cursor: number) => {
        return await prisma.mission.findMany({
          where: {
            storeId,
            id: { gt: cursor },
          },
          orderBy: { id: "asc" },
          take: 5,
        });
      };
      -> 특정 가게의 미션 목록을 가져오는 부분이다. 

4. 내가 진행 중인 미션 목록

  <controller>
      export const handleListMyProgressMissions = async (...) => {
        const userId = parseInt(req.params.userId, 10);
        const cursor = getCursor(req.query.cursor);
      
        const missions = await listMyProgressMissions(userId, cursor);
      
        res.status(StatusCodes.OK).json(missions);
      };
        -> GET /api/v1/users/1/reviews 요청을 받으면 userId를 1로 받는다.

    <service>
       export const listMyProgressMissions = async (
          userId: number,
          cursor: number
        ) => {
          const missions = await getMyProgressMissions(userId, cursor);
          return responseFromUserMissions(missions);
        };
     -> DB에서 미션을 가져오고 응답 형태로 정리한다.
 
     <repository>
        export const getMyProgressMissions = async (userId: number, cursor: number) => {
          return await prisma.userMission.findMany({
            where: {
              userId,
              status: "IN_PROGRESS",
              id: { gt: cursor },
            },
            include: {
              mission: {
                include: {
                  store: true,
                },
              },
            },
            orderBy: { id: "asc" },
            take: 5,
          });
        };
        -> 내가 진행 중인 미션만 찾는 부분이다.

5. 내가 진행 중인 미션 목록

  <controller>
      export const handleCompleteMission = async (...) => {
        const userId = parseInt(req.params.userId, 10);
        const userMissionId = parseInt(req.params.userMissionId, 10);
      
        const result = await changeMissionToComplete(userId, userMissionId);
      
        res.status(StatusCodes.OK).json({
          message: "미션이 완료 처리되었습니다.",
          result,
        });
      };
        -> PATCH /api/v1/users/1/missions/7/complete에서 userId는 1로 userMissionId는 7로 전달한            다.

    <service>
        export const changeMissionToComplete = async (
          userId: number,
          userMissionId: number
        ) => {
          return await completeUserMission(userId, userMissionId);
        };
     -> 여기는 미션을 완료로 처리하기 위한 작업을 repository로 토스한다. 

     <repository>
        export const completeUserMission = async (
          userId: number,
          userMissionId: number
        ) => {
          return await prisma.userMission.update({
            where: {
              id: userMissionId,
              userId,
              status: "IN_PROGRESS",
            },
            data: {
              status: "COMPLETED",
            },
          });
        };
        -> DB 값을 바꾸는 부분이다.
```
따라서, 흐름을 정리해보면
```
1. 내가 작성한 리뷰 목록
→ getMyReviews()의 where: { userId }

2. 특정 가게의 미션 목록
→ getStoreMissions()의 where: { storeId }

3. 내가 진행 중인 미션 목록
→ getMyProgressMissions()의 where: { userId, status: "IN_PROGRESS" }

4. 진행 완료로 바꾸기
→ completeUserMission()의 data: { status: "COMPLETED" }
```
