import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'entities/account';
import { MailService } from 'modules/mail/service/mail/mail.service';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    private readonly emailService: MailService,
  ) {}

  @Cron(CronExpression.EVERY_10_MINUTES)
  async handleCron() {
    const accounts = await this.accountRepository.find({
      where: {
        failedLoginAttempts: 10,
      },
    });

    accounts.forEach((account: Account) => {
      this.emailService.sendMail(
        account.email,
        'Your account is locked cause of too much failed try',
        'Reset your password',
        'src/templates/locked.html',
      );
      this.logger.debug(`Mail sent to ${account.email}`);
    });

    this.logger.debug('Called when the current second is 30S');
  }
}
