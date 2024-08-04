import { MigrationInterface, QueryRunner } from "typeorm";
export declare class PostRefactoring1722627326985 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
