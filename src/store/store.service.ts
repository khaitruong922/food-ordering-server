import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { FileService } from 'src/file/file.service';
import { Repository } from 'typeorm';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Store } from './entities/store.entity';

@Injectable()
export class StoreService extends BaseService<Store, Repository<Store>>{
  constructor(
    @InjectRepository(Store) repository: Repository<Store>,
    private readonly fileService: FileService
  ) {
    super(repository)
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
}
