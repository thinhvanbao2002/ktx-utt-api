import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserTable1751386398646 implements MigrationInterface {
    name = 'UpdateUserTable1751386398646'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`class_code\` \`class_code\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`student_code\` \`student_code\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`student_code\` \`student_code\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`class_code\` \`class_code\` varchar(255) NOT NULL`);
    }

}
