# 3장: fetch 예외처리 실무 패턴

- res.ok 체크로 HTTP 에러(4xx, 5xx) 처리
- 네트워크 에러/타임아웃/파싱 에러 등 try-catch로 처리
- 사용자 메시지, Sentry 등 로깅, 재시도, 토스트 알림 등도 fetcher에서 일괄 관리
- status별(401, 403, 404, 500 등) 분기 처리 가능

## 예시 코드

```ts
export async function fetcher<T = any>(input: RequestInfo, init?: RequestInit): Promise<T> {
  try {
    const res = await fetch(input, init);
    if (!res.ok) {
      if (res.status === 401) {
        // 인증 에러 처리
      }
      // ...기타 status별 처리
      throw new Error(`API Error: ${res.status}`);
    }
    return res.json();
  } catch (err: any) {
    // 네트워크 에러, 파싱 에러 등
    throw new Error(err.message || '네트워크 오류가 발생했습니다.');
  }
}
```

---

**다음 장 예고:**
fetcher 네이밍/구조 베스트 프랙티스와 실전 적용법을 다룹니다.
