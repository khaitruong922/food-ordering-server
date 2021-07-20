import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubMenuService } from './sub-menu.service';
import { CreateSubMenuDto } from './dto/create-sub-menu.dto';
import { UpdateSubMenuDto } from './dto/update-sub-menu.dto';

@Controller('sub-menus')
export class SubMenuController {
  constructor(private readonly subMenuService: SubMenuService) {}

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
    return this.subMenuService.delete(+id);
  }
}
