# 1장: fetch 기본 사용법

- fetch는 Promise 기반의 네이티브 API로, HTTP 요청을 보낼 때 사용합니다.
- 기본 사용 예시:

```ts
const res = await fetch('/api/data');
const data = await res.json();
```

---

**다음 장 예고:**
공통 fetcher 유틸 함수 패턴과 실무 적용법을 다룹니다.
