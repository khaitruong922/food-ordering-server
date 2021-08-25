import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import RequestWithUser from 'src/auth/request-with-user';
import { Role } from 'src/role/role.enum';
import { Roles } from 'src/role/roles.decorator';
import { RolesGuard } from 'src/role/roles.guard';
import { User } from 'src/user/entities/user.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  getAllOfCurrentUser(@Req() req: RequestWithUser) {
    return this.orderService.getAllOfUser(req.user.id)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get('/all')
  getAll() {
    return this.orderService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.orderService.getOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() data: CreateOrderDto, @Req() req: RequestWithUser) {
    data.user = req.user.id as unknown as User
    return this.orderService.create(data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Patch(':id')
  update(@Param('id') id: number, @Body() data: UpdateOrderDto) {
    return this.orderService.update(id, data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.orderService.delete(id);
  }
}
