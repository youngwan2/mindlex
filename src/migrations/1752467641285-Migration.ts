import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1752467641285 implements MigrationInterface {
    name = 'Migration1752467641285'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "provider"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "providerId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "providerId" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "provider" character varying`);
    }

}
