import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";
import { User } from "src/user/entities/user.entity";
import { JwtConstants } from "./constants";
import { JwtPayload } from "./jwt.payload";
import tokenExtractor from "./token-extractor";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: tokenExtractor,
            ignoreExpiration: false,
            secretOrKey: JwtConstants.Secret,
        });
    }
    async validate(payload: JwtPayload) {
        return { id: payload.sub, role: payload.role };
    }
}