# Next.js에서 Spring Boot 스타일 계층형 개발 가이드

이 가이드는 Next.js(App Router 기반)에서 Spring Boot처럼 Controller-Service-Repository 계층을 분리하여 구조적으로 개발하는 실전 예시와 패턴을 안내합니다.

---

## 1. 폴더 구조 예시

```text
src/
  app/
    api/
      dictionary/
        [id]/
          route.ts      # API 엔드포인트(Controller)
  features/
    dictionary/
      controller.ts     # 컨트롤러(라우트 핸들러)
      service.ts        # 서비스(비즈니스 로직)
      repository.ts     # 레포지토리(DB 접근)
      model.ts          # 타입/엔티티
  lib/
    data-source.ts     # DB 연결
```

---

## 2. 코드 예시

### 2.1. Model/Entity (features/dictionary/model.ts)
```typescript
export type DictionaryTerm = {
  id: number;
  term: string;
  description: string;
};
```

### 2.2. Repository (features/dictionary/repository.ts)
```typescript
import { AppDataSource } from '@/lib/data-source';
import { DictionaryTerm } from './model';

export async function findTermById(id: number): Promise<DictionaryTerm | null> {
  // TypeORM 예시
  return AppDataSource.getRepository(DictionaryTerm).findOneBy({ id });
}
```

### 2.3. Service (features/dictionary/service.ts)
```typescript
import * as repo from './repository';

export async function getTermDetail(id: number) {
  const term = await repo.findTermById(id);
  // 비즈니스 로직 추가 가능
  return term;
}
```

### 2.4. Controller (features/dictionary/controller.ts)
```typescript
import { getTermDetail } from './service';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = Number(searchParams.get('id'));
  const term = await getTermDetail(id);
  return Response.json(term);
}
```

### 2.5. API Route (src/app/api/dictionary/[id]/route.ts)
```typescript
import * as controller from '@/features/dictionary/controller';

export const GET = controller.GET;
```

---

## 3. 장점
- 관심사 분리로 유지보수/확장성 향상
- 테스트 및 협업 용이
- 대규모 실무 프로젝트에 적합


## 4. 서버 액션 기반 예시

Next.js App Router에서는 서버 액션(`'use server'`)을 활용해 Controller-Service-Repository 계층 구조를 그대로 적용할 수 있습니다.

### 4.1. 서버 액션 정의 (features/dictionary/actions.ts)
```typescript
'use server';
import { getTermDetail } from './service';

export async function addTermAction(term: string, description: string) {
  // 예시: 신규 용어 추가 비즈니스 로직 호출
  // await service.addTerm(term, description);
  return { success: true };
}

export async function getTermDetailAction(id: number) {
  return getTermDetail(id);
}
```

### 4.2. 클라이언트 컴포넌트에서 서버 액션 사용 (src/app/dictionary/page.tsx)
```tsx
'use client';
import { useState } from 'react';
import { getTermDetailAction } from '@/features/dictionary/actions';

export default function DictionaryPage() {
  const [id, setId] = useState('');
  const [result, setResult] = useState(null);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const data = await getTermDetailAction(Number(id));
    setResult(data);
  }

  return (
    <form onSubmit={handleSearch}>
      <input value={id} onChange={e => setId(e.target.value)} placeholder="용어 ID" />
      <button type="submit">검색</button>
      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </form>
  );
}
```

---

## 5. 참고
- 서버 액션 파일 상단에 반드시 `'use server'` 선언 필요
- 서버 액션도 service/repository 계층을 호출하여 관심사 분리 유지
- 폼 처리, 단순 데이터 조작 등에 서버 액션 적극 활용 가능

---

> 이 구조를 적용하면 Next.js에서도 Spring Boot와 유사한 계층형 백엔드 설계가 가능합니다. 서버 액션 기반 구조도 Controller-Service-Repository 계층과 결합해 Spring Boot 스타일로 확장할 수 있습니다.
