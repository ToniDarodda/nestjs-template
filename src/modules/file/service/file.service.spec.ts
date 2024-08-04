import { Test, TestingModule } from '@nestjs/testing';
import { FileService } from './file.service';
import { ConfigService } from '@nestjs/config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Account } from 'entities/account';

const mockAccountRepository = () => ({
  // mock implementation of the repository methods
});

const mockConfigService = {
  getOrThrow: jest.fn((key: string) => {
    const config = {
      S3_REGION: 'us-east-1',
      S3_ACCESS_KEY: 'test-access-key',
      S3_SECRET_KEY: 'test-secret-key',
      BUCKET: 'test-bucket',
    };
    return config[key];
  }),
};

describe('FileService', () => {
  let service: FileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FileService,
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
        {
          provide: getRepositoryToken(Account),
          useFactory: mockAccountRepository,
        },
      ],
    }).compile();

    service = module.get<FileService>(FileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
