import { Injectable } from '@nestjs/common';
import { CreateSubMenuDto } from './dto/create-sub-menu.dto';
import { UpdateSubMenuDto } from './dto/update-sub-menu.dto';

@Injectable()
export class SubMenuService {
  create(createSubMenuDto: CreateSubMenuDto) {
    return 'This action adds a new subMenu';
  }

  findAll() {
    return `This action returns all subMenu`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subMenu`;
  }

  update(id: number, updateSubMenuDto: UpdateSubMenuDto) {
    return `This action updates a #${id} subMenu`;
  }

  remove(id: number) {
    return `This action removes a #${id} subMenu`;
  }
}
