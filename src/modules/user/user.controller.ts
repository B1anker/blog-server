import { RolesGuard } from '@/guards/roles';
import { AuthService } from '@/modules/auth/auth.service';
import { UserService } from '@/modules/user/user.service';
import {
  Body,
  Controller,
  forwardRef,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  ValidationPipe
} from '@nestjs/common';
import { pick } from 'lodash';
import { JwtAuthGuard } from '../auth/auth.guard';

import { RequestWithCookie } from '@/types';

import { AUTH } from '@/app.config';
import { AccoutUpdateDto, CreateUserDto } from './user.dto';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService
  ) {
    this.initDefaultUser();
  }

  @Get()
  public async findAll() {
    return {
      message: 'ok',
      data: await this.userService.findAll()
    };
  }

  @Get(':id')
  public async find(@Param() params) {
    const user = await this.userService.find(Number(params.id));
    if (user) {
      return {
        message: 'ok',
        data: pick(user, ['account', 'roles'])
      };
    }
    return {
      message: 'ok',
      data: null
    };
  }

  @Post()
  public createUser(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    return {
      message: 'ok',
      data: this.userService.createUser(createUserDto)
    };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put()
  public async updateAccount(
    @Body(new ValidationPipe()) accountUpdateDto: AccoutUpdateDto,
    @Req() req: RequestWithCookie
  ) {
    await this.userService.updateAccount(accountUpdateDto, req.cookies.jwt);
    return {
      message: 'ok'
    };
  }

  private async initDefaultUser() {
    const users = await this.userService.findAll();
    if (!users.length) {
      const password = await this.authService.encryptRSA(AUTH.defaultPassword);
      this.createUser({
        account: AUTH.defaultAccount,
        password,
        roles: AUTH.defaultRoles
      });
    }
  }
}
