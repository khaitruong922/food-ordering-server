import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublicFile } from './entities/public-file.entity';
import { FileService } from './file.service';

@Module({
    imports: [TypeOrmModule.forFeature([
        PublicFile,
    ])],
    providers: [FileService],
    exports: [FileService],
})
export class FileModule { }
