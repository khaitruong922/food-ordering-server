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
    whitelist: true,
    transform: true,
    forbidUnknownValues: true,
  }))

  const config = new DocumentBuilder()
    .setTitle('DeliV API')
    .setDescription('The API documentation for DeliV')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/', app, document, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: "DeliV API",
  });

  await app.listen(PORT);

}
bootstrap();
