```
개발 예정인 프로젝트 입니다.
```

# 🌐 Mindlex: 사회복지 용어 사전 & 퀴즈 학습 사이트

Mindlex는 사회복지 관련 용어를 쉽고 체계적으로 학습할 수 있도록 돕는 오픈소스 웹 서비스입니다. 
용어 사전, 퀴즈, 심리검사 등 다양한 기능을 통해 복지 지식을 재미있고 효율적으로 익힐 수 있습니다.

## 📁 주요 기능
- **복지 용어 사전**: 사회복지 분야의 다양한 용어를 검색, 정리, 설명 제공
- **퀴즈 학습**: 용어를 퀴즈 형식으로 반복 학습하여 암기력 향상
- **심리검사/설문**: 자기 진단 및 복지 관련 설문 기능(확장 예정)


## 🖥️ 기술 스택

| 기술스택 | 사용 목적 및 설명 |
|---|---|
| <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" height="28"/> | React 기반 웹 프레임워크, 라우팅/SSR/CSR 지원 |
| <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" height="28"/> | 정적 타입 지원, 코드 안정성 향상 |
| <img src="https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" height="28"/> | 유틸리티 퍼스트 CSS 프레임워크, 빠른 스타일링 |
| <img src="https://img.shields.io/badge/shadcn/ui-18181B?style=for-the-badge" alt="shadcn/ui" height="28"/> | 모던하고 부드러운 UI 컴포넌트 |
| <img src="https://img.shields.io/badge/React%20Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white" alt="React Query" height="28"/> | 서버 상태(데이터 패칭, 캐싱, 동기화) 관리 |
| <img src="https://img.shields.io/badge/Zustand-000?style=for-the-badge&logo=Zustand&logoColor=white" alt="Zustand" height="28"/> | 클라이언트 전역 상태 관리 |
| <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" height="28"/> + <img src="https://img.shields.io/badge/pgvector-008080?style=for-the-badge" alt="pgvector" height="28"/> | 관계형 DB 및 벡터(임베딩) 검색 지원 |
| <img src="https://img.shields.io/badge/TypeORM-E83524?style=for-the-badge&logo=typeorm&logoColor=white" alt="TypeORM" height="28"/> | DB ORM, 객체지향적 데이터 모델링 |
| <img src="https://img.shields.io/badge/Sentry-362D59?style=for-the-badge&logo=sentry&logoColor=white" alt="Sentry" height="28"/> | 에러 추적 및 모니터링 |
| <img src="https://img.shields.io/badge/next--seo-000?style=for-the-badge" alt="next-seo" height="28"/> | SEO(검색엔진 최적화) |

## 📂 폴더 구조

```text
src/
  app/                # Next.js App Router (페이지/라우트)
    layout.tsx
    page.tsx
    dictionary/       # 용어사전 관련 페이지
    quiz/             # 퀴즈 관련 페이지
    test/             # 심리검사 관련 페이지
  components/         # 공통 UI 컴포넌트
    Header.tsx
    Footer.tsx
  features/           # 도메인별 기능(예: 용어사전, 퀴즈, 심리검사)
    dictionary/
    quiz/
    test/
  hooks/              # 커스텀 훅
  lib/                # API 클라이언트, 유틸 함수, 쿼리
    api.ts
    data-source.ts
    queries/
      user.ts
      dictionary.ts
  store/              # 전역 상태(Zustand)
    userStore.ts
    uiStore.ts
  styles/             # 전역/모듈 스타일
    globalStyle.ts
  types/              # 타입 정의
    index.ts
  constants/          # 상수
    index.ts
  entity/             # DB 엔티티
    User.ts
assets/               # 이미지, 폰트 등 정적 자원
```

guides/ 폴더에는 개발/운영 가이드 문서가 포함되어 있습니다.

## 📖 개발/운영 가이드
- [guides/README.md](guides/README.md)에서 모든 가이드 문서를 확인할 수 있습니다.
