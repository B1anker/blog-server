import { AUTH } from '@/app.config';
import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UsersModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthStrategy } from './auth.strategy';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: AUTH.privateKey,
      signOptions: {
        expiresIn: AUTH.expiresIn
      }
    }) ],
  controllers: [ AuthController ],
  providers: [ AuthService, AuthStrategy ],
  exports: [ AuthService ]
})
export class AuthModule {}
