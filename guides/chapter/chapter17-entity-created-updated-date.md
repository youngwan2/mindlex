# TypeORM 엔티티 생성일(createdAt)·수정일(updatedAt) 자동 관리 가이드

## 1장: 개념 및 필요성

- 엔티티의 생성일(생성 시각)과 수정일(수정 시각)은 데이터 변경 이력 관리, 정렬, 감사 등에 필수적인 정보입니다.
- TypeORM에서는 데코레이터 한 줄로 자동 관리가 가능합니다.

---

## 2장: @CreateDateColumn, @UpdateDateColumn 사용법

- `@CreateDateColumn()`: 엔티티가 처음 저장될 때 자동으로 현재 시각이 입력됨(수정 시에는 변경되지 않음)
- `@UpdateDateColumn()`: 엔티티가 저장되거나 수정될 때마다 자동으로 현재 시각이 입력됨

---

## 3장: 실전 예시 코드

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
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nickname: string;

  @CreateDateColumn({ comment: '생성일' })
  createdAt: Date;

  @UpdateDateColumn({ comment: '수정일' })
  updatedAt: Date;
}
```

- 별도의 값 할당 없이, DB가 자동으로 날짜를 관리합니다.
- MySQL, PostgreSQL 등 주요 DB에서 지원

---

## 4장: 참고 및 팁

- 컬럼명은 createdAt/updatedAt, created_at/updated_at 등 프로젝트 규칙에 맞게 지정
- 날짜 타입은 Date(자바스크립트 표준) 사용
- 마이그레이션 시에도 자동 반영됨
- Soft Delete(소프트 삭제)와 함께 deletedAt 컬럼을 추가하는 것도 일반적

---

> 이 가이드는 TypeORM에서 엔티티 생성일/수정일을 자동으로 관리하는 방법을 실전 예시와 함께 안내합니다. 자세한 내용은 [공식 문서](https://typeorm.io/decorator-reference#createdatecolumn)도 참고하세요.
