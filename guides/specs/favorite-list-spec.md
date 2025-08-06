# 즐겨찾기(북마크) 목록 조회 페이지 기능 명세

## 1. 주요 목적

- 사용자가 자신이 북마크한 용어(term)와 퀴즈(quiz)를 한 곳에서 모아볼 수 있도록 제공

## 2. 주요 기능

- **북마크 목록 조회:**
  - 용어/퀴즈 모두 조회 가능 (type별 필터)
  - 페이지네이션 지원 (page, size)
  - 각 북마크 항목에 대한 상세 정보(예: 용어명, 퀴즈 제목 등) 표시
- **검색:**
  - 검색어 입력 시 북마크 목록에서 용어명/퀴즈명 등으로 실시간 필터링
  - type별 검색 지원
- **필터/탭:**
  - "전체", "용어만", "퀴즈만" 등 type별 필터/탭 UI
- **북마크 해제:**
  - 각 항목에서 북마크 해제(삭제) 가능
- **상세 페이지 이동:**
  - 북마크 항목 클릭 시 해당 용어/퀴즈 상세 페이지로 이동
- **비회원/회원 모두 지원:**
  - 비회원은 LocalStorage, 회원은 서버 DB 기반
- **로딩/에러/빈 상태 UI:**
  - 데이터 로딩, 에러, 북마크가 없는 경우 안내 메시지
  - 검색 결과가 없을 때 안내 메시지

## 3. API/쿼리 연동

- React Query의 `useFavoritesGetQuery`를 사용해 북마크 목록 조회
- API: `/api/favorites?type=term|quiz&page=1&size=20&search=검색어`
- 북마크 해제 시 쿼리 무효화로 목록 자동 갱신
- 검색어 변경 시 쿼리 자동 갱신

## 4. UI/UX

- 카드형/리스트형 UI
- 북마크 해제 버튼, 상세 이동 버튼
- type별 탭/필터 UI
- 검색바 컴포넌트
- 검색 결과/빈 상태 안내 메시지
- 페이지네이션 컴포넌트

## 5. 확장성

- 추후 태그/검색/정렬 기능 추가 가능
- 북마크한 항목에 대한 메모/노트 기능 확장 가능

---

**실제 구현 시 필요한 컴포넌트/파일 예시**

- `src/app/favorites/page.tsx` (페이지)
- `src/features/favorite/components/FavoriteList.tsx` (목록)
- `src/features/favorite/components/FavoriteItem.tsx` (개별 항목)
- `src/features/favorite/components/FavoriteSearchBar.tsx` (검색바)
- `src/features/favorite/api/queries.ts` (React Query 쿼리)
- `src/shared/components/Pagination.tsx` (페이지네이션)
