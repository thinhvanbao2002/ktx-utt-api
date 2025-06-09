import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateRentRoomTable1749354968050 implements MigrationInterface {
    name = 'UpdateRentRoomTable1749354968050'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ren_room\` CHANGE \`status\` \`status\` enum ('draft', 'waitingForConfirmation', 'confirmed', 'contractSigned', 'completed', 'terminated') NOT NULL DEFAULT 'waitingForConfirmation'`);
        await queryRunner.query(`ALTER TABLE \`rent_rooms\` CHANGE \`status\` \`status\` enum ('draft', 'waitingForConfirmation', 'confirmed', 'contractSigned', 'completed', 'terminated') NOT NULL DEFAULT 'waitingForConfirmation'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`rent_rooms\` CHANGE \`status\` \`status\` enum ('draft', 'waitingForConfirmation', 'confirmed', 'contractSigned', 'completed') NOT NULL DEFAULT 'waitingForConfirmation'`);
        await queryRunner.query(`ALTER TABLE \`ren_room\` CHANGE \`status\` \`status\` enum ('draft', 'waitingForConfirmation', 'confirmed', 'contractSigned', 'completed') NOT NULL DEFAULT 'waitingForConfirmation'`);
    }

}
