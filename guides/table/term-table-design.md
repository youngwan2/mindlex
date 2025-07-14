# 용어(단어) 테이블 설계 가이드

## 1. 기본 설계 원칙

- 다양한 용어(한글, 영어, 한자)와 쉬운 설명, 상세 설명을 모두 지원
- 시각자료는 이미지, mermaid 그래프, SVG 등 다양한 형태로 저장 가능
- 확장성(연관 용어, 발음, 공개여부 등) 고려

## 2. 테이블 설계 예시

| 필드명       | 타입         | PK  | NN  | UQ  | 설명                                  |
| ------------ | ------------ | --- | --- | --- | ------------------------------------- |
| id           | BIGINT       | O   | O   |     | 용어 고유 ID                          |
| term_ko      | VARCHAR(100) |     | O   |     | 한글 용어                             |
| term_en      | VARCHAR(100) |     |     |     | 영어 용어                             |
| term_hanja   | VARCHAR(100) |     |     |     | 한자 용어                             |
| definition   | TEXT         |     | O   |     | 쉬운 설명(한 줄 요약)                 |
| description  | TEXT         |     |     |     | 상세 설명(심화/배경 등)               |
| visual_type  | VARCHAR(20)  |     |     |     | 시각자료 타입(image/mermaid/svg/none) |
| visual_url   | TEXT         |     |     |     | 시각자료(이미지/도식) 링크            |
| visual_code  | TEXT         |     |     |     | mermaid/SVG 등 그래프 코드            |
| category_id  | BIGINT       |     | O   |     | FK: categories.id                     |
| audio_url    | TEXT         |     |     |     | 발음 듣기(음성 파일 링크)             |
| is_published | BOOLEAN      |     | O   |     | 공개 여부                             |
| created_at   | TIMESTAMP    |     | O   |     | 생성일                                |
| updated_at   | TIMESTAMP    |     | O   |     | 수정일                                |

## 3. 추가 고려사항

- **visual_type**: 'image', 'mermaid', 'svg', 'none' 등으로 구분
- **visual_code**: mermaid 그래프 코드, SVG 코드 등 저장(visual_type이 mermaid/svg일 때)
- **audio_url**: 발음 듣기(음성 파일 링크, 선택)
- **is_published**: 공개/비공개 관리(관리자 승인 등)
- **category_id**: 카테고리 테이블과 연동(정신질환, 평가척도, 치료 등 분류)
- **related_terms**: 연관 용어(추후 N:M 테이블로 확장 가능)

## 4. TypeORM Entity 예시

```typescript
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
// import { Category } from './Category';

@Entity()
export class Term {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column({ length: 100, nullable: false, comment: '한글 용어' })
  termKo: string;

  @Column({ length: 100, nullable: true, comment: '영어 용어' })
  termEn?: string;

  @Column({ length: 100, nullable: true, comment: '한자 용어' })
  termHanja?: string;

  @Column({ type: 'text', nullable: false, comment: '쉬운 설명(한 줄 요약)' })
  definition: string;

  @Column({ type: 'text', nullable: true, comment: '상세 설명' })
  description?: string;

  @Column({ length: 20, nullable: true, comment: '시각자료 타입(image/mermaid/svg/none)' })
  visualType?: string;

  @Column({ type: 'text', nullable: true, comment: '시각자료(이미지/도식) 링크' })
  visualUrl?: string;

  @Column({ type: 'text', nullable: true, comment: 'mermaid/SVG 등 그래프 코드' })
  visualCode?: string;

  @Column({ type: 'text', nullable: true, comment: '발음 듣기(음성 파일 링크)' })
  audioUrl?: string;

  @Column({ default: true, comment: '공개 여부' })
  isPublished: boolean;

  @Column({ nullable: false, comment: '카테고리 ID' })
  categoryId: number;
  // @ManyToOne(() => Category, (category) => category.terms)
  // category: Category;

  @CreateDateColumn({ comment: '생성일' })
  createdAt: Date;

  @UpdateDateColumn({ comment: '수정일' })
  updatedAt: Date;
}
```

---

> 이 설계는 다양한 용어 정보, 시각자료, 발음, 공개여부 등 실무에서 필요한 확장성을 모두 고려한 예시입니다. 실제 프로젝트 상황에 맞게 필드 추가/수정이 가능합니다.
