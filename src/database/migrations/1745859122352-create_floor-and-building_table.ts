import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFloorAndBuildingTable1745859122352 implements MigrationInterface {
    name = 'CreateFloorAndBuildingTable1745859122352'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`building\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`floor\` (\`id\` int NOT NULL AUTO_INCREMENT, \`building_id\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`floor\` ADD CONSTRAINT \`FK_1565850c51d1cc30e896101fa77\` FOREIGN KEY (\`building_id\`) REFERENCES \`building\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`floor\` DROP FOREIGN KEY \`FK_1565850c51d1cc30e896101fa77\``);
        await queryRunner.query(`DROP TABLE \`floor\``);
        await queryRunner.query(`DROP TABLE \`building\``);
    }

}
