# 6장: 실무 팁/FAQ 및 fetcher 관리의 장점

- fetch는 기본적으로 네트워크 에러만 throw, HTTP 에러는 직접 체크 필요
- fetcher에서 항상 res.ok 체크, 에러 메시지 일관성 유지
- fetcher에서 토큰/인증/리프레시 등도 일괄 처리 가능
- fetcher를 한 곳에서 관리하면 유지보수, 협업, 테스트가 쉬워짐

## FAQ

- Q: fetch만 쓰면 왜 404/500 에러가 throw되지 않나요?
  - A: fetch는 네트워크 에러만 throw, HTTP 에러는 res.ok로 직접 체크해야 합니다.
- Q: fetcher에서 사용자 메시지/로깅/재시도 등도 처리할 수 있나요?
  - A: 네, fetcher 내부에서 모두 일괄 처리 가능합니다.
- Q: React Query, SWR 등과 함께 써도 되나요?
  - A: 네, queryFn/mutationFn에 fetcher를 그대로 사용하면 됩니다.

---

이 시리즈 끝! 실무 fetcher 패턴은 프로젝트 상황에 맞게 확장/응용 가능합니다.
