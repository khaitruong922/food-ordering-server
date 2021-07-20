import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { typeOrmConfig } from './orm.config';
import { UserModule } from './user/user.module';
import { StoreModule } from './store/store.module';
import { SubMenuModule } from './sub-menu/sub-menu.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { OrderDetailModule } from './order-detail/order-detail.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    StoreModule,
    SubMenuModule,
    ProductModule,
    OrderModule,
    OrderDetailModule,
    CategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
