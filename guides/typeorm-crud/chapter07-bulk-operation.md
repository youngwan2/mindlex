# 7장: 벌크 insert/update/delete

## 1. 벌크 insert

```ts
await repo.insert([{ termKo: 'A' }, { termKo: 'B' }]);
```

## 2. 벌크 update

```ts
await repo.update({ categoryId: 1 }, { isActive: false });
```

## 3. 벌크 delete

```ts
await repo.delete({ categoryId: 1 });
```

## 4. 실무 팁

- insert/update/delete는 대량 데이터 처리에 적합
- 트랜잭션/에러처리 주의

---

**다음 장 예고:**
엔티티 라이프사이클/이벤트 활용을 다룹니다.
