# 5장: 소프트 삭제/복구

## 1. 소프트 삭제

- 엔티티에 @DeleteDateColumn 추가
- 삭제: `await repo.softDelete({ id })`
- 복구: `await repo.restore({ id })`

## 2. 소프트 삭제된 데이터 조회

- 기본 find/findOne 등은 soft deleted 데이터 제외
- withDeleted 옵션 사용 시 포함

```ts
const all = await repo.find({ withDeleted: true });
```

## 3. 실무 팁

- 소프트 삭제는 실제 DB 삭제가 아님(복구 가능)
- 실무에서는 삭제/복구/완전삭제(하드) 구분 필요

---

**다음 장 예고:**
Raw SQL, QueryBuilder 고급 활용을 다룹니다.
