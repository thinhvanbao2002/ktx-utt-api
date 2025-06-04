import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateRenRoomTable1748528922210 implements MigrationInterface {
    name = 'UpdateRenRoomTable1748528922210'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ren_room\` CHANGE \`status\` \`status\` enum ('draft', 'waitingForConfirmation', 'confirmed', 'contractSigned', 'completed') NOT NULL DEFAULT 'waitingForConfirmation'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ren_room\` CHANGE \`status\` \`status\` enum ('waitingForConfirmation', 'confirmed', 'contractSigned', 'completed') NOT NULL DEFAULT 'waitingForConfirmation'`);
    }

}
