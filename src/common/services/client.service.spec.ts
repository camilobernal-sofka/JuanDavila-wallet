import { Test, TestingModule } from '@nestjs/testing';
import { ClientService } from './client.service';
import { DataSource } from 'typeorm';
import { ClientDto } from '../storage/data-transfer-object/clientDto';

describe('ClientService', () => {
  let service: ClientService;
  let dataSource: DataSource;

  const expected = {
    id: 'e3453464646',
    full_name: 'Juan Pablo',
    email: 'Juan@sofka.com.co',
    phone: '3193266974',
    photo: 'http://dghkkwdodiek.png',
    state: 1,
    createAt: '2022-11-28 00:00:00',
    updateAt: null,
    deleteAt: null,
    app: {
      id: '12u23yebjkbcjiquwe',
      idClient: '1246tertet46t',
      color: 'blue',
      createAt: '2022-11-28 00:00:00',
      updateAt: null,
    },
    token: [
      {
        id: 'w3564e6464etgrdfgfdx',
        idClient: '1246tertet46t',
        token: 'fgbsrfjdsfsbgsnvkvnjkdb',
        fechaExpiracion: '2022-11-28 00:30:00',
      },
    ],
    account: {
      accId: 'tyrtghdghdthd',
      cliId: '1246tertet46t',
      accBalance: 50,
      accCredit: 16000000,
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
        ClientService,
        { provide: DataSource, useFactory: dataSourceMockFactory },
      ],
    }).compile();

    service = module.get<ClientService>(ClientService);
    dataSource = module.get<DataSource>(DataSource);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should create a client', async () => {
    //Arrange
    const data = new ClientDto();
    data.cliFullName = 'Juan Pablo';
    data.cliEmail = 'juan.davila@gmail.com';
    data.cliPhone = '3245670987';
    data.cliPhoto = 'http://dghkkwdodiek.png';
    data.cliToken = 'fgbsrfjdsfsbgsnvkvnjkdb';

    //Act
    const result = await service.create(data);
    expect(service.create).toBe(expected);

    //Assert
    expect(result).toEqual(expected);
  });
});
