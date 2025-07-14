import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1752480191433 implements MigrationInterface {
    name = 'Migration1752480191433'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "term_categories" ADD "parentCategoryId" integer`);
        await queryRunner.query(`ALTER TABLE "term_categories" ADD CONSTRAINT "FK_a8d0e449f06c7884ed89d45d95d" FOREIGN KEY ("parentCategoryId") REFERENCES "term_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "term_categories" DROP CONSTRAINT "FK_a8d0e449f06c7884ed89d45d95d"`);
        await queryRunner.query(`ALTER TABLE "term_categories" DROP COLUMN "parentCategoryId"`);
    }

}
