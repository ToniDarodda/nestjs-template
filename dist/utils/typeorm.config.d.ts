import { DataSource } from 'typeorm';
import { Account } from 'src/entities/account';
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
