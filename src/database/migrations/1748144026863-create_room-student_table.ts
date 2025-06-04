import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRoomStudentTable1748144026863 implements MigrationInterface {
    name = 'CreateRoomStudentTable1748144026863'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`room_student\` (\`id\` int NOT NULL AUTO_INCREMENT, \`room_id\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`user_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`room_student\` ADD CONSTRAINT \`FK_259163074fc4ac5e5cd8de34a62\` FOREIGN KEY (\`room_id\`) REFERENCES \`room\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`room_student\` ADD CONSTRAINT \`FK_3d07b19b2bbaeac6629d50e9d00\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`room_student\` DROP FOREIGN KEY \`FK_3d07b19b2bbaeac6629d50e9d00\``);
        await queryRunner.query(`ALTER TABLE \`room_student\` DROP FOREIGN KEY \`FK_259163074fc4ac5e5cd8de34a62\``);
        await queryRunner.query(`DROP TABLE \`room_student\``);
    }

}
