import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateRoomTable1747497612471 implements MigrationInterface {
  name = 'UpdateRoomTable1747497612471';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. Đổi tạm kiểu status sang VARCHAR để tránh giới hạn enum cũ
    await queryRunner.query(`
            ALTER TABLE \`room\`
            CHANGE \`status\` \`status\` VARCHAR(255) NOT NULL;
        `);

    // 2. Cập nhật tất cả giá trị không hợp lệ về 'available'
    await queryRunner.query(`
            UPDATE \`room\`
            SET \`status\` = 'available'
            WHERE \`status\` NOT IN ('available', 'full', 'underMaintenance');
        `);

    // 3. Đổi lại cột status về ENUM mới
    await queryRunner.query(`
            ALTER TABLE \`room\`
            CHANGE \`status\` \`status\` ENUM('available', 'full', 'underMaintenance') NOT NULL DEFAULT 'available';
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Tương tự khi rollback: đổi về VARCHAR để xử lý
    await queryRunner.query(`
            ALTER TABLE \`room\`
            CHANGE \`status\` \`status\` VARCHAR(255) NOT NULL;
        `);

    await queryRunner.query(`
            UPDATE \`room\`
            SET \`status\` = 'active'
            WHERE \`status\` NOT IN ('active', 'inactive');
        `);

    await queryRunner.query(`
            ALTER TABLE \`room\`
            CHANGE \`status\` \`status\` ENUM('active', 'inactive') NOT NULL DEFAULT 'active';
        `);
  }
}
