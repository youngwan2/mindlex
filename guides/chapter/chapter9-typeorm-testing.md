# 9장: TypeORM 테스트 전략

이 장에서는 TypeORM 기반 코드의 테스트 전략과 실습 예시를 다룹니다.

## 9.1. 테스트 환경 분리

- 테스트용 DB를 별도로 구성하고, `.env.test` 등으로 환경 분리

## 9.2. 테스트용 데이터 소스 설정

- 테스트 실행 시 별도의 데이터 소스(AppDataSource) 사용

## 9.3. 단위 테스트 예시 (Jest)

```typescript
import { AppDataSource } from '../src/data-source';
import { User } from '../src/entities/User';

describe('User Repository', () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
  });
  afterAll(async () => {
    await AppDataSource.destroy();
  });
  it('should create a user', async () => {
    const repo = AppDataSource.getRepository(User);
    const user = repo.create({ name: 'test', email: 'test@test.com' });
    await repo.save(user);
    expect(user.id).toBeDefined();
  });
});
```

---

TypeORM 환경에서 신뢰성 있는 테스트 코드를 작성하는 방법을 익힙니다.
