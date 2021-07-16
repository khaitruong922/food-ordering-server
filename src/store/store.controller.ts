import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) { }

  @Get()
  async getAll() {
    return this.storeService.getAll();
  }

  @Post()
  create(@Body() createStoreDto: CreateStoreDto) {
    return this.storeService.create(createStoreDto);
  }

  @Delete(":id")
  async delete(@Param("id") id: number) {
    return this.storeService.delete(id)
  }

  @Patch(":id")
  async update(@Param("id") id: number, @Body() updateStoreDto: UpdateStoreDto) {
    return this.storeService.update(id, updateStoreDto)
  }


}
