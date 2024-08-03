import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get('health')
  getHealth(): string {
    return 'Healthy';
  }

  @Get('error-test')
  getHello(): string {
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }
}
