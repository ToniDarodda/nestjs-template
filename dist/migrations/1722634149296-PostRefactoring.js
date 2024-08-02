"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRefactoring1722634149296 = void 0;
class PostRefactoring1722634149296 {
    constructor() {
        this.name = 'PostRefactoring1722634149296';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "account" ALTER COLUMN "roles" SET DEFAULT '["User"]'`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "account" ALTER COLUMN "roles" SET DEFAULT 'User'`);
    }
}
exports.PostRefactoring1722634149296 = PostRefactoring1722634149296;
//# sourceMappingURL=1722634149296-PostRefactoring.js.map