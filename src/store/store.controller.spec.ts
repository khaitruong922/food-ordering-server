import { Test, TestingModule } from "@nestjs/testing"
import { when } from "jest-when"
import { mockService } from "src/util/mocks/mock.service"
import { CreateStoreDto } from "./dto/create-store.dto"
import { StoreController } from "./store.controller"
import { StoreService } from "./store.service"

describe('StoreController', () => {
    const dto: CreateStoreDto = {
        name: 'Test Store',
        address: 'Address',
        description: 'this is a testing description'
    }

    let mockStoreService: typeof mockService
    let controller: StoreController
    beforeEach(async () => {
        mockStoreService = { ...mockService }
        const module: TestingModule = await Test.createTestingModule({
            controllers: [StoreController],
            providers: [StoreService],
        })
            .overrideProvider(StoreService)
            .useValue(mockStoreService)
            .compile()
        controller = await module.get(StoreController)
    })

    it('should be defined', () => {
        expect(controller).toBeDefined()
    })

    it('should return store with id', async () => {
        try {
            const store = { ...dto, id: 1 }
            when(mockStoreService.getOne).calledWith(1).mockResolvedValue(store)
            const res = await controller.getOne(1)
            expect(res).toEqual(store)
            expect(mockStoreService.getOne).toHaveBeenCalledWith(1)
        } catch (e) {
            fail(e)
        }
    })
    it('should return all stores', async () => {
        try {
            const stores = [{ ...dto, id: 1 }, { ...dto, id: 2 }]
            mockStoreService.getAll.mockResolvedValue(stores)
            const res = await controller.getAll()
            expect(res).toEqual(stores)
            expect(mockStoreService.getAll).toHaveBeenCalled()
        } catch (e) {
            fail(e)
        }
    })

    it('should create a store', async () => {
        try {
            mockStoreService.create = jest.fn((dto) => ({ ...dto, id: Date.now() }))
            const res = await controller.create(dto)
            expect(res).toEqual({ ...dto, id: expect.any(Number) })
            expect(mockStoreService.create).toHaveBeenCalledWith(dto)
        } catch (e) {
            fail(e)
        }

    })
    it('should update a store', async () => {
        try {
            const res = await controller.update(1, dto)
            expect(res).toEqual({ ...dto, id: 1 })
            expect(mockStoreService.update).toHaveBeenCalledWith(1, dto)
        } catch (e) {
            fail(e)
        }
    })

    it('should delete a store', async () => {
        try {
            const res = await controller.delete(1)
            expect(res).toEqual(1)
            expect(mockStoreService.delete).toHaveBeenCalledWith(1)
        } catch (e) {
            fail(e)
        }
    })
})