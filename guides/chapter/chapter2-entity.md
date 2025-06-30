# 2장: Entity 생성 및 관리

TypeORM에서 Entity는 데이터베이스 테이블과 매핑되는 클래스입니다.

## 2.1. User Entity 예시

`src/entities/User.ts` 파일을 생성합니다:

```typescript
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;
}
```

## 2.2. Entity 추가 시 주의사항

- Entity 파일이 `data-source.ts`의 entities 경로에 포함되어야 합니다.
- 컬럼 옵션, 관계 등은 공식 문서 참고.
