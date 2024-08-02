import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AccountModule } from './modules/account/account.module';
import { DatabaseModule } from './modules/database/database.module';

const modules = [DatabaseModule, AccountModule];

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development', 'env.production'],
      cache: true,
      isGlobal: true,
    }),
    ...modules,
  ],
  controllers: [AppController],
})
export class AppModule {}
