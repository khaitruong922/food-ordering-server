import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService extends BaseService<Category, Repository<Category>> {
  constructor(@InjectRepository(Category) repository: Repository<Category>) {
    super(repository)
  }
}
