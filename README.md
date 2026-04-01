# 🍃 10th_Node.js

INHA UMC 10th_Node.js 미션, 키워드 인증 레포지터리입니다!

## 💻 Member

1. 원이/정채원
2. 와와/조현영
3. 키티/백은서
4. 여울/임수정

## 📁 디렉토리 구조

```bash
.
├── README.md
└── mission
    └── README.md
```

### mission 폴더

미션을 진행하신 내용을 정리한 파일을 올리는
폴더입니다.

매 주차별 정리 내용은 mission/chapter00/README.md 파일에 작성 부탁드립니다!!

해당 파일에는 자유로운 형식으로 자신의 미션을 정리해주세요!!

## 🌳 branch 규칙

```bash
├─main
    ├─서키/main
 ...
```

1. `닉네임/main 브랜치`가 기본 브랜치로 pr 보낼 때 root 브랜치(main 브랜치)가 아닌 닉네임/main 브랜치로 올립니다.
2. 매주 워크북, 실습, 그리고 미션은 각자의 닉네임/main 브랜치를 base 브랜치로 삼아 fork한 레포지터리 에서 base branch에 pull request를 생성합니다.
3. 파트장의 approve를 받으면, pr을 머지하고 이때, pr 제목은
   `[n주차/닉네임] {키워드 or 미션} 제출합니다` 형식으로 작성합니다.

## 🔖 커밋 컨벤션

예시 ) `mission: 0주차 미션 인증`

| Message  | 설명                  |
| :------: | :-------------------- |
| mission  | 미션 수행             |
| practice | 실습 수행             |
| workbook | 워크북 정리           |
|   fix    | 버그 수정             |
|   docs   | 문서 수정             |
| comment  | 주석 추가 및 변경     |
|   test   | 테스트 코드 추가      |
|  rename  | 파일 혹은 폴더명 수정 |
|  remove  | 파일 혹은 폴더 삭제   |
|  chore   | 기타 변경사항         |
