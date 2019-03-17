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
  ValidationPipe,
} from '@nestjs/common';
import { pick } from 'lodash';

import { AUTH } from '@/app.config';
import { AccoutDto, CreateUserDto, PasswordDto, RoleDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService,
    @Inject(forwardRef(() => AuthService)) private readonly authService: AuthService) {
    this.initDefaultUser();
  }

  @Get()
  public findAll() {
    return {
      message: 'ok',
      data: this.userService.findAll(),
    };
  }

  @Get(':id')
  public async find(@Param() params) {
    const user = await this.userService.find(Number(params.id));
    if (user) {
      return {
        message: 'ok',
        data: pick(user, [
          'account',
          'roles'
        ])
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
      data: this.userService.createUser(createUserDto),
    };
  }

  @Put('account')
  public async updateAccount(
    @Body(new ValidationPipe()) accountDto: AccoutDto,
  ) {
    await this.userService.updateAccount(accountDto);
    return {
      message: 'ok',
    };
  }

  @Put('password')
  public async updatePassword(
    @Body(new ValidationPipe()) passwordDto: PasswordDto,
  ) {
    await this.userService.updatePassword(passwordDto);
    return {
      message: 'ok',
    };
  }

  @Put('role')
  public async updateRole(@Body(new ValidationPipe()) roleDto: RoleDto) {
    await this.userService.updateRole(roleDto);
    return {
      message: 'ok',
    };
  }

  private async initDefaultUser () {
    const users = await this.userService.findAll();
    if (!users.length) {
      const password = await this.authService.encryptRSA(AUTH.defaultPassword);
      this.createUser({
        account: AUTH.defaultAccount,
        password
      });
    }
  }
}
