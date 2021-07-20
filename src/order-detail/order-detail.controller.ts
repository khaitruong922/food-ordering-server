import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';
import { OrderDetailService } from './order-detail.service';

@Controller('order-details')
export class OrderDetailController {
  constructor(private readonly orderDetailService: OrderDetailService) { }

  @Post()
  create(@Body() data: CreateOrderDetailDto) {
    return this.orderDetailService.create(data);
  }

  @Get()
  getAll() {
    return this.orderDetailService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.orderDetailService.getOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() data: UpdateOrderDetailDto) {
    return this.orderDetailService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.orderDetailService.delete(id);
  }
}
