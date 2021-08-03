import { Test, TestingModule } from "@nestjs/testing"
import { when } from "jest-when"
import { mockService } from "src/util/mocks/mock.service"
import { CreateUserDto } from "./dto/create-user.dto"
import { UserController } from "./user.controller"
import { UserService } from "./user.service"

describe('UserController', () => {
    const dto: CreateUserDto = {
        name: 'Tester',
        address: 'Earth',
        email: 'tester@gmail.com',
        password: '123456',
        phoneNumber: '0908321238',
        username: 'tester123'
    }

    let mockUserService: typeof mockService
    let controller: UserController
    beforeEach(async () => {
        mockUserService = { ...mockService }
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [UserService],
        })
            .overrideProvider(UserService)
            .useValue(mockUserService)
            .compile()
        controller = await module.get(UserController)
    })

    it('should be defined', () => {
        expect(controller).toBeDefined()
    })

    it('should return user with id', async () => {
        try {
            const user = { ...dto, id: 1 }
            when(mockUserService.getOne).calledWith(1).mockResolvedValue(user)
            const res = await controller.getOne(1)
            expect(res).toEqual(user)
            expect(mockUserService.getOne).toHaveBeenCalledWith(1)
        } catch (e) {
            fail(e)
        }
    })
    it('should return all users', async () => {
        try {
            const users = [{ ...dto, id: 1 }, { ...dto, id: 2 }]
            mockUserService.getAll.mockResolvedValue(users)
            const res = await controller.getAll()
            expect(res).toEqual(users)
            expect(mockUserService.getAll).toHaveBeenCalled()
        } catch (e) {
            fail(e)
        }
    })

    it('should create a user', async () => {
        try {
            mockUserService.create = jest.fn((dto) => ({ ...dto, id: Date.now() }))
            const res = await controller.create(dto)
            expect(res).toEqual({ ...dto, id: expect.any(Number) })
            expect(mockUserService.create).toHaveBeenCalledWith(dto)
        } catch (e) {
            fail(e)
        }

    })
    it('should update a user', async () => {
        try {
            const res = await controller.update(1, dto)
            expect(res).toEqual({ ...dto, id: 1 })
            expect(mockUserService.update).toHaveBeenCalledWith(1, dto)
        } catch (e) {
            fail(e)
        }
    })

    it('should delete a user', async () => {
        try {
            const res = await controller.delete(1)
            expect(res).toEqual(1)
            expect(mockUserService.delete).toHaveBeenCalledWith(1)
        } catch (e) {
            fail(e)
        }
    })
})