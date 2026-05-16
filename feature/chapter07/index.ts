import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import {
  handleUserSignUp,
  handleListMyReviews,
  handleListMyProgressMissions,
} from "./modules/users/controllers/user.controller.js";
import {
  handleListStoreReviews,
  handleListStoreMissions,
} from "./modules/stores/controllers/store.controller.js";
import { handleCompleteMission } from "./modules/missions/controllers/mission.controller.js";
import { errorHandler } from "./common/middlewares/errorHandler.js";

// 1. 환경 변수 설정
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// 2. 미들웨어 설정
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 3. 기본 라우트
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World! This is TypeScript Server!");
});

// 4. API 라우트
app.post("/api/v1/users/signup", handleUserSignUp);

app.get("/api/v1/stores/:storeId/reviews", handleListStoreReviews);
app.get("/api/v1/stores/:storeId/missions", handleListStoreMissions);

app.get("/api/v1/users/:userId/reviews", handleListMyReviews);
app.get("/api/v1/users/:userId/missions/progress", handleListMyProgressMissions);

app.patch(
  "/api/v1/users/:userId/missions/:userMissionId/complete",
  handleCompleteMission
);

// 5. 에러 처리 미들웨어는 모든 라우트 아래에 둔다.
app.use(errorHandler);

// 6. 서버 시작
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
