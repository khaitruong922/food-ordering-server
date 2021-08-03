import { Test, TestingModule } from "@nestjs/testing"
import { when } from "jest-when"
import { mockService } from "src/util/mocks/mock.service"
import { Any } from "typeorm"
import { CreateOrderDetailDto } from "./dto/create-order-detail.dto"
import { OrderDetailController } from "./order-detail.controller"
import { OrderDetailService } from "./order-detail.service"

describe('OrderDetailController', () => {
    const dto: any = {

    }

    let mockOrderDetailService: typeof mockService
    let controller: OrderDetailController
    beforeEach(async () => {
        mockOrderDetailService = { ...mockService }
        const module: TestingModule = await Test.createTestingModule({
            controllers: [OrderDetailController],
            providers: [OrderDetailService],
        })
            .overrideProvider(OrderDetailService)
            .useValue(mockOrderDetailService)
            .compile()
        controller = await module.get(OrderDetailController)
    })

    it('should be defined', () => {
        expect(controller).toBeDefined()
    })

    it('should return order detail with id', async () => {
        try {
            const orderDetail = { ...dto, id: 1 }
            when(mockOrderDetailService.getOne).calledWith(1).mockResolvedValue(orderDetail)
            const res = await controller.getOne(1)
            expect(res).toEqual(orderDetail)
            expect(mockOrderDetailService.getOne).toHaveBeenCalledWith(1)
        } catch (e) {
            fail(e)
        }
    })
    it('should return all order details', async () => {
        try {
            const orderDetails = [{ ...dto, id: 1 }, { ...dto, id: 2 }]
            mockOrderDetailService.getAll.mockResolvedValue(orderDetails)
            const res = await controller.getAll()
            expect(res).toEqual(orderDetails)
            expect(mockOrderDetailService.getAll).toHaveBeenCalled()
        } catch (e) {
            fail(e)
        }
    })

    it('should create an order detail', async () => {
        try {
            mockOrderDetailService.create = jest.fn((dto) => ({ ...dto, id: Date.now() }))
            const res = await controller.create(dto)
            expect(res).toEqual({ ...dto, id: expect.any(Number) })
            expect(mockOrderDetailService.create).toHaveBeenCalledWith(dto)
        } catch (e) {
            fail(e)
        }

    })
    it('should update an order detail', async () => {
        try {
            const res = await controller.update(1, dto)
            expect(res).toEqual({ ...dto, id: 1 })
            expect(mockOrderDetailService.update).toHaveBeenCalledWith(1, dto)
        } catch (e) {
            fail(e)
        }
    })

    it('should delete an order detail', async () => {
        try {
            const res = await controller.delete(1)
            expect(res).toEqual(1)
            expect(mockOrderDetailService.delete).toHaveBeenCalledWith(1)
        } catch (e) {
            fail(e)
        }
    })
})