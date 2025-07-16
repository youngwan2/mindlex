# 4장: fetcher 네이밍/구조 베스트 프랙티스

- globalFetcher, globalGetFetcher, fetchWithErrorHandling 등 명확한 네이밍 사용
- GET/POST/PUT 등 메서드별 fetcher 분리도 가능
- config(헤더, 인증 등) 분리: globalGetConfig, globalPostConfig 등

## 예시

```ts
export async function globalGetFetcher(url: string) {
  // ...
}
export async function globalPostFetcher(url: string, body: any) {
  // ...
}
```

---

**다음 장 예고:**
React Query/사용자 정의 훅과의 연계 실전 패턴을 다룹니다.
