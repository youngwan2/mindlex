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
  data-source.ts
```

## 1.3. TypeORM 데이터 소스 설정

`src/data-source.ts` 파일을 생성하고 다음과 같이 작성합니다:

```typescript
import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true, // 개발 환경에서만 true
  logging: true,
  entities: [__dirname + '/entities/*.ts'],
});
```

> **Tip:** 환경 변수 관리를 위해 `dotenv` 패키지 사용을 권장합니다.
