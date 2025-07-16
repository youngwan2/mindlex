# 8장: 엔티티 라이프사이클/이벤트

## 1. 엔티티 리스너/구독자

- @BeforeInsert, @AfterUpdate 등 엔티티 데코레이터 활용
- EntitySubscriber 클래스 구현

## 2. 예시

```ts
@Entity()
export class TermEntity {
  @BeforeInsert()
  setCreatedAt() {
    this.createdAt = new Date();
  }
}
```

## 3. 실무 팁

- 감사로그, 자동값 세팅 등에서 활용
- Subscriber는 여러 엔티티에 공통 적용 가능

---

**다음 장 예고:**
실무 베스트 프랙티스/FAQ를 다룹니다.
