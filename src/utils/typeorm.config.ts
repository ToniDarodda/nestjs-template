import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { Account } from 'src/entities/account';

config({ path: '.env.development' });

const configService = new ConfigService();

export const dataSourceOptions = {
  type: configService.get<string>('TYPE') as unknown as never,
  host: configService.get<string>('HOST'),
  port: parseInt(configService.get<string>('PORT'), 10),
  username: configService.get<string>('USERNAME'),
  password: configService.get<string>('PASSWORD'),
  database: configService.get<string>('DATABASE'),
  entities: [Account],
  migrations: [__dirname + '/../migrations/*.ts'],
  synchronize: false,
};

export const dataSource = new DataSource(dataSourceOptions);

dataSource.initialize();
