import dotenv from "dotenv";
import express, { Express, Request, Response, NextFunction  } from "express";
import cors from "cors";
import { RegisterRoutes } from "./generated/routes.js";
import { AppError } from "./common/errors/app.error.js";

// 1. 환경 변수 설정
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
app.use((req: Request, res: Response, next: NextFunction) => {
  (res as any).error = function ({
    errorCode = null,
    message = null,
    data = null,
  }) {
    return this.json({
      resultType: "FAILED",
      error: { errorCode, message, data },
      data: null,
    });
  };

  next();
});

// 2. 미들웨어 설정
app.use(cors()); // cors 방식 허용
app.use(express.static("public")); // 정적 파일 접근
app.use(express.json()); // request의 본문을 json으로 해석할 수 있도록 함(JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석

RegisterRoutes(app);

/**
 * 전역 오류를 처리하기 위한 미들웨어
 */
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log("에러 확인:", err);

  if (res.headersSent) {
    return next(err);
  }

  res.status(err.statusCode || 500).json({
    resultType: "FAILED",
    error: {
      errorCode: err.errorCode || "unknown",
      message: err.reason || err.message || "서버 내부 오류입니다.",
      data: err.data || null,
    },
    data: null,
  });
});

// Express.js에 생성한 엔드 포인트들을 register
const router = express.Router();
RegisterRoutes(router); 
app.use("/api/v1", router);
// 4. 서버 시작
app.listen(port, () => {
  console.log(`[server]: Server is running at <http://localhost>:${port}`);
});



/*morgan테스트용

app.use(morgan("dev"));

app.get("/test", (req, res) => {
  res.send("테스트 성공!");
});

app.listen(3000, () => {
  console.log("서버 실행 중");
}); */
