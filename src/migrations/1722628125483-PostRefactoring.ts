import { MigrationInterface, QueryRunner } from "typeorm";

export class PostRefactoring1722628125483 implements MigrationInterface {
    name = 'PostRefactoring1722628125483'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "clearPassword"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" ADD "clearPassword" character varying NOT NULL`);
    }

}
