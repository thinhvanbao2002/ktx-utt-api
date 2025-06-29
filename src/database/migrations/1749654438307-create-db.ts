import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDb1749654438307 implements MigrationInterface {
    name = 'CreateDb1749654438307'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`building\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, \`note\` varchar(2000) NOT NULL, \`status\` enum ('active', 'inactive') NOT NULL DEFAULT 'active', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`room_type\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`price\` int NOT NULL, \`max_student\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`device\` (\`id\` int NOT NULL AUTO_INCREMENT, \`device_code\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`room_device\` (\`id\` int NOT NULL AUTO_INCREMENT, \`room_id\` int NOT NULL, \`device_id\` int NOT NULL, \`quantity\` int NOT NULL DEFAULT '1', \`description\` text NULL, \`status\` enum ('active', 'inactive') NOT NULL DEFAULT 'active', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`room_photo\` (\`id\` int NOT NULL AUTO_INCREMENT, \`room_id\` int NOT NULL, \`url\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`room\` (\`id\` int NOT NULL AUTO_INCREMENT, \`room_number\` varchar(255) NOT NULL, \`current_capacity\` int NOT NULL DEFAULT '0', \`building_id\` int NOT NULL, \`floor\` int NOT NULL, \`room_type_id\` int NOT NULL, \`status\` enum ('available', 'full', 'underMaintenance') NOT NULL DEFAULT 'available', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`room_student\` (\`id\` int NOT NULL AUTO_INCREMENT, \`room_id\` int NOT NULL, \`user_id\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`phone\` varchar(10) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`cccd_code\` varchar(255) NOT NULL, \`class_code\` varchar(255) NOT NULL, \`student_code\` varchar(255) NOT NULL, \`token\` varchar(2000) NULL, \`role\` enum ('admin', 'student') NOT NULL DEFAULT 'student', \`status\` enum ('active', 'inactive') NOT NULL DEFAULT 'active', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`ren_room\` (\`id\` int NOT NULL AUTO_INCREMENT, \`room_id\` varchar(255) NOT NULL, \`user_id\` varchar(255) NOT NULL, \`parent_phone\` varchar(10) NOT NULL, \`status\` enum ('draft', 'waitingForConfirmation', 'confirmed', 'contractSigned', 'completed') NOT NULL DEFAULT 'waitingForConfirmation', \`contract_duration\` int NOT NULL, \`contract_signed_date\` date NOT NULL, \`contract_end_date\` date NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`rent_rooms\` (\`id\` int NOT NULL AUTO_INCREMENT, \`room_id\` int NOT NULL, \`max_students\` int NOT NULL, \`current_students\` int NOT NULL, \`user_id\` int NOT NULL, \`student_code\` varchar(255) NOT NULL, \`class_code\` varchar(255) NOT NULL, \`cccd_code\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`parent_phone\` varchar(255) NOT NULL, \`contract_duration\` varchar(255) NOT NULL, \`status\` enum ('draft', 'waitingForConfirmation', 'confirmed', 'contractSigned', 'completed') NOT NULL DEFAULT 'waitingForConfirmation', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`floor\` (\`id\` int NOT NULL AUTO_INCREMENT, \`building_id\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`room_device\` ADD CONSTRAINT \`FK_9fb5d2a74f491dc081b2e322bc0\` FOREIGN KEY (\`room_id\`) REFERENCES \`room\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`room_device\` ADD CONSTRAINT \`FK_7beaadc8d47cbe9ea326194cf04\` FOREIGN KEY (\`device_id\`) REFERENCES \`device\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`room_photo\` ADD CONSTRAINT \`FK_039336458c248a384c91c06b1e1\` FOREIGN KEY (\`room_id\`) REFERENCES \`room\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`room\` ADD CONSTRAINT \`FK_a60af3e73dc64bf32778ae73906\` FOREIGN KEY (\`building_id\`) REFERENCES \`building\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`room\` ADD CONSTRAINT \`FK_55b383d0ec20230d193ca584a4a\` FOREIGN KEY (\`room_type_id\`) REFERENCES \`room_type\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`room_student\` ADD CONSTRAINT \`FK_259163074fc4ac5e5cd8de34a62\` FOREIGN KEY (\`room_id\`) REFERENCES \`room\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`room_student\` ADD CONSTRAINT \`FK_3d07b19b2bbaeac6629d50e9d00\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`rent_rooms\` ADD CONSTRAINT \`FK_e4f680cef14b9949401dca78f6a\` FOREIGN KEY (\`room_id\`) REFERENCES \`room\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`rent_rooms\` ADD CONSTRAINT \`FK_e3b0ad5b394feab83d2d56fc5d5\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`floor\` ADD CONSTRAINT \`FK_1565850c51d1cc30e896101fa77\` FOREIGN KEY (\`building_id\`) REFERENCES \`building\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`floor\` DROP FOREIGN KEY \`FK_1565850c51d1cc30e896101fa77\``);
        await queryRunner.query(`ALTER TABLE \`rent_rooms\` DROP FOREIGN KEY \`FK_e3b0ad5b394feab83d2d56fc5d5\``);
        await queryRunner.query(`ALTER TABLE \`rent_rooms\` DROP FOREIGN KEY \`FK_e4f680cef14b9949401dca78f6a\``);
        await queryRunner.query(`ALTER TABLE \`room_student\` DROP FOREIGN KEY \`FK_3d07b19b2bbaeac6629d50e9d00\``);
        await queryRunner.query(`ALTER TABLE \`room_student\` DROP FOREIGN KEY \`FK_259163074fc4ac5e5cd8de34a62\``);
        await queryRunner.query(`ALTER TABLE \`room\` DROP FOREIGN KEY \`FK_55b383d0ec20230d193ca584a4a\``);
        await queryRunner.query(`ALTER TABLE \`room\` DROP FOREIGN KEY \`FK_a60af3e73dc64bf32778ae73906\``);
        await queryRunner.query(`ALTER TABLE \`room_photo\` DROP FOREIGN KEY \`FK_039336458c248a384c91c06b1e1\``);
        await queryRunner.query(`ALTER TABLE \`room_device\` DROP FOREIGN KEY \`FK_7beaadc8d47cbe9ea326194cf04\``);
        await queryRunner.query(`ALTER TABLE \`room_device\` DROP FOREIGN KEY \`FK_9fb5d2a74f491dc081b2e322bc0\``);
        await queryRunner.query(`DROP TABLE \`floor\``);
        await queryRunner.query(`DROP TABLE \`rent_rooms\``);
        await queryRunner.query(`DROP TABLE \`ren_room\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`room_student\``);
        await queryRunner.query(`DROP TABLE \`room\``);
        await queryRunner.query(`DROP TABLE \`room_photo\``);
        await queryRunner.query(`DROP TABLE \`room_device\``);
        await queryRunner.query(`DROP TABLE \`device\``);
        await queryRunner.query(`DROP TABLE \`room_type\``);
        await queryRunner.query(`DROP TABLE \`building\``);
    }

}
