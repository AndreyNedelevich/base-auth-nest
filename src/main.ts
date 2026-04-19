import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';
import * as basicAuth from 'express-basic-auth';
import helmet from 'helmet';

import { AppModule } from './app.module';
import { SwaggerHelper } from './common/helpers/swagger.helper';
import { GlobalExceptionFilter } from './common/http/http-exception.filter';
import { requestLoggingMiddleware } from './common/middlewares/request-logging.middleware';
import { AppConfig, SwaggerConfig } from './config/config.types';

function initSwagger(app: INestApplication): void {
  const configService = app.get<ConfigService>(ConfigService);
  const swaggerConfig: SwaggerConfig = configService.get('swagger');

  if (!swaggerConfig.isEnabled) return;

  app.use(
    ['/docs', '/docs-json'],
    basicAuth({
      challenge: true,
      users: { [swaggerConfig.user]: swaggerConfig.password },
    }),
  );

  const documentBuilder: DocumentBuilder = new DocumentBuilder()
    .setTitle('Base auth API')
    .setDescription('Base auth API Documentation')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      in: 'header',
    })
    .setVersion('0.0.1');

  const document = SwaggerModule.createDocument(app, documentBuilder.build());
  SwaggerHelper.setDefaultResponses(document);

  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      docExpansion: 'list',
      defaultModelExpandDepth: 1,
      persistAuthorization: true,
    },
  });
}

function setCorsPolicy(app: INestApplication): void {
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: [
      'Content-Type',
      'Accept',
      'Authorization',
      'X-Requested-With,content-type',
      'Origin',
      'Access-Control-Allow-Origin',
    ],
  });
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const configService = app.get<ConfigService>(ConfigService);

  const appConfig: AppConfig = configService.get('app');

  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  initSwagger(app);
  setCorsPolicy(app);
  app.use(requestLoggingMiddleware);
  app.use(compression());
  app.use(helmet());

  await app.listen(appConfig.port, () => {
    const url = `http://${appConfig.host}:${appConfig.port}`;
    Logger.log(`Server is running ${url}`);
    Logger.log(`Swagger is running ${url}/docs`);
  });
}

void bootstrap();
