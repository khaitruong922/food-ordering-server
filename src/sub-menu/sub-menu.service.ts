import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { CreateProductDto } from 'src/product/dto/create-product.dto';
import { ProductService } from 'src/product/product.service';
import { Repository } from 'typeorm';
import { SubMenu } from './entities/sub-menu.entity';


@Injectable()
export class SubMenuService extends BaseService<SubMenu, Repository<SubMenu>>{
  constructor(
    @InjectRepository(SubMenu) repository: Repository<SubMenu>,
    private readonly productService: ProductService,) {
    super(repository)
  }

  async getOne(id: number) {
    return this.repository.findOne(id, { relations: ['store', 'products'] })
  }

  async addProductToSubMenu(id: number, createProductDto: CreateProductDto) {
    const subMenu = await this.repository.findOneOrFail(id)
    return this.productService.create({ ...createProductDto, subMenu })
  }
}
