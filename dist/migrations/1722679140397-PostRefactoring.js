"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRefactoring1722679140397 = void 0;
class PostRefactoring1722679140397 {
    constructor() {
        this.name = 'PostRefactoring1722679140397';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "roles"`);
        await queryRunner.query(`CREATE TYPE "public"."account_roles_enum" AS ENUM('Admin', 'User')`);
        await queryRunner.query(`ALTER TABLE "account" ADD "roles" "public"."account_roles_enum" array NOT NULL DEFAULT '{User}'`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "roles"`);
        await queryRunner.query(`DROP TYPE "public"."account_roles_enum"`);
        await queryRunner.query(`ALTER TABLE "account" ADD "roles" text NOT NULL DEFAULT '["User"]'`);
    }
}
exports.PostRefactoring1722679140397 = PostRefactoring1722679140397;
//# sourceMappingURL=1722679140397-PostRefactoring.js.map