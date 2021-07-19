import { Module } from '@nestjs/common';
import { SubMenuService } from './sub-menu.service';
import { SubMenuController } from './sub-menu.controller';

@Module({
  controllers: [SubMenuController],
  providers: [SubMenuService]
})
export class SubMenuModule {}
