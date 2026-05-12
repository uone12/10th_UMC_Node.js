1. 저번주 피드백을 바탕으로 수정한 것
    1. modules 내부에 missions 폴더를 새롭게 생성하고 커서 부분은 spread 분법을 사용하여  cursor 값이 존재할 때만 cursor와 skip 옵션이 적용되도록 수정함 → 처음에는 일반 조회가 수행되고 이후부터는 커서 기반 페이지 네이션이 수행됨.
    2. 가게 존재 여부 검증 로직 : 기존에는 존재하지 않는 storeId를 요청하더라도 단순히 빈 배열이 반환되었지만, 수정 이후에는 먼저 getStoreById()를 호출하여 가게 존재 여부를 검사하도록 변경
    3. 사용자 입력 값 검증 로직 추가 : controller 계층에서 필수값, 타입, enum 값 등을 검사하는 로직을 추가
        - name, gender, birthDate, address 존재 여부 확인
        - 문자열 타입 여부 검사
        - gender 값이 MALE 또는 FEMALE인지 검사
        - preferredFoodCategoryIds가 배열인지 검사
    4. Prisma 조회 메서드 개선  :  id나 email처럼 unique한 값을 조회할 때는 findUniqueOrThrow()를 사용하도록 수정
    5. 공통 응답 형식 적용  : successResponse와 errorResponse 함수를 common 폴더에 추가하여 모든 API가 동일한 형태로 응답하도록 수정
    6. Custom Error 및 전역 에러 처리 적용 : CustomError 클래스를 생성하여 상태코드 관리가 용이하도록 수정
2. 저번주 피드백을 바탕으로 수정한 것
    1. modules 내부에 missions 폴더를 새롭게 생성하고 커서 부분은 spread 분법을 사용하여  cursor 값이 존재할 때만 cursor와 skip 옵션이 적용되도록 수정함 → 처음에는 일반 조회가 수행되고 이후부터는 커서 기반 페이지 네이션이 수행됨.
    2. 가게 존재 여부 검증 로직 : 기존에는 존재하지 않는 storeId를 요청하더라도 단순히 빈 배열이 반환되었지만, 수정 이후에는 먼저 getStoreById()를 호출하여 가게 존재 여부를 검사하도록 변경
    3. 사용자 입력 값 검증 로직 추가 : controller 계층에서 필수값, 타입, enum 값 등을 검사하는 로직을 추가
        - name, gender, birthDate, address 존재 여부 확인
        - 문자열 타입 여부 검사
        - gender 값이 MALE 또는 FEMALE인지 검사
        - preferredFoodCategoryIds가 배열인지 검사
    4. Prisma 조회 메서드 개선  :  id나 email처럼 unique한 값을 조회할 때는 findUniqueOrThrow()를 사용하도록 수정
    5. 공통 응답 형식 적용  : successResponse와 errorResponse 함수를 common 폴더에 추가하여 모든 API가 동일한 형태로 응답하도록 수정
    6. Custom Error 및 전역 에러 처리 적용 : CustomError 클래스를 생성하여 상태코드 관리가 용이하도록 수정
3. 미들웨어 적용
    1. index.ts 파일 상단에 cookie-parser를 import, app.use(cookieParser());을 작성
    2. 미들웨어 설정 부분
    
    ```jsx
    app.use(cors());
    app.use(morgan("dev"));
    app.use(cookieParser());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    ```
