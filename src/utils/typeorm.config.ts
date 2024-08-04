import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { Account } from 'entities/account';

config({ path: '.env.development' });

const configService = new ConfigService();

export const dataSourceOptions = {
  type: configService.getOrThrow<string>('TYPE') as unknown as never,
  host: configService.getOrThrow<string>('HOST'),
  port: parseInt(configService.getOrThrow<string>('PORT'), 10),
  username: configService.getOrThrow<string>('USERNAME'),
  password: configService.getOrThrow<string>('PASSWORD'),
  database: configService.getOrThrow<string>('DATABASE'),
  entities: [Account],
  migrations: [__dirname + '/../migrations/*.ts'],
  synchronize: false,
};

export const dataSource = new DataSource(dataSourceOptions);

dataSource.initialize();
