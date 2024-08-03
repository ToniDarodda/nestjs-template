import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AccountService } from 'src/modules/account/service/account.service';
import { decodeUserToken } from 'src/utils/parseCookie';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly accountService: AccountService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { cookies } = request;

    const { COOKIE_TOKEN_NAME } = process.env;

    if (!cookies[COOKIE_TOKEN_NAME]) {
      throw new UnauthorizedException();
    }

    const { sub } = decodeUserToken(cookies[COOKIE_TOKEN_NAME]);

    const user = await this.accountService.get(sub);

    if (!user) {
      throw new UnauthorizedException();
    }

    request.user = user;

    return true;
  }
}
