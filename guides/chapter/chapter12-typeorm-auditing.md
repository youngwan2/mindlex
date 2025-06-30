# 12장: TypeORM 감사(Auditing)와 변경 이력 관리

이 장에서는 데이터 변경 시점, 변경자, 변경 내용을 기록하는 감사(Auditing) 기능을 상세히 다룹니다.

## 12.1. 감사 컬럼 기본

- `@CreateDateColumn`, `@UpdateDateColumn`으로 생성/수정 시각 자동 기록
- `@VersionColumn`으로 버전 관리 가능

### 예시

```typescript
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @VersionColumn()
  version: number;
}
```

## 12.2. EntitySubscriber로 커스텀 감사 구현

- EntitySubscriber를 활용해 변경자, 변경 내용 등 추가 기록 가능
- 예시: 로그 테이블에 변경 내역 저장

---

감사 기능은 데이터 신뢰성과 추적성을 높이는 데 필수적입니다.
