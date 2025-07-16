# 6장: React Query Devtools 활용법

## Devtools 설치 및 적용

```bash
npm install @tanstack/react-query-devtools
```

```tsx
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
<QueryClientProvider client={queryClient}>
  <App />
  <ReactQueryDevtools initialIsOpen={false} />
</QueryClientProvider>;
```

## 주요 기능

- 쿼리/뮤테이션 상태 실시간 확인
- 캐시/무효화/리패칭 트리거
- 쿼리키별 데이터/상태/에러 추적

## 실무 팁

- 개발 환경에서만 활성화 권장
- 쿼리 상태/캐시 동기화 문제 빠른 진단

---

**다음 장 예고:**
7장에서는 실무 베스트 프랙티스, FAQ, 실수 방지법을 다룹니다.
