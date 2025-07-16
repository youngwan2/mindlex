# 7장: 실무 베스트 프랙티스/FAQ/실수 방지법

## 베스트 프랙티스

- 쿼리키는 항상 배열로, 불변성 유지
- 쿼리/뮤테이션 분리, 명확한 역할 구분
- 캐시/무효화/리패칭 전략 명확화
- Suspense, ErrorBoundary 적극 활용
- Devtools로 쿼리 상태 실시간 점검

## FAQ/실수 방지

- 쿼리키 중복/불명확 → 캐싱 오류
- 쿼리 무효화 누락 → 데이터 불일치
- 불필요한 리패칭/네트워크 낭비 주의
- 서버/클라이언트 상태 혼동 금지

## 참고 자료

- 공식문서: https://tanstack.com/query/latest
- 실전 예제/패턴: guides/react-query/

---

**이 시리즈 끝!**

- 추가 심화: Suspense, Prefetch, SSR, QueryFn 최적화 등은 별도 챕터로 확장 가능.
