# Account, Session, VerificationToken 엔티티 설계 가이드

## 1. AccountEntity (accounts 테이블)

| 필드명             | 타입    | PK  | NN  | UQ  | 설명                     |
| ------------------ | ------- | --- | --- | --- | ------------------------ |
| id                 | UUID    | O   | O   |     | 계정 고유 ID             |
| userId             | UUID    |     | O   |     | FK: users.id (소유자)    |
| type               | VARCHAR |     | O   |     | 계정 유형(소셜 등)       |
| provider           | VARCHAR |     | O   |     | 소셜 제공자(google 등)   |
| providerAccountId  | VARCHAR |     | O   |     | 소셜 제공자 계정 ID      |
| refresh_token      | VARCHAR |     |     |     | 리프레시 토큰            |
| access_token       | VARCHAR |     |     |     | 액세스 토큰              |
| expires_at         | BIGINT  |     |     |     | 토큰 만료(UNIX ms)       |
| token_type         | VARCHAR |     |     |     | 토큰 타입                |
| scope              | VARCHAR |     |     |     | 권한 범위                |
| id_token           | VARCHAR |     |     |     | ID 토큰                  |
| session_state      | VARCHAR |     |     |     | 세션 상태                |
| oauth_token_secret | VARCHAR |     |     |     | OAuth 토큰 시크릿        |
| oauth_token        | VARCHAR |     |     |     | OAuth 토큰               |
| user               | FK      |     | O   |     | UserEntity와 다대일 관계 |

---

## 2. SessionEntity (sessions 테이블)

| 필드명       | 타입    | PK  | NN  | UQ  | 설명                      |
| ------------ | ------- | --- | --- | --- | ------------------------- |
| id           | UUID    | O   | O   |     | 세션 고유 ID              |
| sessionToken | VARCHAR |     | O   | O   | 세션 토큰                 |
| userId       | UUID    |     | O   |     | FK: users.id (소유자)     |
| expires      | DATE    |     | O   |     | 만료일(문자열, date 변환) |
| user         | FK      |     | O   |     | UserEntity와 다대일 관계  |

---

## 3. VerificationTokenEntity (verification_tokens 테이블)

| 필드명     | 타입    | PK  | NN  | UQ  | 설명                      |
| ---------- | ------- | --- | --- | --- | ------------------------- |
| id         | UUID    | O   | O   |     | 인증 토큰 고유 ID         |
| token      | VARCHAR |     | O   |     | 인증 토큰                 |
| identifier | VARCHAR |     | O   |     | 식별자(이메일 등)         |
| expires    | DATE    |     | O   |     | 만료일(문자열, date 변환) |

---

## 4. 특이사항 및 참고

- expires, expires_at 등은 ValueTransformer로 문자열↔Date, 문자열↔숫자 변환 처리
- UserEntity와의 관계는 @ManyToOne으로 연결
- 소셜 로그인/세션/이메일 인증 등 인증 전반에 활용되는 구조
- **access_token, refresh_token, expires_at 등 필드는 OAuth2, OpenID Connect 등 토큰 기반 인증(소셜/외부/자체 포함)에서 발급되는 토큰 정보를 저장하며, access/refresh 토큰 기반 로그인에도 실무적으로 활용됨**

---

> 이 문서는 src/entities/account/accounts.ts의 주요 엔티티 구조와 필드 설명, 관계, 특이사항을 정리한 실무 참고용 문서입니다.
