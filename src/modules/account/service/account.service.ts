/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Account } from 'src/entities/account';
import { SignInAccount } from '../dto/request/signIn.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload, TokenDto } from '../../../types/auth';
import { SignUpAccount } from '../dto/request/signUp.dto';

@Injectable()
export class AccountService {
  private readonly logger = new Logger(AccountService.name);

  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    private readonly jwtService: JwtService,
  ) {}

  async refreshToken(token: string): Promise<{ access_token: string }> {
    try {
      const payload = this.jwtService.verify(token);
      const newPayload = { sub: payload.sub, email: payload.email };

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

    if (!user || !user.checkIfPasswordIsValid(password)) {
      if (user) {
        user.failedLoginAttempts += 1;
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
      throw new UnprocessableEntityException('Email already taken!');
    }

    const user = this.accountRepository.create(data);
    user.securePassword(data.password);

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

  getByMail(email: string): Promise<Account> {
    return this.accountRepository.findOneBy({ email });
  }

  get(id: Account['id']): Promise<Account> {
    return this.accountRepository.findOneBy({ id });
  }

  update(id: Account['id'], data: Partial<Account>): Promise<UpdateResult> {
    return this.accountRepository.update(id, data);
  }

  delete(id: Account['id']): Promise<DeleteResult> {
    return this.accountRepository.softDelete(id);
  }
}
