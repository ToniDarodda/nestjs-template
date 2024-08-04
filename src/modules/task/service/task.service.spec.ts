import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { MailService } from 'modules/mail/service/mail/mail.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Account } from 'entities/account';

const mockAccountRepository = () => ({
  // mock implementation of the repository methods
});

const mockMailService = {
  // mock implementation of the MailService methods
};

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: getRepositoryToken(Account),
          useFactory: mockAccountRepository,
        },
        {
          provide: MailService,
          useValue: mockMailService,
        },
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
