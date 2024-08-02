"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRefactoring1722632215043 = void 0;
class PostRefactoring1722632215043 {
    constructor() {
        this.name = 'PostRefactoring1722632215043';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "account" ALTER COLUMN "roles" SET DEFAULT '[1]'`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "account" ALTER COLUMN "roles" SET DEFAULT '1'`);
    }
}
exports.PostRefactoring1722632215043 = PostRefactoring1722632215043;
//# sourceMappingURL=1722632215043-PostRefactoring.js.map