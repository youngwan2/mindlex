# TypeORM 마이그레이션 관련 package.json 스크립트 정리

이 문서는 mindlex 프로젝트의 package.json에 정의된 TypeORM 마이그레이션 관련 스크립트와 각 명령어의 의미를 정리한 가이드입니다.

---

## 1. 스크립트 목록 및 설명

| 스크립트명            | 명령어                                                                                    | 설명                                                        |
| --------------------- | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| typeorm               | typeorm-ts-node-commonjs                                                                  | TypeORM CLI를 ts-node 환경에서 실행(공통 진입점)            |
| db:migration:generate | npm run typeorm -- migration:generate ./src/migrations/Migration -d ./src/lib/database.ts | 엔티티 변경사항 기반 새 마이그레이션 파일 생성              |
| db:migration:run      | npm run typeorm -- migration:run -d ./src/lib/database.ts                                 | 모든 마이그레이션을 DB에 적용                               |
| db:migration:revert   | npm run typeorm -- migration:revert -d ./src/lib/database.ts                              | 마지막 마이그레이션 롤백(되돌리기)                          |
| db:migration:create   | npm run typeorm -- migration:create ./src/migrations/Migration                            | 빈 마이그레이션 파일 생성(직접 쿼리 작성용)                 |
| db:schema:sync        | npm run typeorm -- schema:sync -d ./src/lib/database.ts                                   | 엔티티와 DB 스키마를 즉시 동기화(개발용, 운영에서는 비권장) |
| db:schema:drop        | npm run typeorm -- schema:drop -d ./src/lib/database.ts                                   | 전체 DB 스키마(테이블 등) 삭제(주의!)                       |

---

## 2. 각 명령어의 의미 및 사용법

- **migration:generate**
  - 엔티티(코드)와 DB 스키마를 비교해 변경점이 있으면 새 마이그레이션 파일을 자동 생성합니다.
  - 파일명 예시: `src/migrations/1752283959253-Migration.ts`
- **migration:run**
  - 생성된 마이그레이션 파일을 순서대로 실행하여 DB에 반영합니다.
- **migration:revert**
  - 마지막으로 적용된 마이그레이션을 롤백(undo)합니다.
- **migration:create**
  - 자동 감지 없이 빈 마이그레이션 파일을 생성합니다. 직접 쿼리/로직을 작성할 때 사용합니다.
- **schema:sync**
  - 엔티티와 DB 스키마를 즉시 동기화합니다. (운영 환경에서는 사용 금지!)
- **schema:drop**
  - 전체 DB 스키마(테이블 등)를 삭제합니다. (테스트/초기화 용도, 운영 환경에서는 사용 금지!)

---

## 3. 참고

- 모든 명령어는 `-d ./src/lib/database.ts` 옵션으로 데이터소스 파일을 명시해야 합니다.
- 마이그레이션 파일은 `src/migrations` 폴더에 생성/관리합니다.
- 자세한 사용법은 guides/typeorm/typeorm-datasource-config-guide.md, guides/chapter/chapter18-typeorm-migration-esm-guide.md 참고

---

> 이 문서는 mindlex 프로젝트의 TypeORM 마이그레이션 스크립트 관리와 실무 활용을 위한 참고용입니다.
