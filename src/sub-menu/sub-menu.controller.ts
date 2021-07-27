import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SubMenuService } from './sub-menu.service';
import { CreateSubMenuDto } from './dto/create-sub-menu.dto';
import { UpdateSubMenuDto } from './dto/update-sub-menu.dto';
import { Roles } from 'src/role/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/role/roles.guard';
import { Role } from 'src/role/role.enum';
import { CreateProductDto } from 'src/product/dto/create-product.dto';

@Controller('sub-menus')
export class SubMenuController {
  constructor(private readonly subMenuService: SubMenuService) { }

  @Post()
  create(@Body() createSubMenuDto: CreateSubMenuDto) {
    return this.subMenuService.create(createSubMenuDto);
  }

  @Get()
  getAll() {
    return this.subMenuService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.subMenuService.getOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() data: UpdateSubMenuDto) {
    return this.subMenuService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.subMenuService.delete(id);
  }

  @Post(':id/products')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async addProductToSubMenu(@Param('id') id: number, @Body() createProductDto: CreateProductDto) {
    return this.subMenuService.addProductToSubMenu(id, createProductDto)
  }
}
