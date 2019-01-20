import { omit } from 'lodash';
import { Repository } from 'typeorm';

import {
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { AuthService } from '../auth/auth.service';
import { AccoutDto, CreateUserDto, PasswordDto, RoleDto } from './user.dto';
import { Users } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private readonly repository: Repository<Users>,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  public async findAll(): Promise<Users[]> {
    return await this.repository.find();
  }

  public async find(id: number | string): Promise<Users> {
    let user: Users;
    if (typeof id === 'number') {
      user = await this.repository.findOne(id);
    } else {
      user = await this.repository.findOne({
        account: id,
      });
    }
    return user;
  }

  public async createUser(createUser: CreateUserDto): Promise<any> {
    const user = new Users();
    Object.assign(user, omit(createUser, ['password']));
    user.password = await this.authService.encrypt(
      this.authService.decryptRSA(createUser.password),
    );
    user.roles = user.roles || [];
    try {
      await this.repository.save(user);
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        throw new ForbiddenException('账号已存在！');
      }
      throw err;
    }
    return omit(user, ['password', 'id']);
  }

  public async updateAccount(accountDto: AccoutDto) {
    const user = await this.find(accountDto.id);
    user.account = accountDto.account;
    await this.repository.save(user);
  }

  public async updatePassword(passwordDto: PasswordDto) {
    const user = await this.find(passwordDto.id);
    user.password = await this.authService.encrypt(
      this.authService.decryptRSA(passwordDto.password),
    );
    await this.repository.save(user);
  }

  public async updateRole(roleDto: RoleDto) {
    const user = await this.find(roleDto.id);
    user.roles = roleDto.roles;
    await this.repository.save(user);
  }
}
