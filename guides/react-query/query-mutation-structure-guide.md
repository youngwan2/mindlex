# React Query 쿼리/뮤테이션 폴더 구조 및 실무 가이드

실무에서 React Query의 쿼리(fetch)와 뮤테이션(mutation) 훅/함수는 다음과 같이 관리하는 것이 유지보수와 확장성에 가장 좋습니다.

---

## 1. 도메인(기능)별 구조 (권장)

- 주요 도메인(예: term, user, category)별로 폴더를 만들고, 그 안에 쿼리/뮤테이션 훅을 분리합니다.
- 예시:

```
src/
  features/
    term/
      api/
        queries.ts      // useTermListQuery, useTermDetailQuery 등
        mutations.ts    // useCreateTermMutation, useUpdateTermMutation 등
      components/
        TermList.tsx
        TermDetail.tsx
    user/
      api/
        queries.ts
        mutations.ts
      components/
        UserProfile.tsx
```

- 각 도메인별로 `api/queries.ts`, `api/mutations.ts`에 커스텀 훅을 작성합니다.
- fetcher(실제 네트워크 요청 함수)는 `api/fetchers.ts` 등으로 분리해도 좋습니다.

---

## 2. 작은 프로젝트/단일 도메인

- 규모가 작다면 `src/queries`, `src/mutations`로 분리해도 무방합니다.

---

## 3. hooks 폴더 활용

- 도메인별로 `useXXXQuery`, `useXXXMutation` 커스텀 훅을 만들어 `features/도메인/hooks/`에 두는 것도 실무에서 많이 사용합니다.

---

## 4. 실무 베스트 프랙티스

- 쿼리/뮤테이션 훅은 컴포넌트와 분리해 api 폴더에 두고, 네트워크 요청 함수(fetcher)는 lib/api/ 또는 features/도메인/api/fetchers.ts 등으로 분리
- 도메인별 폴더 구조를 지키면 확장성과 협업, 테스트, 리팩토링이 쉬워집니다.
- 커스텀 훅 네이밍: useTermListQuery, useCreateTermMutation 등 일관성 있게

---

## 참고 예시

```ts
// src/features/term/api/queries.ts
import { useQuery } from '@tanstack/react-query';
import { fetchTermList } from './fetchers';
export function useTermListQuery(params) {
  return useQuery({ queryKey: ['terms', params], queryFn: () => fetchTermList(params) });
}
```

```ts
// src/features/term/api/mutations.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTerm } from './fetchers';
export function useCreateTermMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTerm,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['terms'] }),
  });
}
```

---

이 구조를 따르면 규모가 커져도 유지보수와 협업이 매우 편리합니다.
