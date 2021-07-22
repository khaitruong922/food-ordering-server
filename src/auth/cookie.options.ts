import { CookieOptions } from "express";
import { jwtConfig } from "../config/jwt.config";

export const cookieOptions: CookieOptions = {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
    maxAge: jwtConfig.expirationTime * 1000
}