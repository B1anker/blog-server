import { ExtractJwt, Strategy } from 'passport-jwt';

import config from '@/app.config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { UsersService } from '../user/user.service';
import { JwtPayload } from './jwtPayload';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
      secretOrKey: config.AUTH.privateKey,
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.userService.find(payload.account);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
