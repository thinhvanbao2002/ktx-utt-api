import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRoomStudentTable1748144651896 implements MigrationInterface {
    name = 'CreateRoomStudentTable1748144651896'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`room_student\` DROP FOREIGN KEY \`FK_3d07b19b2bbaeac6629d50e9d00\``);
        await queryRunner.query(`ALTER TABLE \`room_student\` CHANGE \`user_id\` \`user_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`room_student\` ADD CONSTRAINT \`FK_3d07b19b2bbaeac6629d50e9d00\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`room_student\` DROP FOREIGN KEY \`FK_3d07b19b2bbaeac6629d50e9d00\``);
        await queryRunner.query(`ALTER TABLE \`room_student\` CHANGE \`user_id\` \`user_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`room_student\` ADD CONSTRAINT \`FK_3d07b19b2bbaeac6629d50e9d00\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
