import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateRoomTypeTable1751387100799 implements MigrationInterface {
    name = 'UpdateRoomTypeTable1751387100799'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`room_type\` ADD \`gender\` enum ('male', 'female') NOT NULL DEFAULT 'male'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`room_type\` DROP COLUMN \`gender\``);
    }

}
