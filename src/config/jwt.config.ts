import { config as dotenvConfig } from "dotenv"

dotenvConfig()

export const jwtConfig = {
    secret: process.env.JWT_SECRET,
    expirationTime: Number.parseInt(process.env.JWT_EXPIRATION_TIME!),
    cookieName: 'token'
};