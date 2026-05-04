CREATE DATABASE umc_mission;
USE umc_mission;
CREATE TABLE member (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    point INT DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE store (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(255),
    region VARCHAR(50),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE mission (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    store_id BIGINT NOT NULL,
    reward INT NOT NULL,
    mission_spec VARCHAR(255) NOT NULL,
    deadline DATE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (store_id) REFERENCES store(id)
);

CREATE TABLE member_mission (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    member_id BIGINT NOT NULL,
    mission_id BIGINT NOT NULL,
    status VARCHAR(20) DEFAULT '진행중',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (member_id) REFERENCES member(id),
    FOREIGN KEY (mission_id) REFERENCES mission(id)
);
INSERT INTO member (name, email, point)
VALUES
('김준성', 'junsung@example.com', 1200),
('이민지', 'minji@example.com', 800);

INSERT INTO store (name, address, region)
VALUES
('스타벅스 강남점', '서울시 강남구 테헤란로 1', '강남'),
('맘스터치 홍대점', '서울시 마포구 와우산로 2', '홍대');

INSERT INTO mission (store_id, reward, mission_spec, deadline)
VALUES
(1, 500, '아메리카노 주문 후 리뷰 작성하기', '2026-05-10'),
(2, 700, '싸이버거 세트 주문 후 사진 리뷰 작성하기', '2026-05-15');

INSERT INTO member_mission (member_id, mission_id, status)
VALUES
(1, 1, '진행중'),
(1, 2, '완료'),
(2, 1, '진행중');