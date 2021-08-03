import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { ProductService } from 'src/product/product.service';
import { Repository } from 'typeorm';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { OrderDetail } from './entities/order-detail.entity';

@Injectable()
export class OrderDetailService extends BaseService<OrderDetail, Repository<OrderDetail>> {
  constructor(
    @InjectRepository(OrderDetail) repository: Repository<OrderDetail>,
    private readonly productSerivce: ProductService,
  ) {
    super(repository)
  }
}
