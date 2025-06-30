# 7장: TypeORM 고급 - 마이그레이션, 커스텀 리포지토리, 성능 최적화 상세 설명

이 장에서는 실무에서 유용한 고급 기능(마이그레이션, 커스텀 리포지토리, 성능 최적화 등)을 상세히 다룹니다.

## 7.1. 마이그레이션(Migrations) 활용

마이그레이션은 DB 스키마 변경을 코드로 관리하는 기능입니다.

```bash
npx typeorm migration:generate src/migrations/Init
npx typeorm migration:run
```

- `generate`는 변경사항을 감지해 마이그레이션 파일을 생성합니다.
- `run`은 마이그레이션을 실제 DB에 적용합니다.

## 7.2. 커스텀 리포지토리(Custom Repository)

복잡한 쿼리나 비즈니스 로직을 리포지토리 클래스로 분리할 수 있습니다.

```typescript
import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/User';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  findByEmail(email: string) {
    return this.findOneBy({ email });
  }
}
```

- 커스텀 리포지토리는 재사용성과 테스트 용이성을 높여줍니다.

## 7.3. 성능 최적화 및 실전 팁

TypeORM의 성능 최적화 전략(로딩 전략, 인덱스, 캐싱, 배치 처리, 쿼리 최적화, 커넥션 풀 관리 등)은 별도 챕터([16장: TypeORM 성능 최적화 완전 정복](./chapter16-typeorm-performance.md))에서 상세하게 다룹니다.

---

이 장에서는 실무에서 자주 쓰이는 고급 기능과 실전 팁을 익힙니다. 성능 최적화, 소프트 삭제, 감사, Raw Query, 멀티 DB, 확장성 등은 별도 챕터에서 자세히 다룹니다.
