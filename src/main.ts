import * as compression from 'compression';
import * as history from 'connect-history-api-fallback';
import * as CookieParser from 'cookie-parser';
import * as path from 'path';

import { NestFactory } from '@nestjs/core';

import { API, ENV } from './app.config';
import { AppModule } from './app.module';
import { generateRsa } from './utils/rsa';

async function bootstrap() {
  console.log(`启动环境：${ENV}`);
  generateRsa();
  const app = await NestFactory.create(AppModule);
  app.use(history({
    rewrites: [
      { from: /.*/, to: '/index.html' }
    ],
    htmlAcceptHeaders: ['text/html', 'application/xhtml+xml']
  }));
  app.useStaticAssets(ENV === 'development' ? path.join(__dirname, '../../blog/dist') : '/root/blog/dist');
  // 设置接口全局前缀
  app.setGlobalPrefix(API.prefix);
  // 添加gzip压缩
  app.use(compression());
  app.use(CookieParser());
  await app.listen(3000);
}
bootstrap();
