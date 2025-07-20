import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1752913571470 implements MigrationInterface {
    name = 'Migration1752913571470'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "terms" DROP CONSTRAINT "FK_45f6ad23abb6b6afe6bffe041d2"`);
        await queryRunner.query(`ALTER TABLE "term_categories" ADD "level" integer NOT NULL DEFAULT '1'`);
        await queryRunner.query(`COMMENT ON COLUMN "term_categories"."level" IS '카테고리 계층 레벨(1=최상위, 2=하위...)'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "term_categories"."level" IS '카테고리 계층 레벨(1=최상위, 2=하위...)'`);
        await queryRunner.query(`ALTER TABLE "term_categories" DROP COLUMN "level"`);
        await queryRunner.query(`ALTER TABLE "terms" ADD CONSTRAINT "FK_45f6ad23abb6b6afe6bffe041d2" FOREIGN KEY ("categoryId") REFERENCES "term_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
