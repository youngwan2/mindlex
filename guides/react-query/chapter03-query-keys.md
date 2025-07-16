# 3장: 쿼리키(queryKey) 설계와 관리 전략

## 쿼리키란?

- useQuery/useMutation의 첫 번째 인자(배열)
- 쿼리의 고유 식별자 역할(캐싱/무효화/리패칭 기준)

## 실무 설계 전략

- 단순 문자열 대신 배열 사용: ['terms', categoryId, { search, page }]
- 파라미터/필터별로 명확하게 분리
- 상수/헬퍼 함수로 쿼리키 관리 권장

## 예시

```ts
const termListKey = (categoryId, page, search) => [
  'terms',
  categoryId,
  { page, search },
];
useQuery({ queryKey: termListKey(1, 1, ''), queryFn: ... });
```

## 실수 방지

- 쿼리키 중복/불명확 → 캐싱/무효화 오류
- 객체/함수 등 불변성 주의

---

**다음 장 예고:**
4장에서는 페이징/무한스크롤 쿼리(useInfiniteQuery, useQuery) 실전 패턴을 다룹니다.
