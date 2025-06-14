# PostgreSQL & TypeORM + Docker(pgvector) 사용 가이드

## 1. 개요

- **PostgreSQL**: 오픈소스 관계형 데이터베이스(RDBMS)로, 신뢰성과 확장성이 뛰어남.
- **TypeORM**: TypeScript/JavaScript 환경에서 사용하는 ORM(Object-Relational Mapping) 라이브러리. 객체지향적으로 DB를 다룰 수 있게 해줌.
- **pgvector**: PostgreSQL에서 벡터(embedding) 연산을 지원하는 확장. AI/유사도 검색 등에 활용.
- **Docker**: 데이터베이스 환경을 손쉽게 구축/관리할 수 있음.

---

## 2. 데이터베이스 환경 구성

### 1) .env 파일 작성

```
POSTGRES_DB=db_mindlex
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_HOST=localhost # 도커 내부에서 접근 시 db
POSTGRES_PORT=5432
```

### 2) docker-compose.yml 작성 (pgvector 공식 이미지 사용)

```yaml
services:
  db:
    image: pgvector/pgvector:pg17
    container_name: mindlex-postgres
    environment:
      POSTGRES_DB: ${POSTGRES_DB}
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    ports:
      - '5432:5432'
    volumes:
      - pgdata:/var/lib/postgresql/data
    restart: unless-stopped
volumes:
  pgdata:
```

- pgvector가 이미 포함된 공식 이미지를 사용하므로 별도의 확장 설치 스크립트가 필요 없습니다.
- .env 파일의 값이 docker-compose.yml에 자동으로 반영됩니다.

---

## 3. 프로젝트에 패키지 설치

```bash
npm install typeorm pg reflect-metadata
```
- `typeorm`: ORM 라이브러리
- `pg`: PostgreSQL 드라이버
- `reflect-metadata`: TypeORM에서 데코레이터 사용 시 필요

---

## 4. TypeORM 설정 및 사용법

### 1) Entity 예시

```ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;
}
```

### 2) DataSource 설정 예시 (.env 연동)

```ts
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../entity/User';

const {
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_HOST,
  POSTGRES_PORT
} = process.env;

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: POSTGRES_HOST || 'localhost',
  port: POSTGRES_PORT ? parseInt(POSTGRES_PORT, 10) : 5432,
  username: POSTGRES_USER || 'postgres',
  password: POSTGRES_PASSWORD || '',
  database: POSTGRES_DB || 'mydb',
  synchronize: true, // 개발 시 true, 운영 시 false 권장
  logging: true,
  entities: [User],
});
```

### 3) CRUD 예시

```ts
import { AppDataSource } from './data-source';
import { User } from './entity/User';

// DB 연결
await AppDataSource.initialize();

// 저장
const user = new User();
user.name = '홍길동';
user.email = 'hong@example.com';
await AppDataSource.manager.save(user);

// 조회
const users = await AppDataSource.manager.find(User);
```

---

## 5. 참고 자료
- [TypeORM 공식 문서](https://typeorm.io/)
- [PostgreSQL 공식 문서](https://www.postgresql.org/docs/)
- [pgvector 공식 문서](https://github.com/pgvector/pgvector)
- [Docker Compose 공식 문서](https://docs.docker.com/compose/)

---

이 가이드를 참고하여 PostgreSQL + pgvector + TypeORM 환경을 구축하세요.
