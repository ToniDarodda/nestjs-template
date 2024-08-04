"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRefactoring1722611132274 = void 0;
class PostRefactoring1722611132274 {
    constructor() {
        this.name = 'PostRefactoring1722611132274';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TYPE "public"."account_country_enum" AS ENUM('0', '1', '2')`);
        await queryRunner.query(`CREATE TABLE "account" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "email" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "password" character varying NOT NULL, "country" "public"."account_country_enum" NOT NULL, CONSTRAINT "UQ_4c8f96ccf523e9a3faefd5bdd4c" UNIQUE ("email"), CONSTRAINT "UQ_83537e357d4daadb857592f1d3e" UNIQUE ("phoneNumber"), CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "account"`);
        await queryRunner.query(`DROP TYPE "public"."account_country_enum"`);
    }
}
exports.PostRefactoring1722611132274 = PostRefactoring1722611132274;
//# sourceMappingURL=1722611132274-PostRefactoring.js.map