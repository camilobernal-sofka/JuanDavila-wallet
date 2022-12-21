import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Account } from '../entities/Account.entity';
import { Movement } from '../entities/Movement.entity';
import { MovemmentDto } from '../storage/data-transfer-object/movemmentDto';
import { AccountDto } from '../storage/data-transfer-object/accountDto';
import { AccountMovemmentDto } from '../storage/data-transfer-object/accountMovemmentDto';

@Injectable()
export class MovemmentService {
  constructor(private dataSource: DataSource) {}

  async makeMovemment(
    movemmentDto: MovemmentDto,
    accountMovemmentDto: AccountMovemmentDto,
  ): Promise<Movement> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const accid = accountMovemmentDto.accId;
      const account = await queryRunner.manager.findOne(Account, {
        where: { accId: accid },
      });
      const balance = Number(account.accBalance);
      const amount = Number(movemmentDto.movAmount);
      const result = balance - amount;
      if (result > 0) {
        const movemmentEntity = new Movement(movemmentDto);
        const newMovemment = await queryRunner.manager.save(movemmentEntity);
        await queryRunner.manager.update(Account, accid, {
          accBalance: String(result),
        });
        return Promise.resolve(newMovemment);
      }
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new HttpException('Peticion denegada', HttpStatus.CONFLICT);
    }
  }
}
