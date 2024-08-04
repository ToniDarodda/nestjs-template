import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TaskService } from 'modules/task/service/task.service';

@Injectable()
export class FileService {
  private readonly logger = new Logger(TaskService.name);

  constructor(private readonly configService: ConfigService) {}

  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow('S3_REGION'),
    credentials: {
      accessKeyId: this.configService.getOrThrow('S3_ACCESS_KEY'),
      secretAccessKey: this.configService.getOrThrow('S3_SECRET_KEY'),
    },
  });

  private bucket = this.configService.getOrThrow('BUCKET');

  async upload(accountId: string, file: Express.Multer.File) {
    try {
      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: this.bucket,
          Key: accountId,
          Body: file.buffer,
          ContentType: file.mimetype,
        }),
      );

      return 'Uploaded successfully';
    } catch (err) {
      this.logger.error(err);
    }
  }

  async get(fileName: string): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: fileName,
    });

    try {
      const response = await this.s3Client.send(command);

      return response.Body.transformToString();
    } catch (err) {
      this.logger.error(err);
    }
  }
}
