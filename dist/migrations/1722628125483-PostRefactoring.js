"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRefactoring1722628125483 = void 0;
class PostRefactoring1722628125483 {
    constructor() {
        this.name = 'PostRefactoring1722628125483';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "clearPassword"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "account" ADD "clearPassword" character varying NOT NULL`);
    }
}
exports.PostRefactoring1722628125483 = PostRefactoring1722628125483;
//# sourceMappingURL=1722628125483-PostRefactoring.js.map