import { DeleteResult, Repository } from 'typeorm'
import { IBaseService } from './i.base.service'
import { EntityId } from 'typeorm/repository/EntityId'
import { BaseEntity } from './base.entity'

export class BaseService<T extends BaseEntity, R extends Repository<T>> implements IBaseService<T> {
    protected readonly repository: R

    constructor(repository: R) {
        this.repository = repository
    }
    async getOneOrFail(id: number): Promise<T> {
        return this.repository.findOneOrFail(id)
    }

    async getAll() {
        return this.repository.find()
    }

    async getOne(id: number) {
        return this.repository.findOne(id)
    }

    async create(data: any) {
        return this.repository.save(data)
    }

    async update(id: number, data: any) {
        await this.repository.update(id, data)
        return this.getOne(id)
    }

    async delete(id: number) {
        return this.repository.delete(id)
    }
}