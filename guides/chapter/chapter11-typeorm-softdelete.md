# 11장: TypeORM 소프트 삭제(Soft Delete) 완전 정복

이 장에서는 소프트 삭제의 개념, 구현 방법, 실전 활용법을 상세히 다룹니다.

## 11.1. 소프트 삭제란?

- 데이터를 실제로 삭제하지 않고, 삭제 여부만 표시하여 복구 및 이력 관리가 가능하게 하는 전략

## 11.2. TypeORM에서의 소프트 삭제 구현

- `@DeleteDateColumn` 사용
- `softRemove`, `restore` 메서드 활용

### 예시

```typescript
import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @DeleteDateColumn()
  deletedAt?: Date;
}
```

### 삭제/복구 예시

```typescript
await userRepo.softRemove(user); // 소프트 삭제
await userRepo.restore(user.id); // 복구
```

## 11.3. 쿼리 시 주의사항

- 기본적으로 soft delete된 데이터는 조회되지 않음
- `withDeleted()`로 삭제된 데이터도 조회 가능
  ```typescript
  const allUsers = await userRepo.find({ withDeleted: true });
  ```

---

실무에서 데이터 이력 관리, 복구, 감사 등에 소프트 삭제를 적극 활용하세요.
