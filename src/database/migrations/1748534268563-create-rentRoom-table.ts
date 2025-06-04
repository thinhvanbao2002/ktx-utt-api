import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRentRoomTable1748534268563 implements MigrationInterface {
    name = 'CreateRentRoomTable1748534268563'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`rent_rooms\` (\`id\` int NOT NULL AUTO_INCREMENT, \`room_id\` int NOT NULL, \`max_students\` int NOT NULL, \`current_students\` int NOT NULL, \`user_id\` int NOT NULL, \`student_code\` varchar(255) NOT NULL, \`class_code\` varchar(255) NOT NULL, \`cccd_code\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`parent_phone\` varchar(255) NOT NULL, \`contract_duration\` varchar(255) NOT NULL, \`status\` varchar(255) NOT NULL DEFAULT 'pending', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`rent_rooms\` ADD CONSTRAINT \`FK_e4f680cef14b9949401dca78f6a\` FOREIGN KEY (\`room_id\`) REFERENCES \`room\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`rent_rooms\` ADD CONSTRAINT \`FK_e3b0ad5b394feab83d2d56fc5d5\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`rent_rooms\` DROP FOREIGN KEY \`FK_e3b0ad5b394feab83d2d56fc5d5\``);
        await queryRunner.query(`ALTER TABLE \`rent_rooms\` DROP FOREIGN KEY \`FK_e4f680cef14b9949401dca78f6a\``);
        await queryRunner.query(`DROP TABLE \`rent_rooms\``);
    }

}
