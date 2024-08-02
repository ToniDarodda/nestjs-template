import type { ExecutionContext } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common';
import { DecodedUserToken, decodeUserToken } from 'src/utils/parseCookie';

export const AuthToken = createParamDecorator(
  (_data: string, ctx: ExecutionContext): DecodedUserToken => {
    const { cookies } = ctx.switchToHttp().getRequest();

    const { COOKIE_TOKEN_NAME } = process.env;

    return decodeUserToken(cookies[COOKIE_TOKEN_NAME]);
  },
);
