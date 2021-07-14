import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";
import { JwtConstants } from "./constants";
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
    async validate(payload: any) {
        return { id: payload.sub, username: payload.username };
    }
}