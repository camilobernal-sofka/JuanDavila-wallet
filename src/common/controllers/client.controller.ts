import { Body, Controller, Delete, Post } from '@nestjs/common';
import { Client } from '../entities/Client.entity';
import { ClientService } from '../services/client.service';
import { ClientDto } from '../storage/data-transfer-object/clientDto';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  saveClient(@Body() clientdto: ClientDto): Promise<Client> {
    return this.clientService.create(clientdto);
  }

  @Delete()
  deleteClient(@Body() clientdto: ClientDto) {
    const newClient = new Client(clientdto);
    this.clientService.delete(newClient);
  }
}
