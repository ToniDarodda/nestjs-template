import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  getHealth(): string {
    return 'Healthy';
  }
}
