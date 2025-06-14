# 쿠키 기반 익명 유저 식별 및 서버 DB 개인화 가이드

이 가이드는 로그인 없이도 사용자를 식별하고, 개인화 데이터를 서버 DB에 안전하게 저장/관리하는 실무 패턴을 설명합니다.

---

## 1. 개념 요약

- **익명ID(Anonymous ID)**: UUID 등 임의의 고유 식별자를 최초 방문 시 생성, 쿠키에 저장
- **서버 DB**: 익명ID를 키로 하여 오답노트, 즐겨찾기, 최근 본 용어 등 개인화 데이터를 저장/조회
- **로그인 시 병합**: 익명ID 데이터와 계정 데이터를 병합하여 이관 가능

---

## 2. 동작 흐름

1. **최초 방문 시**
   - 클라이언트에서 UUID(익명ID) 생성
   - `Set-Cookie`로 익명ID를 쿠키(`anonymous_id`)에 저장(만료기간 1년 등)
2. **이후 요청 시**
   - 모든 API 요청에 쿠키의 익명ID가 자동 포함
   - 서버는 익명ID로 개인화 데이터(오답노트, 즐겨찾기 등) 저장/조회
3. **로그인 시**
   - 익명ID로 저장된 데이터를 계정ID로 병합(마이그레이션)
   - 쿠키의 익명ID는 삭제 또는 재설정

---

## 3. 실전 코드 예시

### 3.1. 클라이언트(Next.js)

```ts
// utils/anonymousId.ts
export function getOrCreateAnonymousId() {
  let id = getCookie('anonymous_id');
  if (!id) {
    id = crypto.randomUUID();
    setCookie('anonymous_id', id, { maxAge: 60 * 60 * 24 * 365 }); // 1년
  }
  return id;
}
```

### 3.2. 서버(Next.js API Route 예시)

```ts
// pages/api/personal-data.ts
import { getCookie } from 'cookies-next';

export default async function handler(req, res) {
  const anonymousId = getCookie('anonymous_id', { req, res });
  // DB에서 anonymousId로 데이터 조회/저장
  // ...
}
```

---

## 4. DB 설계 예시

```sql
CREATE TABLE user_personal_data (
  id SERIAL PRIMARY KEY,
  anonymous_id VARCHAR(64),
  data_type VARCHAR(32), -- 예: 'wrong_note', 'bookmark'
  data JSONB,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);
CREATE INDEX idx_user_personal_data_anonymous_id ON user_personal_data(anonymous_id);
```

---

## 5. 장점 및 주의사항

- **장점**
  - 로그인 없이도 서버 기반 개인화 가능(데이터 유실 위험↓)
  - SSR/CSR 모두에서 일관된 식별
  - 로그인 시 데이터 병합 용이
- **주의**
  - 쿠키는 Secure/HttpOnly 옵션 권장(보안)
  - 개인정보/트래킹 고지 필요(Privacy Policy)

---

## 6. 참고
- [RFC 4122 UUID 표준](https://datatracker.ietf.org/doc/html/rfc4122)
- [cookies-next (Next.js 쿠키 라이브러리)](https://www.npmjs.com/package/cookies-next)

---

> 이 가이드는 guides/STATE_MANAGEMENT_GUIDE.md, SOCIAL_LOGIN_GUIDE.md 등과 함께 활용하면 좋습니다.
