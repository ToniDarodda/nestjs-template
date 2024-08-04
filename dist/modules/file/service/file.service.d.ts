import { ConfigService } from '@nestjs/config';
export declare class FileService {
    private readonly configService;
    private readonly logger;
    constructor(configService: ConfigService);
    private readonly s3Client;
    private bucket;
    upload(accountId: string, file: Express.Multer.File): Promise<string>;
    get(fileName: string): Promise<string>;
}
