import { MigrationInterface, QueryRunner } from 'typeorm';

export class MyMigration1686435362244 implements MigrationInterface {
  name = 'MyMigration1686435362244';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "proverb" ADD CONSTRAINT "UQ_e133a8dccdc73fe726eac9b70eb" UNIQUE ("igbo")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "proverb" DROP CONSTRAINT "UQ_e133a8dccdc73fe726eac9b70eb"`,
    );
  }
}
