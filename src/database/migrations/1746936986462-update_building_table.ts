import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateBuildingTable1746936986462 implements MigrationInterface {
  name = 'UpdateBuildingTable1746936986462';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`status\` \`status\` enum('active', 'inactive') NOT NULL DEFAULT 'active'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`status\` \`status\` enum ('active', 'inactive') NOT NULL DEFAULT 'active'`,
    );
    await queryRunner.query(`ALTER TABLE \`building\` DROP COLUMN \`note\``);
  }
}
