import { UsersService } from '@/modules/user/user.service';
import { Body, Controller, Get, Post, Put, ValidationPipe } from '@nestjs/common';

import { AccoutDto, CreateUserDto, PasswordDto, RoleDto } from './user.dto';
import { Users } from './user.entity';

@Controller('user')
export class UsersController {
  constructor (private readonly usersService: UsersService) {}

  @Get()
  public findAll(): Promise<Users[]> {
    return this.usersService.findAll();
  }

  @Post()
  public createUser (@Body(new ValidationPipe()) createUserDto: CreateUserDto): Promise<Users> {
    return this.usersService.createUser(createUserDto);
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
