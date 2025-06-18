# PostgreSQL(pg) 기반 데이터베이스 연동 및 서비스별 비교 가이드

이 문서는 Mindlex 프로젝트에서 PostgreSQL(pg) 기반 데이터베이스를 연동하는 방법과, 주요 클라우드/매니지드 DB 서비스별 장단점 및 선택 가이드를 제공합니다.

---

## 1. PostgreSQL(pg) 연동 기본

### 1.1. 주요 라이브러리
- **pg**: Node.js용 PostgreSQL 드라이버 (Next.js, TypeORM 등에서 사용)
- **typeorm**: ORM(Object Relational Mapping) 라이브러리, DB 모델링/쿼리 추상화

### 1.2. 설치 예시
```bash
npm install pg typeorm reflect-metadata
```

### 1.3. .env 예시
```
DATABASE_URL=postgres://user:password@host:5432/dbname
```

### 1.4. TypeORM DataSource 예시 (src/lib/data-source.ts)
```typescript
import { DataSource } from 'typeorm';
import { User } from '@/entity/User';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [User],
  synchronize: true, // 개발용, 운영시 false 권장
});
```

---

## 2. 주요 매니지드 PostgreSQL 서비스 비교

| 서비스      | 무료 플랜 | 장점                                   | 단점                       | 추천 용도           |
|-------------|-----------|----------------------------------------|----------------------------|---------------------|
| **Supabase**| O (최대 1GB) | 인증/스토리지/실시간 등 통합, 쉬운 연동 | 트래픽/쿼리 제한, 해외 서버 | 스타트업, MVP, PoC  |
| **Neon**    | O (최대 10GB)| 서버리스, 자동 슬립/웨이크, 저렴       | 일부 기능 제한, 해외 서버   | 서버리스, 비용절감   |
| **Render**  | O (최대 1GB) | 쉬운 배포, 자동 백업, 저렴             | 무료는 슬립, 리전 제한      | 소규모, 테스트      |
| **Railway** | O ($5 크레딧)| 빠른 배포, DB/백엔드 통합 관리         | 무료 크레딧 소진시 중단     | 빠른 PoC, 통합 관리 |
| **AWS RDS** | X          | 엔터프라이즈, 국내 리전, 고가용성       | 비용 높음, 운영 복잡        | 대규모, 국내 서비스 |
| **PlanetScale** | O (MySQL) | 서버리스, 쉬운 스케일링               | PostgreSQL 미지원          | MySQL 선호시        |

---

## 3. 서비스별 선택 가이드
- **Supabase**: Next.js와 궁합 최고, 인증/스토리지 등 통합, 무료/유료 모두 가성비 우수
- **Neon**: 서버리스, 자동 슬립/웨이크로 비용 최적화, 무료 용량 넉넉
- **Render**: 저렴, 자동 백업, 소규모/테스트에 적합
- **Railway**: 빠른 배포, DB/백엔드 통합, 무료 크레딧 활용
- **AWS RDS**: 국내 리전, 고가용성, 대규모/상용 서비스에 적합
- **PlanetScale**: MySQL 기반, 서버리스, PostgreSQL 필요시 비추천

---

## 4. 실무 팁
- 무료 플랜은 트래픽/쿼리/슬립 정책 등 제한이 있으니 서비스 규모에 따라 업그레이드 고려
- DB 연결 정보는 반드시 .env 등 환경변수로 관리
- 운영 환경에서는 백업/보안/모니터링 필수

---

> Mindlex는 Supabase, Neon, Render 등 무료/저비용 매니지드 PostgreSQL 서비스를 우선 추천합니다. 대규모/국내 서비스는 AWS RDS 등도 고려하세요.
