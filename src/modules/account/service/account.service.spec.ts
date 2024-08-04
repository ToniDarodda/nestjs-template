import { Test, TestingModule } from '@nestjs/testing';
import { AccountService } from './account.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'modules/mail/service/mail/mail.service';
import { Account } from 'entities/account';

const mockAccountRepository = () => ({
  // mock implementation of the repository methods
});

const mockJwtService = {
  // mock implementation of the JwtService methods
};

const mockMailService = {
  // mock implementation of the MailService methods
};

describe('AccountService', () => {
  let service: AccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountService,
        {
          provide: getRepositoryToken(Account),
          useFactory: mockAccountRepository,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: MailService,
          useValue: mockMailService,
        },
      ],
    }).compile();

    service = module.get<AccountService>(AccountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
