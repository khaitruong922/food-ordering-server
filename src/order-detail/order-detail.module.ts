import { Module } from '@nestjs/common';
import { OrderDetailService } from './order-detail.service';
import { OrderDetailController } from './order-detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetail } from './entities/order-detail.entity';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [TypeOrmModule.forFeature([
    OrderDetail,
  ]), ProductModule],
  controllers: [OrderDetailController],
  providers: [OrderDetailService]
})
export class OrderDetailModule { }
