import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PublicFile } from './entities/public-file.entity';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import { awsConfig } from 'src/config/aws.config';

@Injectable()
export class FileService {
    constructor(
        @InjectRepository(PublicFile)
        private repository: Repository<PublicFile>,
    ) { }

    async uploadPublicFile(dataBuffer: Buffer, filename: string) {
        const s3 = new S3();
        const uploadResult = await s3.upload({
            Bucket: awsConfig.publicBucketName,
            Body: dataBuffer,
            Key: `${uuid()}-${filename}`
        })
            .promise();

        const newFile = this.repository.create({
            key: uploadResult.Key,
            url: uploadResult.Location
        });
        await this.repository.save(newFile);
        return newFile;
    }
}