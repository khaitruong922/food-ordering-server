import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from './entities/store.entity';
import { FileModule } from 'src/file/file.module';
import { SubMenuModule } from 'src/sub-menu/sub-menu.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Store,]),
    FileModule,
    SubMenuModule,
  ],
  controllers: [StoreController],
  providers: [StoreService],
  exports: [StoreService]
})
export class StoreModule { }
