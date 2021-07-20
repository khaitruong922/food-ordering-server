import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  create(@Body() data: CreateProductDto) {
    return this.productService.create(data);
  }

  @Get()
  getAll() {
    return this.productService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.productService.getOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() data: UpdateProductDto) {
    return this.productService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.productService.delete(id);
  }
}
