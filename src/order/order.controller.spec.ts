import { Test, TestingModule } from "@nestjs/testing"
import { when } from "jest-when"
import RequestWithUser from "src/auth/request-with-user"
import { User } from "src/user/entities/user.entity"
import { mockService } from "src/util/mocks/mock.service"
import { CreateOrderDto } from "./dto/create-order.dto"
import { OrderController } from "./order.controller"
import { OrderService } from "./order.service"

describe('OrderController', () => {
  const dto: CreateOrderDto = {
    name: 'Customer Name',
    address: 'Customer Address',
    deliveredAt: new Date(),
    phoneNumber: '0908321238',
    note: 'A note',
    orderDetails: [],
  }

  let mockOrderService: typeof mockService
  let controller: OrderController
  beforeEach(async () => {
    mockOrderService = { ...mockService }
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [OrderService],
    })
      .overrideProvider(OrderService)
      .useValue(mockOrderService)
      .compile()
    controller = await module.get(OrderController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('should return order with id', async () => {
    try {
      const order = { ...dto, id: 1 }
      when(mockOrderService.getOne).calledWith(1).mockResolvedValue(order)
      const res = await controller.getOne(1)
      expect(res).toEqual(order)
      expect(mockOrderService.getOne).toHaveBeenCalledWith(1)
    } catch (e) {
      fail(e)
    }
  })
  it('should return all orders', async () => {
    try {
      const orders = [{ ...dto, id: 1 }, { ...dto, id: 2 }]
      mockOrderService.getAll.mockResolvedValue(orders)
      const res = await controller.getAll()
      expect(res).toEqual(orders)
      expect(mockOrderService.getAll).toHaveBeenCalled()
    } catch (e) {
      fail(e)
    }
  })

  it('should create an order', async () => {
    try {
      mockOrderService.create = jest.fn((dto) => ({ ...dto, id: Date.now() }))
      const req = { user: new User() } as RequestWithUser
      const res = await controller.create(dto, req)
      expect(res).toEqual({ ...dto, id: expect.any(Number) })
      expect(mockOrderService.create).toHaveBeenCalledWith(dto)
    } catch (e) {
      fail(e)
    }

  })
  it('should update an order', async () => {
    try {
      const res = await controller.update(1, dto)
      expect(res).toEqual({ ...dto, id: 1 })
      expect(mockOrderService.update).toHaveBeenCalledWith(1, dto)
    } catch (e) {
      fail(e)
    }
  })

  it('should delete an order', async () => {
    try {
      const res = await controller.delete(1)
      expect(res).toEqual(1)
      expect(mockOrderService.delete).toHaveBeenCalledWith(1)
    } catch (e) {
      fail(e)
    }
  })
})