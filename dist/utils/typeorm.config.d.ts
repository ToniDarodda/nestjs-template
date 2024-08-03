import { DataSource } from 'typeorm';
import { Account } from 'entities/account';
export declare const dataSourceOptions: {
    type: never;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    entities: (typeof Account)[];
    migrations: string[];
    synchronize: boolean;
};
export declare const dataSource: DataSource;
