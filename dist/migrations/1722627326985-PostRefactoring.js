"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRefactoring1722627326985 = void 0;
class PostRefactoring1722627326985 {
    constructor() {
        this.name = 'PostRefactoring1722627326985';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "account" ADD "clearPassword" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "account" ADD "salt" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "account" ADD "refresh_token" character varying`);
        await queryRunner.query(`ALTER TABLE "account" ADD "reset_tokens" character varying array NOT NULL DEFAULT '{}'`);
        await queryRunner.query(`ALTER TABLE "account" ADD "failed_login_attempts" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "account" ADD "locked_at" TIMESTAMP`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "locked_at"`);
        await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "failed_login_attempts"`);
        await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "reset_tokens"`);
        await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "refresh_token"`);
        await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "salt"`);
        await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "clearPassword"`);
    }
}
exports.PostRefactoring1722627326985 = PostRefactoring1722627326985;
//# sourceMappingURL=1722627326985-PostRefactoring.js.map