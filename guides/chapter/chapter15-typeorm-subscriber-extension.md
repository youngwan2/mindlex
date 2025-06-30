# 15장: TypeORM EntitySubscriber와 확장 기능

이 장에서는 EntitySubscriber를 활용한 이벤트 기반 확장, 커스텀 데코레이터, 부가기능 구현법을 다룹니다.

## 15.1. EntitySubscriber란?

- 엔티티의 삽입, 수정, 삭제 등 이벤트에 후킹해 부가 로직을 실행할 수 있는 기능

## 15.2. 기본 사용법

```typescript
import { EventSubscriber, EntitySubscriberInterface, InsertEvent } from 'typeorm';
import { User } from '../entities/User';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  listenTo() {
    return User;
  }
  afterInsert(event: InsertEvent<User>) {
    console.log('User Inserted:', event.entity);
  }
}
```

## 15.3. 실전 활용 예시

- 감사 로그, 알림, 외부 API 호출 등

## 15.4. 커스텀 데코레이터, 쿼리 함수 등 확장 전략

- 데코레이터로 공통 로직 주입, 커스텀 쿼리 함수로 복잡한 쿼리 추상화

---

EntitySubscriber와 확장 기능을 활용하면 대규모 서비스의 유지보수성과 확장성을 높일 수 있습니다.
