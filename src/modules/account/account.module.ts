import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccountService } from './service/account.service';
import { AccountController } from './controller/account.controller';
import { Account } from 'src/entities/account';
import { MailService } from '../mail/service/mail/mail.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account]),
    PassportModule,
    JwtModule.register({
      secret: 'your-secret-key',
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [AccountService, MailService],
  controllers: [AccountController],
})
export class AccountModule {}
