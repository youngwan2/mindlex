# TypeORM 페이징 처리(Pagination) 가이드

> 실무에서 TypeORM을 사용할 때 대량 데이터의 효율적 조회를 위한 페이징 처리 방법을 정리합니다.

---

## 1. Repository의 find/findAndCount 사용

```typescript
const page = 1; // 1페이지
const pageSize = 20; // 한 페이지에 20개

const [data, total] = await repo.findAndCount({
  skip: (page - 1) * pageSize,
  take: pageSize,
  order: { id: 'ASC' }, // 정렬 기준
});
```

- `data`: 현재 페이지 데이터 배열
- `total`: 전체 데이터 개수

---

## 2. QueryBuilder의 getManyAndCount 사용

```typescript
const [data, total] = await repo
  .createQueryBuilder('entity')
  .orderBy('entity.id', 'ASC')
  .skip((page - 1) * pageSize)
  .take(pageSize)
  .getManyAndCount();
```

- 복잡한 조건, 조인, 동적 쿼리 등에서 유용

---

## 3. API 응답 예시

```typescript
return {
  data,
  total,
  page,
  pageSize,
  totalPages: Math.ceil(total / pageSize),
};
```

---

## 4. 실무 팁

- `skip` = (page - 1) \* pageSize
- `take` = pageSize
- `findAndCount`/`getManyAndCount`는 데이터와 전체 개수를 동시에 반환
- 대량 데이터에서는 인덱스와 정렬 기준에 주의
- 커스텀 정렬, 검색, 필터와 조합 가능

---

## 5. 참고

- [TypeORM 공식문서 Pagination](https://typeorm.io/select-query-builder#pagination)
- 실무 예제는 `src/app/api/` 등에서 참고

---

> 본 가이드는 실무 개발자, 백엔드 엔지니어, API 설계자 모두를 위한 TypeORM 페이징 처리 실전 요약입니다.
