import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRoomPhotoTable1747840419649 implements MigrationInterface {
    name = 'CreateRoomPhotoTable1747840419649'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`room_photo\` (\`id\` int NOT NULL AUTO_INCREMENT, \`room_id\` int NOT NULL, \`url\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`room_photo\` ADD CONSTRAINT \`FK_039336458c248a384c91c06b1e1\` FOREIGN KEY (\`room_id\`) REFERENCES \`room\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`room_photo\` DROP FOREIGN KEY \`FK_039336458c248a384c91c06b1e1\``);
        await queryRunner.query(`DROP TABLE \`room_photo\``);
    }

}
