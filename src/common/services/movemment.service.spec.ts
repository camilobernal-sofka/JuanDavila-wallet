import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { MovemmentService } from './movemment.service';
import { MovemmentDto } from '../storage/data-transfer-object/movemmentDto';
import { AccountDto } from '../storage/data-transfer-object/accountDto';
import { AccountMovemmentDto } from '../storage/data-transfer-object/accountMovemmentDto';

describe('MovemmentService', () => {
  let service: MovemmentService;
  let dataSource: DataSource;
  const expected = {
    movemment: {
      movId: 'irfruegh98refirgh',
      accIdIncome: 'hryjrtjrhfh',
      accIdOutcome: 'thrtdhyheyhthbfg',
      movReason: 'Compra de casa',
      movAmount: '800000000',
      movFees: 1,
      movDatetime: '2022-11-28 00:00:00',
    },
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
        MovemmentService,
        {
          provide: DataSource,
          useFactory: dataSourceMockFactory,
        },
      ],
    }).compile();

    service = module.get<MovemmentService>(MovemmentService);
    dataSource = module.get<DataSource>(DataSource);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a movemment', async () => {
    //Arrange
    const data1 = new MovemmentDto();
    data1.accIdIncome = 'hryjrtjrhfh';
    data1.accIdOutcome = 'thrtdhyheyhthbfg';
    data1.movReason = 'Compra de casa';
    data1.movAmount = '800000000';
    data1.movFees = 1;

    const data2 = new AccountMovemmentDto();
    data2.accId = 'hryjrtjrhfh';
    data2.accBalance = '50';
    data2.accCredit = '16000000';

    //Act
    const result = await service.makeMovemment(data1, data2);
    expect(service.makeMovemment).toBe(expected);

    //Assert
    expect(result).toEqual(expected);
  });
});
