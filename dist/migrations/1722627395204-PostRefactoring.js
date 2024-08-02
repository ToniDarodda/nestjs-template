"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRefactoring1722627395204 = void 0;
class PostRefactoring1722627395204 {
    constructor() {
        this.name = 'PostRefactoring1722627395204';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TYPE "public"."account_country_enum" RENAME TO "account_country_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."account_country_enum" AS ENUM('France', 'Usa', 'Canada')`);
        await queryRunner.query(`ALTER TABLE "account" ALTER COLUMN "country" TYPE "public"."account_country_enum" USING "country"::"text"::"public"."account_country_enum"`);
        await queryRunner.query(`DROP TYPE "public"."account_country_enum_old"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`CREATE TYPE "public"."account_country_enum_old" AS ENUM('0', '1', '2')`);
        await queryRunner.query(`ALTER TABLE "account" ALTER COLUMN "country" TYPE "public"."account_country_enum_old" USING "country"::"text"::"public"."account_country_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."account_country_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."account_country_enum_old" RENAME TO "account_country_enum"`);
    }
}
exports.PostRefactoring1722627395204 = PostRefactoring1722627395204;
//# sourceMappingURL=1722627395204-PostRefactoring.js.map