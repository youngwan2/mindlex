# 3장: join, relation, eager/lazy loading

## 1. join (QueryBuilder)

```ts
const data = await repo
  .createQueryBuilder('term')
  .leftJoinAndSelect('term.category', 'category')
  .getMany();
```

## 2. relation 옵션 (find)

```ts
const term = await repo.findOne({
  where: { id: 1 },
  relations: ['category'],
});
```

## 3. eager/lazy loading

- 엔티티에서 @ManyToOne(() => Category, { eager: true }) 등으로 설정 가능

## 4. 실무 팁

- join은 QueryBuilder, relations는 find 계열에서 사용
- eager는 항상 자동 로딩, lazy는 프록시로 필요시 로딩

## 5. 주요 속성/옵션 상세 설명

- **leftJoinAndSelect**: SQL의 LEFT JOIN과 동일하게, 관계 테이블을 조인하고 해당 엔티티의 필드를 함께 조회합니다. 예) `leftJoinAndSelect('term.category', 'category')`는 term과 category를 조인하여 category 필드도 결과에 포함시킵니다.
- **relations**: find/findOne 등에서 사용. relations 배열에 관계명을 지정하면 해당 관계 엔티티를 자동으로 함께 로딩합니다. 예) `relations: ['category']`는 term.category를 자동으로 포함합니다.
- **eager**: 엔티티 데코레이터 옵션. 관계 필드에 eager: true를 지정하면, find/findOne 등으로 조회할 때 항상 해당 관계 엔티티를 자동으로 로딩합니다. 코드에서 relations 옵션 없이도 항상 포함됩니다.
- **lazy**: 엔티티 데코레이터 옵션. lazy: true를 지정하면, 해당 필드는 Promise로 감싸져 필요할 때만 실제 쿼리가 실행됩니다. (ex: term.category를 await term.category로 접근 시 쿼리 실행)
- **leftJoin/innerJoin**: QueryBuilder에서 사용. leftJoin은 LEFT OUTER JOIN, innerJoin은 INNER JOIN을 수행합니다. Select를 붙이면 해당 엔티티 필드도 결과에 포함됩니다.

  예시:

  ```ts
  // LEFT OUTER JOIN (category 엔티티의 name 필드까지 포함)
  const data = await repo
    .createQueryBuilder('term')
    .leftJoinAndSelect('term.category', 'category')
    .getMany();

  // INNER JOIN (category가 반드시 존재하는 term만 조회)
  const data2 = await repo
    .createQueryBuilder('term')
    .innerJoinAndSelect('term.category', 'category')
    .getMany();
  ```

- **select**: QueryBuilder에서 반환할 컬럼을 지정합니다. (ex: select(['term.id', 'category.name']))

---

각 속성/옵션은 관계형 데이터 모델에서 성능, 데이터 일관성, 쿼리 효율성에 큰 영향을 미치므로 실무에서 상황에 맞게 선택적으로 사용해야 합니다.

---

**다음 장 예고:**
트랜잭션 처리 실전 패턴을 다룹니다.
