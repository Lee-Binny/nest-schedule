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

|이름|형타입|설정|용도|
| --- | ---- | --- | --- |
|id|BIGINT(20)|PK, NN, AI|유저 식별 id|
|userId|VARCHAR(15)|NN|유저 아이디|
|password|VARCHAR(100)|NN|유저 비밀번호|
|nickname|VARCHAR(15)|NN|유저 닉네임|
|createdAt|DATETIME| |생성날짜|
|updatedAt|DATETIME| |갱신날짜|

**group (그룹 테이블)**

|이름|형타입|설정|용도|
| --- | ---- | --- | --- |
|id|BIGINT(20)|PK, NN, AI|그룹 식별 id|
|name|VARCHAR(45)|NN|그룹 이름|
|color|VARCHAR(7)|NN|그룹 고유 색깔|
|createdAt|DATETIME| |생성날짜|
|updatedAt|DATETIME| |갱신날짜|

**member (멤버 테이블)**

|이름|형타입|설정|용도|
| --- | ---- | --- | --- |
|id|BIGINT(20)|PK, NN, AI|멤버 식별 id|
|groupId|BIGINT(20)|FK, NN|그룹 아이디(group.id)|
|userId|BIGINT(20)|FK, NN|유저 아이디(user.id)|
|grade|TINYINT(1)|NN|멤버 등급 (`0`: MASTER, `1`: ADMIN, `2`: NORMAL)|
|color|VARCHAR(7)|NN|멤버 고유 색깔|
|createdAt|DATETIME| |생성날짜|
|updatedAt|DATETIME| |갱신날짜|

**schedule (일정 테이블)**

|이름|형타입|설정|용도|
| --- | ---- | --- | --- |
|id|BIGINT(20)|PK, NN, AI|일정 식별 id|
|groupId|BIGINT(20)|FK, NN|그룹 아이디(group.id)|
|userId|BIGINT(20)|FK, NN|유저 아이디(user.id)|
|title|VARCHAR(45)|NN|일정 내용|
|startAt|DATETIME| |일정 시작 날짜|
|endAt|DATETIME| |일정 끝 날짜|
|title|VARCHAR(45)|NN|일정 내용|
|createdAt|DATETIME| |생성날짜|
|updatedAt|DATETIME| |갱신날짜|

## API 명세서
**Auth**

|기능|엔드 포인트|메소드|param|body|
| -- | -- | -- | -- | -- |
|로그인|/auth|POST| |`userId`: 아이디, `password`: 비밀번호|

**User**

|기능|엔드 포인트|메소드|param|body|
| -- | -- | -- | -- | -- |
|유저 불러오기|/user|GET| | |
|유저 단일 검색|/user/:id|GET|`id`: 유저 식별 id| |
|유저 생성|/user|POST| |`userId`: 유저 아이디, `password`: 패스워드, `nickname`: 닉네임|
|유저 수정|/user/:id|PUT|`id`: 유저 식별 id| `nickname`: 닉네임|
|유저 삭제|/user|DELETE| | |

**Group**

|기능|엔드 포인트|메소드|param|body|
| -- | -- | -- | -- | -- |
|그룹 생성|/group|POST| |`name`: 그룹명, `color`: 그룹 고유색, `myColor`: 내 고유색|
|내 그룹 가져오기|/group|GET|||
|그룹 검색|/group/:name|GET|`name`: 검색할 키워드||
|그룹 가입|/group/join/:id|POST|`id`: 가입할 그룹 id|`color`: 내 고유색|
|그룹 일정 가져오기|/group/schedule/:id|GET|`id`: 그룹 식별 id||
|그룹 멤버 불러오기|/group/members/:id|GET|`id`: 그룹 식별 id||
|그룹 수정|/group/:id|PUT|`id`: 그룹 식별 id|`name`: 그룹명|
|그룹 삭제|/group/:id|DELETE|`id`: 그룹 식별 id| |

**member**

|기능|엔드 포인트|메소드|param|body|
| -- | -- | -- | -- | -- |
|멤버 가입시키기|/member|POST||`userId`: 가입시킬 유저 id, `groupId`: 가입시킬 그룹 id, `color`: 유저 고유색|
|그룹 내 정보 수정|/member|POST||`groupId`: 그룹 식별 id, `color`: 수정할 고유색|
|멤버 등급 수정하기|/member/grade||`userId`: 유저 식별 id, `groupId`: 그룹 식별 id, `grade`: 수정할 등급|
|그룹 탈퇴하기|/member/:groupId|DELETE|`groupId`: 그룹 식별 id||

**schedule**

|기능|엔드 포인트|메소드|param|body|
| -- | -- | -- | -- | -- |
|스케줄 생성|/schedule|POST||`groupId`: 그룹 식별 id, `title`: 일정 내용, `startAt`:일정 시작 날짜, `endAt`: 일정 끝 날짜|
|스케줄 수정|/schedule/:scheduleId|PUT|`scheduleId`: 스케줄 식별 id|`title`: 일정 내용, `startAt`:일정 시작 날짜, `endAt`: 일정 끝 날짜|
|스케줄 삭제|/schedule/:scheduleId|DELETE|`scheduleId`: 스케줄 식별 id||

## 로그인 전략
- local strategy(passpot-local)을 사용하여 DB 값으로 로그인한다.
- passport를 사용하여 req.user에 로그인 값을 저장하여 클라이언트에서 user 값을 받지 않고 req.user 데이터를 사용한다.
- 로그인 성공 시 jwt를 사용하여 token을 생성하여 클라이언트로 전달한다.
- 클라이언트는 회원가입, 로그인을 제외한 API에 jwt의 accest token을 Bearer Toekn으로 전송한다.
