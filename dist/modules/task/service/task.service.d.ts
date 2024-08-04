import { Account } from 'entities/account';
import { MailService } from 'modules/mail/service/mail/mail.service';
import { Repository } from 'typeorm';
export declare class TaskService {
    private readonly accountRepository;
    private readonly emailService;
    private readonly logger;
    constructor(accountRepository: Repository<Account>, emailService: MailService);
    handleCron(): Promise<void>;
}
