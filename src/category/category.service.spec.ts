import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Any, Repository } from 'typeorm';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';

export class mockCategoryRepositoryFake {
  public create(): void {}
  public save(): void{}
}

describe('CategoryService', () => {
  let service: CategoryService;
  let serviceRepository: Repository<Category>;
 
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryService,
        {
          provide: getRepositoryToken(Category),
          useValue: mockCategoryRepositoryFake,
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    serviceRepository = module.get(getRepositoryToken(Category))
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new category and return that', async () => {
    await service.create(
      {
        name: 'food'
      })
    expect(await service.getOne(1))
      .toEqual(
        {
          name: 'food',
        })
  })
});
