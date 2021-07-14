import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { config as dotenvConfig } from "dotenv"
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
dotenvConfig()

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const PORT = process.env.PORT || 3000
  app.enableCors({
    credentials: true,
    origin: true,
  })
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.use(cookieParser())
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    forbidUnknownValues: true,
  }))

  const config = new DocumentBuilder()
    .setTitle('Food Ordering App API')
    .setDescription('The API documentation for Food Ordering App')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('', app, document);

  await app.listen(PORT);

}
bootstrap();
