import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRoomDeviceTable1747493435860 implements MigrationInterface {
    name = 'CreateRoomDeviceTable1747493435860'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`room_device\` (\`id\` int NOT NULL AUTO_INCREMENT, \`room_id\` int NOT NULL, \`device_id\` int NOT NULL, \`quantity\` int NOT NULL DEFAULT '1', \`description\` text NULL, \`status\` enum ('active', 'inactive') NOT NULL DEFAULT 'active', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`room_device\` ADD CONSTRAINT \`FK_9fb5d2a74f491dc081b2e322bc0\` FOREIGN KEY (\`room_id\`) REFERENCES \`room\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`room_device\` ADD CONSTRAINT \`FK_7beaadc8d47cbe9ea326194cf04\` FOREIGN KEY (\`device_id\`) REFERENCES \`device\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`room_device\` DROP FOREIGN KEY \`FK_7beaadc8d47cbe9ea326194cf04\``);
        await queryRunner.query(`ALTER TABLE \`room_device\` DROP FOREIGN KEY \`FK_9fb5d2a74f491dc081b2e322bc0\``);
        await queryRunner.query(`DROP TABLE \`room_device\``);
    }

}
