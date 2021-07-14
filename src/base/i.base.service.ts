import { EntityId } from 'typeorm/repository/EntityId'
import { DeleteResult } from 'typeorm'

export interface IBaseService<T> {
    getAll(): Promise<T[]>

    getOne(id: EntityId): Promise<T | undefined>

    create(data: any): Promise<T>

    update(id: EntityId, data: any): Promise<T | undefined>

    delete(id: EntityId): Promise<DeleteResult>
}