import { AUTH } from '@/app.config';
import {
  ExecutionContext,
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import dayjs from 'dayjs';
import { Request, Response } from 'express';
import { pick } from 'lodash';
import { AuthService } from './auth.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private request: Request;
  private response: Response;

  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {
    super();
  }

  canActivate(context: ExecutionContext) {
    this.response = context.switchToHttp().getResponse<Response>();
    this.request = context.switchToHttp().getRequest<Request>();
    return super.canActivate(context);
  }

  handleRequest(error, user, errInfo) {
    if (user && !error && !errInfo) {
      const jwt: string = this.request.cookies.jwt;
      if (!jwt) {
        throw new UnauthorizedException(
          'Invalid Signature',
          errInfo && errInfo.message,
        );
      }
      this.renewToken(user, jwt);
      return user;
    } else {
      throw error ||
        new UnauthorizedException(
          'Invalid Signature',
          errInfo && errInfo.message,
        );
    }
  }

  // 少于AUTH.renew的时间，就续费json web token
  private renewToken (user, jwt: string) {
    let [, jwtUser, ] = jwt.split('.');
    jwtUser = Buffer.from(jwtUser, 'base64').toString();
    if (dayjs().unix() - Number(JSON.parse(jwtUser).exp) <= AUTH.renew) {
      const token: string = this.authService.createJwt(
        pick(user, ['id']),
      );
      this.response.cookie('jwt', token, {
        maxAge: AUTH.expiresIn,
        httpOnly: true,
        secure: true,
      });
    }
  }
}
