import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor() {}

  @Get('health')
  @ApiOperation({ summary: 'Check if the server is healthy' })
  getHealth(): string {
    return 'Healthy';
  }

  @Get('error-test')
  @ApiOperation({ summary: 'Check error of the server' })
  getHello(): string {
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }
}
