import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { FileService } from 'src/file/file.service';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService extends BaseService<Product, Repository<Product>> {
  constructor(
    @InjectRepository(Product) repository: Repository<Product>,
    private readonly fileService: FileService
  ) {
    super(repository)
  }

  async addImage(productId: number, imageBuffer: Buffer, filename: string) {
    const product = await this.repository.findOneOrFail(productId);
    if (product.image) await this.deleteImage(productId)
    const image = await this.fileService.uploadPublicFile(imageBuffer, filename);
    await this.repository.update(productId, { image });
    return image;
  }

  async deleteImage(productId: number) {
    const product = await this.repository.findOneOrFail(productId)
    const fileId = product.image?.id
    if (fileId) {
      await this.repository.update(productId, {
        image: undefined
      });
      await this.fileService.deletePublicFile(fileId)
    }
  }
  async delete(id: number) {
    const product = await this.repository.findOneOrFail(id)
    const fileId = product.image?.id
    if (fileId) this.fileService.deletePublicFile(fileId)
    return super.delete(id)
  }
}
