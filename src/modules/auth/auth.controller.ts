import { AUTH } from '@/app.config';
import { Response } from 'express';
import { pick } from 'lodash';

import { Roles } from '@/decorators/roles';
import { RolesGuard } from '@/guards/roles';
import {
  Body,
  Controller,
  forwardRef,
  Inject,
  NotAcceptableException,
  Post,
  Request,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';

import { UserService } from '../user/user.service';
import { AuthDto } from './auth.dto';
import { JwtAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService
  ) {}

  @Post('public')
  public getPublicKey() {
    return {
      data: this.authService.getPublicKey(),
      message: 'ok',
    };
  }

  @Post('private')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  public getPrivateKey() {
    return {
      data: this.authService.getPrivateKey(),
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
        const user = await this.userService.find(auth.account);
        res.cookie('jwt', this.authService.createJwt(pick(user, [
          'id'
        ])), {
          maxAge: AUTH.expiresIn
        });
        res.send({
          message: 'ok',
          data: pick(user, [
            'id',
            'account',
            'roles'
          ])
        });
      } else {
        throw new NotAcceptableException('Account or password is not correct');
      }
    } catch (err) {
      throw new NotAcceptableException('Account or password is not correct');
    }
  }

  @Post('check')
  public async check(@Request() request) {
    try {
      return {
        message: 'ok',
        data: this.authService.verifyJwt(request.cookies.jwt),
      };
    } catch (err) {
      throw new NotAcceptableException('Verify Failed');
    }
  }

  @Post('logout')
  public async logout(@Res() res: Response) {
    res.clearCookie('jwt', {
      maxAge: 0
    });
    res.send({
      message: 'ok'
    });
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
