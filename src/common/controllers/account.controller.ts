import { Body, Controller, Delete, Post } from '@nestjs/common';
import { Account } from '../entities/Account.entity';
import { AccountService } from '../services/account.service';
import { AccountDto } from '../storage/data-transfer-object/accountDto';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  saveAccount(@Body() accountdto: AccountDto): Promise<Account> {
    const accounEntity = new Account(accountdto);
    return this.accountService.create(accounEntity);
  }
  @Delete()
  deleteAccount(@Body() accountdto: AccountDto) {
    const accounEntity = new Account(accountdto);
    this.accountService.delete(accounEntity);
  }
}
