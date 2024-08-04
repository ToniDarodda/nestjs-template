"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileService = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const task_service_1 = require("../../task/service/task.service");
let FileService = class FileService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(task_service_1.TaskService.name);
        this.s3Client = new client_s3_1.S3Client({
            region: this.configService.getOrThrow('S3_REGION'),
            credentials: {
                accessKeyId: this.configService.getOrThrow('S3_ACCESS_KEY'),
                secretAccessKey: this.configService.getOrThrow('S3_SECRET_KEY'),
            },
        });
        this.bucket = this.configService.getOrThrow('BUCKET');
    }
    async upload(accountId, file) {
        try {
            await this.s3Client.send(new client_s3_1.PutObjectCommand({
                Bucket: this.bucket,
                Key: accountId,
                Body: file.buffer,
                ContentType: file.mimetype,
            }));
            return 'Uploaded successfully';
        }
        catch (err) {
            this.logger.error(err);
        }
    }
    async get(fileName) {
        const command = new client_s3_1.GetObjectCommand({
            Bucket: this.bucket,
            Key: fileName,
        });
        try {
            const response = await this.s3Client.send(command);
            return response.Body.transformToString();
        }
        catch (err) {
            this.logger.error(err);
        }
    }
};
exports.FileService = FileService;
exports.FileService = FileService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], FileService);
//# sourceMappingURL=file.service.js.map