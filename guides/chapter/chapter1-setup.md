# 1장: Next.js App Router + TypeORM 환경 구축

이 문서에서는 Next.js(App Router) 프로젝트에 TypeORM과 PostgreSQL을 적용하는 환경을 구축합니다.

## 1.1. 패키지 설치

```bash
npm install typeorm pg reflect-metadata
```

## 1.2. 폴더 구조 예시

```
src/
  app/
  entities/
  lib/database.ts
```

## 1.3. TypeORM 데이터 소스 설정

`src/lib/database.ts` 파일을 생성하고 다음과 같이 작성합니다:

```typescript
import 'reflect-metadata';
import { DataSource } from 'typeorm';

import * as dotenv from 'dotenv';
import { User } from '../features/user/entities/User';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5440,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: process.env.TYPEORM_SYNC === 'true', // 운영 환경에서는 false 권장
  logging: process.env.TYPEORM_LOG === 'true',
  entities: [User],
  migrations: ['migrations/*.ts'], // 마이그레이션 파일 경로
  subscribers: ['subscribers/*.ts'],
});

/**
 * 데이터베이스 연결을 가져오는 함수
 * @returns {Promise<DataSource>} 데이터베이스 연결 객체
 * @throws {Error} 데이터베이스 연결 실패 시 에러 발생
 * @description
 * 이 함수는 데이터베이스 연결을 초기화하고, 초기화된 연결 객체를 반환합니다.
 * 데이터베이스 연결이 이미 초기화되어 있는 경우, 기존 연결을 반환합니다.
 * 초기화되지 않은 경우, 연결을 초기화하고 반환합니다.
 * 즉, 싱글톤 패턴을 사용하여 데이터베이스 연결을 관리합니다.
 */
export async function getDataSource() {
  // 데이터베이스 연결이 초기화되지 않은 경우 초기화
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }

  return AppDataSource;
}
```

> **Tip:** 환경 변수 관리를 위해 `dotenv` 패키지 사용을 권장합니다.

## 폴더구조

```
my-nextjs-app/
├── app/
│   ├── api/
│   │   └── users/
│   │       ├── route.ts
│   │       └── [id]/route.ts
│   ├── users/
│   │   ├── page.tsx
│   │   ├── create/page.tsx
│   │   └── [id]/page.tsx
│   └── ...
├── lib/
│   └── database.ts          # 통합 설정 파일
├── entities/
│   └── User.ts
├── migrations/              # 마이그레이션 파일들
├── subscribers/             # 구독자 파일들
├── .env.local
└── package.json
```
