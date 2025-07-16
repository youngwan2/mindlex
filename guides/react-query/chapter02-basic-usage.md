# 2장: React Query 기본 사용법

## 1. QueryClientProvider로 전역 설정

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();

<QueryClientProvider client={queryClient}>
  <App />
</QueryClientProvider>;
```

## 2. useQuery로 데이터 패칭

```tsx
import { useQuery } from '@tanstack/react-query';
const { data, isLoading, error } = useQuery({
  queryKey: ['terms'],
  queryFn: fetchTerms,
});
```

## 3. useMutation으로 데이터 변경

```tsx
import { useMutation } from '@tanstack/react-query';
const mutation = useMutation({
  mutationFn: postTerm,
  onSuccess: () => {
    /* 쿼리 무효화 등 */
  },
});
```

## 실무 팁

- 쿼리키는 배열로 명확하게 관리
- Suspense, ErrorBoundary와 연계 가능
- Devtools로 쿼리 상태 실시간 확인

---

**다음 장 예고:**
3장에서는 쿼리키(queryKey) 설계와 관리 전략, 실무 패턴을 다룹니다.
