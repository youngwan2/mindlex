# 1장: TypeORM 기본 CRUD 사용법

## 1. 엔티티 저장 (Create)

```ts
const term = new TermEntity();
term.termKo = '우울증';
await repo.save(term);
```

## 2. 단일/다중 조회 (Read)

```ts
const one = await repo.findOneBy({ id: 1 });
const all = await repo.find();
```

## 3. 수정 (Update)

```ts
await repo.update({ id: 1 }, { termKo: '수정된 용어' });
```

## 4. 삭제 (Delete)

```ts
await repo.delete({ id: 1 });
```

## 5. 실무 팁

- save는 insert+update 모두 지원
- findOneBy/findBy/find 등 다양한 조회 메서드 활용
- delete는 실제 DB에서 삭제(소프트 삭제는 별도)

---

**다음 장 예고:**
where/orderBy/페이징/동적 쿼리 실전 패턴을 다룹니다.
