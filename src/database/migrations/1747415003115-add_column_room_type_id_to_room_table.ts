import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnRoomTypeIdToRoomTable1747415003115 implements MigrationInterface {
    name = 'AddColumnRoomTypeIdToRoomTable1747415003115'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`room\` ADD \`room_type_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`room\` ADD CONSTRAINT \`FK_55b383d0ec20230d193ca584a4a\` FOREIGN KEY (\`room_type_id\`) REFERENCES \`room_type\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`room\` DROP FOREIGN KEY \`FK_55b383d0ec20230d193ca584a4a\``);
        await queryRunner.query(`ALTER TABLE \`room\` DROP COLUMN \`room_type_id\``);
    }

}
