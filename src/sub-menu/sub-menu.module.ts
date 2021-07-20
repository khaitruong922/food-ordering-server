import { Module } from '@nestjs/common';
import { SubMenuService } from './sub-menu.service';
import { SubMenuController } from './sub-menu.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubMenu } from './entities/sub-menu.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    SubMenu,
  ])],
  controllers: [SubMenuController],
  providers: [SubMenuService]
})
export class SubMenuModule { }
