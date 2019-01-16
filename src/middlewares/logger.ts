import chalk from 'chalk';
import * as dayjs from 'dayjs';

import { Injectable, MiddlewareFunction, NestMiddleware } from '@nestjs/common';

@Injectable()
export default class LoggerMiddleware implements NestMiddleware {
  resolve(...args: any[]): MiddlewareFunction {
    return (req, res, next) => {
      console.log(`[${chalk.hex('#44BEC1')(req.method)}] - ${chalk.hex('#7EC757')(dayjs().format('YYYY-MM-DD HH:mm:ss'))} - ${chalk.hex('#CD9C6A')(req.url)}`);
      next();
    };
  }
}
