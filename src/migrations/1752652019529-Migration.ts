import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1752652019529 implements MigrationInterface {
    name = 'Migration1752652019529'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "term_categories" ADD "description" character varying(200) NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "term_categories"."description" IS '카테고리 설명'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "term_categories"."description" IS '카테고리 설명'`);
        await queryRunner.query(`ALTER TABLE "term_categories" DROP COLUMN "description"`);
    }

}
