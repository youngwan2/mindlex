# 목 데이터(mock data) 폴더 구조 및 활용 가이드

이 문서는 `src/mocks/` 폴더를 기준으로 한 실무형 목 데이터(mock data) 관리 구조와 활용법을 설명합니다.

## 폴더 구조 예시

```
src/
  mocks/                # 목 데이터 및 관련 유틸리티
    data/               # 실제 JSON/TS 목 데이터 파일
      users.mock.ts
      terms.mock.ts
      categories.mock.ts
      accounts.mock.ts
    factories/          # 목 데이터 생성 함수(Factory 패턴)
      userFactory.ts
      termFactory.ts
    index.ts            # 목 데이터/팩토리 export 집합
```

## 각 폴더/파일 역할

- **src/mocks/data/**

  - 실제로 사용할 목 데이터(배열, 객체 등)를 파일별로 분리해 저장합니다.
  - 예: `terms.mock.ts`에는 TermEntity와 호환되는 용어 데이터 배열을 export.
  - JSON 파일로도 저장 가능(`terms.mock.json` 등).

- **src/mocks/factories/**

  - faker, chance 등 라이브러리로 동적 목 데이터 생성 함수(Factory) 관리.
  - 예: `userFactory.ts`에서 랜덤 유저 데이터 생성 함수 export.

- **src/mocks/index.ts**
  - 테스트/개발 환경에서 한 번에 import/export 할 수 있도록 집합 파일 역할.

## 활용 예시

- 개발/테스트 환경에서 API, DB, 컴포넌트 단위 테스트 등에 활용
- Storybook, Playwright, Cypress 등에서도 재사용 가능
- 실제 seed(초기 데이터)와 구분하여 관리

## 기타 팁

- 단순 JSON 파일로 저장하고 싶다면 `src/mocks/data/*.json` 형태로도 가능
- 실제 seed 데이터(`src/seeds/`)와 구분하여 관리 권장
- `__mocks__` 폴더명도 사용 가능하지만, 실무에서는 `mocks` 또는 `mock-data`가 더 직관적임

## 예시: TermEntity용 목 데이터 (terms.mock.ts)

```typescript
import { TermEntity } from '@/entities/term/Term';

export const termsMock: TermEntity[] = [
  {
    id: 1,
    termKo: '우울증',
    termEn: 'Depression',
    termHanja: '憂鬱症',
    definition: '지속적인 우울감과 흥미 저하가 특징인 정신질환.',
    description:
      '우울증은 슬픔, 무기력, 흥미 저하, 수면장애 등 다양한 증상을 동반하는 대표적 정신질환입니다.',
    visualType: 'image',
    visualUrl: 'https://example.com/depression.png',
    visualCode: null,
    audioUrl: 'https://example.com/depression.mp3',
    isPublished: true,
    categoryId: 1,
    createdAt: new Date('2024-01-01T00:00:00Z'),
    updatedAt: new Date('2024-01-01T00:00:00Z'),
  },
  {
    id: 2,
    termKo: '불안장애',
    termEn: 'Anxiety Disorder',
    termHanja: '不安障礙',
    definition: '과도한 불안과 걱정이 지속되는 장애.',
    description: '불안장애는 일상생활에 지장을 줄 정도로 불안이 지속되는 상태를 말합니다.',
    visualType: 'mermaid',
    visualUrl: null,
    visualCode: 'graph TD; A[불안] --> B[신체증상];',
    audioUrl: null,
    isPublished: true,
    categoryId: 1,
    createdAt: new Date('2024-01-02T00:00:00Z'),
    updatedAt: new Date('2024-01-02T00:00:00Z'),
  },
  // ...
];
```

---

이 구조를 활용하면 목 데이터 관리, 테스트, 개발 환경에서의 데이터 주입이 체계적으로 가능합니다.
