import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { Repository } from 'typeorm';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Store } from './entities/store.entity';

@Injectable()
export class StoreService extends BaseService<Store, Repository<Store>>{
  constructor(@InjectRepository(Store) repository: Repository<Store>) {
    super(repository)
  }
  async create(store: CreateStoreDto) {
    return super.create(store)
  }
}
