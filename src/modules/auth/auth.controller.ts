import { AUTH } from '@/app.config';
import { Response } from 'express';
import { omit } from 'lodash';

import { Roles } from '@/decorators/roles';
import { RolesGuard } from '@/guards/roles';
import {
  Body,
  Controller,
  forwardRef,
  Inject,
  NotAcceptableException,
  Post,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';

import { UsersService } from '../user/user.service';
import { AuthDto } from './auth.dto';
import { JwtAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
  ) {}

  @Post('public')
  public getPublicKey() {
    return {
      key: this.authService.getPublicKey(),
      message: 'ok',
    };
  }

  @Post('private')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  public getPrivateKey() {
    return {
      key: this.authService.getPrivateKey(),
      message: 'ok',
    };
  }

  @Post('login')
  public async verifyAuth(
    @Body(new ValidationPipe()) auth: AuthDto,
    @Res() res: Response,
  ) {
    try {
      const valid: boolean = await this.authService.verify(
        auth.account,
        auth.password,
      );
      if (valid) {
        const user = omit(await this.userService.find(auth.account), [
          'deleted',
          'password',
          'id',
        ]);
        res.cookie('jwt', this.authService.createJwt(user), {
          maxAge: AUTH.expiresIn
        });
        res.send({
          message: 'ok'
        });
      } else {
        throw new NotAcceptableException('Account or password is not correct');
      }
    } catch (err) {
      throw new NotAcceptableException('Account or password is not correct');
    }
  }

  @Post('check')
  public async check(@Body() { token }) {
    try {
      return {
        message: 'ok',
        data: this.authService.verifyJwt(token),
      };
    } catch (err) {
      throw new NotAcceptableException('Verify Failed');
    }
  }

  @Post('encrypt')
  public async encryptRSA(@Body() { password }) {
    return {
      message: 'ok',
      data: {
        encrypted: await this.authService.encryptRSA(password),
      },
    };
  }

  @Post('decrypt')
  public async decryptRSA(@Body() { password }) {
    return {
      message: 'ok',
      data: {
        decrypted: await this.authService.decryptRSA(password),
      },
    };
  }
}
