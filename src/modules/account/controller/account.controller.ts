import type { Response } from 'express';

import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AccountService } from '../service/account.service';
import { SignInAccount } from '../dto/request/signIn.dto';
import { SignUpAccount } from '../dto/request/signUp.dto';
import { AuthToken } from 'src/decorators/auth.decorator';
import { DecodedUserToken } from 'src/utils/parseCookie';
import { JwtAuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Role } from 'src/types/role';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('sign-in')
  async signIn(
    @Body() data: SignInAccount,
    @Res({ passthrough: true }) res: Response,
  ) {
    const {
      COOKIE_TOKEN_NAME,
      COOKIE_REFRESH_TOKEN_NAME,
      REFRESH_TOKEN_JWT_VALID,
    } = process.env;

    const { refresh_token, access_token } =
      await this.accountService.signIn(data);

    res.cookie(COOKIE_TOKEN_NAME, access_token, {
      secure: true,
      httpOnly: true,
      expires: new Date(Date.now() + parseInt(REFRESH_TOKEN_JWT_VALID, 10)),
    });
    res.cookie(COOKIE_REFRESH_TOKEN_NAME, refresh_token, {
      secure: true,
      httpOnly: true,
      expires: new Date(Date.now() + parseInt(REFRESH_TOKEN_JWT_VALID, 10)),
    });
  }

  @Post('sign-up')
  async signUp(
    @Body() data: SignUpAccount,
    @Res({ passthrough: true }) res: Response,
  ) {
    const {
      COOKIE_TOKEN_NAME,
      COOKIE_REFRESH_TOKEN_NAME,
      REFRESH_TOKEN_JWT_VALID,
    } = process.env;

    const { access_token, refresh_token } =
      await this.accountService.signUp(data);

    res.cookie(COOKIE_TOKEN_NAME, access_token, {
      secure: true,
      httpOnly: true,
      expires: new Date(Date.now() + parseInt(REFRESH_TOKEN_JWT_VALID, 10)),
    });
    res.cookie(COOKIE_REFRESH_TOKEN_NAME, refresh_token, {
      secure: true,
      httpOnly: true,
      expires: new Date(Date.now() + parseInt(REFRESH_TOKEN_JWT_VALID, 10)),
    });
  }

  @Get()
  @Roles(Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  get(@AuthToken() { userId }: DecodedUserToken) {
    return this.accountService.get(userId);
  }
}
