import { omit } from 'lodash';
import { Repository } from 'typeorm';

import {
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from '../auth/auth.service';
import { AccoutUpdateDto, CreateUserDto } from './user.dto';
import { Users } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users) private readonly repository: Repository<Users>,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService
  ) {}

  public isAdmin(roles: string[]) {
    return roles.includes('ADMIN');
  }

  public async findAll(): Promise<Array<Omit<Users, 'deleted' | 'password'>>> {
    const users = await this.repository.find();
    return users.map((user) => omit(user, ['deleted', 'password']));
  }

  public async find(id: number | string): Promise<Users> {
    let user: Users;
    if (typeof id === 'number') {
      user = await this.repository.findOne(id);
    } else {
      user = await this.repository.findOne({
        account: id
      });
    }
    return user;
  }

  public async createUser(createUser: CreateUserDto): Promise<any> {
    const user = new Users();
    Object.assign(user, omit(createUser, ['password']));
    user.password = await this.authService.encrypt(
      this.authService.decryptRSA(createUser.password)
    );
    user.roles = user.roles || ['VISITOR'];
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

  public async updateAccount(
    accountUpdateDto: AccoutUpdateDto,
    jwtString: string
  ) {
    const jwt = this.authService.verifyJwt(jwtString);
    const user = await this.find(accountUpdateDto.id);
    const jwtUser = await this.find(jwt.id);
    user.account = accountUpdateDto.account;
    // 修改权限
    if (
      Array.isArray(accountUpdateDto.roles) &&
      accountUpdateDto.roles.length
    ) {
      // 管理员才有权限更新账号权限
      if (jwtUser.roles.includes('ADMIN')) {
        user.roles = accountUpdateDto.roles || user.roles;
      } else {
        throw new ForbiddenException('没有权限！');
      }
    }
    // 修改密码
    if (user.password !== accountUpdateDto.password) {
      if (jwt.id !== accountUpdateDto.id && !this.isAdmin(jwtUser.roles)) {
        throw new ForbiddenException('没有权限！');
      } else if (accountUpdateDto.password) {
        user.password = await this.authService.encrypt(
          this.authService.decryptRSA(accountUpdateDto.password)
        );
      }
    }
    try {
      await this.repository.save(user);
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        throw new ForbiddenException('用户名已存在！');
      }
      throw new InternalServerErrorException();
    }
  }
}
