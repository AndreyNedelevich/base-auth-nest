import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSalt1704754944866 implements MigrationInterface {
    name = 'AddSalt1704754944866'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "salt" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "salt"`);
    }

}
