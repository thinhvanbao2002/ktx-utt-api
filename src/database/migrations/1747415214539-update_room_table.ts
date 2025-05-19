import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateRoomTable1747415214539 implements MigrationInterface {
    name = 'UpdateRoomTable1747415214539'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`room\` DROP COLUMN \`room_number\``);
        await queryRunner.query(`ALTER TABLE \`room\` ADD \`room_number\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`room\` DROP COLUMN \`room_number\``);
        await queryRunner.query(`ALTER TABLE \`room\` ADD \`room_number\` int NOT NULL`);
    }

}
