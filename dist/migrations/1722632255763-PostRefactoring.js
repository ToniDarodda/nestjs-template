"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRefactoring1722632255763 = void 0;
class PostRefactoring1722632255763 {
    constructor() {
        this.name = 'PostRefactoring1722632255763';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "account" ALTER COLUMN "roles" SET DEFAULT '["User"]'`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "account" ALTER COLUMN "roles" SET DEFAULT '[1]'`);
    }
}
exports.PostRefactoring1722632255763 = PostRefactoring1722632255763;
//# sourceMappingURL=1722632255763-PostRefactoring.js.map