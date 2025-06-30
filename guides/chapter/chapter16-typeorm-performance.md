# 16장: TypeORM 성능 최적화 완전 정복

이 장에서는 TypeORM을 사용할 때 실무에서 반드시 알아야 할 성능 최적화 전략을 상세하게 다룹니다.

## 16.1. Lazy/Eager Loading 전략

- Lazy Loading: 관계 프로퍼티에 접근할 때 쿼리가 실행됨. 대량 데이터 조회 시 N+1 문제 주의.
- Eager Loading: 엔티티를 조회할 때 관계 데이터도 즉시 함께 조회. 쿼리 최적화 필요.
- 예시:
  ```typescript
  @OneToMany(() => Post, (post) => post.user, { eager: true })
  posts: Post[];
  ```

## 16.2. 인덱스 추가

- 자주 조회하는 컬럼에 인덱스를 추가하면 검색 속도가 빨라짐
- 예시:
  ```typescript
  @Column()
  @Index()
  email: string;
  ```

## 16.3. 쿼리 캐싱

- 쿼리 결과를 캐싱해 DB 부하를 줄일 수 있음
- 예시:
  ```typescript
  const users = await userRepo.find({ cache: true });
  ```
- Redis 등 외부 캐시와 연동도 가능

## 16.4. 배치 처리

- 대량 데이터는 한 번에 처리하지 말고, 여러 번에 나눠서 처리
- 예시: 1000개 단위로 나눠서 insert

## 16.5. 쿼리 최적화

- 불필요한 join, select, where 조건을 줄이고, 필요한 데이터만 조회
- QueryBuilder로 필요한 컬럼만 선택:
  ```typescript
  const users = await userRepo
    .createQueryBuilder('user')
    .select(['user.id', 'user.name'])
    .getMany();
  ```

## 16.6. 커넥션 풀 관리

- DB 커넥션 수를 적절히 조절해 과부하 방지
- `extra` 옵션으로 풀 크기 조정 가능

## 16.7. 실전 팁

- 운영 환경에서는 `synchronize: false`로 설정해 데이터 손실 방지
- 마이그레이션을 통해 스키마 변경 이력 관리
- 환경 변수로 DB 정보 및 민감 정보 관리
- 공식 문서, 커뮤니티, GitHub 이슈 등에서 최신 정보 참고

---

TypeORM의 성능 최적화는 실무에서 매우 중요합니다. 각 전략을 상황에 맞게 조합해 사용하세요.
