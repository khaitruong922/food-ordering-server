import { Test, TestingModule } from '@nestjs/testing';
import { SubMenuService } from './sub-menu.service';

describe('SubMenuService', () => {
  let service: SubMenuService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubMenuService],
    }).compile();

    service = module.get<SubMenuService>(SubMenuService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
