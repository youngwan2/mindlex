# 3장: App Router에서 TypeORM 연결 및 활용

Next.js App Router 환경에서 TypeORM을 안전하게 연결하고 활용하는 방법을 안내합니다.

## 3.1. DB 연결 함수 작성

`src/lib/db.ts` 파일 예시:

```typescript
import { AppDataSource } from '../data-source';

export async function getDataSource() {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  return AppDataSource;
}
```

## 3.2. 서버 컴포넌트/Route Handler에서 사용 예시

```typescript
// 예: src/app/api/user/route.ts
import { NextResponse } from 'next/server';
import { getDataSource } from '@/lib/db';
import { User } from '@/entities/User';

export async function GET() {
  const ds = await getDataSource();
  const users = await ds.getRepository(User).find();
  return NextResponse.json(users);
}
```

> **주의:** DB 연결은 서버 컴포넌트 또는 API Route에서만 사용해야 하며, 클라이언트 컴포넌트에서는 사용할 수 없습니다.
