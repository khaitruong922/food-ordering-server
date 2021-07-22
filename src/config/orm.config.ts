import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { config as dotenvConfig } from "dotenv"

dotenvConfig()

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    database: process.env.POSTGRES_DATABASE!,
    port: Number(process.env.POSTGRES_PORT!),
    host: process.env.POSTGRES_HOST!,
    username: process.env.POSTGRES_USERNAME!,
    password: process.env.POSTGRES_PASSWORD!,
    entities: ["dist/**/*.entity{.ts,.js}"],
    synchronize: true,
    ssl: {
        rejectUnauthorized: false
    }

}