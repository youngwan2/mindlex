# TypeORM 설정 및 사용법 종합 가이드 (Next.js + PostgreSQL)

---

## 1. 주요 패키지 및 버전

- typeorm: ^0.3.25
- pg: ^8.x
- reflect-metadata: ^0.2.x
- ts-node: ^10.x
- tsconfig-paths: ^4.x
- typescript: ^5.x

---

## 2. tsconfig.json 핵심 설정

```jsonc
{
  "compilerOptions": {
    "target": "ES2017", // 또는 ES2022 이상
    "module": "esnext",
    "moduleResolution": "bundler", // 또는 node
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "useDefineForClassFields": false, // 데코레이터 오류 방지
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "ts-node": {
    "esm": false,
    "experimentalSpecifierResolution": "node",
    "require": ["tsconfig-paths/register"],
    "transpileOnly": true
  }
}
```

- 데코레이터 관련 옵션(`experimentalDecorators`, `emitDecoratorMetadata`, `useDefineForClassFields`) 필수
- paths 옵션으로 `@/` alias 지원

---

## 3. 데이터소스(database.ts) 설정 (ESM 환경)

```typescript
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5440,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: process.env.TYPEORM_SYNC === 'true',
  logging: process.env.TYPEORM_LOG === 'true',
  entities: [__dirname + '/../entities/**/*.ts'],
  migrations: [__dirname + '/../migrations/*.{ts,js}'],
  subscribers: [__dirname + '/../subscribers/*.{ts,js}'],
});
```

- ESM 환경에서는 `fileURLToPath`, `dirname`으로 `__dirname` 대체
- 환경변수는 dotenv로 관리

---

## 4. 엔티티 예시(User)

```typescript
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('identity', { comment: '사용자 ID' })
  id: number;

  @Column({ unique: true, comment: '사용자 닉네임' })
  nickname: string;

  @Column({ unique: true, comment: '사용자 이메일' })
  email: string;

  @Column({ comment: '사용자 비밀번호' })
  password?: string;

  @Column({ enum: ['user', 'admin'], default: 'user', comment: '사용자 역할' })
  role: string;

  @Column({ comment: '사용자 프로바이더' })
  provider?: string;

  @Column({ comment: '사용자 프로바이더 ID' })
  providerId?: string;

  @Column({ type: 'text', nullable: true, comment: '사용자 프로필 이미지 URL' })
  profileImageUrl?: string | null;

  @CreateDateColumn({ comment: '사용자 생성일' })
  createdAt!: Date;

  @UpdateDateColumn({ comment: '사용자 정보 수정일' })
  updatedAt!: Date;
}
```

- 각 필드에 타입과 DB 타입 명확히 지정
- enum, nullable, comment 등 적극 활용

---

## 5. 마이그레이션 명령어 및 package.json 스크립트

### package.json 예시

```jsonc
"scripts": {
  "typeorm": "typeorm-ts-node-commonjs",
  "db:migration:generate": "npm run typeorm -- migration:generate ./migrations/Migration -d ./src/lib/database.ts",
  "db:migration:run": "npm run typeorm -- migration:run -d ./src/lib/database.ts",
  "db:migration:revert": "npm run typeorm -- migration:revert -d ./src/lib/database.ts",
  "db:migration:create": "npm run typeorm -- migration:create ./migrations/Migration",
  "db:schema:sync": "npm run typeorm -- schema:sync -d ./src/lib/database.ts",
  "db:schema:drop": "npm run typeorm -- schema:drop -d ./src/lib/database.ts"
}
```

### 직접 명령어 실행 예시

```bash
npx typeorm-ts-node-commonjs migration:generate ./migrations/Migration -d ./src/lib/database.ts
npx typeorm-ts-node-commonjs migration:run -d ./src/lib/database.ts
npx typeorm-ts-node-commonjs migration:revert -d ./src/lib/database.ts
```

- CLI에서 직접 실행하거나, npm script로 실행 가능
- 데이터소스 경로(-d 옵션) 반드시 명시

---

## 6. 자주 발생하는 오류 및 해결법

- \_\_dirname is not defined in ES module scope → fileURLToPath, dirname 사용
- DataTypeNotSupportedError: Data type "Object" → @Column({ type: 'text' }) 등 명확한 타입 지정
- No changes in database schema were found → 엔티티/DB 스키마가 일치, 정상
- 데코레이터 관련 오류 → tsconfig에 useDefineForClassFields: false, experimentalDecorators: true, emitDecoratorMetadata: true
- 경로 인식 오류 → entities, migrations 경로를 절대경로로 지정

---

## 7. 참고/추천 문서

- guides/typeorm/typeorm-datasource-config-guide.md
- guides/typeorm/postgres-typeorm-guide.md
- guides/chapter/chapter18-typeorm-migration-guide.md

---

이 문서는 Next.js + TypeORM + PostgreSQL 환경에서 실전적으로 마이그레이션, 엔티티, 데이터소스, tsconfig, 스크립트, 주요 오류까지 한 번에 참고할 수 있는 실무 가이드입니다.
