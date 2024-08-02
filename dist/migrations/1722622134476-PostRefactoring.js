"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRefactoring1722622134476 = void 0;
class PostRefactoring1722622134476 {
    constructor() {
        this.name = 'PostRefactoring1722622134476';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "account" ADD "roles" text NOT NULL DEFAULT '1'`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "roles"`);
    }
}
exports.PostRefactoring1722622134476 = PostRefactoring1722622134476;
//# sourceMappingURL=1722622134476-PostRefactoring.js.map