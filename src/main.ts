import * as cookieParser from 'cookie-parser';

import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';

const configService = new ConfigService();

async function bootstrap() {
  const [
    FRONTEND_PATH,
    API_PORT,
    ORIGIN,
    SWAGGER_TITLE,
    SWAGGER_DESCRIPTION,
    SWAGGER_VERSION,
  ] = [
    configService.get<string>('FRONTEND_PATH'),
    configService.get<string>('API_PORT'),
    configService.get<string>('ORIGIN'),
    configService.get<string>('SWAGGER_TITLE'),
    configService.get<string>('SWAGGER_DESCRIPTION'),
    configService.get<string>('SWAGGER_VERSION'),
  ];

  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'fatal', 'error', 'warn', 'debug', 'verbose'],
  });

  const config = new DocumentBuilder()
    .setTitle(SWAGGER_TITLE)
    .setDescription(SWAGGER_DESCRIPTION)
    .setVersion(SWAGGER_VERSION)
    .addTag('Building')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);
  app.enableCors({
    origin: [ORIGIN, FRONTEND_PATH],
    methods: ['GET', 'POST', 'PUT', 'UPDATE', 'PATCH', 'DELETE'],
    credentials: true,
  });

  app.use(cookieParser());

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  app.enableVersioning({
    type: VersioningType.URI,
  });

  await app.listen(API_PORT);
}

bootstrap();
