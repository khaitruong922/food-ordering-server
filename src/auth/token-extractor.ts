import { Request } from "express";
import { JwtConstants } from "./constants";

export default function cookieOrBearerTokenExtractor(req: Request) {
    if (req && req.cookies && req.cookies[JwtConstants.CookieName])
        return req.cookies[JwtConstants.CookieName]
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
        return req.headers.authorization.split(' ')[1]
    return null
}