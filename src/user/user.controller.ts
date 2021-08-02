import { Body, Controller, Delete, Get, Param, Patch, Post, Req, Request, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import RequestWithUser from "src/auth/request-with-user";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user-dto";
import { UserService } from "./user.service";

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    async getAll() {
        return this.userService.getAll();
    }


    @Get("/me")
    @UseGuards(JwtAuthGuard)
    async getCurrentUser(@Request() req: RequestWithUser) {
        if (!req.user) return null
        return this.userService.getOne(req.user.id)
    }

    @Get(":id")
    async getOne(@Param("id") id: number) {
        return this.userService.getOne(id)
    }

    @Post()
    async create(
        @Body() createUserDto: CreateUserDto
    ) {
        return this.userService.create(createUserDto)
    }

    @Delete(":id")
    async delete(@Param("id") id: number) {
        return this.userService.delete(id)
    }

    @Patch(":id")
    async update(@Param("id") id: number, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(id, updateUserDto)
    }

    @Post('me/avatar')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('file'))
    async addAvatar(@Req() req: RequestWithUser, @UploadedFile() file: Express.Multer.File) {
        return this.userService.addAvatar(req.user.id, file.buffer, file.originalname);
    }

}