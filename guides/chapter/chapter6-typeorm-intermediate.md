# 6장: TypeORM 중급 - 관계, 쿼리, 트랜잭션 상세 설명

이 장에서는 Entity 간의 관계 설정, QueryBuilder, 트랜잭션 등 실무에서 자주 쓰는 중급 기능을 상세히 다룹니다.

## 6.1. Entity 관계(Relation) 설정

관계형 데이터베이스에서는 테이블 간의 관계(1:N, N:1, N:M 등)를 정의합니다. TypeORM에서는 데코레이터로 관계를 명시합니다.

### 1:N(OneToMany) & N:1(ManyToOne) 예시

```typescript
@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}
```

- 한 명의 User는 여러 Post를 가질 수 있습니다.
- 각 Post는 하나의 User에 속합니다.

## 6.2. QueryBuilder 사용법

QueryBuilder는 복잡한 SQL 쿼리를 TypeORM 방식으로 작성할 수 있게 해줍니다.

```typescript
const posts = await dataSource
  .getRepository(Post)
  .createQueryBuilder('post')
  .leftJoinAndSelect('post.user', 'user')
  .where('user.id = :id', { id: 1 })
  .getMany();
```

- `leftJoinAndSelect`는 관계된 엔티티를 함께 조회합니다.
- `where`로 조건을 지정할 수 있습니다.

## 6.3. 트랜잭션 처리

트랜잭션은 여러 DB 작업을 하나의 작업처럼 묶어, 모두 성공하거나 모두 실패하게 만듭니다.

```typescript
await dataSource.transaction(async (manager) => {
  // 여러 작업을 트랜잭션으로 묶어서 처리
  // 예: 두 테이블에 동시에 insert
});
```

- 트랜잭션 내에서는 `manager`를 통해 DB 작업을 수행합니다.

---

이 장에서는 관계형 데이터 모델링, 복잡한 쿼리 작성, 트랜잭션의 개념과 실습을 통해 실무 활용 능력을 키웁니다.
