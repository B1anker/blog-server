import * as compression from 'compression';
import * as CookieParser from 'cookie-parser';
import * as path from 'path';

import { NestFactory } from '@nestjs/core';

import { API } from './app.config';
import { AppModule } from './app.module';
import { generateRsa } from './utils/rsa';

async function bootstrap() {
  generateRsa();
  const app = await NestFactory.create(AppModule);
  app.useStaticAssets(path.join(__dirname, '../../blog/dist'));
  // 设置接口全局前缀
  app.setGlobalPrefix(API.prefix);
  // 添加gzip压缩
  app.use(compression());
  app.use(CookieParser());
  await app.listen(3000);
}
bootstrap();
