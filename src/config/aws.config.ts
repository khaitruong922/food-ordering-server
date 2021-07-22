import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { config as dotenvConfig } from "dotenv"

dotenvConfig()

export const awsConfig = {
    region: process.env.AWS_REGION!,
    accessKeyId: process.env.ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    publicBucketName: process.env.AWS_PUBLIC_BUCKET_NAME!,
}