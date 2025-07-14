# TypeORM @Column() 데코레이터 프로퍼티 완전 정리

## 1장: @Column() 기본 개념

@Column()은 TypeORM에서 엔티티 클래스의 속성을 데이터베이스 테이블의 컬럼과 매핑할 때 사용하는 데코레이터입니다. 다양한 옵션(프로퍼티)을 통해 컬럼의 타입, 제약조건, 기본값, 주석 등 세부 설정이 가능합니다.

---

## 2장: 주요 프로퍼티 설명

| 프로퍼티           | 타입          | 설명                                                            |
| ------------------ | ------------- | --------------------------------------------------------------- |
| type               | string        | 컬럼의 데이터 타입 (예: 'varchar', 'int', 'boolean', 'date' 등) |
| name               | string        | DB에 실제 저장될 컬럼명 (기본: 프로퍼티명과 동일)               |
| length             | string/number | 문자열 타입의 최대 길이 (예: length: 255)                       |
| width              | number        | 숫자 타입의 표시 너비 (MySQL 등 일부 DB에서 사용)               |
| nullable           | boolean       | NULL 허용 여부 (기본: false)                                    |
| unique             | boolean       | 유니크 제약조건 부여                                            |
| primary            | boolean       | 기본키 여부 (기본: false)                                       |
| default            | any           | 기본값 지정                                                     |
| comment            | string        | 컬럼에 대한 설명(주석)                                          |
| enum               | any[]/object  | enum 타입 지정 (enum: ["A", "B"])                               |
| array              | boolean       | 배열 컬럼 여부 (PostgreSQL 등 지원)                             |
| precision          | number        | 소수점 이하 자릿수(숫자/날짜 타입)                              |
| scale              | number        | 소수점 이하 길이(숫자 타입)                                     |
| zerofill           | boolean       | 0으로 채움(MySQL)                                               |
| unsigned           | boolean       | 부호 없는 숫자(MySQL)                                           |
| generated          | string/object | 자동 생성 컬럼(예: 'increment', 'uuid', 'rowid')                |
| select             | boolean       | 쿼리 시 기본 선택 여부 (false면 find 시 제외)                   |
| insert             | boolean       | INSERT 쿼리에서 제외할지 여부                                   |
| update             | boolean       | UPDATE 쿼리에서 제외할지 여부                                   |
| transformer        | object        | 값 변환기(암호화, 포맷 변환 등)                                 |
| onUpdate           | string        | UPDATE 시 자동 값 지정(예: CURRENT_TIMESTAMP)                   |
| charset            | string        | 문자셋 지정(MySQL 등)                                           |
| collation          | string        | 정렬 방식 지정                                                  |
| precision          | number        | 날짜/숫자 타입 정밀도                                           |
| scale              | number        | 소수점 이하 길이                                                |
| spatialFeatureType | string        | 공간 데이터 타입(GeoJSON 등)                                    |
| srid               | number        | 공간 참조 ID(Spatial)                                           |

---

## 3장: 실전 예시

```typescript
@Column({
  type: 'varchar',
  length: 100,
  unique: true,
  nullable: false,
  default: 'guest',
  comment: '사용자 닉네임',
})
nickname: string;

@Column({
  type: 'enum',
  enum: ['user', 'admin'],
  default: 'user',
  comment: '사용자 역할',
})
role: string;
```

---

## 4장: 참고 및 팁

- DB 종류에 따라 지원하는 옵션이 다를 수 있으니 공식 문서 참고
- enum, transformer, onUpdate 등은 고급 기능으로 실전에서 유용하게 활용 가능
- 컬럼 옵션은 유지보수와 데이터 무결성에 중요한 역할을 하므로, 설계 단계에서 꼼꼼히 지정하는 것이 좋음

---

> 이 문서는 TypeORM @Column() 데코레이터의 모든 주요 프로퍼티와 실전 예시를 정리한 가이드입니다. 자세한 내용은 [공식 문서](https://typeorm.io/decorator-reference#column)도 참고하세요.
