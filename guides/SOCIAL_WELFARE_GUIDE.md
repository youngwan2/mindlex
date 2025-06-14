# 환경설정 가이드

## 1. 추천 라이브러리

### UI/스타일
- **shadcn/ui**: Tailwind CSS 기반의 모던하고 부드러운 React 컴포넌트 라이브러리
- **Tailwind CSS**: 유틸리티 퍼스트 CSS 프레임워크
- **react-icons**: 다양한 아이콘 사용

### 상태 관리/데이터
- **react-query** 또는 **SWR**: 데이터 패칭 및 캐싱
- **zustand** 또는 **recoil**: 전역 상태 관리

### 폼/유효성 검사
- **react-hook-form**: 폼 상태 및 유효성 관리
- **zod** 또는 **yup**: 스키마 기반 유효성 검사

### 심리검사/퀴즈
- **survey-react**: 설문, 심리검사, 퀴즈 UI 구현
- **framer-motion**: 애니메이션 효과

### 기타
- **next-seo**: SEO 최적화
- **date-fns**: 날짜 처리
- **axios**: API 통신
- **Sentry**: 에러 추적 및 모니터링

---

## 2. 폴더 구조 예시

```
src/
├── app/                  # Next.js App Router (페이지/라우트)
│   ├── layout.tsx
│   ├── page.tsx
│   ├── dictionary/       # 용어사전 관련 페이지
│   ├── quiz/             # 퀴즈 관련 페이지
│   └── test/             # 심리검사 관련 페이지
├── components/           # 공통 UI 컴포넌트
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── ...
├── features/             # 도메인별 기능(예: 용어사전, 퀴즈, 심리검사)
│   ├── dictionary/
│   ├── quiz/
│   └── test/
├── hooks/                # 커스텀 훅
├── lib/                  # API 클라이언트, 유틸 함수
├── styles/               # 전역/모듈 스타일
├── types/                # 타입 정의
├── constants/            # 상수
└── assets/               # 이미지, 폰트 등 정적 자원
```

---

## 3. 개발 가이드

- **UI**: shadcn/ui와 Tailwind CSS로 일관된 디자인 적용, 필요시 커스텀 컴포넌트 추가
- **아이콘**: react-icons에서 Material, Remix, Heroicons 등 부드러운 스타일 아이콘 활용
- **데이터 관리**: react-query/SWR로 서버 데이터 패칭, zustand로 전역 상태 관리
- **폼/검사/퀴즈**: react-hook-form + zod로 폼 및 검사/퀴즈 입력값 검증
- **애니메이션**: framer-motion으로 부드러운 인터랙션 구현
- **SEO**: next-seo로 메타태그, OG 태그 등 SEO 최적화
- **로깅/에러 추적**: Sentry 등으로 운영 모니터링
- **폴더 구조**: 기능별로 features 폴더를 두고, 각 도메인별로 컴포넌트/로직 분리
- **유닛테스트**: 필요시 jest, react-testing-library 등 도입 권장

---
## 설치 명령어 가이드

```bash
# Tailwind CSS (Next.js 공식 가이드 방식)
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# shadcn/ui
npx shadcn-ui@latest init

# react-icons
npm install react-icons

# 상태 관리 및 데이터 패칭(가벼운 서버상태는 swr, 복잡하고 확장성을 요하는 경우는 tansatck 쿼리)
# - 서버 데이터(REST, GraphQL 등) 패칭, 캐싱, 동기화, 리페칭, 에러 처리 등 서버 상태 관리에 최적화
# - Next.js와 궁합이 매우 좋고, SSR/CSR 모두 지원
# - SWR도 Next.js와 잘 어울리지만, 기능 확장성과 커뮤니티, 에코시스템은 react-query가 더 강력
npm install @tanstack/react-query zustand swr

# 폼/유효성 검사
# - react-hook-form: 폼 상태 및 입력값 관리에 최적화
# - zod 또는 yup: 스키마 기반의 입력값 유효성 검사
npm install react-hook-form zod yup

# 심리검사/퀴즈/애니메이션
npm install survey-react framer-motion

# 기타 유틸
npm install next-seo date-fns axios

# 에러 추적/로깅
npm install @sentry/nextjs
```
