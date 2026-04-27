CREATE DATABASE IF NOT EXISTS umc_10th;

USE umc_10th;

CREATE TABLE IF NOT EXISTS member (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    age INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO member (name, email, age)
VALUES
('정준성', 'junsung@example.com', 23),
('홍길동', 'hong@example.com', 25),
('김철수', 'kim@example.com', 21);

SHOW TABLES;

DESC member;

SELECT * FROM member;