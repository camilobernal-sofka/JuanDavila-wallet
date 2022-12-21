import { Body, Controller, Put } from '@nestjs/common';

import { MovemmentService } from '../services/movemment.service';
import { Account } from '../entities/Account.entity';
import { MovemmentDto } from '../storage/data-transfer-object/movemmentDto';
import { AccountDto } from '../storage/data-transfer-object/accountDto';
import { Movement } from '../entities/Movement.entity';

@Controller('movemment')
export class MovemmentController {
  constructor(private readonly movemmentService: MovemmentService) {}

  @Put()
  makeMovemment(
    @Body() movemmentdto: MovemmentDto,
    accountdto: AccountDto,
  ): Promise<Movement> {
    const newMovemment = new Movement(movemmentdto);
    const accountver = new Account(accountdto);
    return this.movemmentService.makeMovemment(newMovemment, accountver);
  }
}
