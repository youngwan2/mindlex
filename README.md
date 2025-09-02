# 🧠 MindLex: 정신건강 용어 사전 웹/앱

정신건강 실무자와 예비자, 일반인을 위한 용어 사전 및 학습 플랫폼입니다. 누구나 쉽고 편하게 정신건강 관련 용어를 검색·학습하고, 다양한 시각자료와 퀴즈, 복습 기능을 통해 전문 지식을 쌓을 수 있습니다.
<img width="1903" height="897" alt="image" src="https://github.com/user-attachments/assets/9efe7b64-e49b-479c-a821-dc4b0a638de2" />


## 🚀 주요 특징

- **정신건강 용어 검색 및 쉬운 설명**: 전문 용어를 쉽게 풀어 설명하고, 시각자료까지 제공합니다.
- **학습 기능**: 즐겨찾기, 복습 모드, 퀴즈, 오답노트 등 다양한 자기주도 학습 도구 제공
- **마이페이지**: 프로필 관리, 즐겨찾기 목록, 최근 활동, 나의 기여 확인
- **퀴즈 시스템**: 객관식, OX, 단답형, 빈칸 채우기 등 다양한 문제 유형 지원
- **관리자 페이지**: 용어 등록/수정/삭제, 통계, 신고 관리 등 운영 기능 내장
- **반응형 UI/UX**: PC, 모바일, 태블릿 모두 최적화된 접근성 높은 디자인 (다크모드 지원)
- **보안 및 품질**: JWT 인증, XSS/CSRF 방지, Prettier/ESLint 기반 코드 품질 관리
- **소셜 로그인**: Google, Naver 등 소셜 계정으로 간편 로그인/회원가입

## 📅 개발 기간

- **프로젝트 시작**: 2025년 6월 30일 (첫 커밋)
- **최근 업데이트**: 2025년 9월 2일 (최신 커밋)
- **비고**: 1년 정도로 잡음

## 🛠️ 기술 스택

| 기술 스택                 | 비고                                       |
| ------------------------- | ------------------------------------------ |
| Next.js 15, React 18      | 프론트엔드 프레임워크 (App Router)         |
| TypeScript                | 정적 타입 언어                             |
| Tailwind CSS              | 유틸리티 기반 CSS 프레임워크               |
| shadcn/ui, Radix UI       | UI 컴포넌트 라이브러리                     |
| lucide-react, react-icons | 아이콘 라이브러리                          |
| @tanstack/react-query     | 서버 상태 관리                             |
| TypeORM, PostgreSQL, pg   | 백엔드 ORM 및 데이터베이스                 |
| react-hook-form, zod      | 폼 상태 관리 및 유효성 검증                |
| NextAuth.js               | 인증 라이브러리                            |
| MDX                       | 마크다운 + JSX 지원                        |
| Prettier, ESLint          | 코드 스타일 및 린트                        |
| reflect-metadata          | TypeORM 등 데코레이터 기반 라이브러리 지원 |
| Docker, docker-compose    | 컨테이너화 및 로컬 개발 환경               |

## 👥 주요 사용자

- 일반인: 정신건강 용어 학습 및 자기계발
- 정신건강 실무자: 전문 용어 빠른 검색 및 학습
- 수련생: 퀴즈와 복습을 통한 지식 습득
- 사회복지학 전공자: 학술적 용어 참고 및 연구

## 📁 프로젝트 구조

```
mindlex/
├── guides/                 # 개발 가이드 및 교육 자료
│   ├── chapter/           # TypeORM, Next.js 등 주제별 가이드
│   ├── form/              # 폼 관련 가이드
│   ├── react-query/       # React Query 패턴
│   └── ...
├── public/                # 정적 파일 (아이콘, 이미지 등)
├── src/
│   ├── app/               # Next.js App Router 구조
│   │   ├── (auth)/        # 인증 관련 페이지 (로그인 등)
│   │   ├── (category)/    # 카테고리 페이지
│   │   ├── (term)/        # 용어 관련 페이지
│   │   ├── api/           # API 라우트 핸들러
│   │   └── ...
│   ├── components/        # 재사용 가능한 UI 컴포넌트
│   │   ├── ui/            # shadcn/ui 기반 기본 컴포넌트
│   │   └── term/          # 용어 관련 컴포넌트
│   ├── features/          # 기능별 모듈 (term, category, user 등)
│   │   ├── term/          # 용어 검색/표시 기능
│   │   ├── category/      # 카테고리 관리 기능
│   │   ├── user/          # 사용자 관련 기능 (마이페이지 등)
│   │   └── ...
│   ├── shared/            # 공통 유틸리티 및 상수
│   ├── entities/          # TypeORM 엔티티 정의
│   ├── lib/               # 라이브러리 설정 (DB 연결 등)
│   └── types/             # TypeScript 타입 정의
├── test/                  # 테스트 파일
├── docker-compose.yml     # 로컬 개발 환경 설정
├── next.config.ts         # Next.js 설정
├── tailwind.config.js     # Tailwind CSS 설정
└── package.json           # 프로젝트 의존성 및 스크립트
```
