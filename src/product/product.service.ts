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
    const image = await this.fileService.uploadPublicFile(imageBuffer, filename);
    const product = await this.repository.findOneOrFail(productId);
    await this.repository.update(productId, { image });
    return image;
  }
}
