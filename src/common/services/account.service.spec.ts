import { Test, TestingModule } from '@nestjs/testing';
import { AccountService } from './account.service';
import { DataSource } from 'typeorm';
import { AccountDto } from '../storage/data-transfer-object/accountDto';

describe('AccountService', () => {
  let service: AccountService;
  let dataSource: DataSource;

  const expected = {
    account: {
      accId: 'tyrtghdghdthd',
      cliId: '1246tertet46t',
      accBalance: '50',
      accCredit: '16000000',
      accState: 1,
      accCreatedAt: '2022-11-28 00:00:00',
      accUpdatedAt: null,
      accDeletedAt: null,
    },
    movemment: [
      {
        movId: 'irfruegh98refirgh',
        accIdIncome: 'hryjrtjrhfh',
        accIdOutcome: 'thrtdhyheyhthbfg',
        movReason: 'Compra de casa',
        movAmount: '800000000',
        movFees: 1,
        movDatetime: '2022-11-28 00:00:00',
      },
    ],
  };

  type MockType<T> = {
    [P in keyof T]: jest.Mock;
  };

  const dataSourceMockFactory: () => MockType<DataSource> = jest.fn(() => ({
    createQueryRunner: jest.fn().mockImplementation(() => ({
      connect: jest.fn(),
      startTransaction: jest.fn(),
      release: jest.fn(),
      rollbackTransaction: jest.fn(),
      manager: {
        save: jest.fn().mockResolvedValue(expected),
      },
      commitTransaction: jest.fn(),
    })),
  }));

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountService,
        {
          provide: DataSource,
          useFactory: dataSourceMockFactory,
        },
      ],
    }).compile();

    service = module.get<AccountService>(AccountService);
    dataSource = module.get<DataSource>(DataSource);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a account', async () => {
    //Arrange
    const data = new AccountDto();
    data.accBalance = '50';
    data.accCredit = '16000000';
    data.accState = 1;

    //Act
    const result = await service.create(data);
    expect(service.create).toBe(expected);

    //Assert
    expect(result).toEqual(expected);
  });
});
