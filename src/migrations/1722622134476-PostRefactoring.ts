import { MigrationInterface, QueryRunner } from "typeorm";

export class PostRefactoring1722622134476 implements MigrationInterface {
    name = 'PostRefactoring1722622134476'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" ADD "roles" text NOT NULL DEFAULT '1'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "roles"`);
    }

}
