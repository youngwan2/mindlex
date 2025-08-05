import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1754366348087 implements MigrationInterface {
    name = 'Migration1754366348087'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "terms" DROP CONSTRAINT "FK_45f6ad23abb6b6afe6bffe041d2"`);
        await queryRunner.query(`CREATE TABLE "favorites_entity" ("id" SERIAL NOT NULL, "userId" character varying NOT NULL, "targetId" integer NOT NULL, "type" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_04769e79b58b81ac04d143e5464" UNIQUE ("userId", "targetId", "type"), CONSTRAINT "PK_e42953e6be13870839a04a3fa88" PRIMARY KEY ("id")); COMMENT ON COLUMN "favorites_entity"."userId" IS '사용자 ID'; COMMENT ON COLUMN "favorites_entity"."targetId" IS '북마크 대상 ID'; COMMENT ON COLUMN "favorites_entity"."type" IS '북마크 대상의 유형'; COMMENT ON COLUMN "favorites_entity"."createdAt" IS '북마크 생성일'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "favorites_entity"`);
        await queryRunner.query(`ALTER TABLE "terms" ADD CONSTRAINT "FK_45f6ad23abb6b6afe6bffe041d2" FOREIGN KEY ("categoryId") REFERENCES "term_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
