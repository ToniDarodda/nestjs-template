"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRefactoring1722633530604 = void 0;
class PostRefactoring1722633530604 {
    constructor() {
        this.name = 'PostRefactoring1722633530604';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "account" ALTER COLUMN "roles" SET DEFAULT 'User'`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "account" ALTER COLUMN "roles" SET DEFAULT '["User"]'`);
    }
}
exports.PostRefactoring1722633530604 = PostRefactoring1722633530604;
//# sourceMappingURL=1722633530604-PostRefactoring.js.map