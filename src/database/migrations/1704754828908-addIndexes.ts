import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIndexes1704754828908 implements MigrationInterface {
    name = 'AddIndexes1704754828908'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "IDX_03e4dcb66aaa46bc163f560e06" ON "refresh-token" ("refreshToken") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_03e4dcb66aaa46bc163f560e06"`);
    }
}
