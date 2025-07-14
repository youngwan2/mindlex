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

# TypeORM 이벤트 구독자(Subscriber) 완전 가이드

## 1장: 이벤트 구독자란?

이벤트 구독자(Subscriber)는 TypeORM에서 엔티티의 데이터 변경(삽입, 수정, 삭제 등) 이벤트가 발생할 때 자동으로 특정 로직을 실행할 수 있도록 해주는 클래스입니다. 데이터베이스 트리거와 비슷하지만, 애플리케이션 레벨에서 동작하며, 비즈니스 로직을 엔티티와 분리해 관리할 수 있습니다.

---

## 2장: 주요 이벤트 종류

- **beforeInsert / afterInsert**: 엔티티가 저장되기 전/후
- **beforeUpdate / afterUpdate**: 엔티티가 수정되기 전/후
- **beforeRemove / afterRemove**: 엔티티가 삭제되기 전/후
- **beforeSoftRemove / afterSoftRemove**: 소프트 삭제 전/후
- **beforeRecover / afterRecover**: 소프트 삭제 복구 전/후
- **afterLoad**: 엔티티가 데이터베이스에서 로드된 직후

---

## 3장: Subscriber 기본 작성법

```typescript
import { EventSubscriber, EntitySubscriberInterface, InsertEvent } from 'typeorm';
import { User } from '../entities/User';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  listenTo() {
    return User; // User 엔티티에만 적용
  }
  beforeInsert(event: InsertEvent<User>) {
    console.log('User가 저장되기 전:', event.entity);
  }
  afterInsert(event: InsertEvent<User>) {
    // 저장 후 추가 작업
  }
}
```

---

## 4장: 글로벌 구독자와 엔티티별 구독자

- **글로벌 구독자**: listenTo()를 생략하면 모든 엔티티에 대해 이벤트를 감지
- **엔티티별 구독자**: listenTo()에서 특정 엔티티를 반환하면 해당 엔티티에만 적용

---

## 5장: 실전 활용 예시

- **로그 기록**: 데이터 변경 이력을 별도 테이블에 저장
- **자동 값 세팅**: createdAt, updatedAt 등 자동 타임스탬프 처리
- **알림/이벤트 트리거**: 특정 조건에서 외부 API 호출, 이메일 발송 등

---

## 6장: 프로젝트에 구독자 등록하기

- 구독자 클래스를 `subscribers` 옵션에 경로로 등록
  ```typescript
  subscribers: [__dirname + '/subscribers/*.ts'];
  ```
- 또는 직접 인스턴스를 DataSource에 추가
  ```typescript
  AppDataSource.subscribers.push(new UserSubscriber());
  ```

---

## 7장: 주의사항 및 팁

- 구독자 내부에서 비동기 작업 시 await 사용 가능
- 너무 많은 로직을 구독자에 넣으면 유지보수 어려움 → 핵심 후킹만 담당
- 트랜잭션 내에서 동작하므로, DB 상태에 따라 이벤트 실행 순서에 주의

---

> 이벤트 구독자는 TypeORM의 강력한 확장 포인트로, 데이터 변경에 따른 자동화, 감사, 알림 등 다양한 실전 시나리오에 활용할 수 있습니다.
