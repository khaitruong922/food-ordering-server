import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { Repository } from 'typeorm';
import { SubMenu } from './entities/sub-menu.entity';


@Injectable()
export class SubMenuService extends BaseService<SubMenu, Repository<SubMenu>>{
  constructor(@InjectRepository(SubMenu) repository: Repository<SubMenu>) {
    super(repository)
  }
}
