import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateRoomTable1747415298634 implements MigrationInterface {
    name = 'UpdateRoomTable1747415298634'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`room\` CHANGE \`current_capacity\` \`current_capacity\` int NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`room\` CHANGE \`current_capacity\` \`current_capacity\` int NOT NULL`);
    }

}
