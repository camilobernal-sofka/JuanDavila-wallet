import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './common/controllers/app.controller';
import { Account } from './common/entities/Account.entity';
import { App } from './common/entities/App.entity';
import { Client } from './common/entities/Client.entity';
import { Movement } from './common/entities/Movement.entity';
import { Token } from './common/entities/Token.entity';
import { AppService } from './common/services/app.service';
import { MovemmentService } from './common/services/movemment.service';
import { ClientController } from './common/controllers/client.controller';
import { AccountService } from './common/services/account.service';
import { AccountController } from './common/controllers/account.controller';
import { MovemmentController } from './common/controllers/movemment.controller';
import { ClientService } from './common/services/client.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphResolverResolver } from './common/storage/graphql/graph-resolver/graph-resolver.resolver';
import { AccountModule } from './common/common.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'wallet2',
      entities: [Account, App, Client, Movement, Token],
      synchronize: false,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: true,
      playground: true,
    }),
    AccountModule,
  ],

  controllers: [
    AppController,
    ClientController,
    AccountController,
    MovemmentController,
  ],
  providers: [
    AppService,
    ClientService,
    AccountService,
    MovemmentService,
    GraphResolverResolver,
  ],
})
export class AppModule {}
