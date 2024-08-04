import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'entities/account';
import { Repository } from 'typeorm';
import { decodeUserToken } from 'utils/parseCookie';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { cookies } = request;

    const { COOKIE_TOKEN_NAME } = process.env;

    if (!cookies[COOKIE_TOKEN_NAME]) {
      throw new UnauthorizedException();
    }

    const { sub } = decodeUserToken(cookies[COOKIE_TOKEN_NAME]);

    const user = await this.accountRepository.findOneBy({ id: sub });

    if (!user) {
      throw new UnauthorizedException();
    }

    request.user = user;

    return true;
  }
}
