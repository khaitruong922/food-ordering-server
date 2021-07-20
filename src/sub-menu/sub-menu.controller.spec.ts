import { Test, TestingModule } from '@nestjs/testing';
import { SubMenuController } from './sub-menu.controller';
import { SubMenuService } from './sub-menu.service';

describe('SubMenuController', () => {
  let controller: SubMenuController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubMenuController],
      providers: [SubMenuService],
    }).compile();

    controller = module.get<SubMenuController>(SubMenuController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
