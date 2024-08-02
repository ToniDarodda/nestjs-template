import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'src/utils/typeorm.config';

@Module({
  imports: [ConfigModule, TypeOrmModule.forRoot(dataSourceOptions)],
})
export class DatabaseModule {}
