import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateStatusUserTable1746900298986 implements MigrationInterface {
  name = 'CreateStatusUserTable1746900298986';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`status\` enum('active', 'inactive') NOT NULL DEFAULT 'active'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`status\``);
  }
}
