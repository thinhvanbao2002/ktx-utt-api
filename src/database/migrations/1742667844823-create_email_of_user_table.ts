import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEmailOfUserTable1742667844823 implements MigrationInterface {
    name = 'CreateEmailOfUserTable1742667844823'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`email\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`email\``);
    }

}
