import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt'
import LoginResponse from './login.reponse';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) {

    }
    async getUser(username: string, password: string): Promise<any> {
        const user = await this.userService.getOneByUsername(username)
        if (!user) return null
        const valid = await bcrypt.compare(password, user.password)
        if (!valid) return null
        return user
    }

    async login(user: User) {
        const payload = { sub: user.id }
        return new LoginResponse(this.jwtService.sign(payload))
    }
}
