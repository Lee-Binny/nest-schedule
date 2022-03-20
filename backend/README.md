# Nest-Schedule (Backend)

## 프로젝트 설명
그룹을 생성하여 멤버들을 추가, 삭제할 수 있으며 그 그룹원들과 함께 일정을 공유하는 사이드 프로젝트이다.

## 기술 스택
- Back-End: NestJS, TypeScript, TypeOrm
- Database: MySQL(AWS RDS)
- IDEA: IntelliJ
- OS: Mac

## 데이터베이스
**user (유저 테이블)**

| 이름 | 형타입 | 설정 | 용도 |
| --- | ---- | --- | --- |
| id | BIGINT(20) | PK, NN, AI | 유저 식별 id |
| userId | VARCHAR(15) | NN | 유저 아이디 |
| password | VARCHAR(100) | NN | 유저 비밀번호 |
| nickname | VARCHAR(15) | NN | 유저 닉네임 |
| createdAt | DATETIME | | 생성날짜 |
| updatedAt | DATETIME | | 갱신날짜 |

**group (그룹 테이블)**

| 이름 | 형타입 | 설정 | 용도 |
| --- | ---- | --- | --- |
| id | BIGINT(20) | PK, NN, AI | 그룹 식별 id |
| name | VARCHAR(45) | NN | 그룹 이름 |
| color | VARCHAR(7) | NN | 그룹 고유 색깔 |
| createdAt | DATETIME | | 생성날짜 |
| updatedAt | DATETIME | | 갱신날짜 |

**member (멤버 테이블)**

| 이름 | 형타입 | 설정 | 용도 |
| --- | ---- | --- | --- |
| id | BIGINT(20) | PK, NN, AI | 멤버 식별 id |
| groupId | BIGINT(20) | FK, NN | 그룹 아이디(group.id) |
| userId | BIGINT(20) | FK, NN | 유저 아이디(user.id) |
| grade | TINYINT(1) | NN | 멤버 등급 (`0`: MASTER, `1`: ADMIN, `2`: NORMAL) |
| color | VARCHAR(7) | NN | 멤버 고유 색깔 |
| createdAt | DATETIME | | 생성날짜 |
| updatedAt | DATETIME | | 갱신날짜 |

**schedule (일정 테이블)**

| 이름 | 형타입 | 설정 | 용도 |
| --- | ---- | --- | --- |
| id | BIGINT(20) | PK, NN, AI | 일정 식별 id |
| groupId | BIGINT(20) | FK, NN | 그룹 아이디(group.id) |
| userId | BIGINT(20) | FK, NN | 유저 아이디(user.id) |
| title | VARCHAR(45) | NN | 일정 내용 |
| startAt | DATETIME | | 일정 시작 날짜 |
| endAt | DATETIME | | 일정 끝 날짜 |
| title | VARCHAR(45) | NN | 일정 내용 |
| createdAt | DATETIME | | 생성날짜 |
| updatedAt | DATETIME | | 갱신날짜 |

