import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRentRoomTable1748170637017 implements MigrationInterface {
    name = 'CreateRentRoomTable1748170637017'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`ren_room\` (\`id\` int NOT NULL AUTO_INCREMENT, \`room_id\` varchar(255) NOT NULL, \`user_id\` varchar(255) NOT NULL, \`parent_phone\` varchar(10) NOT NULL, \`status\` enum ('waitingForConfirmation', 'confirmed', 'contractSigned', 'completed') NOT NULL DEFAULT 'waitingForConfirmation', \`contract_duration\` int NOT NULL, \`contract_signed_date\` date NOT NULL, \`contract_end_date\` date NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`cccd_code\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`class_code\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`student_code\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`student_code\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`class_code\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`cccd_code\``);
        await queryRunner.query(`DROP TABLE \`ren_room\``);
    }

}
