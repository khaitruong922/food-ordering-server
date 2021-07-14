import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express'
import { AuthService } from './auth.service';
import { JwtConstants } from './constants';
import { cookieOptions } from './cookie.options';
import { LocalAuthGuard } from './local-auth.guard';
import RequestWithUser from './request-with-user';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {

    }
    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Req() req: RequestWithUser) {
        const loginResponse = await this.authService.login(req.user)
        req.res!.cookie(JwtConstants.CookieName, loginResponse.accessToken, cookieOptions)
        return loginResponse
    }

    @Post('/logout')
    async logout(@Req() req: Request) {
        req.res!.clearCookie(JwtConstants.CookieName, cookieOptions)
        return 200
    }
}
