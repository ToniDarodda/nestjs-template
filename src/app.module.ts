import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AccountModule } from './modules/account/account.module';
import { DatabaseModule } from './modules/database/database.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TaskModule } from 'modules/task/task.module';
import { FileModule } from 'modules/file/file.module';

const modules = [DatabaseModule, AccountModule, TaskModule, FileModule];

@Module({
  imports: [
    CacheModule.register({
      ttl: 5, // seconds
      max: 10, // maximum number of items in cache
      isGlobal: true,
    }),
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
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
