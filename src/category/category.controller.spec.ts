import { Test, TestingModule } from "@nestjs/testing"
import { when } from "jest-when"
import { mockService } from "src/util/mocks/mock.service"
import { CreateCategoryDto } from "./dto/create-category.dto"
import { CategoryController } from "./category.controller"
import { CategoryService } from "./category.service"

describe('CategoryController', () => {
    const dto: CreateCategoryDto = {
        name: 'test category',
        stores: []
    }

    let mockCategoryService: typeof mockService
    let controller: CategoryController
    beforeEach(async () => {
        mockCategoryService = { ...mockService }
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CategoryController],
            providers: [CategoryService],
        })
            .overrideProvider(CategoryService)
            .useValue(mockCategoryService)
            .compile()
        controller = await module.get(CategoryController)
    })

    it('should be defined', () => {
        expect(controller).toBeDefined()
    })

    it('should return category with id', async () => {
        try {
            const category = { ...dto, id: 1 }
            when(mockCategoryService.getOne).calledWith(1).mockResolvedValue(category)
            const res = await controller.getOne(1)
            expect(res).toEqual(category)
            expect(mockCategoryService.getOne).toHaveBeenCalledWith(1)
        } catch (e) {
            fail(e)
        }
    })
    it('should return all categorys', async () => {
        try {
            const categorys = [{ ...dto, id: 1 }, { ...dto, id: 2 }]
            mockCategoryService.getAll.mockResolvedValue(categorys)
            const res = await controller.getAll()
            expect(res).toEqual(categorys)
            expect(mockCategoryService.getAll).toHaveBeenCalled()
        } catch (e) {
            fail(e)
        }
    })

    it('should create a category', async () => {
        try {
            mockCategoryService.create = jest.fn((dto) => ({ ...dto, id: Date.now() }))
            const res = await controller.create(dto)
            expect(res).toEqual({ ...dto, id: expect.any(Number) })
            expect(mockCategoryService.create).toHaveBeenCalledWith(dto)
        } catch (e) {
            fail(e)
        }

    })
    it('should update a category', async () => {
        try {
            const res = await controller.update(1, dto)
            expect(res).toEqual({ ...dto, id: 1 })
            expect(mockCategoryService.update).toHaveBeenCalledWith(1, dto)
        } catch (e) {
            fail(e)
        }
    })

    it('should delete a category', async () => {
        try {
            const res = await controller.delete(1)
            expect(res).toEqual(1)
            expect(mockCategoryService.delete).toHaveBeenCalledWith(1)
        } catch (e) {
            fail(e)
        }
    })
})