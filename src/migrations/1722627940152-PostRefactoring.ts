import { MigrationInterface, QueryRunner } from "typeorm";

export class PostRefactoring1722627940152 implements MigrationInterface {
    name = 'PostRefactoring1722627940152'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" ALTER COLUMN "country" SET DEFAULT 'France'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" ALTER COLUMN "country" DROP DEFAULT`);
    }

}
