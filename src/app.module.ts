import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AccountModule } from './modules/account/account.module';
import { DatabaseModule } from './modules/database/database.module';
import { ThrottlerModule } from '@nestjs/throttler';

const modules = [DatabaseModule, AccountModule];

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development', 'env.production'],
      cache: true,
      isGlobal: true,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    ...modules,
  ],
  controllers: [AppController],
})
export class AppModule {}
