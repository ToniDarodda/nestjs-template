import { MigrationInterface, QueryRunner } from "typeorm";

export class PostRefactoring1722633530604 implements MigrationInterface {
    name = 'PostRefactoring1722633530604'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" ALTER COLUMN "roles" SET DEFAULT 'User'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" ALTER COLUMN "roles" SET DEFAULT '["User"]'`);
    }

}
