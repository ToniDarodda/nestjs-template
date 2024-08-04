import { Test, TestingModule } from '@nestjs/testing';
import { AccountController } from './account.controller';
import { AccountService } from '../service/account.service';
import { CacheInterceptor, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Reflector } from '@nestjs/core';

const mockAccountService = () => ({
  // mock implementation of the AccountService methods
});

const mockCacheManager = {
  // mock implementation of the cache manager methods
};

describe('AccountController', () => {
  let controller: AccountController;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let service: AccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountController],
      providers: [
        {
          provide: AccountService,
          useFactory: mockAccountService,
        },
        {
          provide: CACHE_MANAGER,
          useValue: mockCacheManager,
        },
        CacheInterceptor,
        Reflector,
      ],
    }).compile();

    controller = module.get<AccountController>(AccountController);
    service = module.get<AccountService>(AccountService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
