# 14장: TypeORM 멀티 데이터베이스(Multi-DB) 활용

이 장에서는 여러 데이터베이스를 동시에 사용하는 방법과 실전 예시를 다룹니다.

## 14.1. 멀티 DB란?

- 하나의 프로젝트에서 두 개 이상의 DB(MySQL, PostgreSQL 등)를 동시에 연결/사용하는 패턴

## 14.2. DataSource 인스턴스 여러 개 생성

```typescript
const mysqlSource = new DataSource({ type: 'mysql', ... });
const pgSource = new DataSource({ type: 'postgres', ... });
```

## 14.3. 실전 활용 예시

- 데이터 마이그레이션, 이중화, DB별 기능 분리 등

## 14.4. 주의사항

- 각 DataSource의 커넥션, 트랜잭션, 엔티티 관리 분리 필요

---

멀티 DB 환경은 복잡하지만, 대규모 서비스에서 유용하게 활용됩니다.
