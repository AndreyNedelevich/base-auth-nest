import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1704708440941 implements MigrationInterface {
    name = 'Initial1704708440941'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "user" (
                "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), 
                "updated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), 
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
                "firstName" text NOT NULL, 
                "lastName" text NOT NULL, 
                "email" text NOT NULL, 
                "password" text NOT NULL, 
                CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), 
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "refresh-token" (
                "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), 
                "updated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), 
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
                "deviceId" text NOT NULL, 
                "refreshToken" text NOT NULL, 
                "user_id" uuid NOT NULL, 
                CONSTRAINT "UQ_ab9932542d52df88dde3d9f8fed" UNIQUE ("deviceId", "user_id"), 
                CONSTRAINT "PK_62793706ec70c44e0bb5f448923" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "refresh-token" 
            ADD CONSTRAINT "FK_0f25c0e45e3acbd833ca32ea671" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "refresh-token" DROP CONSTRAINT "FK_0f25c0e45e3acbd833ca32ea671"`);
        await queryRunner.query(`DROP TABLE "refresh-token"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
