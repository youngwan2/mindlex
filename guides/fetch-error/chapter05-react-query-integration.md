# 5장: React Query/사용자 정의 훅과의 연계

- React Query의 queryFn/mutationFn에 fetcher를 그대로 사용
- 사용자 정의 훅(useXXXQuery, useXXXMutation)에서 fetcher 활용

## 예시

```ts
import { fetcher } from '@/shared/lib/fetcher';
import { API } from '@/shared/constants/api';
import { useQuery } from '@tanstack/react-query';

export function useTermsQuery() {
  return useQuery(['terms'], () => fetcher(API.TERMS));
}
```

---

**다음 장 예고:**
실무 팁/FAQ, fetcher 관리의 장점과 주의사항을 다룹니다.
