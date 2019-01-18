import { UsersService } from '@/modules/user/user.service';
import { Body, Controller, Get, Post, Put, ValidationPipe } from '@nestjs/common';

import { AccoutDto, CreateUserDto, PasswordDto, RoleDto } from './user.dto';

@Controller('user')
export class UsersController {
  constructor (private readonly usersService: UsersService) {}

  @Get()
  public findAll() {
    return {
      message: 'ok',
      data: this.usersService.findAll()
    };
  }

  @Post()
  public createUser (@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    return {
      message: 'ok',
      data: this.usersService.createUser(createUserDto)
    };
  }

  @Put('account')
  public async updateAccount (@Body(new ValidationPipe()) accountDto: AccoutDto) {
    await this.usersService.updateAccount(accountDto);
    return {
      message: 'ok'
    };
  }

  @Put('password')
  public async updatePassword (@Body(new ValidationPipe()) passwordDto: PasswordDto) {
    await this.usersService.updatePassword(passwordDto);
    return {
      message: 'ok'
    };
  }

  @Put('role')
  public async updateRole (@Body(new ValidationPipe()) roleDto: RoleDto) {
    await this.usersService.updateRole(roleDto);
    return {
      message: 'ok'
    };
  }
}
