import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Client } from '../entities/Client.entity';

import { ClientDto } from '../storage/data-transfer-object/clientDto';
@Injectable()
export class ClientService {
  constructor(private dataSource: DataSource) {}

  async create(clientDto: ClientDto): Promise<Client> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const clientEntity = new Client(clientDto);
      const newClient = await queryRunner.manager.save(clientEntity);
      await queryRunner.commitTransaction();
      return Promise.resolve(newClient);
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
      throw new HttpException('Peticion denegada', HttpStatus.CONFLICT);
    }
  }

  async findOne(clientDto: ClientDto): Promise<Client> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const id = clientDto.cliId;
    const clientFindend = await queryRunner.manager.findOne(Client, {
      where: {
        cliId: id,
      },
    });
    await queryRunner.commitTransaction();
    return Promise.resolve(clientFindend);
  }

  async delete(client: Client) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.remove(client);
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new HttpException('no se pudo eliminar', HttpStatus.CONFLICT);
    }
  }
}
