import { createParamDecorator } from '@nestjs/common';

export const QueryParams = createParamDecorator(
  (customConfig: any, request) => {
    console.log(customConfig);
    // 来源 IP
    const ip = (
      request.headers['x-forwarded-for'] ||
      request.headers['x-real-ip'] ||
      request.connection.remoteAddress ||
      request.socket.remoteAddress ||
      request.connection.socket.remoteAddress ||
      request.ip ||
      request.ips[0]
    ).replace('::ffff:', '');

    const ua = request.headers['user-agent'];

    const result = {
      request,
      origin: request.query,
      visitors: { ip, ua, referer: request.referer },
    };

    return result;
  },
);
