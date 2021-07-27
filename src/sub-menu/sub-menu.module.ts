import { Module } from '@nestjs/common';
import { SubMenuService } from './sub-menu.service';
import { SubMenuController } from './sub-menu.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubMenu } from './entities/sub-menu.entity';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [TypeOrmModule.forFeature([
    SubMenu,
  ]), ProductModule],
  controllers: [SubMenuController],
  providers: [SubMenuService],
  exports: [SubMenuService]
})
export class SubMenuModule { }
