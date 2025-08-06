# favorites API route 설명

이 문서는 `src/app/api/favorites/route.ts` 파일의 주요 기능과 구조, 그리고 북마크(즐겨찾기) 관련 API 구현 방식을 설명합니다.

## 주요 기능

- **즐겨찾기 생성 (POST)**: 특정 용어나 퀴즈를 북마크로 등록합니다.
- **즐겨찾기 삭제 (DELETE)**: 등록된 북마크를 삭제합니다.
- **즐겨찾기 목록 조회 (GET)**: 북마크된 항목을 페이징, 검색, 타입별로 조회합니다.

## GET /api/favorites 상세

- **파라미터**
  - `type`: 'term' | 'quiz' | 'all' (북마크 타입)
  - `page`, `size`: 페이지네이션
  - `search`: 검색어
- **동작**
  - 로그인된 사용자의 북마크만 조회
  - type이 'all'이면 용어(term)만 조회(quizs 테이블이 없으므로 quiz 관련 로직은 주석처리)
  - term 정보는 leftJoin으로 가져오고, quiz 관련 join/검색은 모두 주석처리
  - getRawMany()로 join된 결과를 받아 term 상세정보를 포함해 반환
  - totalCountTerm, totalCountQuiz도 반환(quiz는 항상 0)

## 주요 코드 구조

```typescript
// ...existing code...
if (type === 'term' || type === 'all') {
    queryBuilder = queryBuilder
        .leftJoin('terms', 'terms', 'terms.id = favorites.targetId AND favorites.type = :termType', { termType: 'term' })
        .addSelect([...]);
}
// quiz 관련 join/검색은 모두 주석처리
/* ... quizs 관련 코드 ... */
// ...existing code...
const rawResults = await queryBuilder.getRawMany();
const processedFavorites = rawResults.map(row => {
    // term 정보가 있으면 상세정보 포함
    if (row.terms_id) {
        return { ...result, ...term 상세 필드 };
    }
    // quiz 정보는 주석처리
    /* ... quizs 관련 코드 ... */
    return result;
});
```

## 프론트엔드 연동

- 'quiz' 탭 및 관련 쿼리, UI도 임시로 비활성화/주석처리
- term 북마크만 정상적으로 동작

## 참고

- 추후 quizs 테이블이 추가되면 주석 해제 및 관련 로직 복구 필요
- TypeORM의 getRawMany, leftJoin, addSelect 활용 패턴 참고

---

최종 수정일: 2025-08-06
