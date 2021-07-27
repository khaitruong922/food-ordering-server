import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Any } from 'typeorm';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';


describe('CategoryService', () => {
  let service: CategoryService;
  const mockCategoryRepository = {
    create: jest.fn().mockImplementation(dto => dto),
    save: jest.fn().mockImplementation(category => Promise.resolve(
      {
        ...Category
      }
    )),
    getAll: jest.fn().mockImplementation(data => Any),
    find: jest.fn().mockImplementation(() => Promise.resolve())
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryService,
        {
          provide: getRepositoryToken(Category),
          useValue: mockCategoryRepository,
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new category and return that', async () => {
    service.create(
      {
        name: 'food'
      })
    expect(await service.getAll())
      .toEqual(
        {
          name: 'food',
        })
  })
});
