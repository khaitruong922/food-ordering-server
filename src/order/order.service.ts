import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { ProductService } from 'src/product/product.service';
import { StoreService } from 'src/store/store.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService extends BaseService<Order, Repository<Order>> {
  constructor(@InjectRepository(Order) repository: Repository<Order>,
    private readonly productService: ProductService,
    private readonly userService: UserService,
    private readonly storeService: StoreService,

  ) {
    super(repository)
  }

  async getAll() {
    return this.repository.find({ relations: ['orderDetails', 'orderDetails.product', 'user', 'store'] })
  }
  async getAllOfUser(userId: number) {
    return this.repository.find({ relations: ['orderDetails', 'orderDetails.product', 'store'], where: { user: userId } })
  }
  async create(order: CreateOrderDto) {
    const user = await this.userService.getOneOrFail(order.user as unknown as number)
    const store = await this.storeService.getOneOrFail(order.store as unknown as number)
    const { orderDetails } = order
    let totalPrice = 0
    for (let i = 0; i < orderDetails.length; i++) {
      const orderDetail = orderDetails[i]
      const product = await this.productService.getOneOrFail(orderDetail.product as unknown as number)
      orderDetail.price = product.price * orderDetail.quantity
      orderDetail.product = product
      totalPrice += orderDetail.price
    }
    order.totalPrice = totalPrice
    console.log(order)
    return this.repository.save({ ...order })
  }
}
