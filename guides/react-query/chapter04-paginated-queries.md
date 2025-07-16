# 4장: 페이징/무한스크롤 쿼리 실전 패턴

## useQuery로 일반 페이징

```tsx
const { data, isFetching } = useQuery({
  queryKey: ['terms', page],
  queryFn: () => fetchTerms(page),
});
```

## useInfiniteQuery로 무한스크롤

```tsx
import { useInfiniteQuery } from '@tanstack/react-query';
const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
  queryKey: ['terms', 'infinite'],
  queryFn: ({ pageParam = 1 }) => fetchTerms(pageParam),
  getNextPageParam: (lastPage) => lastPage.nextPage,
});
```

## 실무 팁

- 쿼리키에 page/필터 포함
- 스켈레톤/로딩 UX, fetchNextPage 트리거
- IntersectionObserver 등과 연계

---

**다음 장 예고:**
5장에서는 Optimistic Update, 뮤테이션 실전 패턴을 다룹니다.
