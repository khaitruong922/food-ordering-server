import { config as dotenvConfig } from "dotenv"

dotenvConfig()

export const JwtConstants = {
    Secret: process.env.JWT_SECRET,
    ExpirationTime: Number.parseInt(process.env.JWT_EXPIRATION_TIME!),
    CookieName: 'token'
};