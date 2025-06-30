# 4장: 실전 적용 및 베스트 프랙티스

## 4.1. 환경 변수 관리

- `.env` 파일에 DB 정보를 저장하고, `process.env`로 불러옵니다.
- 예시:
  ```env
  DB_HOST=localhost
  DB_PORT=5432
  DB_USER=your_user
  DB_PASS=your_password
  DB_NAME=your_db
  ```

## 4.2. 마이그레이션 활용

- TypeORM CLI 또는 스크립트로 마이그레이션을 관리하세요.
- 예시 명령어:
  ```bash
  npx typeorm migration:generate src/migrations/Init
  npx typeorm migration:run
  ```

## 4.3. 기타 팁

- `synchronize: true`는 개발 환경에서만 사용하세요.
- DB 연결 재사용을 위해 싱글턴 패턴을 활용하세요.
- 공식 문서: https://typeorm.io/
