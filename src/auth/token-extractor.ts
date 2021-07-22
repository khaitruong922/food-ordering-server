import { Request } from "express";
import { jwtConfig } from "../config/jwt.config";

export default function cookieOrBearerTokenExtractor(req: Request) {
    if (req && req.cookies && req.cookies[jwtConfig.cookieName])
        return req.cookies[jwtConfig.cookieName]
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
        return req.headers.authorization.split(' ')[1]
    return null
}