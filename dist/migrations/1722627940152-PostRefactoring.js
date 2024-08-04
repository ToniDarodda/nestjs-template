"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRefactoring1722627940152 = void 0;
class PostRefactoring1722627940152 {
    constructor() {
        this.name = 'PostRefactoring1722627940152';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "account" ALTER COLUMN "country" SET DEFAULT 'France'`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "account" ALTER COLUMN "country" DROP DEFAULT`);
    }
}
exports.PostRefactoring1722627940152 = PostRefactoring1722627940152;
//# sourceMappingURL=1722627940152-PostRefactoring.js.map