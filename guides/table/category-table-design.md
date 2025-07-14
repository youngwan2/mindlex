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

# TermCategory 엔티티 설계 및 구조 설명

> 파일 위치: `src/entities/category/categories.ts`

## 개요

`TermCategory` 엔티티는 정신건강 용어 사전의 카테고리(분류) 정보를 관리하는 테이블입니다. 카테고리는 계층형(트리 구조)으로 설계되어, 상위/하위 카테고리 구성이 가능합니다. 용어(terms)와의 연결을 통해 각 용어가 어떤 분류에 속하는지 명확히 할 수 있습니다.

## 필드 상세 설명

| 필드명         | 타입                        | 설명                              |
| -------------- | --------------------------- | --------------------------------- |
| id             | number                      | PK, 카테고리 고유번호 (자동 증가) |
| parentCategory | TermCategory \| undefined   | 상위 카테고리(자기참조, nullable) |
| children       | TermCategory[] \| undefined | 하위 카테고리 목록(자기참조)      |
| name           | string                      | 카테고리 이름(고유, 50자 제한)    |
| createdAt      | Date                        | 카테고리 생성일 (자동 기록)       |

## 계층 구조 예시

- 주요 정신질환 (상위)
  - 우울증 (하위)
  - 불안장애 (하위)
- 심리치료/상담 (상위)
  - 인지행동치료(CBT) (하위)

## 관계 및 특징

- **자기참조(ManyToOne/OneToMany)**: 한 카테고리는 여러 하위 카테고리를 가질 수 있고, 각 카테고리는 하나의 상위 카테고리를 가질 수 있습니다.
- **name** 필드는 고유(unique) 제약조건이 있어, 중복된 카테고리명을 허용하지 않습니다.
- **createdAt**은 자동으로 생성일이 기록됩니다.

## 실무 활용 예시

- 트리형 카테고리 UI(드롭다운, 트리뷰 등) 구현 시 활용
- 용어(terms)와의 관계를 통해 분류별 용어 목록 조회 가능
- 카테고리별 통계, 필터링, 검색 등에 활용

## TypeORM 데코레이터 구조

```typescript
@Entity('term_categories')
export class TermCategory {
  @PrimaryGeneratedColumn('identity')
  id!: number;

  @ManyToOne(() => TermCategory, (category) => category.children, { nullable: true })
  parentCategory?: TermCategory;

  @OneToMany(() => TermCategory, (category) => category.parentCategory)
  children?: TermCategory[];

  @Column({ length: 50, nullable: false, unique: true, comment: '카테고리 이름' })
  name!: string;

  @CreateDateColumn({ comment: '카테고리 생성일' })
  createdAt!: Date;
}
```

---

> 이 문서는 실무 개발자와 협업자, 데이터 설계자 모두가 카테고리 구조를 빠르게 이해할 수 있도록 작성되었습니다.
