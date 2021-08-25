import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/role/roles.guard';
import { Roles } from 'src/role/roles.decorator';
import { Role } from 'src/role/role.enum';
import { CreateSubMenuDto } from 'src/sub-menu/dto/create-sub-menu.dto';

@Controller('stores')
export class StoreController {
  constructor(private readonly storeService: StoreService) { }


  @Get()
  getAll() {
    return this.storeService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.storeService.getOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post()
  create(@Body() data: CreateStoreDto) {
    return this.storeService.create(data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Patch(':id')
  update(@Param('id') id: number, @Body() data: UpdateStoreDto) {
    return this.storeService.update(id, data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.storeService.delete(id);
  }

  @Post(':id/image')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @UseInterceptors(FileInterceptor('file'))
  async addImage(@Param('id') id: number, @UploadedFile() file: Express.Multer.File) {
    return this.storeService.addImage(id, file.buffer, file.originalname);
  }

  @Post(':id/sub-menus')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async addSubMenu(@Param('id') id: number, @Body() createSubMenuDto: CreateSubMenuDto) {
    return this.storeService.addSubMenuToStore(id, createSubMenuDto)
  }

}
