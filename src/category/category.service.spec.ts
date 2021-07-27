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
    getOne: jest.fn().mockImplementation(id => Any ),
    findOne: jest.fn().mockImplementation(id => Promise.resolve(id))
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
    expect(await service.getOne(1))
      .toEqual(
        {
          name: 'food',
        })
  })
});
