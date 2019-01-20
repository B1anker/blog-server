import * as compression from 'compression';
import * as CookieParser from 'cookie-parser'

import { NestFactory } from '@nestjs/core';

import { API } from './app.config';
import { AppModule } from './app.module';
import { generateRsa } from './utils/rsa';

async function bootstrap() {
  generateRsa();
  const app = await NestFactory.create(AppModule);
  // 设置接口全局前缀
  app.setGlobalPrefix(API.prefix);
  // 添加gzip压缩
  app.use(compression());
  app.use(CookieParser());
  await app.listen(3000);
}
bootstrap();
