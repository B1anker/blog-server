import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(error, user, errInfo) {
    if (user && !error && !errInfo) {
      return user;
    } else {
      throw error || new UnauthorizedException('Invalid Signature', errInfo && errInfo.message);
    }
  }
}
