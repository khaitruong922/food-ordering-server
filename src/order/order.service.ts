import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService extends BaseService<Order, Repository<Order>> {
  constructor(@InjectRepository(Order) repository: Repository<Order>) {
    super(repository)
  }
}
