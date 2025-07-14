# 사용자(User) 테이블 설계 가이드

## 1. 기본 설계 원칙

- 회원/사용자 관리에 필요한 최소 정보와 확장 필드 포함
- 소셜 로그인, 프로필 이미지, 역할 등 다양한 실무 요구 반영
- 생성일/수정일 자동 관리

## 2. 테이블 설계 예시

| 필드명            | 타입         | PK  | NN  | UQ  | 설명                  |
| ----------------- | ------------ | --- | --- | --- | --------------------- |
| id                | BIGINT       | O   | O   |     | 사용자 고유 ID        |
| nickname          | VARCHAR(255) |     | O   | O   | 닉네임(고유)          |
| email             | VARCHAR(255) |     | O   | O   | 이메일(고유)          |
| password          | VARCHAR(255) |     |     |     | 비밀번호(해시)        |
| role              | VARCHAR(20)  |     | O   |     | 역할(user/admin)      |
| provider          | VARCHAR(50)  |     |     |     | 소셜 로그인 제공자    |
| provider_id       | VARCHAR(100) |     |     |     | 소셜 로그인 제공자 ID |
| profile_image_url | TEXT         |     |     |     | 프로필 이미지 URL     |
| created_at        | TIMESTAMP    |     | O   |     | 생성일                |
| updated_at        | TIMESTAMP    |     | O   |     | 수정일                |

## 3. TypeORM Entity 예시

```typescript
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('identity', { comment: '사용자 ID' })
  id: number;

  @Column({ unique: true, comment: '사용자 닉네임' })
  nickname: string;

  @Column({ unique: true, comment: '사용자 이메일' })
  email: string;

  @Column({ comment: '사용자 비밀번호' })
  password?: string;

  @Column({ enum: ['user', 'admin'], default: 'user', comment: '사용자 역할' })
  role: string;

  @Column({ comment: '사용자 프로바이더' })
  provider?: string;

  @Column({ comment: '사용자 프로바이더 ID' })
  providerId?: string;

  @Column({ type: 'text', nullable: true, comment: '사용자 프로필 이미지 URL' })
  profileImageUrl?: string | null;

  @CreateDateColumn({ comment: '사용자 생성일' })
  createdAt!: Date;

  @UpdateDateColumn({ comment: '사용자 정보 수정일' })
  updatedAt!: Date;
}
```

---

> 이 설계는 실무에서 자주 쓰이는 사용자 관리 요구사항을 반영한 예시입니다. 실제 프로젝트 상황에 맞게 필드 추가/수정이 가능합니다.
