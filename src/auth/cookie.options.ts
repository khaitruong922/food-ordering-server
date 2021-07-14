import { CookieOptions } from "express";
import { JwtConstants } from "./constants";

export const cookieOptions: CookieOptions = {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
    maxAge: JwtConstants.ExpirationTime * 1000
}