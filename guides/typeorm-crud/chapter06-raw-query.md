# 6장: Raw SQL, QueryBuilder 고급 활용

## 1. Raw SQL 실행

```ts
await ds.query('SELECT * FROM term WHERE ...');
```

## 2. QueryBuilder 고급

```ts
const qb = repo
  .createQueryBuilder('term')
  .select(['term.id', 'term.termKo'])
  .where('term.createdAt > :date', { date })
  .orderBy('term.id', 'DESC')
  .limit(10);
const data = await qb.getMany();
```

## 3. 실무 팁

- 복잡한 집계/통계/서브쿼리 등은 Raw SQL, QueryBuilder 조합
- SQL 인젝션 방지: 파라미터 바인딩 필수

---

**다음 장 예고:**
벌크 insert/update/delete 실전 패턴을 다룹니다.
