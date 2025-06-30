# 5장: TypeORM 초급 - 기본 사용법 및 개념 상세 설명

이 장에서는 TypeORM의 핵심 개념과 Entity, Repository, CRUD(생성, 조회, 수정, 삭제) 기본 사용법을 상세히 다룹니다.

## 5.1. Entity란?

Entity는 데이터베이스의 테이블과 매핑되는 클래스입니다. 각 인스턴스는 테이블의 한 행(row)에 해당합니다.

### 예시

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

## 5.2. Repository란?

Repository는 Entity에 대해 데이터베이스 작업(CRUD 등)을 수행하는 객체입니다. `getRepository(Entity)`로 얻을 수 있습니다.

## 5.3. 데이터 생성(Create)

```typescript
const userRepo = dataSource.getRepository(User);
const user = userRepo.create({ name: '홍길동', email: 'hong@example.com' });
await userRepo.save(user); // DB에 저장
```

- `create()`는 Entity 인스턴스를 생성만 하고, `save()`를 호출해야 실제 DB에 저장됩니다.

## 5.4. 데이터 조회(Read)

```typescript
const users = await userRepo.find(); // 전체 조회
const oneUser = await userRepo.findOneBy({ id: 1 }); // 조건 조회
```

- `find()`는 배열, `findOneBy()`는 단일 객체를 반환합니다.

## 5.5. 데이터 수정(Update)

```typescript
const user = await userRepo.findOneBy({ id: 1 });
if (user) {
  user.name = '김철수';
  await userRepo.save(user); // 변경사항 저장
}
```

## 5.6. 데이터 삭제(Delete)

```typescript
await userRepo.delete({ id: 1 });
```

- `delete()`는 조건에 맞는 데이터를 삭제합니다.

---

이 장에서는 Entity와 Repository의 개념, 그리고 CRUD의 기본적인 흐름을 실습합니다. 실습을 통해 ORM의 동작 원리를 이해하세요.
