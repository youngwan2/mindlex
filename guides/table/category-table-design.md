# 카테고리(Category) 테이블 설계 가이드

## 1. 기본 설계 원칙

- 용어(단어) 분류를 위한 최소한의 정보 제공
- 이름의 고유성 보장, 생성일 자동 관리
- 계층 구조, 설명 등은 필요 시 확장 가능

## 2. 테이블 설계 예시

| 필드명     | 타입        | PK  | NN  | UQ  | 설명                     |
| ---------- | ----------- | --- | --- | --- | ------------------------ |
| id         | BIGINT      | O   | O   |     | 카테고리 고유 ID         |
| name       | VARCHAR(50) |     | O   | O   | 카테고리 이름 (예: 질환) |
| created_at | TIMESTAMP   |     | O   |     | 생성일                   |

## 3. 추가 고려사항(확장성)

- **parent_id**: 상위 카테고리(계층 구조 필요 시)
- **description**: 카테고리 설명(선택)
- **updated_at**: 수정일(관리 편의)
- **is_active**: 사용 여부(비활성화 지원)

## 4. TypeORM Entity 예시

```typescript
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column({ length: 50, unique: true, nullable: false, comment: '카테고리 이름' })
  name: string;

  @CreateDateColumn({ comment: '생성일' })
  createdAt: Date;
}
```

---

> 이 설계는 단순 분류 목적의 카테고리 테이블 예시입니다. 계층 구조, 설명, 수정일 등은 필요에 따라 확장 가능합니다.
