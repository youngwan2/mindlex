# TypeScript/Next.js API 엔드포인트 URL 전역 관리 가이드

실무적으로 모든 API URL(엔드포인트)을 한 곳에서 관리하면 유지보수, 협업, 리팩토링이 매우 쉬워집니다. 이 문서는 API URL 전역 관리 방법과 예시를 안내합니다.

---

## 1. 전역 API URL 관리 위치 추천

- **src/shared/constants/api.ts** (권장)
  - 전역 import 가능, 도메인별로 체계적 관리
- 또는 src/lib/api.ts, features/도메인/api/urls.ts 등 프로젝트 규모에 따라 위치 조정

---

## 2. 예시 코드

```ts
// src/shared/constants/api.ts
export const API = {
  TERMS: '/api/(term)/terms',
  TERM_DETAIL: (id: number | string) => `/api/(term)/terms/${id}`,
  CATEGORIES: '/api/(category)/categories',
  QUIZ: '/api/quiz',
  // ...추가
};
```

- 함수형 URL(파라미터 포함)도 함께 정의해 실수 없이 사용 가능
- import { API } from '@/shared/constants/api';

---

## 3. 실무 팁

- 규모가 커질수록 전역에서 import 가능한 위치에 관리
- 도메인별로 그룹화, 함수형 URL 적극 활용
- API 변경 시 한 곳만 수정하면 전체 반영

---

## 4. fetcher 등에서 활용 예시

```ts
import { API } from '@/shared/constants/api';

export async function fetchTerms() {
  const res = await fetch(API.TERMS);
  return res.json();
}

export async function fetchTermDetail(id: number) {
  const res = await fetch(API.TERM_DETAIL(id));
  return res.json();
}
```

---

이 가이드를 참고해 API URL을 일관성 있게 관리하면, 유지보수와 협업이 훨씬 쉬워집니다.
