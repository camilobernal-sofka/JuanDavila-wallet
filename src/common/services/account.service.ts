import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Account } from '../entities/Account.entity';

import { AccountDto } from '../storage/data-transfer-object/accountDto';
@Injectable()
export class AccountService {
  constructor(private dataSource: DataSource) {}

  async create(accountDto: AccountDto): Promise<Account> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const accountEntity = new Account(accountDto);
      const newClient = await queryRunner.manager.save(accountEntity);
      await queryRunner.commitTransaction();
      return Promise.resolve(newClient);
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
      throw new HttpException('Peticion denegada', HttpStatus.CONFLICT);
    }
  }

  async delete(account: Account) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.remove(account);
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new HttpException('no se pudo eliminar', HttpStatus.CONFLICT);
    }
  }
}
