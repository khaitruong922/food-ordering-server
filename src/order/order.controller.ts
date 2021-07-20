import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Post()
  create(@Body() data: CreateOrderDto) {
    return this.orderService.create(data);
  }

  @Get()
  getAll() {
    return this.orderService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.orderService.getOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() data: UpdateOrderDto) {
    return this.orderService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.orderService.delete(id);
  }
}
