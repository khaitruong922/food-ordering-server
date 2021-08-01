import { EntityId } from 'typeorm/repository/EntityId'
import { DeleteResult } from 'typeorm'

export interface IBaseService<T> {
    getAll(): Promise<T[]>

    getOne(id: number): Promise<T | undefined>

    getOneOrFail(id: number): Promise<T>

    create(data: any): Promise<T>

    update(id: number, data: any): Promise<T | undefined>

    delete(id: number): Promise<DeleteResult>
}