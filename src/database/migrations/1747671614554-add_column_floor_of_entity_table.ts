import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnFloorOfEntityTable1747671614554 implements MigrationInterface {
    name = 'AddColumnFloorOfEntityTable1747671614554'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`room\` ADD \`floor\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`room\` DROP COLUMN \`floor\``);
    }

}
