# 2장: 공통 fetcher 유틸 함수 패턴

- 모든 API 요청에 공통 fetcher 함수를 사용해 예외처리, 헤더, 인증, 로깅 등을 일관성 있게 관리합니다.

## 예시 코드

```ts
export async function fetcher<T = any>(input: RequestInfo, init?: RequestInit): Promise<T> {
  try {
    const res = await fetch(input, init);
    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.message || `API Error: ${res.status}`);
    }
    return res.json();
  } catch (err: any) {
    throw new Error(err.message || '네트워크 오류가 발생했습니다.');
  }
}
```

---

**다음 장 예고:**
fetch 예외처리 실무 패턴(HTTP/네트워크/사용자 메시지 등)을 다룹니다.
