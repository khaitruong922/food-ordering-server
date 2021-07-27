import { Test, TestingModule } from '@nestjs/testing';
import { StoreService } from './store.service';

describe('StoreService', () => {
  let service: StoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StoreService],
    }).compile();

    service = module.get<StoreService>(StoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  //test case: show all the sub menus, the price, the name, category, promotion products

  it('should show all the info for a store', () => {
    expect(service).toEqual("")
  })
});
