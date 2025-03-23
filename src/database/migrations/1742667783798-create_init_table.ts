import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateInitTable1742667783798 implements MigrationInterface {
    name = 'CreateInitTable1742667783798'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`role\` enum ('1', '2', '3') NOT NULL DEFAULT '3', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
