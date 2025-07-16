# 2장: where, orderBy, 페이징, 동적 쿼리

## 1. where 조건

```ts
const terms = await repo.findBy({ termKo: Like('%우울%') });
```

## 2. orderBy 정렬

```ts
const terms = await repo.find({ order: { createdAt: 'DESC' } });
```

## 3. 페이징

```ts
const [data, total] = await repo.findAndCount({ skip: 20 * (page - 1), take: 20 });
```

## 4. QueryBuilder로 동적 쿼리

```ts
const qb = repo.createQueryBuilder('term');
if (search) qb.andWhere('term.termKo LIKE :search', { search: `%${search}%` });
const data = await qb.getMany();
```

## 5. 실무 팁

- 복잡한 조건/검색/필터는 QueryBuilder 적극 활용
- 페이징은 findAndCount, skip/take 조합 권장

## 6. QueryBuilder 실전 활용법 (상세)

TypeORM의 QueryBuilder는 복잡한 조건, 동적 쿼리, join, 집계 등 실무에서 매우 강력하게 활용됩니다.

### 1) 기본 사용법

```ts
const qb = repo.createQueryBuilder('term');
const data = await qb.getMany();
```

### 2) 동적 where 조건

```ts
const qb = repo.createQueryBuilder('term');
if (search) {
  qb.andWhere('term.termKo LIKE :search', { search: `%${search}%` });
}
if (categoryId) {
  qb.andWhere('term.categoryId = :categoryId', { categoryId });
}
const data = await qb.getMany();
```

### 3) 정렬, 페이징

```ts
qb.orderBy('term.createdAt', 'DESC')
  .skip(20 * (page - 1))
  .take(20);
const [data, total] = await qb.getManyAndCount();
```

### 4) join, select, group by 등 고급 쿼리

```ts
const data = await repo
  .createQueryBuilder('term')
  .leftJoinAndSelect('term.category', 'category')
  .select(['term.id', 'term.termKo', 'category.name'])
  .where('category.isActive = :active', { active: true })
  .groupBy('category.id')
  .getMany();
```

### 예시 코드 동작 설명

위 코드는 다음과 같이 동작합니다:

- `createQueryBuilder('term')`: term 테이블을 기준으로 쿼리 빌더를 생성합니다.
- `.leftJoinAndSelect('term.category', 'category')`: term과 category 테이블을 LEFT OUTER JOIN으로 조인하고, category 엔티티의 필드도 결과에 포함시킵니다.
- `.select(['term.id', 'term.termKo', 'category.name'])`: 결과로 반환할 컬럼을 term의 id, termKo, category의 name으로 한정합니다(불필요한 컬럼 제외, 성능 최적화).
- `.where('category.isActive = :active', { active: true })`: category가 활성화된(활성 상태인) 데이터만 조회합니다.
- `.groupBy('category.id')`: category.id 기준으로 그룹핑합니다(집계 쿼리나 중복 제거 목적).
- `.getMany()`: 최종적으로 조건에 맞는 여러 행을 배열로 반환합니다.

즉, "활성화된 카테고리에 속한 용어(term)들의 id, 한글명(termKo), 카테고리명(category.name)만을 LEFT JOIN으로 조회"하는 쿼리입니다.

### 5) Raw SQL/서브쿼리

```ts
const data = await repo
  .createQueryBuilder('term')
  .where('term.id IN (SELECT id FROM term WHERE createdAt > :date)', { date })
  .getMany();
```

### 6) 실무 팁

- QueryBuilder는 동적 조건, 복잡한 join, 집계, 서브쿼리 등에서 필수
- andWhere/orWhere/parameter 바인딩으로 SQL 인젝션 방지
- getMany, getOne, getCount, getRawMany 등 다양한 결과 반환 메서드 활용
- 쿼리 디버깅: `.getQueryAndParameters()`로 실제 SQL 확인 가능

---

**다음 장 예고:**
join, relation, eager/lazy loading 실전 패턴을 다룹니다.
