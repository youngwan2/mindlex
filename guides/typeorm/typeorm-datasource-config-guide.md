# TypeORM DataSource 설정 옵션 설명

이 문서는 `src/data-source.ts` 파일의 주요 설정 옵션이 무엇을 의미하는지 설명합니다.

```typescript
export const AppDataSource = new DataSource({
  type: 'postgres', // 사용할 데이터베이스 종류 (여기서는 PostgreSQL)
  host: process.env.DB_HOST || 'localhost', // DB 서버 주소
  port: Number(process.env.DB_PORT) || 5432, // DB 포트
  username: process.env.DB_USER || 'postgres', // DB 접속 계정명
  password: process.env.DB_PASS || 'postgres', // DB 접속 비밀번호
  database: process.env.DB_NAME || 'postgres', // 사용할 데이터베이스 이름
  synchronize: process.env.TYPEORM_SYNC === 'true', // 엔티티와 DB 스키마 자동 동기화 (개발용)
  logging: process.env.TYPEORM_LOG === 'true', // 쿼리 및 로그 출력 여부
  entities: [__dirname + '/entities/*.ts'], // 엔티티 클래스 파일 경로
  migrations: [__dirname + '/migrations/*.ts'], // 마이그레이션 파일 경로
  subscribers: [], // 이벤트 구독자(Subscriber) 클래스 경로
});
```

## 각 옵션 설명

- **type**: 사용할 데이터베이스 종류. (예: 'postgres', 'mysql', 'sqlite' 등)
- **host**: 데이터베이스 서버의 주소(IP 또는 도메인)
- **port**: 데이터베이스 서버의 포트 번호
- **username**: 데이터베이스 접속 계정명
- **password**: 데이터베이스 접속 비밀번호
- **database**: 실제 사용할 데이터베이스 이름
- **synchronize**: 엔티티와 DB 스키마를 자동으로 동기화할지 여부. 개발 환경에서만 true 권장, 운영에서는 false 필수
- **logging**: 쿼리 실행 등 로그를 출력할지 여부
- **entities**: TypeORM이 인식할 엔티티 클래스 파일 경로(글로벌 경로 또는 상대 경로)
- **migrations**: 마이그레이션 파일 경로
- **subscribers**: DB 이벤트(삽입, 수정, 삭제 등)에 반응하는 Subscriber 클래스 경로

---

이 가이드를 참고해 각 옵션의 의미와 역할을 이해하고, 환경에 맞게 설정을 조정하세요.
