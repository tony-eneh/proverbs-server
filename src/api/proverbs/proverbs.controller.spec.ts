import { Test, TestingModule } from '@nestjs/testing';
import { ProverbsController } from './proverbs.controller';
import { ProverbsService } from './proverbs.service';

describe('ProverbsController', () => {
  let controller: ProverbsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProverbsController],
      providers: [ProverbsService],
    }).compile();

    controller = module.get<ProverbsController>(ProverbsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
