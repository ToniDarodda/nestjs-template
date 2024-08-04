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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var TaskService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const typeorm_1 = require("@nestjs/typeorm");
const account_1 = require("../../../entities/account");
const mail_service_1 = require("../../mail/service/mail/mail.service");
const typeorm_2 = require("typeorm");
let TaskService = TaskService_1 = class TaskService {
    constructor(accountRepository, emailService) {
        this.accountRepository = accountRepository;
        this.emailService = emailService;
        this.logger = new common_1.Logger(TaskService_1.name);
    }
    async handleCron() {
        const accounts = await this.accountRepository.find({
            where: {
                failedLoginAttempts: 10,
            },
        });
        accounts.forEach((account) => {
            this.emailService.sendMail(account.email, 'Your account is locked cause of too much failed try', 'Reset your password', 'src/templates/locked.html');
            this.logger.debug(`Mail sent to ${account.email}`);
        });
        this.logger.debug('Called every 10 minutes');
    }
};
exports.TaskService = TaskService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_10_MINUTES),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TaskService.prototype, "handleCron", null);
exports.TaskService = TaskService = TaskService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(account_1.Account)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        mail_service_1.MailService])
], TaskService);
//# sourceMappingURL=task.service.js.map