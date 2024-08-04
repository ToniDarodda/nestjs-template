import { Module } from '@nestjs/common';
import { FileService } from './service/file.service';
import { FileController } from './controller/file.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'entities/account';

@Module({
  imports: [TypeOrmModule.forFeature([Account])],
  providers: [FileService],
  controllers: [FileController],
})
export class FileModule {}
