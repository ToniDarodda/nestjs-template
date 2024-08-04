import { MigrationInterface, QueryRunner } from "typeorm";
export declare class PostRefactoring1722632255763 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
