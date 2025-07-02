import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateClaimTable1751388135191 implements MigrationInterface {
    name = 'CreateClaimTable1751388135191'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`claim\` (\`id\` int NOT NULL AUTO_INCREMENT, \`student_code\` varchar(50) NOT NULL, \`student_name\` varchar(255) NOT NULL, \`room_number\` varchar(50) NOT NULL, \`content\` text NOT NULL, \`supporter\` varchar(255) NULL, \`status\` enum ('pending', 'resolved') NOT NULL DEFAULT 'pending', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`claim\``);
    }

}
