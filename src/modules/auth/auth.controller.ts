import { omit } from 'lodash';

import { Roles } from '@/decorators/roles';
import { RolesGuard } from '@/guards/roles';
import {
    Body, Controller, forwardRef, Inject, NotAcceptableException, Post, UseGuards, ValidationPipe
} from '@nestjs/common';

import { UsersService } from '../user/user.service';
import { AuthDto } from './auth.dto';
import { JwtAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor (
    private readonly authService: AuthService,
    @Inject(forwardRef(() => UsersService)) private readonly userService: UsersService ) {}

  @Post('public')
  public getPublicKey (): string {
    return this.authService.getPublicKey();
  }

  @Post('private')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  public getPrivateKey (): string {
    const key = this.authService.getPrivateKey();
    return key;
  }

  @Post('login')
  public async verifyAuth (@Body(new ValidationPipe()) auth: AuthDto) {
    try {
      const valid: boolean = await this.authService.verify(auth.account, auth.password);
      if (valid) {
        const user = omit(await this.userService.find(auth.id), [
          'deleted',
          'password',
          'id'
        ]);
        return {
          jwt: this.authService.createJwt(user)
        };
      }
      throw new NotAcceptableException('Account or password is not correct');
    } catch (err) {
      throw new NotAcceptableException('Account or password is not correct');
    }
  }

  @Post('check')
  public async check (@Body() { token }) {
    try {
      return this.authService.verifyJwt(token);
    } catch (err) {
      throw new NotAcceptableException('Verify Failed');
    }
  }

  @Post('encrypt')
  public async encryptRSA (@Body() { password }) {
    return await this.authService.encryptRSA(password);
  }

  @Post('decrypt')
  public async decryptRSA (@Body() { password }) {
    return await this.authService.decryptRSA(password);
  }
}
