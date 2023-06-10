import { MigrationInterface, QueryRunner } from "typeorm";

export class MyMigration1686064061638 implements MigrationInterface {
    name = 'MyMigration1686064061638'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "proverb" ("id" SERIAL NOT NULL, "igbo" character varying NOT NULL, "english" character varying NOT NULL, "meaning" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_da67599f515ef5dad4281ed2e74" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "proverb"`);
    }

}
