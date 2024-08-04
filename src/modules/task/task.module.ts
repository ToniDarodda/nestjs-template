import { Module } from '@nestjs/common';
import { TaskService } from './service/task.service';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'entities/account';
import { MailService } from 'modules/mail/service/mail/mail.service';

@Module({
  imports: [ScheduleModule.forRoot(), TypeOrmModule.forFeature([Account])],
  providers: [TaskService, MailService],
})
export class TaskModule {}
