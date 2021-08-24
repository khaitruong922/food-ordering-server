import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { FileService } from 'src/file/file.service';
import { CreateSubMenuDto } from 'src/sub-menu/dto/create-sub-menu.dto';
import { SubMenuService } from 'src/sub-menu/sub-menu.service';
import { Repository } from 'typeorm';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Store } from './entities/store.entity';

@Injectable()
export class StoreService extends BaseService<Store, Repository<Store>>{
  constructor(
    @InjectRepository(Store) repository: Repository<Store>,
    private readonly fileService: FileService,
    private readonly subMenuService: SubMenuService,
  ) {
    super(repository)
  }

  async getAll() {
    return this.repository.find({ relations: ['categories'] })
  }

  async getOne(id: number) {
    return this.repository.findOne(id, { relations: ['subMenus', 'subMenus.products'] })
  }

  async addImage(storeId: number, imageBuffer: Buffer, filename: string) {
    const store = await this.repository.findOneOrFail(storeId)
    if (store.image) await this.deleteImage(storeId)
    const image = await this.fileService.uploadPublicFile(imageBuffer, filename)
    await this.repository.update(storeId, { image })
    return image;
  }

  async deleteImage(storeId: number) {
    const store = await this.repository.findOneOrFail(storeId)
    const fileId = store.image?.id
    if (fileId) {
      await this.repository.update(storeId, {
        image: undefined
      });
      await this.fileService.deletePublicFile(fileId)
    }
  }

  async addSubMenuToStore(storeId: number, createSubMenuDto: CreateSubMenuDto) {
    const store = await this.repository.findOneOrFail(storeId)
    return this.subMenuService.create({ ...createSubMenuDto, store })
  }

  async delete(id: number) {
    const store = await this.repository.findOneOrFail(id)
    const fileId = store.image?.id
    if (fileId) this.fileService.deletePublicFile(fileId)
    return super.delete(id)
  }
}
