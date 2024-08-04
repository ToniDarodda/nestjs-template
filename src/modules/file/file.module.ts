import { Module } from '@nestjs/common';
import { FileService } from './service/file.service';
import { FileController } from './controller/file.controller';

@Module({
  providers: [FileService],
  controllers: [FileController],
})
export class FileModule {}
