# 4장: 트랜잭션 처리

## 1. 트랜잭션 기본

```ts
await ds.transaction(async (manager) => {
  await manager.save(...);
  await manager.update(...);
});
```

## 2. QueryRunner 활용

```ts
const qr = ds.createQueryRunner();
await qr.connect();
await qr.startTransaction();
try {
  await qr.manager.save(...);
  await qr.commitTransaction();
} catch (e) {
  await qr.rollbackTransaction();
} finally {
  await qr.release();
}
```

## 3. 실무 팁

- 단순 트랜잭션은 ds.transaction, 복잡/수동제어는 QueryRunner
- 예외 발생 시 반드시 rollback/release

---

**다음 장 예고:**
소프트 삭제/복구 실전 패턴을 다룹니다.
