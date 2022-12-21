import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { ClientService } from 'src/common/services/client.service';
import * as request from 'supertest';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  constructor(private readonly clientService: ClientService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.get('');
    
    next();
  }
}
