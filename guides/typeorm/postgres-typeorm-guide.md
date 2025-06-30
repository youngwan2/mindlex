# Next.js 프로젝트에 PostgreSQL + TypeORM 적용 가이드

이 문서는 Next.js 프로젝트(예: mindlex)에 PostgreSQL과 TypeORM을 적용하는 방법을 안내합니다.

## 1. 패키지 설치

```bash
npm install typeorm pg reflect-metadata
```

## 2. TypeORM 설정 파일 생성

`src` 폴더에 `data-source.ts` 파일을 생성하고 다음과 같이 작성합니다:

```typescript
import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'your_db_user',
  password: 'your_db_password',
  database: 'your_db_name',
  synchronize: true, // 운영 환경에서는 false 권장
  logging: true,
  entities: [__dirname + '/entities/*.ts'],
  migrations: [__dirname + '/migrations/*.ts'],
  subscribers: [],
});
```

## 3. Entity 생성 예시

`src/entities/User.ts`:

```typescript
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
```

## 4. 데이터베이스 연결 및 사용 예시

```typescript
import { AppDataSource } from '../data-source';
import { User } from '../entities/User';

AppDataSource.initialize()
  .then(async () => {
    const userRepo = AppDataSource.getRepository(User);
    const user = userRepo.create({ name: '홍길동' });
    await userRepo.save(user);
    console.log('User saved:', user);
  })
  .catch((error) => console.log(error));
```

## 5. 참고 사항

- 환경 변수로 DB 정보 관리 권장 (`dotenv` 사용)
- `synchronize: true`는 개발 환경에서만 사용
- Next.js API Route 또는 별도 서버에서 DB 연결 권장

---

이 가이드를 참고하여 PostgreSQL과 TypeORM을 프로젝트에 적용할 수 있습니다.
