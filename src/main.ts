import * as compression from 'compression';

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(compression);
  // app.useLogger(app.get(Logger));
  await app.listen(3000);
}
bootstrap();
