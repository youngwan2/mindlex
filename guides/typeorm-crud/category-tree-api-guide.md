# TypeORM 계층형(트리형) 카테고리 API 실전 예제 및 설명

이 문서는 TypeORM의 자기참조 관계(@ManyToOne, @OneToMany)를 활용해 부모-자식(트리형) 카테고리 구조를 API로 조회하는 실전 예제와 상세 설명을 제공합니다.

---

## 1. 엔티티 구조

```ts
@Entity('term_categories')
export class TermCategoryEntity {
  @PrimaryGeneratedColumn('identity')
  id!: number;

  @ManyToOne(() => TermCategoryEntity, (category) => category.children, { nullable: true })
  parentCategory?: TermCategoryEntity;

  @OneToMany(() => TermCategoryEntity, (category) => category.parentCategory)
  children?: TermCategoryEntity[];

  @Column({ length: 50, nullable: false, unique: true })
  name!: string;

  @CreateDateColumn()
  createdAt!: Date;
}
```

- parentCategory: 상위 카테고리(자기참조)
- children: 하위 카테고리(자기참조)

---

## 2. 트리형 카테고리 API 예제

```ts
import { TermCategoryEntity } from '../entities/category/categories';
import { getDataSource } from '../lib/database';
import { NextResponse } from 'next/server';
import { IsNull } from 'typeorm';

export async function GET() {
  const ds = await getDataSource();
  const categoryRepo = ds.getRepository(TermCategoryEntity);

  // parentCategory가 null인 최상위 카테고리만 조회, children(2단계) 포함
  const categories = await categoryRepo.find({
    where: { parentCategory: IsNull() },
    select: ['id', 'name', 'children'],
    relations: ['children', 'children.children'],
    order: { id: 'ASC' },
  });

  return NextResponse.json(categories);
}
```

---

## 3. 동작 설명

- parentCategory: IsNull() → 최상위(부모) 카테고리만 조회
- relations: ['children', 'children.children'] → 2단계까지 자식 카테고리 트리 구조로 포함
- select: 필요한 필드만 선택(성능 최적화)
- order: id 오름차순 정렬
- 결과: [{ id, name, children: [{ id, name, children: [...] }] }, ...] 형태의 트리 구조 반환

---

## 4. 실무 팁

- 더 깊은 트리(3단계 이상)가 필요하면 relations에 'children.children.children' 등 추가
- 트리 구조를 프론트에서 그대로 계층형 UI로 활용 가능
- 대용량 트리/깊은 계층은 재귀적 쿼리/별도 트리 패턴(closure table 등)도 고려

---

## 4-1. 자식 릴레이션의 컬럼 개수 제한/선택 방법

TypeORM에서 relations 옵션으로 자식(트리) 엔티티를 포함할 때, select 옵션만으로는 자식 엔티티의 컬럼 개수를 직접 제한할 수 없습니다. 하지만 다음과 같은 방법이 있습니다.

### 1) QueryBuilder + leftJoinAndSelect + addSelect

```ts
const categories = await categoryRepo
  .createQueryBuilder('category')
  .leftJoinAndSelect('category.children', 'child')
  .addSelect(['child.id', 'child.name']) // 자식의 id, name만 포함
  .where('category.parentCategory IS NULL')
  .orderBy('category.id', 'ASC')
  .getMany();
```

- addSelect로 자식 엔티티의 필요한 컬럼만 명시적으로 추가
- 여러 단계(children.children 등)는 별도 join/addSelect 반복 필요

### 2) find 후 map으로 필요한 필드만 추출(프론트/백엔드에서 가공)

```ts
const categories = await categoryRepo.find({
  where: { parentCategory: IsNull() },
  relations: ['children'],
  order: { id: 'ASC' },
});
const result = categories.map((cat) => ({
  id: cat.id,
  name: cat.name,
  children: cat.children?.map((child) => ({ id: child.id, name: child.name })),
}));
```

- find로 트리 전체를 불러온 뒤, 필요한 컬럼만 추출해 반환
- 트리 깊이가 깊을 경우 재귀 map 활용

---

실무에서는 QueryBuilder의 addSelect 또는 find+map 방식으로 자식 컬럼 개수를 제한/선택할 수 있습니다.

---

이 예제는 실무에서 계층형 카테고리, 메뉴, 조직도 등 다양한 트리 구조 API에 바로 활용할 수 있습니다.
