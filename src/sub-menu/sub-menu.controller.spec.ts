import { Test, TestingModule } from "@nestjs/testing"
import { when } from "jest-when"
import { mockService } from "src/util/mocks/mock.service"
import { CreateSubMenuDto } from "./dto/create-sub-menu.dto"
import { SubMenuController } from "./sub-menu.controller"
import { SubMenuService } from "./sub-menu.service"

describe('SubMenuController', () => {
  const dto: CreateSubMenuDto = {
    name: 'Test SubMenu',
  }

  let mockSubMenuService: typeof mockService
  let controller: SubMenuController
  beforeEach(async () => {
    mockSubMenuService = { ...mockService }
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubMenuController],
      providers: [SubMenuService],
    })
      .overrideProvider(SubMenuService)
      .useValue(mockSubMenuService)
      .compile()
    controller = await module.get(SubMenuController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('should return sub-menu with id', async () => {
    try {
      const subMenu = { ...dto, id: 1 }
      when(mockSubMenuService.getOne).calledWith(1).mockResolvedValue(subMenu)
      const res = await controller.getOne(1)
      expect(res).toEqual(subMenu)
      expect(mockSubMenuService.getOne).toHaveBeenCalledWith(1)
    } catch (e) {
      fail(e)
    }
  })
  it('should return all sub-menus', async () => {
    try {
      const subMenus = [{ ...dto, id: 1 }, { ...dto, id: 2 }]
      mockSubMenuService.getAll.mockResolvedValue(subMenus)
      const res = await controller.getAll()
      expect(res).toEqual(subMenus)
      expect(mockSubMenuService.getAll).toHaveBeenCalled()
    } catch (e) {
      fail(e)
    }
  })

  it('should create a sub-menu', async () => {
    try {
      mockSubMenuService.create = jest.fn((dto) => ({ ...dto, id: Date.now() }))
      const res = await controller.create(dto)
      expect(res).toEqual({ ...dto, id: expect.any(Number) })
      expect(mockSubMenuService.create).toHaveBeenCalledWith(dto)
    } catch (e) {
      fail(e)
    }

  })
  it('should update a sub-menu', async () => {
    try {
      const res = await controller.update(1, dto)
      expect(res).toEqual({ ...dto, id: 1 })
      expect(mockSubMenuService.update).toHaveBeenCalledWith(1, dto)
    } catch (e) {
      fail(e)
    }
  })

  it('should delete a sub-menu', async () => {
    try {
      const res = await controller.delete(1)
      expect(res).toEqual(1)
      expect(mockSubMenuService.delete).toHaveBeenCalledWith(1)
    } catch (e) {
      fail(e)
    }
  })
})