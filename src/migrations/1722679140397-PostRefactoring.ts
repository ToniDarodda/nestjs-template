import { MigrationInterface, QueryRunner } from "typeorm";

export class PostRefactoring1722679140397 implements MigrationInterface {
    name = 'PostRefactoring1722679140397'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "roles"`);
        await queryRunner.query(`CREATE TYPE "public"."account_roles_enum" AS ENUM('Admin', 'User')`);
        await queryRunner.query(`ALTER TABLE "account" ADD "roles" "public"."account_roles_enum" array NOT NULL DEFAULT '{User}'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "roles"`);
        await queryRunner.query(`DROP TYPE "public"."account_roles_enum"`);
        await queryRunner.query(`ALTER TABLE "account" ADD "roles" text NOT NULL DEFAULT '["User"]'`);
    }

}
