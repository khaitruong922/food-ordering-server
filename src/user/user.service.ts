import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/base/base.service";
import { Equal, ILike, Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user-dto";
import { User } from './entities/user.entity'
import * as bcrypt from 'bcrypt'
import { FileService } from "src/file/file.service";
@Injectable()
export class UserService extends BaseService<User, Repository<User>> {
    constructor(
        @InjectRepository(User) repository: Repository<User>,
        private readonly fileService: FileService,
    ) {
        super(repository)
    }

    async create(user: CreateUserDto) {
        user.password = await bcrypt.hash(user.password, 10)
        return super.create(user)
    }

    async update(id: number, user: UpdateUserDto) {
        if (user.password) user.password = await bcrypt.hash(user.password, 10)
        return super.update(id, user)
    }

    async getOneByUsername(username: string) {
        return this.repository.findOne({
            username: username,
        })
    }

    async search(searchQuery: string) {
        return this.repository.find({
            where: [{
                username: ILike(`%${searchQuery}%`)
            }, {
                name: ILike(`%${searchQuery}%`)
            }]
        })
    }

    async addAvatar(userId: number, imageBuffer: Buffer, filename: string) {
        const avatar = await this.fileService.uploadPublicFile(imageBuffer, filename);
        const user = await this.repository.findOneOrFail(userId);
        await this.repository.update(userId, { avatar });
        return avatar;
    }
}