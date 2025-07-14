# TypeORM 마이그레이션 완전 가이드

## 1장: 마이그레이션이란?

마이그레이션(Migration)은 데이터베이스 스키마(테이블, 컬럼, 인덱스 등)의 변경 이력을 코드로 관리하는 기능입니다. 개발/운영 환경에서 DB 구조를 안전하게 버전 관리하고, 여러 개발자가 협업할 때 스키마 동기화를 자동화할 수 있습니다.

---

## 2장: 마이그레이션의 필요성

- DB 구조 변경(테이블 추가/수정/삭제 등)을 코드로 기록
- 여러 환경(개발/운영/테스트)에서 동일한 DB 구조 보장
- 롤백(되돌리기) 및 재적용이 쉬움
- 협업 시 충돌/누락 방지

---

## 3장: 마이그레이션 기본 명령어

```bash
# 마이그레이션 파일 생성 (변경점 자동 감지)
npx typeorm migration:generate src/migrations/Init -d src/data-source.ts

# 마이그레이션 파일 생성 (수동 작성)
npx typeorm migration:create src/migrations/AddUserTable

# 마이그레이션 적용 (DB에 반영)
npx typeorm migration:run

# 마이그레이션 롤백 (이전 상태로 되돌림)
npx typeorm migration:revert
```

---

## 4장: 마이그레이션 파일 구조 예시

```typescript
import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1688888888888 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "user" ( ... )`);
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
```

- up(): 변경 적용, down(): 롤백(되돌리기)

---

## 5장: 실전 팁 및 주의사항

- 엔티티 변경 후 반드시 마이그레이션 파일을 새로 생성
- 운영 환경에서는 synchronize: false로 설정(직접 마이그레이션만 적용)
- 마이그레이션 파일은 git 등 버전관리 필수
- 충돌 방지를 위해 팀원과 커밋/적용 순서 조율
- DB 백업 후 적용 권장

---

## 6장: 고급 활용

- 여러 DB 지원, 시드 데이터 삽입, 커스텀 쿼리 작성 등
- 마이그레이션 파일 내에서 복잡한 데이터 이전/변환 로직도 구현 가능

---

> 이 가이드는 TypeORM 마이그레이션의 개념, 명령어, 실전 예시, 주의사항을 단계별로 안내합니다. 자세한 내용은 [공식 문서](https://typeorm.io/migrations)도 참고하세요.
