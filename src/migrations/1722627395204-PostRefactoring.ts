import { MigrationInterface, QueryRunner } from "typeorm";

export class PostRefactoring1722627395204 implements MigrationInterface {
    name = 'PostRefactoring1722627395204'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."account_country_enum" RENAME TO "account_country_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."account_country_enum" AS ENUM('France', 'Usa', 'Canada')`);
        await queryRunner.query(`ALTER TABLE "account" ALTER COLUMN "country" TYPE "public"."account_country_enum" USING "country"::"text"::"public"."account_country_enum"`);
        await queryRunner.query(`DROP TYPE "public"."account_country_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."account_country_enum_old" AS ENUM('0', '1', '2')`);
        await queryRunner.query(`ALTER TABLE "account" ALTER COLUMN "country" TYPE "public"."account_country_enum_old" USING "country"::"text"::"public"."account_country_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."account_country_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."account_country_enum_old" RENAME TO "account_country_enum"`);
    }

}
