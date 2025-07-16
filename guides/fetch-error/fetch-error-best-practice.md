# fetch와 예외처리 실무 베스트 프랙티스 가이드

이 문서는 Next.js/React/TypeScript 환경에서 fetch 및 API 예외처리의 실무적 베스트 프랙티스를 주제별로 정리합니다.

---

## 1. fetch 기본 사용법

- fetch는 Promise 기반의 네이티브 API로, HTTP 요청을 보낼 때 사용
- 기본 사용 예시:
  ```ts
  const res = await fetch('/api/data');
  const data = await res.json();
  ```

---

## 2. 공통 fetcher 유틸 함수 패턴

- 모든 API 요청에 공통 fetcher 함수를 사용해 예외처리, 헤더, 인증, 로깅 등을 일관성 있게 관리
- 예시:
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

## 3. fetch 예외처리 실무 패턴

- res.ok 체크로 HTTP 에러(4xx, 5xx) 처리
- 네트워크 에러/타임아웃/파싱 에러 등 try-catch로 처리
- 사용자 메시지, Sentry 등 로깅, 재시도, 토스트 알림 등도 fetcher에서 일괄 관리
- status별(401, 403, 404, 500 등) 분기 처리 가능

---

## 4. fetcher 네이밍/구조 베스트 프랙티스

- globalFetcher, globalGetFetcher, fetchWithErrorHandling 등 명확한 네이밍
- GET/POST/PUT 등 메서드별 fetcher 분리도 가능
- config(헤더, 인증 등) 분리: globalGetConfig, globalPostConfig 등

---

## 5. React Query/사용자 정의 훅과의 연계

- React Query의 queryFn/mutationFn에 fetcher를 그대로 사용
- 예시:
  ```ts
  import { fetcher } from '@/shared/lib/fetcher';
  useQuery(['terms'], () => fetcher(API.TERMS));
  ```

---

## 6. 실무 팁/FAQ

- fetch는 기본적으로 네트워크 에러만 throw, HTTP 에러는 직접 체크 필요
- fetcher에서 항상 res.ok 체크, 에러 메시지 일관성 유지
- fetcher에서 토큰/인증/리프레시 등도 일괄 처리 가능
- fetcher를 한 곳에서 관리하면 유지보수, 협업, 테스트가 쉬워짐

---

이 가이드를 참고해 fetch 및 예외처리를 일관성 있게 관리하면, 실무에서의 오류 대응과 유지보수가 훨씬 쉬워집니다.
