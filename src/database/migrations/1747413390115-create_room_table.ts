import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRoomTable1747413390115 implements MigrationInterface {
    name = 'CreateRoomTable1747413390115'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`room\` (\`id\` int NOT NULL AUTO_INCREMENT, \`room_number\` int NOT NULL, \`current_capacity\` int NOT NULL, \`building_id\` int NOT NULL, \`status\` enum ('active', 'inactive') NOT NULL DEFAULT 'active', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`room\` ADD CONSTRAINT \`FK_a60af3e73dc64bf32778ae73906\` FOREIGN KEY (\`building_id\`) REFERENCES \`building\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`room\` DROP FOREIGN KEY \`FK_a60af3e73dc64bf32778ae73906\``);
        await queryRunner.query(`DROP TABLE \`room\``);
    }

}
