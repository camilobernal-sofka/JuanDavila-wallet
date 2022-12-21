import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientController } from './controllers/client.controller';
import { Account } from './entities/Account.entity';
import { App } from './entities/App.entity';
import { Client } from './entities/Client.entity';
import { Movement } from './entities/Movement.entity';
import { AccountService } from './services/account.service';
import { AppService } from './services/app.service';
import { ClientService } from './services/client.service';
import { MovemmentService } from './services/movemment.service';
import { AccountController } from './controllers/account.controller';
import { AppController } from './controllers/app.controller';
import { MovemmentController } from './controllers/movemment.controller';
import { GraphResolverResolver } from './storage/graphql/graph-resolver/graph-resolver.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Client, App, Movement, Account])],
  controllers: [
    ClientController,
    AccountController,
    AppController,
    MovemmentController,
  ],
  providers: [
    AppService,
    ClientService,
    AccountService,
    MovemmentService,
    GraphResolverResolver,
  ],
  exports: [ClientService],
})
export class AccountModule {}
