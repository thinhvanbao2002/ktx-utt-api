import { MigrationInterface, QueryRunner } from "typeorm";

export class AddHometownColumn1751385266691 implements MigrationInterface {
    name = 'AddHometownColumn1751385266691'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`hometown\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`rent_rooms\` CHANGE \`status\` \`status\` enum ('draft', 'waitingForConfirmation', 'confirmed', 'contractSigned', 'completed', 'terminated') NOT NULL DEFAULT 'waitingForConfirmation'`);
        await queryRunner.query(`ALTER TABLE \`ren_room\` CHANGE \`status\` \`status\` enum ('draft', 'waitingForConfirmation', 'confirmed', 'contractSigned', 'completed', 'terminated') NOT NULL DEFAULT 'waitingForConfirmation'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ren_room\` CHANGE \`status\` \`status\` enum ('draft', 'waitingForConfirmation', 'confirmed', 'contractSigned', 'completed') NOT NULL DEFAULT 'waitingForConfirmation'`);
        await queryRunner.query(`ALTER TABLE \`rent_rooms\` CHANGE \`status\` \`status\` enum ('draft', 'waitingForConfirmation', 'confirmed', 'contractSigned', 'completed') NOT NULL DEFAULT 'waitingForConfirmation'`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`hometown\``);
    }

}
