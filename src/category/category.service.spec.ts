import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';


describe('CategoryService', () => {
  let service: CategoryService;
  let getOne: jest.Mock;
  beforeEach(async () => {
    getOne = jest.fn();
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryService, {
        provide: getRepositoryToken(Category),
        useValue: {
          getOne
        }
      }],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('when the user is viewing all the store of a category', () =>{
    let category: Category ={
      name: "food",
      stores: [],
      id: 1
    }
    getOne.mockReturnValue(Promise.resolve(category))
    it('should show all the store that belong to food category', async () => {
      const fetchCategory = await service.getOne(1);
      expect(fetchCategory).toEqual(category)
    });
  }) 
  
});
