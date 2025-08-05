import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1754366566994 implements MigrationInterface {
    name = 'Migration1754366566994'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "favorites" ("id" SERIAL NOT NULL, "userId" character varying NOT NULL, "targetId" integer NOT NULL, "type" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_a77b72e6ab1522c454fa454931a" UNIQUE ("userId", "targetId", "type"), CONSTRAINT "PK_890818d27523748dd36a4d1bdc8" PRIMARY KEY ("id")); COMMENT ON COLUMN "favorites"."userId" IS '사용자 ID'; COMMENT ON COLUMN "favorites"."targetId" IS '북마크 대상 ID'; COMMENT ON COLUMN "favorites"."type" IS '북마크 대상의 유형'; COMMENT ON COLUMN "favorites"."createdAt" IS '북마크 생성일'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "favorites"`);
    }

}
