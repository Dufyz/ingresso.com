import { NestFactory, Reflector } from '@nestjs/core';

import { AppModule } from './app.module';
import { SERVER_PORT } from './infra/config';

import {
  ValidationPipe,
  ClassSerializerInterceptor,
  Logger,
} from '@nestjs/common';
import { HttpLoggerInterceptor } from './presentation/httpLogger.interceptor';

async function bootstrap() {
  const logger = new Logger('main');

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalInterceptors(new HttpLoggerInterceptor());

  await app.listen(SERVER_PORT);

  logger.log(`Application is running on: ${await app.getUrl()}`);
}

void bootstrap();
