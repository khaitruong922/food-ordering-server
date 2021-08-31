import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ProductModule } from 'src/product/product.module';
import { StoreModule } from 'src/store/store.module';
import { UserModule } from 'src/user/user.module';
import { Order } from './entities/order.entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  imports: [TypeOrmModule.forFeature([
    Order,
  ]), ProductModule, UserModule, AuthModule, StoreModule],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule { }
