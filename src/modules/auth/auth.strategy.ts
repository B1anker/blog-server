import { ExtractJwt, Strategy } from 'passport-jwt';

import { AUTH } from '@/app.config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { Request } from 'express';
import { UserService } from '../user/user.service';
import { JwtPayload } from './jwtPayload';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest(req: Request) {
        const token: string = req.cookies.jwt;
        return token;
      },
      secretOrKey: AUTH.privateKey,
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.userService.find(payload.id);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
