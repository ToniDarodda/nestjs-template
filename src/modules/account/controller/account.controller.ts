import type { Response } from 'express';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Patch,
  Post,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AccountService } from '../service/account.service';
import { SignInAccount } from '../dto/request/signIn.dto';
import { SignUpAccount } from '../dto/request/signUp.dto';
import { AuthToken } from 'decorators/auth.decorator';
import { DecodedUserToken } from 'utils/parseCookie';
import { JwtAuthGuard } from 'guards/auth.guard';
import { RolesGuard } from 'guards/roles.guard';
import { Role } from 'types/role';
import { Roles } from 'decorators/roles.decorator';
import { PatchAccountDto } from '../dto/request/patch.dto';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';

@ApiTags('Account')
@Controller('account')
@UseInterceptors(CacheInterceptor)
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('sign-in')
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({
    type: SignInAccount,
    description: 'Sign in to retrieve user account',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User signed in successfully',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid credentials, unable to sign in',
  })
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
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({
    type: SignUpAccount,
    description: 'Create a new user account',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User created successfully',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Email or phone number already used',
  })
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
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User information retrieved successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User information not found',
  })
  @Roles(Role.USER)
  @CacheKey('get_account_key')
  @CacheTTL(30)
  @UseGuards(JwtAuthGuard, RolesGuard)
  get(@AuthToken() { sub }: DecodedUserToken) {
    return this.accountService.get(sub);
  }

  @Patch()
  @HttpCode(HttpStatus.OK)
  @ApiBody({
    type: PatchAccountDto,
    description: 'Update user information',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User information updated successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User information not found',
  })
  @Roles(Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  patch(@AuthToken() { sub }: DecodedUserToken, @Body() data: PatchAccountDto) {
    return this.accountService.update(sub, data);
  }

  @Delete()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User information deleted successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User information not found',
  })
  @Roles(Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async delete(@AuthToken() { sub }: DecodedUserToken) {
    try {
      return await this.accountService.delete(sub);
    } catch (err) {
      throw new NotFoundException('User not found');
    }
  }
}
