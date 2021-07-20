import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';

@Controller('stores')
export class StoreController {
  constructor(private readonly storeService: StoreService) { }

  @Post()
  create(@Body() data: CreateStoreDto) {
    return this.storeService.create(data);
  }

  @Get()
  getAll() {
    return this.storeService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.storeService.getOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() data: UpdateStoreDto) {
    return this.storeService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.storeService.delete(id);
  }


}
