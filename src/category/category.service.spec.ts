import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { randomInt, randomUUID } from 'crypto';
import { Any, Repository } from 'typeorm';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';

export class mockCategoryRepositoryFake {
  public create(): void { }
  public async save(): Promise<void> { }
  public async remove(): Promise<void> { }
  public async findOne(): Promise<void> { }
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

    service = module.get(CategoryService);
    serviceRepository = module.get(getRepositoryToken(Category))
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new category and return that', async () => {

    const savedCategory: Category = {
      id: 1,
      name: 'drink',
      stores: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    const categoryRepositorySaveSpy = jest
      .spyOn(serviceRepository, 'save')
      .mockResolvedValue(savedCategory)

    const categoryRepositoryfindOneSpy = jest
    .spyOn(serviceRepository, 'findOne')
    .mockResolvedValue(savedCategory)

    const result = await service.create(
      {
        name: 'food'
      })



    expect(await service.getOne(2))
      .toEqual(
        {
          name: 'food',
        })
  })
});
