# 13장: TypeORM Raw Query(생 SQL) 활용법

이 장에서는 TypeORM에서 직접 SQL을 실행하는 방법과 주의사항을 상세히 다룹니다.

## 13.1. Raw Query란?

- ORM의 추상화된 API 대신, 직접 SQL을 실행하는 방법
- 복잡한 쿼리, 성능 최적화, DB 고유 기능 활용 시 유용

## 13.2. TypeORM에서 Raw Query 실행

```typescript
const result = await dataSource.query('SELECT * FROM user WHERE email = $1', [email]);
```

- 파라미터 바인딩을 반드시 사용해 SQL Injection을 방지

## 13.3. Raw Query와 QueryBuilder 차이

- QueryBuilder는 TypeORM의 엔티티/관계 추상화와 함께 사용 가능
- Raw Query는 완전한 SQL 자유도 제공

## 13.4. 실전 팁

- Raw Query 결과는 엔티티가 아닌 일반 객체 배열로 반환됨
- 트랜잭션, 커넥션 관리에 주의

---

Raw Query는 꼭 필요한 경우에만 사용하고, 보안에 각별히 신경 쓰세요.
