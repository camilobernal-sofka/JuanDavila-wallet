import { Test, TestingModule } from '@nestjs/testing';
import { MovemmentController } from './movemment.controller';

describe('MovemmentController', () => {
  let controller: MovemmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovemmentController],
    }).compile();

    controller = module.get<MovemmentController>(MovemmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
