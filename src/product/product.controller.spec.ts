import { Test, TestingModule } from "@nestjs/testing"
import { when } from "jest-when"
import { mockService } from "src/util/mocks/mock.service"
import { CreateProductDto } from "./dto/create-product.dto"
import { ProductController } from "./product.controller"
import { ProductService } from "./product.service"

describe('ProductController', () => {
    const dto: CreateProductDto = {
        name: 'A Product',
        description: 'A description',
        price: 100
    }

    let mockProductService: typeof mockService
    let controller: ProductController
    beforeEach(async () => {
        mockProductService = { ...mockService }
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProductController],
            providers: [ProductService],
        })
            .overrideProvider(ProductService)
            .useValue(mockProductService)
            .compile()
        controller = await module.get(ProductController)
    })

    it('should be defined', () => {
        expect(controller).toBeDefined()
    })

    it('should return product with id', async () => {
        try {
            const product = { ...dto, id: 1 }
            when(mockProductService.getOne).calledWith(1).mockResolvedValue(product)
            const res = await controller.getOne(1)
            expect(res).toEqual(product)
            expect(mockProductService.getOne).toHaveBeenCalledWith(1)
        } catch (e) {
            fail(e)
        }
    })
    it('should return all products', async () => {
        try {
            const products = [{ ...dto, id: 1 }, { ...dto, id: 2 }]
            mockProductService.getAll.mockResolvedValue(products)
            const res = await controller.getAll()
            expect(res).toEqual(products)
            expect(mockProductService.getAll).toHaveBeenCalled()
        } catch (e) {
            fail(e)
        }
    })

    it('should create a product', async () => {
        try {
            mockProductService.create = jest.fn((dto) => ({ ...dto, id: Date.now() }))
            const res = await controller.create(dto)
            expect(res).toEqual({ ...dto, id: expect.any(Number) })
            expect(mockProductService.create).toHaveBeenCalledWith(dto)
        } catch (e) {
            fail(e)
        }

    })
    it('should update a product', async () => {
        try {
            const res = await controller.update(1, dto)
            expect(res).toEqual({ ...dto, id: 1 })
            expect(mockProductService.update).toHaveBeenCalledWith(1, dto)
        } catch (e) {
            fail(e)
        }
    })

    it('should delete a product', async () => {
        try {
            const res = await controller.delete(1)
            expect(res).toEqual(1)
            expect(mockProductService.delete).toHaveBeenCalledWith(1)
        } catch (e) {
            fail(e)
        }
    })
})