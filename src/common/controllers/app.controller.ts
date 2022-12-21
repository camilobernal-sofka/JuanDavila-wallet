import { Controller, Delete, Get } from '@nestjs/common';
import { AppService } from '../services/app.service';
import { ClientDto } from '../storage/data-transfer-object/clientDto';
import { Client } from '../../../database2/entities/Client';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    console.log('ENTRO');
    return this.appService.getHello();
  }
}
