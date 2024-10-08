import {
  Injectable,
  UnauthorizedException,
  Logger,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { Account } from 'entities/account';
import { JwtPayload, TokenDto } from 'types/auth';
import { SignInAccount } from '../dto/request/signIn.dto';
import { SignUpAccount } from '../dto/request/signUp.dto';
import { PatchAccountDto } from '../dto/request/patch.dto';
import { MailService } from 'modules/mail/service/mail/mail.service';
import { AccountDto } from '../dto/response/account.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AccountService {
  private readonly logger = new Logger(AccountService.name);

  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    private readonly jwtService: JwtService,
    private readonly emailService: MailService,
  ) {}

  async isMailAccountAlreadyUsed(email: string): Promise<boolean> {
    try {
      const account = await this.accountRepository.findOneBy({ email });

      return !!account;
    } catch (err) {
      return false;
    }
  }

  async refreshToken(token: string): Promise<{ access_token: string }> {
    try {
      const payload = this.jwtService.verify(token);
      const newPayload = { sub: payload.sub };

      return {
        access_token: await this.jwtService.signAsync(newPayload),
      };
    } catch (e) {
      this.logger.error('Invalid refresh token', e.stack);
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async signIn({
    email,
    password,
  }: SignInAccount): Promise<{ access_token: string; refresh_token: string }> {
    const user = await this.accountRepository.findOne({ where: { email } });

    if (user.lockedAt !== null)
      throw new UnauthorizedException('Your account is locked');

    if (!user || !user.checkIfPasswordIsValid(password)) {
      if (user) {
        user.failedLoginAttempts += 1;
        if (user.failedLoginAttempts === 10) {
          user.lockedAt = new Date(Date.now());
        }
        await this.accountRepository.save(user);
      }
      this.logger.warn(`Failed login attempt for email: ${email}`);
      throw new UnauthorizedException('Invalid credentials');
    }

    user.failedLoginAttempts = 0;

    const tokens = await this.generateTokens(user);

    user.refreshToken = tokens.refresh_token;
    await this.accountRepository.save(user);

    return tokens;
  }

  async signUp(data: SignUpAccount): Promise<TokenDto> {
    const userAlreadyExist = await this.getByMail(data.email);

    if (userAlreadyExist) {
      this.logger.warn(
        `Attempted to sign up with already taken email: ${data.email}`,
      );
      throw new ConflictException('Email already taken!');
    }

    const user = this.accountRepository.create(data);
    user.securePassword(data.password);

    await this.accountRepository.save(user);

    this.emailService.sendMail(
      data.email,
      'Welcome to our service',
      'Thank you for signing up!',
      'src/templates/welcome.html',
    );

    const tokens = await this.generateTokens(user);
    user.setRefreshToken(tokens.refresh_token);

    await this.accountRepository.save(user);

    return tokens;
  }

  private async generateTokens(
    user: Account,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const payload: JwtPayload = { sub: user.id };

    return {
      access_token: await this.jwtService.signAsync(payload),
      refresh_token: await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
      }),
    };
  }

  async getByMail(email: string): Promise<AccountDto> {
    const account = await this.accountRepository.findOneBy({ email });

    return plainToInstance(AccountDto, account, {
      excludeExtraneousValues: true,
    });
  }

  async get(id: Account['id']): Promise<AccountDto> {
    const account = await this.accountRepository.findOneBy({ id });

    return plainToInstance(AccountDto, account, {
      excludeExtraneousValues: true,
    });
  }

  update(id: Account['id'], data: PatchAccountDto): Promise<UpdateResult> {
    return this.accountRepository.update(id, { ...data });
  }

  async delete(id: Account['id']): Promise<DeleteResult> {
    const account = await this.accountRepository.findOneBy({ id });

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    return this.accountRepository.softDelete(id);
  }
}
